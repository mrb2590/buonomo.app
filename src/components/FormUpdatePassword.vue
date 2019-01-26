<template>
  <v-form novalidate @submit.prevent="validate">
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          v-if="!admin"
          type="password"
          v-model="currentPassword"
          name="current_password"
          label="Current Password"
          required
          :error-messages="currentPasswordErrors"
          @input="$v.currentPassword.$touch()"
          @blur="$v.currentPassword.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="password"
          name="password"
          label="New Password"
          required
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
        <v-text-field
          type="password"
          v-model="passwordConfirmation"
          name="password_confirmation"
          label="New Password Confirmation"
          required
          :error-messages="passwordConfirmationErrors"
          @input="$v.passwordConfirmation.$touch()"
          @blur="$v.passwordConfirmation.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 text-xs-right>
        <v-btn
          v-show="!formIsEmpty && !showProgress"
          flat
          @click="clearForm"
        >
          clear
        </v-btn>
        <v-btn color="primary" type="submit" :disabled="showProgress">
          Update Password
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import { processInvalidForm } from '@/functions';

export default {
  name: 'FormUpdatePassword',

  data: () => ({
    formIsEmpty: true,
    currentPassword: '',
    password: '',
    passwordConfirmation: ''
  }),

  props: {
    admin: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  mixins: [validationMixin],

  validations () {
    let validations = {
      password: { required, minLength: minLength(6) },
      passwordConfirmation: { required, minLength: minLength(6), sameAs: sameAs('password') }
    };
    if (!this.admin) {
      validations.currentPassword = { required };
    }
    return validations;
  },

  computed: {
    ...mapState('users', ['user']),
    ...mapState('app', ['showProgress']),

    currentPasswordErrors () {
      const errors = [];
      if (!this.$v.currentPassword.$dirty) return errors;
      !this.$v.currentPassword.required && errors.push('Current password is required');
      return errors;
    },

    passwordErrors () {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('New password is required');
      !this.$v.password.minLength && errors.push('New password must be at least six characters');
      return errors;
    },

    passwordConfirmationErrors () {
      if (this.admin) return;
      const errors = [];
      if (!this.$v.passwordConfirmation.$dirty) return errors;
      !this.$v.passwordConfirmation.required && errors.push('New password is required');
      !this.$v.passwordConfirmation.minLength &&
        errors.push('New password must be at least six characters');
      !this.$v.passwordConfirmation.sameAs && errors.push('New passwords do not match');
      return errors;
    }
  },

  methods: {
    ...mapActions('users', ['updatePassword']),
    ...mapMutations('app', ['SET_SNACKBAR', 'SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      let data = {
        id: this.user.id,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      };
      if (!this.admin) {
        data.currentPassword = this.currentPassword;
      }
      this.SET_SHOW_PROGRESS(true);
      return this.updatePassword(data)
        .then((user) => {
          this.clearForm();
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: 'Your password has been updated.',
            class: 'success--text'
          });
        })
        .catch(error => {
          this.clearForm();
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: processInvalidForm(error, 'Failed to update your password.'),
            class: 'error--text'
          });
        });
    },

    clearForm () {
      this.$v.$reset();
      this.currentPassword = '';
      this.password = '';
      this.passwordConfirmation = '';
      this.formIsEmpty = true;
    },

    checkFormIsEmpty () {
      if (this.currentPassword === '' &&
        this.password === '' &&
        this.passwordConfirmation === ''
      ) {
        this.formIsEmpty = true;
      } else {
        this.formIsEmpty = false;
      }
    }
  }
};
</script>
