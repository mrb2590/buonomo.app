<template>
  <v-container class="drive-user-view" fluid fill-height grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 lg4 xl3 d-flex grow>
        <FolderTree/>
      </v-flex>
      <v-flex xs12 sm6 md8 lg8 xl9 d-flex grow>
        <v-layout column wrap>
          <v-flex d-flex grow class="explorer-row">
            <Explorer itemType='folder'/>
          </v-flex>
          <v-flex d-flex grow class="explorer-row">
            <Explorer itemType='file'/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '@/app.config';
import FolderTree from '@/components/drive/FolderTree';
import Explorer from '@/components/drive/Explorer';

export default {
  name: 'DriveExplorer',

  metaInfo: {
    title: `My Drive | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Access your drive files and folders.'
      }
    ]
  },

  components: {
    FolderTree,
    Explorer
  }
};
</script>

<style lang="scss" scoped>
.folder-tree {
  min-height: 696px;
  max-height: calc(100vh - 144px);
  overflow: auto;
}
.explorer-row {
  flex-basis: 50%;
  min-height: 270px;
  max-height: 50vh;
}
</style>
