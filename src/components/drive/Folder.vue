<template>
  <v-card class="folder" @click="$router.push({ name: 'drive-folder', params: { id: folder.id } })">
    <v-sheet class="item-container pa-3 grey darken-2">
      <v-btn icon class="menu-btn">
        <v-icon>fas fa-ellipsis-v</v-icon>
      </v-btn>
      <v-icon size="42">fas fa-folder</v-icon>
      <div class="name pt-3" :title="folder.name">
        {{ folder.name }}
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: 'Folder',

  props: {
    folder: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.folder {
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: pointer;

  > .item-container {
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
</style>
