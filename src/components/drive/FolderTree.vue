<template>
  <v-card
    class="folder-tree"
  >
    <v-sheet
      class="pa-3 grey"
      :class="[{ 'lighten-3': !darkMode }, { 'darken-4': darkMode }]"
    >
      <v-text-field
        v-model="search"
        label="Search folders"
        flat
        hide-details
        clearable
        clear-icon="fas fa-times"
      ></v-text-field>
    </v-sheet>
    <v-card-text class="tree-body">
      <v-treeview
        v-if="folderTree"
        :items="[folderTree]"
        :search="search"
        :filter="filter"
        item-key="id"
        active-class="primary--text"
        transition
        :open="open"
      >
        <template
          slot="prepend"
          slot-scope="{ open, item }"
        >
          <v-icon :color="$route.params.id === item.id ? 'primary' : ''">
            {{ open || $route.params.id === item.id ? 'fas fa-folder-open' : 'fas fa-folder' }}
          </v-icon>
        </template>
        <template
          slot="label"
          slot-scope="{ item }"
        >
          <span
            @click.stop="$router.push({ name: 'drive-folder', params: { id: item.id } })"
            class="folder-link"
            :class="{ 'primary--text': $route.params.id === item.id }"
            :title="item.name"
          >
            {{ item.name }}
          </span>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'FolderTree',

  data: () => ({
    open: [],
    search: null
  }),

  computed: {
    ...mapState('preferences', ['darkMode']),
    ...mapState('auth', ['user']),
    ...mapState('drive', ['folderTree']),

    filter () {
      return (item, search, textKey) => item.name.indexOf(search) > -1;
    }
  },

  methods: {
    ...mapActions('drive', ['fetchFolderTree']),

    setOpenFolders (folder) {
      this.open.push(folder.id);
      for (var i = 0; i < folder.children.length; i++) {
        this.setOpenFolders(folder.children[i]);
      }
      if (this.open[this.open.length - 1] !== this.$route.params.id) {
        this.open.pop();
      }
    }
  },

  watch: {
    $route: {
      handler ($route) {
        if (!this.folderTree) {
          this.fetchFolderTree(this.user.folder_id)
            .then(() => {
              this.setOpenFolders(this.folderTree);
            });
        } else {
          this.setOpenFolders(this.folderTree);
        }
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.folder-tree {
  overflow-y: auto;
  overflow-x: hidden;
}
.folder-link {
  cursor: pointer;
}
/deep/ {
  .v-treeview-node {
    margin-left: 14px;
  }
  .v-treeview-node--leaf {
    margin-left: 40px;
  }
  .v-icon.v-icon.v-icon--link {
    width: 26px;
    text-align: center;
  }
}
@media (max-width: 599px) {
  .folder-tree,
  .v-sheet {
    background-color: transparent !important;
  }
}
</style>
