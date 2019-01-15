/**
 * The default sanckbar settings.
 */
const defaultSnackbar = {
  show: false,
  color: 'dark',
  closeColor: 'white',
  multiline: false,
  timeout: 0,
  vertical: false,
  text: '',
  class: '',
  customTimeout: 6000 // Have to use my own timeout to avoid Vuetify from mutating state
};

export const state = {
  dialogFullscreen: false,
  snackbar: { ...defaultSnackbar },
  showProgress: false
};

export const getters = {
  //
};

export const mutations = {
  SET_DIALOG_FULLSCREEN (state) {
    state.dialogFullscreen = window.innerWidth < 600;
  },

  SET_SNACKBAR (state, snackbar) {
    state.snackbar = Object.assign(state.snackbar, defaultSnackbar, snackbar);

    if (state.snackbar.customTimeout > 0) {
      setTimeout(() => {
        this.commit('app/RESET_SNACKBAR');
      }, state.snackbar.customTimeout);
    }
  },

  RESET_SNACKBAR (state) {
    state.snackbar = { ...defaultSnackbar };
  },

  SET_SHOW_PROGRESS (state, show) {
    state.showProgress = show;
  }
};

export const actions = {
  /**
   * Run when app is started.
   */
  init ({ commit }) {
    // Set fullscreen for dialogs based on current window size
    commit('SET_DIALOG_FULLSCREEN');
    // Define an event listener to update dialog fullscreen when window is resized
    window.onresize = function () {
      commit('SET_DIALOG_FULLSCREEN');
    };
  }
};
