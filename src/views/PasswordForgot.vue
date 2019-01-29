<template>
  <v-layout class="password-forgot-view" justify-center align-center>
    <v-flex class="card-container">
      <v-card>
        <v-form novalidate @submit.prevent="validate">
          <v-card-title primary-title>
            <h1 class="headline mb-0 primary--text">Forgot Password</h1>
          </v-card-title>

          <v-card-text>
            <p>Send an email with a password reset link.</p>
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              :disabled="showProgress"
              name="email"
              label="Email"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              @keyup="checkFormIsEmpty"
              autocomplete="off"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <transition name="fade">
              <v-btn
                v-show="!isEmpty"
                flat
                :disabled="showProgress"
                @click="clearForm"
              >
                clear
              </v-btn>
            </transition>
            <v-btn color="primary" :disabled="showProgress" type="submit">Send Link</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import appConfig from '../app.config';
import axios from 'axios';
import { processInvalidForm } from '@/functions';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'PasswordForgot',

  metaInfo: {
    title: `Forgot Password | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Send a reset password link to your email address.'
      }
    ]
  },

  data: () => ({
    email: '',
    isEmpty: true
  }),

  mixins: [validationMixin],

  validations: {
    email: {
      required,
      email
    }
  },

  computed: {
    ...mapState('app', ['showProgress']),

    emailErrors () {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be a valid email');
      !this.$v.email.required && errors.push('Email is required');
      return errors;
    }
  },

  methods: {
    ...mapMutations('app', ['SET_SHOW_PROGRESS', 'SET_SNACKBAR']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      this.SET_SHOW_PROGRESS(true);
      return axios.post(`${process.env.VUE_APP_API_URL}/v1/users/password/forgot`, {
        email: this.email
      })
        .then(token => {
          this.SET_SHOW_PROGRESS(false);
          this.clearForm();
          this.SET_SNACKBAR({
            show: true,
            text: 'Reset password link has been sent.',
            class: 'success--text'
          });
        })
        .catch(error => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: processInvalidForm(error),
            class: 'error--text'
          });
        });
    },

    clearForm () {
      this.$v.$reset();
      this.email = '';
      this.isEmpty = true;
    },

    checkFormIsEmpty () {
      if (this.email === '') {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-container {
  max-width: 350px;

  .headline {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 599px) {
  .v-card {
    max-width: 100%;
    height: 100%;
  }
}
</style>
