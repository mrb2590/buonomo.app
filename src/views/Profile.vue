<template>
  <v-container class="profile-view" grid-list-xl fill-height>
    <v-layout wrap>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <UserProfileOverview :user="user"/>
      </v-flex>
      <v-flex xs12 sm6>
        <v-layout wrap>
          <v-flex xs12>
            <BaseCustomCard
              color="primary"
              title="Edit Avatar"
              text="Make yourself look fine"
            >
              <!-- <v-form>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      v-model="forms.profile.firstName"
                      name="first_name"
                      label="First Name"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="forms.profile.lastName"
                      name="last_name"
                      label="Last Name"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 text-xs-right>
                    <v-btn color="primary">
                      Update Profile
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-form> -->
            </BaseCustomCard>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6>
        <v-layout wrap>
          <v-flex xs12>
            <BaseCustomCard
              color="primary"
              title="Edit Profile"
              text="Give me your information so I can sell it"
            >
              <FormUpdateProfile/>
            </BaseCustomCard>
          </v-flex>
          <v-flex xs12>
            <BaseCustomCard
              color="primary"
              title="Update Email"
              text="Update your email address so I can bug the shit out of you"
            >
              <FormUpdateEmail/>
            </BaseCustomCard>
          </v-flex>
          <v-flex xs12>
            <BaseCustomCard
              color="primary"
              title="Update Password"
              text="Update your password"
            >
              <FormUpdatePassword/>
            </BaseCustomCard>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';
import { mapState } from 'vuex';
import BaseCustomCard from '@/components/BaseCustomCard';
import UserProfileOverview from '@/components/UserProfileOverview';
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
    BaseCustomCard,
    UserProfileOverview,
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
