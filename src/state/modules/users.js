import axios from 'axios';
import { processInvalidForm } from '@/functions';

const apiUrl = process.env.VUE_APP_API_URL;

export const state = {
  user: null,
  avatarOptions: null,
  roles: null,
  userCreatedDates: {
    range: 'month',
    labels: [],
    values: []
  },
  usersList: {
    data: null,
    options: {
      descending: false,
      page: 1,
      rowsPerPage: 10,
      sortBy: 'last_name',
      search: null
    }
  }
};

export const getters = {
  //
};

export const mutations = {
  SET_USER (state, user) {
    if (!state.user) state.user = {};
    state.user = user ? { ...Object.assign(state.user, user) } : null;
  },

  SET_USER_ROLES (state, data) {
    state.user.roles = [];
    for (let i = 0; i < data.length; i++) {
      state.user.roles.push(data[i]);
    }
  },

  SET_ROLES (state, roles) {
    state.roles = roles;
  },

  SET_AVATAR_OPTIONS (state, avatarOptions) {
    state.avatarOptions = avatarOptions;
  },

  SET_USER_CREATED_DATES_RANGE (state, range) {
    state.userCreatedDates.range = range;
  },

  SET_USER_CREATED_DATES (state, data) {
    state.userCreatedDates.labels = [];
    state.userCreatedDates.values = [];
    for (let i = 0; i < data.length; i++) {
      state.userCreatedDates.labels.push(data[i].created_at);
      state.userCreatedDates.values.push(data[i].total);
    }
  },

  SET_USERS_LIST_DATA (state, usersList) {
    state.usersList.data = usersList;
  },

  SET_USERS_LIST_OPTIONS (state, options) {
    state.usersList.options = { ...options };
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
   * Fetch a user.
   */
  async fetchUser ({ commit }, userId) {
    return axios.get(`${apiUrl}/v1/users/${userId}`, {
      params: {
        with_roles: 1,
        with_avatar: 1
      }
    })
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
   * Fetch users paginated.
   */
  async fetchUsersPaginated ({ commit, state }) {
    const params = {
      page: state.usersList.options.page,
      limit: state.usersList.options.rowsPerPage
    };
    if (state.usersList.options.descending !== null) {
      params.sort = state.usersList.options.descending ? 'desc' : 'asc';
      params.sortby = state.usersList.options.sortBy;
    }
    if (state.usersList.options.search) {
      params.search = state.usersList.options.search;
    }
    return axios.get(`${apiUrl}/v1/users`, { params: params })
      .then(response => {
        commit('SET_USERS_LIST_DATA', response.data);
        return response;
      })
      .catch(error => {
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: processInvalidForm(error),
          class: 'error--text'
        });
      });
  },

  /**
   * Fetch user created dates.
   */
  async fetchUsersCreatedDates ({ commit, state }) {
    return axios.get(`${apiUrl}/v1/users/aggregate/created`, {
      params: {
        range: state.userCreatedDates.range
      }
    })
      .then(response => {
        commit('SET_USER_CREATED_DATES', response.data.data);
        return response;
      })
      .catch(error => {
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: processInvalidForm(error),
          class: 'error--text'
        });
      });
  },

  /**
   * Fetch the roles.
   */
  async fetchRoles ({ commit }) {
    return axios.get(`${apiUrl}/v1/roles`)
      .then(response => {
        commit('SET_ROLES', response.data.data);
        return response.data.data;
      })
      .catch(error => {
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Failed to fetch roles.',
          class: 'error--text'
        });
      });
  },

  /**
   * Fetch the avatar options.
   */
  async fetchAvatarOptions ({ commit }) {
    return axios.get(`${apiUrl}/v1/avatars/options`)
      .then(response => {
        commit('SET_AVATAR_OPTIONS', response.data);
        return response.data;
      })
      .catch(error => {
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: processInvalidForm(error, 'Failed to avatar options.'),
          class: 'error--text'
        });
      });
  },

  /**
   * Update the user's profile.
   */
  async updateProfile ({ commit }, form) {
    this.commit('app/SET_SHOW_PROGRESS', true);
    let data = {
      first_name: form.firstName,
      last_name: form.lastName,
      username: form.username
    };
    if (form.isUserManager) {
      data.verified = form.verified;
      data.allocated_drive_bytes = form.allocatedDriveBytes;
      data.roles = form.roles;
    }
    return axios.patch(`${apiUrl}/v1/users/${form.id}/profile`, data)
      .then(response => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        commit('SET_USER', response.data.data);
        if (form.id === this.state.auth.user.id) {
          this.commit('auth/SET_USER', response.data.data);
        }
        if (response.data.data.roles) {
          commit('SET_USER_ROLES', response.data.data.roles);
        }
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Profile has been updated.',
          class: 'success--text'
        });
      })
      .catch(error => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: processInvalidForm(error, 'Failed to update profile.'),
          class: 'error--text'
        });
      });
  },

  /**
   * Update the user's email address.
   */
  async updateEmail ({ commit }, form) {
    this.commit('app/SET_SHOW_PROGRESS', true);
    return axios.patch(`${apiUrl}/v1/users/${form.id}/email`, {
      email: form.email
    })
      .then(response => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        commit('SET_USER', response.data.data);
        if (form.id === this.state.auth.user.id) {
          this.commit('auth/SET_USER', response.data.data);
        }
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Email address has been updated.',
          class: 'success--text'
        });
      })
      .catch(error => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: processInvalidForm(error, 'Failed to update email address.'),
          class: 'error--text'
        });
      });
  },

  /**
   * Update the user's password.
   */
  async updatePassword ({ commit }, form) {
    this.commit('app/SET_SHOW_PROGRESS', true);
    return axios.patch(`${apiUrl}/v1/users/${form.id}/password`, {
      current_password: form.currentPassword,
      password: form.password,
      password_confirmation: form.passwordConfirmation
    })
      .then(response => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        commit('SET_USER', response.data.data);
        if (form.id === this.state.auth.user.id) {
          this.commit('auth/SET_USER', response.data.data);
        }
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Password has been updated.',
          class: 'success--text'
        });
      })
      .catch(error => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: processInvalidForm(error, 'Failed to update password.'),
          class: 'error--text'
        });
      });
  },

  /**
   * Update the user's avatar.
   */
  async updateAvatar ({ commit }, form) {
    this.commit('app/SET_SHOW_PROGRESS', true);
    return axios.patch(`${apiUrl}/v1/users/${form.id}/avatar`, {
      avatar_style: form.avatarStyle,
      accessories_type: form.accessoriesType,
      clothe_type: form.clotheType,
      clothe_color: form.clotheColor,
      graphic_type: form.graphicType,
      eyebrow_type: form.eyebrowType,
      eye_type: form.eyeType,
      facial_hair_type: form.facialHairType,
      facial_hair_color: form.facialHairColor,
      hair_color: form.hairColor,
      mouth_type: form.mouthType,
      skin_color: form.skinColor,
      top_type: form.topType
    })
      .then(response => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        commit('SET_USER', { avatar: response.data.data });
        if (form.id === this.state.auth.user.id) {
          this.commit('auth/SET_USER', { avatar: response.data.data });
        }
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'Avatar has been updated.',
          class: 'success--text'
        });
      })
      .catch(error => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: processInvalidForm(error, 'Failed to update avatar.'),
          class: 'error--text'
        });
      });
  },

  /**
   * Create a new user.
   */
  async createUser ({ commit }, form) {
    this.commit('app/SET_SHOW_PROGRESS', true);
    return axios.post(`${apiUrl}/v1/users`, {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      username: form.username,
      verified: form.verified,
      allocated_drive_bytes: form.allocatedDriveBytes,
      password: form.password,
      password_confirmation: form.passwordConfirmation,
      roles: form.roles
    })
      .then(response => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: 'User has been created.',
          class: 'success--text'
        });
      })
      .catch(error => {
        this.commit('app/SET_SHOW_PROGRESS', false);
        console.log(error);
        this.commit('app/SET_SNACKBAR', {
          show: true,
          text: processInvalidForm(error, 'Failed to create new user.'),
          class: 'error--text'
        });
      });
  }
};
