<template>
  <div class="drive-view">
    <h1>This is a drive page</h1>
  </div>
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
