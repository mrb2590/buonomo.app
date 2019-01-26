<template>
  <v-container class="home-view" fluid fill-height grid-list-xl>
    <v-layout justify-center align-center>
      <v-flex shrink>
        <v-icon color="primary">fas fa-bold fa-5x</v-icon>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Home',

  metaInfo: {
    title: `Home | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Homepage.'
      }
    ]
  }
};
</script>
