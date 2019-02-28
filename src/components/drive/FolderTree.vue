<template>
  <v-card
    class="folder-tree"
  >
    <v-sheet class="pa-3 grey darken-4">
      <v-text-field
        v-model="search"
        label="Search folders"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="fas fa-times"
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        dark
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
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
          slot-scope="{ open }"
        >
          <v-icon>{{ open ? 'fas fa-folder-open' : 'fas fa-folder' }}</v-icon>
        </template>
        <template
          slot="label"
          slot-scope="{ item }"
        >
          <span
            @click.stop="$router.push({ name: 'drive-folder', params: { id: item.id } })"
            class="folder-link"
            :class="{ 'primary--text': $route.params.id === item.id }"
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
    search: null,
    caseSensitive: false
  }),

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('drive', ['folderTree']),

    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item.name.indexOf(search) > -1
        : undefined;
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
        this.fetchFolderTree(this.user.folder_id)
          .then(() => {
            this.setOpenFolders(this.folderTree);
          });
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
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
.folder-link {
  cursor: pointer;
}
</style>
