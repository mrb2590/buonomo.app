<template>
  <v-container class="profile-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Profile
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Profile',

  metaInfo: {
    title: `Profile | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Your profile.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
