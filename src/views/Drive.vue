<template>
  <v-container class="drive-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Drive
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Drive',

  metaInfo: {
    title: `Drive | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Access you drive files and folders.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
