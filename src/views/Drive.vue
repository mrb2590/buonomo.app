<template>
  <v-container class="drive-view" fluid fill-height>
    <v-layout>
      <v-flex>
        <FolderTree/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '@/app.config';
import FolderTree from '@/components/drive/FolderTree';

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
  },

  components: {
    FolderTree
  }
};
</script>

<style lang="scss" scoped>
.folder-tree {
  height: 100%;
  width: 100%;
}

@media (min-width: 600px) {
  .folder-tree {
    max-width: 400px;
  }
}
</style>
