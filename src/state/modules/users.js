export const state = {
  users: []
};

export const getters = {
  //
};

export const mutations = {
  SET_USERS (state, users) {
    state.users = [...users];
  },

  APPEND_USERS (state, users) {
    state.users.push(users);
  }
};

export const actions = {
  /**
   * Run when app is started.
   */
  init ({ commit }) {
    //
  }
};
