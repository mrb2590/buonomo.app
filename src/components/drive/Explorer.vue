<template>
  <v-card class="explorer">
    <v-card-actions
      class="pa-3 grey"
      :class="[{ 'lighten-3': !darkMode }, { 'darken-4': darkMode }]"
    >
      {{ `${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}s` }}
      <v-spacer></v-spacer>
      <v-chip small v-if="!fetchingItems" >
        {{ itemType === 'folder' ? folders.meta.total : files.meta.total }}
      </v-chip>
    </v-card-actions>
    <v-card-text>
      <v-layout
        wrap
        align-content-center
        v-if="fetchingItems"
      >
        <v-flex text-xs-center>
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout
        wrap
        align-content-center
        v-if="!fetchingItems && isEmptyItemSet"
      >
        <v-flex text-xs-center>
          No {{ itemType }}s
        </v-flex>
      </v-layout>
      <v-layout
        wrap
        justify-start
        align-content-start
        v-if="!fetchingItems && !isEmptyItemSet"
      >
        <v-flex
          xs6 sm6 md4 lg3 xl2
          v-for="item in (itemType === 'folder' ? folders.data : files.data)" :key="item.id" class="item-container"
        >
          <Item :itemType="itemType" :item="item"/>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions
      class="pa-2 grey"
      :class="[{ 'lighten-3': !darkMode }, { 'darken-4': darkMode }]"
    >
      <v-spacer></v-spacer>
      <v-btn
        flat icon small
        @click="previousPage"
      >
        <v-icon>fas fa-chevron-left</v-icon>
      </v-btn>
      <v-btn
        flat icon small
        @click="nextPage"
      >
        <v-icon>fas fa-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Item from '@/components/drive/Item';

export default {
  name: 'Explorer',

  props: {
    itemType: {
      type: String,
      required: true
    }
  },

  components: {
    Item
  },

  data: () => ({
    fetchingItems: true
  }),

  computed: {
    ...mapState('preferences', ['darkMode']),
    ...mapState('drive', ['files', 'folders']),

    isEmptyItemSet () {
      if (this.itemType === 'folder') {
        if (this.folders.meta.total === 0) {
          return true;
        }
      } else {
        if (this.files.meta.total === 0) {
          return true;
        }
      }
      return false;
    }
  },

  methods: {
    ...mapActions('drive', ['fetchFiles', 'fetchFolders']),

    fetchItems (page = 1, limit = 25) {
      this.fetchingItems = true;
      if (this.itemType === 'folder') {
        this.fetchFolders({ folderId: this.$route.params.id, page, limit })
          .then(() => {
            this.fetchingItems = false;
          });
      } else {
        this.fetchFiles({ folderId: this.$route.params.id, page, limit })
          .then(() => {
            this.fetchingItems = false;
          });
      }
    },

    nextPage () {
      if (this.itemType === 'folder') {
        if (this.folders.meta.current_page >= this.folders.meta.last_page) {
          return;
        }
        this.fetchItems(this.folders.meta.current_page + 1, 25);
      } else {
        if (this.files.meta.current_page >= this.files.meta.last_page) {
          return;
        }
        this.fetchItems(this.files.meta.current_page + 1, 25);
      }
    },

    previousPage () {
      if (this.itemType === 'folder') {
        if (this.folders.meta.current_page <= 1) {
          return;
        }
        this.fetchItems(this.folders.meta.current_page + 1, 25);
      } else {
        if (this.files.meta.current_page <= 1) {
          return;
        }
        this.fetchItems(this.files.meta.current_page - 1, 25);
      }
    }
  },

  watch: {
    $route: {
      handler ($route) {
        this.fetchItems();
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.explorer {
  display: flex;
  flex-direction: column;

  > .v-card__text {
    height: 100%;
    overflow: auto;
  }
}
</style>
