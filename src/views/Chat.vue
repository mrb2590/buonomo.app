<template>
  <v-container class="chat-view" fluid fill-height grid-list-xl>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Chat
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Chat',

  metaInfo: {
    title: `Chat | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Chat with other users.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
