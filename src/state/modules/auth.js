import axios from 'axios';
import Vue from 'vue';
import { getSavedState, saveState } from '../functions';

const apiUrl = process.env.VUE_APP_API_URL;

/**
 * Set the Authorization header for all axios requests.
 */
function setDefaultAuthHeaders (state) {
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.common.Authorization = state.token
    ? `Bearer ${state.token.access_token}`
    : '';
}

/**
 * Get the timestamp for when a token expires based on the expires_in field.
 */
function getTimestamp (expiresIn) {
  let date = new Date();
  return date.getTime() + (expiresIn * 1000 - 10000);
}

export const state = {
  token: null,
  remember: getSavedState('auth.remember', 'local'),
  user: null
};

export const mutations = {
  SET_TOKEN (state, token) {
    state.token = token ? { ...token } : null;
    saveState('auth.token', token, state.remember ? 'local' : 'session');
    setDefaultAuthHeaders(state);
  },

  SET_REMEMBER (state, remember) {
    state.remember = remember;
    saveState('auth.remember', remember, 'local');
  },

  SET_USER (state, user) {
    state.user = user ? { ...user } : null;
  },

  SET_USER_ATTRIBUTE (state, { attribute, newValue }) {
    state.user = Vue.set(state.user, attribute, newValue);
  }
};

export const getters = {
  /**
   * Return whether a user is signed in or not.
   */
  signedIn (state) {
    return !!state.token;
  },

  /**
   * Return a user's full name.
   */
  fullName (state) {
    if (state.user) return `${state.user.first_name} ${state.user.last_name}`;
  },

  /**
   * Return whether a user's initials'.
   */
  initials (state) {
    if (state.user) {
      return `${state.user.first_name.charAt(0)}${state.user.last_name.charAt(0)}`;
    }
  }
};

export const actions = {
  /**
   * Run when app is started.
   */
  init ({ state, commit }) {
    setDefaultAuthHeaders(state);
    commit('SET_REMEMBER', state.remember ? state.remember : false);
    commit('SET_TOKEN', getSavedState('auth.token', state.remember ? 'local' : 'session'));
  },

  /**
   * Sign the user in.
   */
  async signIn ({ commit, dispatch, getters }, { email, password, remember } = {}) {
    // Validate the token if the user is already signed in
    if (getters.loggedIn) return Promise.resolve(dispatch('validateToken'));
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
   */
  signOut ({ commit }) {
    commit('SET_TOKEN', null);
    commit('SET_USER', null);
  },

  /**
   * Validate the current access token. If it has expired, attempt to refresh it.
   */
  async validateToken ({ commit, state, dispatch }) {
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
          this.commit('app/SET_SNACKBAR', {
            show: true,
            text: 'Failed to authenticate.',
            class: 'error--text'
          });
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
   */
  async fetchUser ({ commit, state }, force = false) {
    if (!force && state.user) {
      return;
    }
    return axios.get(`${apiUrl}/v1/user`)
      .then(response => {
        commit('SET_USER', response.data.data);
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
        commit('SET_USER', null);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Failed to load your profile.',
          class: 'error--text'
        });
      });
  },

  /**
   * Update the user's profile.
   */
  async updateProfile ({ commit }, form) {
    return axios.patch(`${apiUrl}/v1/users/${form.id}`, {
      first_name: form.firstName,
      last_name: form.lastName
    })
      .then(response => {
        commit('SET_USER', response.data.data);
        return response.data.data;
      });
  },

  /**
   * Update the user's email address.
   */
  async updateEmail ({ commit }, form) {
    return axios.patch(`${apiUrl}/v1/users/${form.id}`, {
      email: form.email
    })
      .then(response => {
        commit('SET_USER', response.data.data);
        return response.data.data;
      });
  },

  /**
   * Update the user's password.
   */
  async updatePassword ({ commit }, form) {
    return axios.patch(`${apiUrl}/v1/users/${form.id}`, {
      current_password: form.currentPassword,
      password: form.password,
      password_confirmation: form.passwordConfirmation
    })
      .then(response => {
        commit('SET_USER', response.data.data);
        return response.data.data;
      });
  }
};
