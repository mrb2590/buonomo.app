<template>
  <v-layout class="drive-user-explorer-view" wrap fill-height>
    <v-flex class="item-container" xs12>
      <v-card class="fill-height">
        <v-sheet class="pa-3 grey darken-4">
          Folders
        </v-sheet>
        <v-card-text>
          <div v-if="!loadingFolders">
            <File v-for="folder in folders.data" :key="folder.id" :file="folder"/>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex class="item-container" xs12>
      <v-card class="fill-height">
        <v-sheet class="pa-3 grey darken-4">
          Files
        </v-sheet>
        <v-card-text>
          <div v-if="!loadingFiles">
            <File v-for="file in files.data" :key="file.id" :file="file"/>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import appConfig from '@/app.config';
import { mapState, mapActions } from 'vuex';
import File from '@/components/drive/File';

export default {
  name: 'Explorer',

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
    File
  },

  data: () => ({
    loadingFiles: true,
    loadingFolders: true
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
.drive-user-explorer-view {
  height: calc(100% + 24px);
  min-height: 500px;
}
.item-container {
  height: 50%;
}
</style>
