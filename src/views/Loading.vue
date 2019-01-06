<template>
  <v-container class="loading-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Loading...
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Loading',

  metaInfo: {
    title: 'Loading',
    meta: [
      {
        name: 'description',
        content: 'Loading page.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
