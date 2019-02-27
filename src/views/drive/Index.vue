<template>
  <div class="drive-view fill-height">
    <router-view/>
  </div>
</template>

<script>
import appConfig from '@/app.config';

export default {
  name: 'Drive',

  metaInfo: {
    title: `Drive | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Drive.'
      }
    ]
  }
};
</script>
