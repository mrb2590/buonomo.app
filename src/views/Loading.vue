<template>
  <v-container class="loading-view" fluid fill-height grid-list-xl>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Loading...
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Loading',

  metaInfo: {
    title: `Loading... | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Loading page.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
