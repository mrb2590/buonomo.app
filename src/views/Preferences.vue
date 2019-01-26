<template>
  <v-container class="preferences-view" grid-list-xl fill-height>
    <v-layout wraps>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            <h2 class="headline primary--text">Update Your Preferences</h2>
          </v-card-title>
          <v-card-text>
            <v-layout wrap>
              <v-flex xs12 sm4>
                <v-switch
                  v-model="prefDarkMode"
                  label="Dark Mode"
                  color="primary"
                ></v-switch>
              </v-flex>
              <v-flex xs12 sm8>
                <p class="option-description">Set the theme to dark or light mode.</p>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '@/app.config';
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
