<template>
  <v-container class="surveillance-view" grid-list-xl fill-height fluid>
    <v-layout wrap>
      <v-flex xs12 sm6>
        <CustomCard
          color="primary"
          title="Front Door 01"
          text="Camera 01"
        >
          <v-layout wrap>
            <v-flex xs12 align-h="center">
              <img src="https://dev.api.buonomo.app/v1/surveillance/cameras/front-door-01">
            </v-flex>
          </v-layout>
        </CustomCard>
      </v-flex>
      <v-flex xs12 sm6>
        <CustomCard
          color="primary"
          title="Front Door 01"
          text="Camera 01"
        >
          <v-layout wrap>
            <v-flex xs12>
              <img src="https://dev.api.buonomo.app/v1/surveillance/cameras/front-door-01">
            </v-flex>
          </v-layout>
        </CustomCard>
      </v-flex>
      <v-flex xs12 sm6>
        <CustomCard
          color="primary"
          title="Front Door 01"
          text="Camera 01"
        >
          <v-layout wrap>
            <v-flex xs12>
              <img src="https://dev.api.buonomo.app/v1/surveillance/cameras/front-door-01">
            </v-flex>
          </v-layout>
        </CustomCard>
      </v-flex>
      <v-flex xs12 sm6>
        <CustomCard
          color="primary"
          title="Front Door 01"
          text="Camera 01"
        >
          <v-layout wrap>
            <v-flex xs12>
              <img src="https://dev.api.buonomo.app/v1/surveillance/cameras/front-door-01">
            </v-flex>
          </v-layout>
        </CustomCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';
import CustomCard from '@/components/CustomCard';

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
  },

  methods: {
    embedStream () {

    }
  },

  components: {
    CustomCard
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  max-width: 960px;
  height: auto;
}
</style>
