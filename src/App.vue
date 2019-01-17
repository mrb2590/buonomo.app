<template>
  <v-app id="mainApp" :dark="darkMode">
    <TheDrawer/>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Buonomo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/signin" color="primary" v-if="!signedIn">Sign in</v-btn>
      <v-btn to="/signout" color="primary" v-if="signedIn">Sign out</v-btn>
    </v-toolbar>

    <v-content id="mainContent">
      <router-view/>
    </v-content>

    <v-progress-linear
      id="progress"
      :active="showProgress"
      color="primary"
      :indeterminate="true"
    >
    </v-progress-linear>

    <v-footer app fixed class="footer-text">
      <span>&copy; 2017</span>
    </v-footer>

    <v-snackbar
      v-model="snackbar.show"
      :bottom="true"
      :color="snackbar.color"
      :multi-line="snackbar.multiline"
      :timeout="snackbar.timeout"
      :vertical="snackbar.vertical"
      :class="snackbar.class"
    >
      {{ snackbar.text }}
      <v-btn
        dark
        flat
        :color="snackbar.closeColor"
        @click="RESET_SNACKBAR()"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import TheDrawer from '@/components/TheDrawer';

export default {
  name: 'App',

  components: {
    TheDrawer
  },

  computed: {
    ...mapState('app', ['snackbar', 'showProgress']),
    ...mapState('preferences', ['darkMode']),
    ...mapGetters('auth', ['signedIn'])
  },

  methods: {
    ...mapMutations('app', ['RESET_SNACKBAR'])
  }
};
</script>

<style lang="scss">
.footer-text {
  padding: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#progress {
  z-index: 5;
  position: fixed;
  bottom: 15px;
}

.v-icon {
  font-size: 16px;
}
</style>
