<template>
  <v-container class="users-create-view" fluid fill-height grid-list-xl>
    <v-layout wrap>
      <v-flex xs12 sm8 offset-sm2 lg6 offset-lg3>
        <v-card>
          <v-card-title primary-title>
            <h2 class="headline primary--text">Create New User</h2>
          </v-card-title>
          <v-card-text>
            <FormCreateUser/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';
import { mapActions } from 'vuex';
import FormCreateUser from '@/components/users/FormCreateUser';

export default {
  name: 'UsersCreate',

  metaInfo: {
    title: `Create User | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Edit a user.'
      }
    ]
  },

  components: {
    FormCreateUser
  },

  methods: {
    ...mapActions('users', ['createUser'])
  }
};
</script>
