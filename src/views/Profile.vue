<template>
  <div class="profile-view">
    <h1>This is a profile page</h1>
  </div>
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
