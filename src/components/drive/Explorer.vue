<template>
  <v-card class="explorer">
    <v-card-actions
      class="pa-3 grey"
      :class="[{ 'lighten-3': !darkMode }, { 'darken-4': darkMode }]"
    >
      {{ `${itemType.charAt(0).toUpperCase()}${itemType.slice(1)}s` }}
      <v-spacer></v-spacer>
      <v-btn
        flat icon small
      >
        <v-icon>fas fa-plus</v-icon>
      </v-btn>
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
        v-if="!fetchingItems && total === 0"
      >
        <v-flex text-xs-center>
          No {{ itemType }}s
        </v-flex>
      </v-layout>
      <v-layout
        wrap
        justify-start
        align-content-start
        v-if="!fetchingItems && total > 0"
      >
        <v-flex
          xs6 sm6 md4 lg3 xl2
          v-for="item in items" :key="item.id" class="item-container"
        >
          <Item :itemType="itemType" :item="item"/>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions
      class="pa-2 grey"
      :class="[{ 'lighten-3': !darkMode }, { 'darken-4': darkMode }]"
    >
      <span>{{ pagingInfo }}</span>
      <v-spacer></v-spacer>
      <v-select
        class="limit-select"
        :items="limits"
        label="Limit"
        v-model="limit"
        dense
        height="12"
      ></v-select>
      <v-btn
        flat icon small
        @click="fetchItems(--page, limit)"
        :disabled="page === 1"
      >
        <v-icon>fas fa-chevron-left</v-icon>
      </v-btn>
      <v-btn
        flat icon small
        @click="fetchItems(++page, limit)"
        :disabled="page === lastPage"
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
    fetchingItems: true,
    items: null,
    limit: 25,
    page: 1,
    lastPage: 1,
    total: 0,
    limits: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '25', value: 25 },
      { text: '50', value: 50 },
      { text: '100', value: 100 },
      { text: 'All', value: -1 }
    ]
  }),

  computed: {
    ...mapState('preferences', ['darkMode']),
    ...mapState('drive', ['files', 'folders']),

    pagingInfo () {
      let page = this.page === '-1' ? 1 : this.page;
      let start = (page - 1) * this.limit;
      let end = this.lastPage === page ? this.total : page * this.limit;
      let type = `${this.itemType.charAt(0).toUpperCase()}${this.itemType.slice(1)}s`;
      return `${start} - ${end} of ${this.total} ${type}`;
    }
  },

  methods: {
    ...mapActions('drive', ['fetchFiles', 'fetchFolders']),

    fetchItems (page = 1, limit = 25) {
      if (page < 1) {
        this.page = 1;
        return;
      } else if (page > this.lastPage) {
        this.page = this.lastPage;
        return;
      }
      this.fetchingItems = true;
      if (this.itemType === 'folder') {
        this.fetchFolders({ folderId: this.$route.params.id, page, limit })
          .then(response => {
            this.items = response.data;
            this.lastPage = response.meta.last_page;
            this.total = response.meta.total;
            this.fetchingItems = false;
            this.page = page;
          });
      } else {
        this.fetchFiles({ folderId: this.$route.params.id, page, limit })
          .then(response => {
            this.items = response.data;
            this.lastPage = response.meta.last_page;
            this.total = response.meta.total;
            this.fetchingItems = false;
          });
      }
    }
  },

  watch: {
    $route: {
      handler ($route) {
        this.fetchItems(1, this.limit);
      },
      immediate: true
    },
    limit: {
      handler () {
        this.page = 1;
        this.fetchItems(this.page, this.limit);
      }
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
  .limit-select {
    max-width: 60px;
    margin-right: 20px;
    padding: 0;
    height: 16px;
    /deep/ .v-label {
      display: none;
    }
  }
}
@media (max-width: 599px) {
  .explorer,
  .v-card__actions {
    background-color: transparent !important;
  }
}
</style>
