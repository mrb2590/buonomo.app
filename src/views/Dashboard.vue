<template>
  <v-container class="dashboard-view" fluid fill-height grid-list-xl>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Dashboard
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Dashboard',

  metaInfo: {
    title: `Dashboard | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Your dashboard.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
