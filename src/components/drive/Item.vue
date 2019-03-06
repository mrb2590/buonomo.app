<template>
  <div
    class="item"
    :class="{ clickable: itemType === 'folder' }"
    @click="openFolder"
  >
    <v-sheet
      class="item-sheet pa-3 grey"
      :class="[{ 'lighten-4': !darkMode }, { 'darken-2': darkMode }]"
    >
      <v-btn icon class="menu-btn">
        <v-icon>fas fa-ellipsis-v</v-icon>
      </v-btn>
      <v-icon size="42">{{ getIcon() }}</v-icon>
      <div class="name pt-3" :title="item.name">
        {{ item.name }}
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Folder',

  props: {
    itemType: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    icon: 'fa-file'
  }),

  computed: {
    ...mapState('preferences', ['darkMode'])
  },

  methods: {
    openFolder () {
      if (this.itemType === 'folder') {
        this.$router.push({ name: 'drive-folder', params: { id: this.item.id } });
      }
    },

    getIcon () {
      if (this.itemType === 'folder') {
        return 'fas fa-folder';
      }
      switch (this.item.extension.toLowerCase()) {
        case 'mp4':
        case 'avi':
        case 'mov':
          return 'fas fa-file-video';
        case 'jpg':
        case 'jpeg':
        case 'png':
          return 'fas fa-file-image';
        case 'doc':
        case 'docx':
          return 'fas fa-file-word';
        case 'ppt':
        case 'pptx':
          return 'fas fa-file-powerpoint';
        case 'xls':
        case 'xlsx':
          return 'fas fa-file-excel';
        case 'csv':
          return 'fas fa-file-csv';
        case 'pdf':
          return 'fas fa-file-pdf';
        case 'php':
        case 'js':
        case 'vue':
        case 'xml':
        case 'json':
        case 'css':
        case 'scss':
        case 'c':
        case 'cpp':
        case 'py':
        case 'java':
          return 'fas fa-file-code';
        case 'txt':
          return 'fas fa-file-alt';
      }
      return 'fas fa-file';
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  width: 100%;

  > .item-sheet {
    position: relative;
    height: 100%;
    text-align: center;

    > .menu-btn {
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
    }

    > .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
}
.item.clickable {
  cursor: pointer;
}
</style>
