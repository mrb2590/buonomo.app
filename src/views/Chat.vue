<template>
  <div class="cahe-view">
    <h1>This is a chat page</h1>
  </div>
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
