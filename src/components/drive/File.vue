<template>
  <div class="file">
    {{ file.name }}
  </div>
</template>

<script>
export default {
  name: 'File',

  props: {
    file: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
