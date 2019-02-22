<template>
  <v-container class="surveillance-view" fluid fill-height grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-title primary-title>
            <h2 class="headline primary--text">MikeRPi01</h2>
          </v-card-title>
          <v-card-text>
            <img src="https://dev.api.buonomo.app/v1/surveillance/cameras/mikerpi01">
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-title primary-title>
            <h2 class="headline primary--text">MikeRPi02</h2>
          </v-card-title>
          <v-card-text>
            <img src="https://dev.api.buonomo.app/v1/surveillance/cameras/mikerpi02">
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';

export default {
  name: 'Surveillance',

  metaInfo: {
    title: `Surveillance | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'View surveillance feeds.'
      }
    ]
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: auto;
}
</style>
