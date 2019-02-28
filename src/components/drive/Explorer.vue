<template>
  <v-card class="explorer">
    <v-sheet class="pa-3 grey darken-4">
      {{ `${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}s` }}
    </v-sheet>
    <v-card-text>
      <v-layout wrap align-content-center v-if="fetchingItems">
        <v-flex text-xs-center>
          Loading...
        </v-flex>
      </v-layout>
      <v-layout wrap justify-start v-if="!fetchingItems">
        <v-flex
          xs6 sm6 md4 lg3 xl2
          v-for="item in (itemType === 'folder' ? folders.data : files.data)" :key="item.id" class="item-container"
        >
          <Item :itemType="itemType" :item="item"/>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="pa-3 grey darken-4">
      footer
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
    ...mapState('drive', ['files', 'folders'])
  },

  methods: {
    ...mapActions('drive', ['fetchFiles', 'fetchFolders']),

    fetchItems () {
      this.fetchingItems = true;
      if (this.itemType === 'folder') {
        this.fetchFolders(this.$route.params.id)
          .then(() => {
            this.fetchingItems = false;
          });
      } else {
        this.fetchFiles(this.$route.params.id)
          .then(() => {
            this.fetchingItems = false;
          });
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

    // .item-container {
    //   min-width: 150px;
    // }
  }
}
</style>
