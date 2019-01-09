<template>
  <v-app id="mainApp" :dark="darkMode">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list v-if="signedIn" class="pb-0">
        <v-list-tile avatar to="/profile">
          <v-list-tile-avatar>
            <img src="https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheType=GraphicShirt&clotheColor=Black&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&facialHairColor=Brown&facialHairType=BeardLight&graphicType=Pizza&mouthType=Smile&skinColor=Light&topType=Hat">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ fullName }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">fas fa-bell</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list dense class="pt-0">
        <v-divider v-if="signedIn"></v-divider>

        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>fas fa-tachometer-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>fas fa-info-circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/drive">
          <v-list-tile-action>
            <v-icon>fas fa-hdd</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Drive</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/chat">
          <v-list-tile-action>
            <v-icon>fas fa-comments</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Chat</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/games">
          <v-list-tile-action>
            <v-icon>fas fa-gamepad</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Games</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/surveillance">
          <v-list-tile-action>
            <v-icon>fas fa-video</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Surveillance</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/preferences">
          <v-list-tile-action>
            <v-icon>fas fa-sliders-h</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Preferences</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

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

export default {
  name: 'App',

  data: () => ({
    drawer: null
  }),

  computed: {
    ...mapState('app', ['snackbar']),
    ...mapState('preferences', ['darkMode']),
    ...mapGetters('auth', ['signedIn', 'fullName', 'initials'])
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
</style>
