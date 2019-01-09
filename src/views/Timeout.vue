<template>
  <v-container class="timeout-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Page timed out.
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Timeout',

  metaInfo: {
    title: `Timeout | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Timeout page.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
