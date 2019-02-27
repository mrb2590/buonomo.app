<template>
  <v-container class="drive-shared-view" fluid fill-height>
    <v-layout>
      <v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '@/app.config';

export default {
  name: 'DriveShared',

  metaInfo: {
    title: `Shared Drives | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Access your shared files and folders.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>
</style>
