<template>
    <v-navigation-drawer
      class="the-drawer"
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list class="pb-0" dense>
        <v-list-tile>
          <v-list-tile-avatar>
            <v-icon color="primary">fas fa-fw fa-bold</v-icon>
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

      <v-list v-if="signedIn" class="pb-0" dense>
        <v-list-tile avatar to="/profile">
          <v-list-tile-avatar>
            <img src="https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheType=GraphicShirt&clotheColor=Black&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&facialHairColor=Brown&facialHairType=BeardLight&graphicType=Pizza&mouthType=Smile&skinColor=Light&topType=Hat">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ fullName }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon ripple>
              <v-icon color="grey lighten-1">fas fa-fw fa-bell</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list
        v-if="signedIn"
        :class="{ 'pt-0': signedIn }"
        dense
      >
        <v-divider></v-divider>

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
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>User Management</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to="/users">
            <v-list-tile-content>
              <v-list-tile-title>List</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>fas fa-fw fa-users</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile to="/users/add">
            <v-list-tile-content>
              <v-list-tile-title>Add</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>fas fa-fw fa-user-plus</v-icon>
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheDrawer',

  data: () => ({
    drawer: null
  }),

  computed: {
    ...mapGetters('auth', ['signedIn', 'fullName'])
  }
};
</script>

<style lang="scss" scoped>
.the-drawer .v-list__tile__action .v-icon,
.the-drawer /deep/ .v-list__group__header__prepend-icon .v-icon {
  font-size: 20px;
}

// .the-drawer /deep/ .nav-toggle {
//   font-size: 16px;
// }
</style>
