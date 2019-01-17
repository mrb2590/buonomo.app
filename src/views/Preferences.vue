<template>
  <v-container class="preferences-view" grid-list-xl fill-height>
    <v-layout wraps>
      <v-flex>
        <BaseCustomCard
          color="primary"
          title="Edit Preferences"
          text="Choose site-wide preferences"
        >
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-switch
                v-model="prefDarkMode"
                label="Dark Mode"
                color="primary"
              ></v-switch>
            </v-flex>
            <v-flex xs12 sm6>
              <p class="option-description">Set the theme to dark or light mode.</p>
            </v-flex>
          </v-layout>
        </BaseCustomCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '@/app.config';
import BaseCustomCard from '@/components/BaseCustomCard';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Preferences',

  metaInfo: {
    title: `Preferences | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Site preferences.'
      }
    ]
  },

  components: {
    BaseCustomCard
  },

  computed: {
    ...mapState('preferences', ['darkMode']),

    prefDarkMode: {
      get () {
        return this.darkMode;
      },
      set (darkMode) {
        this.SET_DARK_MODE(darkMode);
      }
    }
  },

  methods: {
    ...mapMutations('preferences', ['SET_DARK_MODE'])
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 600px) {
  .option-description {
    margin-top: 20px;
  }
}
</style>
