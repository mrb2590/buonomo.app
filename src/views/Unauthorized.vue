<template>
  <v-container class="unauthorized-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        You are unauthorized to view this page.
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Unauthorized',

  metaInfo: {
    title: `Unauthorized | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'You are unauthorized to view this page.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
