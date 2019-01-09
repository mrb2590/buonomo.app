<template>
  <v-container class="games-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Games
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Games',

  metaInfo: {
    title: `Games | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Play Javascript games.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
