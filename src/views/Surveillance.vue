<template>
  <v-container class="surveillance-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Surveillance
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Surveillance',

  metaInfo: {
    title: `Surveillance | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'View surveillance feeds.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
