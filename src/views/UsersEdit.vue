<template>
  <v-container class="users-edit-view" grid-list-xl fill-height>
    <v-layout wrap>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <UserProfileOverview :user="currentUser" :with-id="true"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UserProfileOverview from '@/components/UserProfileOverview';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'UsersEdit',

  components: {
    UserProfileOverview
  },

  methods: {
    ...mapActions('users', ['fetchUserById'])
  },

  computed: {
    ...mapState('users', ['currentUser'])
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
