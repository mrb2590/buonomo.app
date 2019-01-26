import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

export const state = {
  user: null
};

export const getters = {
  //
};

export const mutations = {
  SET_USER (state, user) {
    state.user = user ? { ...user } : null;
  },

  SET_USER_PROFILE (state, data) {
    state.user.first_name = data.first_name;
    state.user.last_name = data.last_name;
    state.user.username = data.username;
    state.user.updated_at = data.updated_at;
  },

  SET_USER_EMAIL (state, data) {
    state.user.email = data.email;
    state.user.updated_at = data.updated_at;
  },

  SET_USER_AVATAR (state, data) {
    state.user.avatar.avatar_style = data.avatar_style;
    state.user.avatar.accessories_type = data.accessories_type;
    state.user.avatar.clothe_type = data.clothe_type;
    state.user.avatar.clothe_color = data.clothe_color;
    state.user.avatar.graphic_type = data.graphic_type;
    state.user.avatar.eyebrow_type = data.eyebrow_type;
    state.user.avatar.eye_type = data.eye_type;
    state.user.avatar.facial_hair_type = data.facial_hair_type;
    state.user.avatar.facial_hair_color = data.facial_hair_color;
    state.user.avatar.hair_color = data.hair_color;
    state.user.avatar.mouth_type = data.mouth_type;
    state.user.avatar.skin_color = data.skin_color;
    state.user.avatar.top_type = data.top_type;
    state.user.avatar.created_at = data.created_at;
    state.user.avatar.updated_at = data.updated_at;
    state.user.avatar.url = data.url;
    state.user.avatar.updated_at = data.updated_at;
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
   * Fetch the user object from cache or the API.
   */
  async fetchUser ({ commit, state }, userId) {
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
   * Update the user's profile.
   */
  async updateProfile ({ commit }, form) {
    return axios.patch(`${apiUrl}/v1/users/${form.id}/profile`, {
      first_name: form.firstName,
      last_name: form.lastName,
      username: form.username
    })
      .then(response => {
        commit('SET_USER_PROFILE', response.data.data);
        return response.data.data;
      });
  },

  /**
   * Update the user's email address.
   */
  async updateEmail ({ commit }, form) {
    return axios.patch(`${apiUrl}/v1/users/${form.id}/email`, {
      email: form.email
    })
      .then(response => {
        commit('SET_USER_EMAIL', response.data.data);
        return response.data.data;
      });
  },

  /**
   * Update the user's password.
   */
  async updatePassword ({ commit }, form) {
    let data = {
      current_password: form.currentPassword,
      password: form.password,
      password_confirmation: form.passwordConfirmation
    };
    if (typeof form.currentPassword !== 'undefined') {
      data.current_password = form.currentPassword;
    }
    return axios.patch(`${apiUrl}/v1/users/${form.id}/password`, data)
      .then(response => response.data.data);
  },

  /**
   * Update the user's avatar.
   */
  async updateAvatar ({ commit, state }, form) {
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
        commit('SET_USER_AVATAR', response.data.data);
        return response.data.data;
      });
  }
};
