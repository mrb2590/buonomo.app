<template>
  <v-container class="tiimeout-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex shrink>
        Page timed out.
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Timeout',

  metaInfo: {
    title: 'Timeout',
    meta: [
      {
        name: 'description',
        content: 'Timeout page.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>

</style>
