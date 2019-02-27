<template>
  <v-container class="drive-user-view" fluid fill-height grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 lg4 xl3 d-flex grow>
        <FolderTree/>
      </v-flex>
      <v-flex xs12 sm6 md8 lg8 xl9 d-flex grow>
        <v-layout column wrap>
          <v-flex d-flex grow class="explorer-row">
            <v-card class="explorer">
              <v-sheet class="pa-3 grey darken-4">
                Folders
              </v-sheet>
              <v-card-text>
                <div v-if="loadingFolders">
                  Loading...
                </div>
                <div v-if="!loadingFolders">
                  <File v-for="folder in folders.data" :key="folder.id" :file="folder"/>
                </div>
              </v-card-text>
              <v-card-actions class="pa-3 grey darken-4">
                footer
              </v-card-actions>
            </v-card>
          </v-flex>
          <v-flex d-flex grow class="explorer-row">
            <v-card class="explorer">
              <v-sheet class="pa-3 grey darken-4">
                Files
              </v-sheet>
              <v-card-text>
                <div v-if="loadingFiles">
                  Loading...
                </div>
                <div v-if="!loadingFiles">
                  <File v-for="file in files.data" :key="file.id" :file="file"/>
                </div>
              </v-card-text>
              <v-card-actions class="pa-3 grey darken-4">
                <v-spacer></v-spacer>
                <v-pagination
                  v-model="filesPage"
                  :length="15"
                  :total-visible="5"
                ></v-pagination>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '@/app.config';
import { mapState, mapActions } from 'vuex';
import FolderTree from '@/components/drive/FolderTree';
import File from '@/components/drive/File';

export default {
  name: 'DriveFolder',

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
    File
  },

  data: () => ({
    loadingFiles: true,
    loadingFolders: true,
    filesPage: 1,
    foldersPage: 1
  }),

  computed: {
    ...mapState('drive', ['files', 'folders'])
  },

  methods: {
    ...mapActions('drive', ['fetchFiles', 'fetchFolders']),

    fetchFilesFolders () {
      this.loadingFiles = true;
      this.loadingFolders = true;
      this.fetchFiles(this.$route.params.id)
        .then(() => {
          this.loadingFiles = false;
        });
      this.fetchFolders(this.$route.params.id)
        .then(() => {
          this.loadingFolders = false;
        });
    }
  },

  watch: {
    $route: {
      handler ($route) {
        this.fetchFilesFolders();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.explorer-row {
  flex-basis: 50%;
  max-height: 50vh;
  min-height: 200px;

  .explorer {
    display: flex;
    flex-direction: column;

    > .v-card__text {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
