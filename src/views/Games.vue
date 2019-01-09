<template>
  <div class="games-view">
    <h1>This is a games page</h1>
  </div>
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
