import { getSavedState, saveState } from '@/functions';

/**
 * State
 */
export const state = {
  darkMode: getSavedState('preferences.darkMode', 'local')
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
   * Set the snackbar.
   *
   * @param  {object}  state    The current store's state.
   * @param  {boolean} darkMode The new snackbar.
   * @return {void}
   */
  SET_DARK_MODE (state, darkMode) {
    state.darkMode = darkMode;
    saveState('preferences.darkMode', darkMode, 'local');
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
  init ({ state, dispatch, commit }) {
    commit('SET_DARK_MODE', state.darkMode ? state.darkMode : false);
  }
};
