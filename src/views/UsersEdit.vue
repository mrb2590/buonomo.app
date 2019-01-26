<template>
  <v-container class="users-edit-view" fluid fill-height grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <UserProfileOverview v-if="user" :user="user" :admin="true"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserProfileOverview from '@/components/UserProfileOverview';
import axios from 'axios';

export default {
  name: 'UsersEdit',

  components: {
    UserProfileOverview
  },

  data: () => ({
    user: null
  }),

  methods: {
    fetchUserById (userId) {
      return axios.get(`${process.env.VUE_APP_API_URL}/v1/users/${userId}`, {
        params: {
          with_roles: 1,
          with_avatar: 1
        }
      })
        .then(response => {
          this.user = response.data.data;
        })
        .catch(error => {
          console.log(error);
          this.user = null;
          this.commit('app/SET_SNACKBAR', {
            show: true,
            text: 'Failed to load the user\'s profile.',
            class: 'error--text'
          });
        });
    }
  },

  watch: {
    $route (to, from) {
      this.fetchUserById(this.$route.params.id);
    }
  },

  mounted () {
    this.fetchUserById(this.$route.params.id);
  }
};
</script>
