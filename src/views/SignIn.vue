<template>
  <v-container class="sign-in-view" fluid fill-height grid-list-xl>
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
                :disabled="showProgress"
                name="email"
                label="Email"
                required
                @input="$v.form.email.$touch()"
                @blur="$v.form.email.$touch()"
                @keyup="checkFormIsEmpty"
                autocomplete="off"
              ></v-text-field>
              <v-text-field
                v-model="form.password"
                :error-messages="passwordErrors"
                :append-icon="showPassword ? 'fas fa-eye fa-lg' : 'fas fa-eye-slash fa-lg'"
                :type="showPassword ? 'text' : 'password'"
                :disabled="showProgress"
                namme="password"
                label="Password"
                required
                @click:append="showPassword = !showPassword"
                @input="$v.form.password.$touch()"
                @blur="$v.form.password.$touch()"
                @keyup="checkFormIsEmpty"
              ></v-text-field>
              <v-switch
                v-model="rememberMe"
                label="Remember me"
                color="primary"
                :disabled="showProgress"
              ></v-switch>
              <router-link to="/password/reset">Forgot password?</router-link>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <transition name="fade">
                <v-btn
                  v-show="!form.isEmpty"
                  flat
                  :disabled="showProgress"
                  @click="clearForm"
                >
                  clear
                </v-btn>
              </transition>
              <v-btn color="primary" :disabled="showProgress" type="submit">Sign In</v-btn>
            </v-card-actions>
          </v-form>
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
      isEmpty: true
    }
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
    ...mapState('app', ['showProgress']),

    rememberMe: {
      get () {
        return this.remember;
      },
      set (remember) {
        this.SET_REMEMBER(remember);
      }
    },

    emailErrors () {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.email && errors.push('Must be a valid email');
      !this.$v.form.email.required && errors.push('Email is required');
      return errors;
    },

    passwordErrors () {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push('Password is required');
      return errors;
    }
  },

  methods: {
    ...mapActions('auth', ['signIn']),
    ...mapMutations('auth', ['SET_REMEMBER']),
    ...mapMutations('app', ['SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      this.SET_SHOW_PROGRESS(true);
      return this.signIn({
        email: this.form.email,
        password: this.form.password,
        remember: this.remember
      })
        .then(token => {
          this.SET_SHOW_PROGRESS(false);
          this.clearForm();
          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'dashboard' });
        })
        .catch(error => {
          this.SET_SHOW_PROGRESS(false);
          if (error.response.status === 401) {
            this.$store.commit('app/SET_SNACKBAR', {
              show: true,
              text: 'Access denied.',
              class: 'error-text'
            });
          } else {
            this.$store.commit('app/SET_SNACKBAR', {
              show: true,
              text: 'Something went wrong.',
              class: 'error--text'
            });
          }
        });
    },

    clearForm () {
      this.$v.$reset();
      this.form.email = '';
      this.form.password = '';
      this.form.isEmpty = true;
    },

    checkFormIsEmpty () {
      if (this.form.email === '' && this.form.password === '') {
        this.form.isEmpty = true;
      } else {
        this.form.isEmpty = false;
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
