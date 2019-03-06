<template>
  <div class="drive-user-view fill-height">
    <v-container fluid fill-height grid-list-xl>
      <v-layout wrap>
        <v-flex
          xs12 sm6 md4 lg4 xl3 d-flex grow
          :class="{ hide: activeBottomNav !== 'tree' }"
        >
          <FolderTree/>
        </v-flex>
        <v-flex
          xs12 sm6 md8 lg8 xl9 d-flex grow
          :class="{ hide: activeBottomNav !== 'folders' && activeBottomNav !== 'files' }"
        >
          <v-layout column wrap>
            <v-flex
              d-flex grow
              class="explorer-row"
              :class="{ hide: activeBottomNav !== 'folders' }"
            >
              <Explorer itemType='folder'/>
            </v-flex>
            <v-flex
              d-flex grow
              class="explorer-row"
              :class="{ hide: activeBottomNav !== 'files' }"
            >
              <Explorer itemType='file'/>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-bottom-nav
      :active.sync="activeBottomNav"
      mandatory
      fixed
    >
      <v-btn flat color="primary" value="tree">
        <span>Folder List</span>
        <v-icon>fas fa-list</v-icon>
      </v-btn>

      <v-btn flat color="primary" value="folders">
        <span>Folders</span>
        <v-icon>fas fa-folder</v-icon>
      </v-btn>

      <v-btn flat color="primary" value="files">
        <span>Files</span>
        <v-icon>fas fa-file</v-icon>
      </v-btn>
    </v-bottom-nav>
  </div>
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
  },

  data: () => ({
    activeBottomNav: 'tree'
  })
};
</script>

<style lang="scss" scoped>
.drive-user-view {
  position: relative;
  .folder-tree {
    max-height: stretch;
  }
  .explorer-row {
    flex-basis: 50%;
    min-height: 270px;
    max-height: 50vh;
  }
  .v-bottom-nav {
    bottom: 56px;
    display: none;
  }
}
@media (max-width: 599px) {
  .drive-user-view {
    > .container {
      height: calc(100% - 52px);
      padding: 0;
    }
    .folder-tree,
    .explorer-row {
      min-height: initial;
      max-height: 100%;
      height: 100%;
      height: stretch;
    }
    .v-bottom-nav {
      display: flex;
    }
    .hide {
      display: none !important;
    }
  }
}
</style>
