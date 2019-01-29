<template>
  <v-container class="password-view" fluid fill-height grid-list-xl>
    <router-view/>
  </v-container>
</template>

<script>
import appConfig from '@/app.config';

export default {
  name: 'Password',

  metaInfo: {
    title: `Password | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Password.'
      }
    ]
  }
};
</script>
