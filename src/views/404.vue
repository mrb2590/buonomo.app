<template>
  <v-container class="404-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        404 Page not found.
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: '404',

  metaInfo: {
    title: '404',
    meta: [
      {
        name: 'description',
        content: 'The page was not found.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
