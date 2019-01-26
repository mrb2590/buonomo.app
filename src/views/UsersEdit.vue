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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UsersEdit',

  components: {
    UserProfileOverview
  },

  computed: {
    ...mapState('users', ['user'])
  },

  methods: {
    ...mapActions('users', ['fetchUser'])
  },

  watch: {
    $route (to, from) {
      this.fetchUser(this.$route.params.username);
    }
  },

  mounted () {
    this.fetchUser(this.$route.params.username);
  }
};
</script>
