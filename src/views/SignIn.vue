<template>
  <v-container class="sign-in-view" fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex class="card-container">
        <v-card>
          <v-form novalidate @submit.prevent="validate">
            <v-card-title primary-title>
              <h1 class="headline mb-0 primary--text">Sign in</h1>
            </v-card-title>

            <v-card-text>
              <v-text-field
                v-model="form.email"
                :error-messages="emailErrors"
                :disabled="sending"
                name="email"
                label="Email"
                required
                @input="$v.form.email.$touch()"
                @blur="$v.form.email.$touch()"
                @keyup="checkFormClear"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                :error-messages="passwordErrors"
                :append-icon="showPassword ? 'fas fa-eye fa-lg' : 'fas fa-eye-slash fa-lg'"
                :type="showPassword ? 'text' : 'password'"
                :disabled="sending"
                namme="password"
                label="Password"
                required
                @click:append="showPassword = !showPassword"
                @input="$v.form.password.$touch()"
                @blur="$v.form.password.$touch()"
                @keyup="checkFormClear"
              ></v-text-field>
              <v-switch
                v-model="rememberMe"
                label="Remember me"
                color="primary"
                :disabled="sending"
              ></v-switch>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <transition name="fade">
                <v-btn
                  v-show="!form.isClear"
                  flat
                  :disabled="sending"
                  @click="clear"
                >
                  clear
                </v-btn>
              </transition>
              <v-btn color="primary" :disabled="sending" type="submit">Sign In</v-btn>
            </v-card-actions>
          </v-form>
          <v-progress-linear
            v-if="sending"
            color="primary"
            :indeterminate="true"
          >
          </v-progress-linear>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import appConfig from '../app.config';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'SignIn',

  metaInfo: {
    title: `Sign in | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Sign into Buonomo.'
      }
    ]
  },

  data: () => ({
    showPassword: false,
    form: {
      email: '',
      password: '',
      isClear: true
    },
    sending: false
  }),

  mixins: [validationMixin],

  validations: {
    form: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  },

  computed: {
    ...mapState('auth', ['remember']),

    rememberMe: {
      get () {
        return this.remember;
      },
      set (remember) {
        this.SET_REMEMBER(remember);
      }
    },

    /**
     * Check for email erross and display them.
     */
    emailErrors () {
      const errors = [];

      if (!this.$v.form.email.$dirty) {
        return errors;
      }

      !this.$v.form.email.email && errors.push('Must be a valid email');
      !this.$v.form.email.required && errors.push('Email is required');

      return errors;
    },

    /**
     * Check for password erross and display them.
     */
    passwordErrors () {
      const errors = [];

      if (!this.$v.form.password.$dirty) {
        return errors;
      }

      !this.$v.form.password.required && errors.push('Password is required');

      return errors;
    }
  },

  methods: {
    ...mapActions('auth', ['signIn']),
    ...mapMutations('auth', ['SET_REMEMBER']),

    /**
     * Validate the form.
     */
    validate () {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.submit();
      }
    },

    /**
     * Submit the form.
     */
    submit () {
      this.sending = true;

      return this.signIn({
        email: this.form.email,
        password: this.form.password,
        remember: this.remember
      })
        .then(token => {
          this.sending = false;
          this.clear();

          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'profile' });
        })
        .catch(error => {
          this.sending = false;

          if (error.response.status === 401) {
            this.$store.commit('app/SET_SNACKBAR', {
              color: 'error',
              show: true,
              text: 'Access denied.'
            });
          } else {
            this.$store.commit('app/SET_SNACKBAR', {
              show: true,
              color: 'error',
              closeColor: 'white',
              text: 'Something went wrong.'
            });
          }
        });
    },

    /**
     * Clear the form.
     */
    clear () {
      this.$v.$reset();
      this.form.email = '';
      this.form.password = '';
      this.form.isClear = true;
    },

    /**
     * Check if the form is empty or not.
     */
    checkFormClear () {
      if (this.form.email === '' && this.form.password === '') {
        this.form.isClear = true;
      } else {
        this.form.isClear = false;
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
