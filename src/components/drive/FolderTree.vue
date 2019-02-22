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
    <v-card-text>
      <v-treeview
        v-if="folderTree"
        :items="[folderTree]"
        :search="search"
        :filter="filter"
        item-key="id"
        activatable
        active-class="primary--text"
        transition
        :open="[user.folder_id]"
      >
        <template
          slot="prepend"
          slot-scope="{ item, open }"
        >
          <v-icon>{{ open ? 'fas fa-folder-open' : 'fas fa-folder' }}</v-icon>
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
    ...mapActions('drive', ['fetchFolderTree'])
  },

  mounted () {
    this.fetchFolderTree(this.user.folder_id);
  }
};
</script>

<style lang="scss" scoped>
/deep/ .v-treeview-node--leaf {
  margin-left: 52px;
}

/deep/ .v-icon.v-icon.v-icon--link {
  width: 26px;
  text-align: center;
}
</style>
