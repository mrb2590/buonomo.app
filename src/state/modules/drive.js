import axios from 'axios';
// import { processInvalidForm } from '@/functions';

const apiUrl = process.env.VUE_APP_API_URL;

export const state = {
  folderTree: null
};

export const getters = {
  //
};

export const mutations = {
  SET_FOLDER_TREE (state, folderTree) {
    if (!state.folderTree) state.folderTree = {};
    state.folderTree = folderTree ? { ...Object.assign(state.folderTree, folderTree) } : null;
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
   * Fetch a folder tree or the API.
   */
  async fetchFolderTree ({ commit }, folderId) {
    return axios.get(`${apiUrl}/v1/drive/folders/${folderId}/tree`)
      .then(response => {
        commit('SET_FOLDER_TREE', response.data.data);
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
        commit('SET_FOLDER_TREE', null);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Failed to load the folder tree.',
          class: 'error--text'
        });
      });
  }
};
