<template>
  <v-container class="drive-trash-view" fluid fill-height>
    <v-layout>
      <v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '@/app.config';

export default {
  name: 'DriveTrash',

  metaInfo: {
    title: `Drive Trash | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Access your trashed files and folders.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>
</style>
