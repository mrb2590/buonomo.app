<template>
  <v-layout class="passsword-reset-view" justify-center align-center>
    <v-flex class="card-container">
      <v-card>
        <v-form novalidate @submit.prevent="validate">
          <v-card-title primary-title>
            <h1 class="headline mb-0 primary--text">Reset Password</h1>
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
            <v-text-field
              v-model="form.passwordConfirmation"
              :error-messages="passwordConfirmationErrors"
              :append-icon="showPasswordConfirmation ? 'fas fa-eye fa-lg' : 'fas fa-eye-slash fa-lg'"
              :type="showPasswordConfirmation ? 'text' : 'password'"
              :disabled="showProgress"
              namme="passwordConfirmation"
              label="Password Confirmation"
              required
              @click:append="showPasswordConfirmation = !showPasswordConfirmation"
              @input="$v.form.passwordConfirmation.$touch()"
              @blur="$v.form.passwordConfirmation.$touch()"
              @keyup="checkFormIsEmpty"
            ></v-text-field>
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
            <v-btn color="primary" :disabled="showProgress" type="submit">Reset Password</v-btn>
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
import { required, email, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'PasswordReset',

  metaInfo: {
    title: `Reset Password | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Reset your password.'
      }
    ]
  },

  data: () => ({
    showPassword: false,
    showPasswordConfirmation: false,
    form: {
      email: '',
      password: '',
      passwordConfirmation: '',
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
        required,
        minLength: minLength(6)
      },
      passwordConfirmation: {
        required,
        minLength: minLength(6),
        sameAs: sameAs('password')
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
      !this.$v.form.password.required && errors.push('New password is required');
      !this.$v.form.password.minLength && errors.push('New password must be at least six characters');
      return errors;
    },

    passwordConfirmationErrors () {
      const errors = [];
      if (!this.$v.form.passwordConfirmation.$dirty) return errors;
      !this.$v.form.passwordConfirmation.required && errors.push('New password is required');
      !this.$v.form.passwordConfirmation.minLength &&
        errors.push('New password must be at least six characters');
      !this.$v.form.passwordConfirmation.sameAs && errors.push('New passwords do not match');
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
      return axios.post(`${process.env.VUE_APP_API_URL}/v1/users/password/reset/${this.$route.params.token}`, {
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.passwordConfirmation
      })
        .then(token => {
          this.SET_SHOW_PROGRESS(false);
          this.clearForm();
          this.SET_SNACKBAR({
            show: true,
            text: 'Your password has been reset.',
            class: 'success--text'
          });
          this.$router.push({ name: 'signin' });
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
      this.form.email = '';
      this.form.password = '';
      this.form.passwordConfirmation = '';
      this.form.isEmpty = true;
    },

    checkFormIsEmpty () {
      if (this.form.email === '' &&
        this.form.password === '' &&
        this.form.passwordConfirmation === ''
      ) {
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
