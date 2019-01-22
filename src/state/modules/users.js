import axios from 'axios';
const apiUrl = process.env.VUE_APP_API_URL;

export const state = {
  currentUser: null
};

export const getters = {
  //
};

export const mutations = {
  SET_CURRENT_USER (state, currentUser) {
    state.currentUser = currentUser;
  }
};

export const actions = {
  /**
   * Run when app is started.
   */
  init ({ commit }) {
    //
  },

  /**
   * Fetch a user object from cache or the API.
   */
  async fetchUserById ({ commit, state }, userId) {
    return axios.get(`${apiUrl}/v1/users/${userId}`, {
      params: {
        with_roles: 1,
        with_avatar: 1
      }
    })
      .then(response => {
        commit('SET_CURRENT_USER', response.data.data);
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
        commit('SET_CURRENT_USER', null);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Failed to load the user\'s profile.',
          class: 'error--text'
        });
      });
  }
};
