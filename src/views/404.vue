<template>
  <v-container class="404-view" fluid fill-height grid-list-xl>
    <v-layout justify-center align-center>
      <v-flex shrink>
        404 Page not found.
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'NotFound',

  metaInfo: {
    title: `Page Not Found | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'The page was not found.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
