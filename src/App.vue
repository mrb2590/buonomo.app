<template>
  <v-app id="mainApp" :dark="darkMode">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list class="pb-0">
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon color="primary">fas fa-fw fa-bold fa-2x</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title
              class="font-weight-bold title primary--text"
            >
              Buonomo
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>

      <v-list v-if="signedIn && user" dense>
        <v-list-tile avatar to="/profile">
          <v-list-tile-avatar>
            <img :src="user.avatar.url" alt="avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user.first_name }} {{ user.last_name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">fas fa-fw fa-bell</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list
        :class="{ 'pt-0': signedIn }"
        dense
      >
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon>fas fa-fw fa-home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/dashboard" v-if="signedIn">
          <v-list-tile-action>
            <v-icon>fas fa-fw fa-tachometer-alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/drive">
          <v-list-tile-action>
            <v-icon>fas fa-fw fa-hdd</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Drive</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/chat">
          <v-list-tile-action>
            <v-icon>fas fa-fw fa-comments</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Chat</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/games">
          <v-list-tile-action>
            <v-icon>fas fa-fw fa-gamepad</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Games</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/surveillance">
          <v-list-tile-action>
            <v-icon>fas fa-fw fa-video</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Surveillance</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-group
          prepend-icon="fas fa-fw fa-users-cog"
          append-icon="fas fa-fw fa-chevron-down nav-toggle"
          :value="$route.path.startsWith('/users')"
          no-action
          v-if="signedIn && isUserManager"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>User Management</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/users/list">
            <v-list-tile-content>
              <v-list-tile-title>All Users</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon
                :class="{ 'primary--text': $route.name === 'all-users'}"
              >
                fas fa-fw fa-users
              </v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile to="/users/create">
            <v-list-tile-content>
              <v-list-tile-title>Create New User</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon
                :class="{ 'primary--text': $route.name === 'create-users'}"
              >
                fas fa-fw fa-user-plus
              </v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>

        <v-list-tile to="/preferences">
          <v-list-tile-action>
            <v-icon>fas fa-fw fa-sliders-h</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Preferences</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ $route.meta.displayName }}</v-toolbar-title>
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
      <span>&copy; {{ (new Date).getFullYear() }}</span>
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

export default {
  name: 'App',

  data: () => ({
    drawer: null
  }),

  computed: {
    ...mapState('app', ['snackbar', 'showProgress']),
    ...mapState('auth', ['user']),
    ...mapState('preferences', ['darkMode']),
    ...mapGetters('auth', ['signedIn', 'isUserManager'])
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

.v-list--dense .v-list__tile .v-icon,
.v-list__tile__action .v-icon,
.v-list__group__header__prepend-icon .v-icon {
  font-size: 18px;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
