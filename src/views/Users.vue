<template>
  <div class="users-view">
    <router-view/>
  </div>
</template>

<script>
import appConfig from '@/app.config';

export default {
  name: 'Users',

  metaInfo: {
    title: `Users | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Users.'
      }
    ]
  }
};
</script>
