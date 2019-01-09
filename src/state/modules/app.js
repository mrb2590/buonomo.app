/**
 * The default sanckbar settings.
 */
const defaultSnackbar = {
  show: false,
  color: 'primary',
  closeColor: 'white',
  multiline: false,
  timeout: 0,
  vertical: false,
  text: '',
  customTimeout: 6000 // Have to use my own timeout to avoid Vuetify from mutating state
};

/**
 * State
 */
export const state = {
  dialogFullscreen: false,
  snackbar: { ...defaultSnackbar }
};

/**
 * Getters
 */
export const getters = {
  //
};

/**
 * Mutations
 */
export const mutations = {
  /**
   * Set whether dialogs should be fullscreen (on mobile we want that).
   *
   * @param  {object} state The current store's state.
   * @return {void}
   */
  SET_DIALOG_FULLSCREEN (state) {
    state.dialogFullscreen = window.innerWidth < 600;
  },

  /**
   * Set the snackbar.
   *
   * @param  {object} state    The current store's state.
   * @param  {object} snackbar The new snackbar.
   * @return {void}
   */
  SET_SNACKBAR (state, snackbar) {
    state.snackbar = Object.assign(state.snackbar, defaultSnackbar, snackbar);

    if (state.snackbar.customTimeout > 0) {
      setTimeout(() => {
        this.commit('app/RESET_SNACKBAR');
      }, state.snackbar.customTimeout);
    }
  },

  /**
   * Reset the snackbar to the default settings.
   *
   * @param  {object} state    The current store's state.
   * @return {void}
   */
  RESET_SNACKBAR (state) {
    state.snackbar = { ...defaultSnackbar };
  }
};

/**
 * Actions
 */
export const actions = {
  /**
   * Run when app is started.
   *
   * @param  {object} context The store context.
   * @return {void}
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
