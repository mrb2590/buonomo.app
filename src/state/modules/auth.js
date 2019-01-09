import axios from 'axios';
import Vue from 'vue';
import { getSavedState, saveState } from '../functions';

const apiUrl = process.env.VUE_APP_API_URL;

/**
 * Set the Authorization header for all axios requests.
 *
 * @param  {object} state The store's state
 * @return {void}
 */
function setDefaultAuthHeaders (state) {
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common.Authorization = state.token
    ? `Bearer ${state.token.access_token}`
    : '';
}

/**
 * Get the timestamp for when a token expires based on the expires_in field.
 *
 * @param  {number} expiresIn The expires_in value from the access token.
 * @return {number}           The timestamp.
 */
function getTimestamp (expiresIn) {
  let date = new Date();

  return date.getTime() + (expiresIn * 1000 - 10000);
}

/**
 * State
 */
export const state = {
  token: null,
  remember: getSavedState('auth.remember', 'local'),
  user: null
};

/**
 * Mutations
 */
export const mutations = {
  /**
   * Set the access token.
   *
   * @param  {object}  state The current store's state.
   * @param  {boolean} token The token.
   * @return {void}
   */
  SET_TOKEN (state, token) {
    state.token = token ? { ...token } : null;
    saveState('auth.token', token, state.remember ? 'local' : 'session');

    setDefaultAuthHeaders(state);
  },

  /**
   * Set whether to persist the user object.
   *
   * @param  {object}  state    The current store's state.
   * @param  {boolean} remember Whether to remember the user.
   * @return {void}
   */
  SET_REMEMBER (state, remember) {
    state.remember = remember;
    saveState('auth.remember', remember, 'local');
  },

  /**
   * Set the user object.
   *
   * @param  {object} state The current store's state.
   * @param  {object} user  The user.
   * @return {void}
   */
  SET_USER (state, user) {
    state.user = user ? { ...user } : null;
  },

  /**
   * Set a user attribute.
   *
   * @param  {object} state  The current store's state.
   * @param  {object} value  Contains the attribute and new value.
   * @return {void}
   */
  SET_USER_ATTRIBUTE (state, { attribute, newValue }) {
    state.user = Vue.set(state.user, attribute, newValue);
  }
};

/**
 * Getters
 */
export const getters = {
  /**
   * Return whether a user is signed in or not.
   *
   * @param  {object}  state The current store's state.
   * @return {boolean}       Whether the user is signed in or not.
   */
  signedIn (state) {
    return !!state.token;
  },

  /**
   * Return a user's full name.
   *
   * @param  {object}  state The current store's state.
   * @return {string}        The user's full name.
   */
  fullName (state) {
    if (state.user) {
      return `${state.user.first_name} ${state.user.last_name}`;
    }
  },

  /**
   * Return whether a user's initials'.
   *
   * @param  {object}  state The current store's state.
   * @return {string}        The user's initials.
   */
  initials (state) {
    if (state.user) {
      return `${state.user.first_name.charAt(0)}${state.user.last_name.charAt(0)}`;
    }
  }
};

/**
 * Actions
 */
export const actions = {
  /**
   * Run when app is started
   *
   * @param  {object} context The store context.
   * @return {void}
   */
  init ({ state, commit }) {
    setDefaultAuthHeaders(state);
    commit('SET_REMEMBER', state.remember ? state.remember : false);
    commit('SET_TOKEN', getSavedState('auth.token', state.remember ? 'local' : 'session'));
  },

  /**
   * Sign the user in.
   *
   * @param {object}  context     The store context.
   * @param {object}  userDetails Contains of username, password, and remember.
   * @return {object}             The token object.
   */
  signIn ({ commit, dispatch, getters }, { email, password, remember } = {}) {
    // Validate the token if the user is already signed in
    if (getters.loggedIn) {
      return dispatch('validateToken');
    }

    // Otherwise attempt to sign them in
    return axios.post(`${apiUrl}/v1/oauth/proxy/token`, {
      grant_type: 'password',
      email: email,
      password: password
    })
      .then(response => {
        response.data.expires_on = getTimestamp(response.data.expires_in);

        commit('SET_TOKEN', response.data);

        return response.data;
      });
  },

  /**
   * Sign the user out.
   *
   * @param  {object} context The store context.
   * @return {void}
   */
  signOut ({ commit }) {
    commit('SET_TOKEN', null);
    commit('SET_USER', null);
  },

  /**
   * Validate the current access token. If it has expired, attempt to refresh it.
   *
   * @param  {object}  context The store context.
   * @return {boolean}         Whether or not the token is valid.
   */
  validateToken ({ commit, state, dispatch }) {
    if (!state.token) {
      return Promise.resolve(false);
    }

    let date = new Date();

    // If the token has expired, attempt to refresh it and refresh user object
    if (date.getTime() >= state.token.expires_on) {
      return axios.post(`${apiUrl}/v1/oauth/proxy/token`, {
        grant_type: 'refresh_token',
        refresh_token: state.token.refresh_token
      })
        .then(response => {
          response.data.expires_on = getTimestamp(response.data.expires_in);

          commit('SET_TOKEN', response.data);

          // Refresh the user object
          return dispatch('fetchUser').then(() => {
            return true;
          });
        })
        .catch(error => {
          console.log('Error', error);

          commit('SET_TOKEN', null);
          // this.commit('app/SET_SNACKBAR', {
          //   show: true,
          //   color: 'error',
          //   closeColor: 'white',
          //   text: 'Failed to reauthenticate!'
          // });

          return false;
        });
    } else {
      // If the token is still valid just refresh the user object
      return dispatch('fetchUser').then(() => {
        return true;
      });
    }
  },

  /**
   * Fetch the user object from cache or the API.
   *
   * @param  {object}  context The store context.
   * @param  {boolean} force   Whether or not to force the refresh of user object.
   * @return {object}          The user object.
   */
  fetchUser ({ commit, state }, force = false) {
    if (!force && state.user) {
      return;
    }

    return axios.get(`${apiUrl}/v1/user`)
      .then(response => {
        commit('SET_USER', response.data.data);

        return response.data.data;
      })
      .catch(() => {
        commit('SET_USER', null);

        // this.commit('app/SET_SNACKBAR', {
        //   show: true,
        //   text: 'Failed to load your profile!',
        //   timeout: 12
        // });
      });
  }
};
