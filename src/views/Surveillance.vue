<template>
  <div class="surveillance-view">
    <h1>This is a surveillance page</h1>
  </div>
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
