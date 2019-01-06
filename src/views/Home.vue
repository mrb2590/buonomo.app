<template>
  <v-container class="home-view" fluid fill-height>
    <v-layout>
      <HelloWorld />
    </v-layout>
  </v-container>
</template>

<script>
import HelloWorld from '../components/HelloWorld';
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
  },

  components: {
    HelloWorld
  }
};
</script>
