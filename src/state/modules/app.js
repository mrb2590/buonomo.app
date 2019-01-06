export const state = {
  dialogFullscreen: false
};

export const getters = {
  //
};

export const mutations = {
  /**
   * Set whether dialogs should be fullscreen (on mobile we want that)
   */
  SET_DIALOG_FULLSCREEN (state) {
    state.dialogFullscreen = window.innerWidth < 600;
  }
};

export const actions = {
  /**
   * Run when app is started
   */
  init ({ state, dispatch, commit }) {
    // Set fullscreen for dialogs based on current window size
    commit('SET_DIALOG_FULLSCREEN');

    // Define an event listener to update dialog fullscreen when window is resized
    window.onresize = function () {
      commit('SET_DIALOG_FULLSCREEN');
    };
  }
};
