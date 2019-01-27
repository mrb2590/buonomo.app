<template>
  <v-container class="profile-view" fill-height grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <ProfileOverview/>
      </v-flex>
      <v-flex xs12 sm6>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h2 class="headline primary--text">Edit Avatar</h2>
              </v-card-title>
              <v-card-text>
                <FormUpdateAvatar/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h2 class="headline primary--text">Edit Profile</h2>
              </v-card-title>
              <v-card-text>
                <FormUpdateProfile/>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h2 class="headline primary--text">Update Email Address</h2>
              </v-card-title>
              <v-card-text>
                <FormUpdateEmail/>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h2 class="headline primary--text">Update Password</h2>
              </v-card-title>
              <v-card-text>
                <FormUpdatePassword/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';
import { mapState, mapMutations } from 'vuex';
import ProfileOverview from '@/components/users/ProfileOverview';
import FormUpdateAvatar from '@/components/users/FormUpdateAvatar';
import FormUpdateProfile from '@/components/users/FormUpdateProfile';
import FormUpdateEmail from '@/components/users/FormUpdateEmail';
import FormUpdatePassword from '@/components/users/FormUpdatePassword';

export default {
  name: 'Profile',

  metaInfo: {
    title: `Profile | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Your profile.'
      }
    ]
  },

  components: {
    ProfileOverview,
    FormUpdateAvatar,
    FormUpdateProfile,
    FormUpdateEmail,
    FormUpdatePassword
  },

  computed: {
    ...mapState('auth', ['user'])
  },

  methods: {
    ...mapMutations('users', ['SET_USER'])
  },

  mounted () {
    this.SET_USER(this.user);
  }
};
</script>
