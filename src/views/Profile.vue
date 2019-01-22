<template>
  <v-container class="profile-view" grid-list-xl fill-height>
    <v-layout wrap>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <UserProfileOverview :user="user"/>
      </v-flex>
      <v-flex xs12 sm6>
        <v-layout wrap>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h2 class="headline primary--text">Edit Your Avatar</h2>
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
                <h2 class="headline primary--text">Edit Your Profile</h2>
              </v-card-title>
              <v-card-text>
                <FormUpdateProfile/>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h2 class="headline primary--text">Update Your Email</h2>
              </v-card-title>
              <v-card-text>
                <FormUpdateEmail/>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card>
              <v-card-title primary-title>
                <h2 class="headline primary--text">Update Your Password</h2>
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
import { mapState } from 'vuex';
import UserProfileOverview from '@/components/UserProfileOverview';
import FormUpdateAvatar from '@/components/FormUpdateAvatar';
import FormUpdateProfile from '@/components/FormUpdateProfile';
import FormUpdateEmail from '@/components/FormUpdateEmail';
import FormUpdatePassword from '@/components/FormUpdatePassword';

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
    UserProfileOverview,
    FormUpdateAvatar,
    FormUpdateProfile,
    FormUpdateEmail,
    FormUpdatePassword
  },

  computed: {
    ...mapState('auth', ['user'])
  }
};
</script>

<style lang="scss" scoped>

</style>
