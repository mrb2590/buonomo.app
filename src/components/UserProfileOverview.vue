<template>
  <v-card class="user-profile-overview text-xs-center">
    <v-card-title primary-title class="avatar-title">
      <img v-if="user" class="main-avatar" :src="user.avatar.url" alt="avatar">
    </v-card-title>
    <v-card-text>
      <div v-if="user">
        <h1 class="display-1 mb-2 primary--text">{{ `${user.first_name} ${user.last_name}` }}</h1>
        <p>@{{ user.username }}</p>
        <p>{{ user.email }}</p>
        <p>Used {{ user.formatted_used_drive_bytes }} of {{ user.formatted_allocated_drive_bytes }} drive storage</p>
        <p>Member Since {{ user.created_at | moment }}</p>
        <p v-if="user.email_verified_at">Email verified on {{ user.email_verified_at | moment }}</p>
        <p v-if="!user.email_verified_at">Email is not verified</p>
        <p v-if="user.roles && user.roles.length > 0">
          <span v-for="(role, index) in user.roles" :key="index">{{ role.display_name }} </span>
        </p>
        <p v-if="!user.roles || user.roles.length === 0">No Roles</p>
        <p v-if="admin">{{ user.id }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'UserProfileOverview',

  props: {
    admin: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  filters: {
    moment: function (timestamp) {
      return moment.unix(timestamp).format('MMMM Do, YYYY');
    }
  },

  computed: {
    ...mapState('users', ['user'])
  }
};
</script>

<style lang="scss" scoped>
.user-profile-overview {
  margin-top: 80px;
}

.avatar-title {
  justify-content: center;

  > img {
    margin-top: -116px;
  }
}
</style>
