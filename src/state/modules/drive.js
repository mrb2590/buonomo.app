import axios from 'axios';
// import { processInvalidForm } from '@/functions';

const apiUrl = process.env.VUE_APP_API_URL;

export const state = {
  folderTree: null,
  folders: null,
  files: null
};

export const getters = {
  //
};

export const mutations = {
  SET_FOLDER_TREE (state, folderTree) {
    if (!state.folderTree) state.folderTree = {};
    state.folderTree = folderTree ? { ...Object.assign(state.folderTree, folderTree) } : null;
  },

  SET_FOLDERS (state, folders) {
    if (!state.folders) state.folders = {};
    state.folders = folders ? { ...Object.assign(state.folders, folders) } : null;
  },

  SET_FILES (state, files) {
    if (!state.files) state.files = {};
    state.files = files ? { ...Object.assign(state.files, files) } : null;
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
   * Fetch a folder tree.
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
  },

  /**
   * Fetch a folder's folders.
   */
  async fetchFolders ({ commit }, folderId) {
    return axios.get(`${apiUrl}/v1/drive/folders/${folderId}/folders`, {
      params: {
        page: 1,
        limit: -1
      }
    })
      .then(response => {
        commit('SET_FOLDERS', response.data);
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
        commit('SET_FOLDERS', null);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Failed to load folders.',
          class: 'error--text'
        });
      });
  },

  /**
   * Fetch a folder's files.
   */
  async fetchFiles ({ commit }, folderId) {
    return axios.get(`${apiUrl}/v1/drive/folders/${folderId}/files`, {
      params: {
        page: 1,
        limit: -1
      }
    })
      .then(response => {
        commit('SET_FILES', response.data);
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
        commit('SET_FILES', null);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Failed to load files.',
          class: 'error--text'
        });
      });
  }
};
