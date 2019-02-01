<template>
  <v-form novalidate @submit.prevent="validate" ref="form">
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          v-if="!admin"
          v-model="form.currentPassword"
          type="password"
          name="current_password"
          label="Current Password"
          required
          :error-messages="currentPasswordErrors"
          @input="$v.form.currentPassword.$touch()"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          type="password"
          name="password"
          label="New Password"
          required
          :error-messages="passwordErrors"
          @input="$v.form.password.$touch()"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
        <v-text-field
          v-model="form.passwordConfirmation"
          type="password"
          name="password_confirmation"
          label="New Password Confirmation"
          required
          :error-messages="passwordConfirmationErrors"
          @input="$v.form.passwordConfirmation.$touch()"
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

export default {
  name: 'FormUpdatePassword',

  data: () => ({
    formIsEmpty: true,
    form: {
      currentPassword: null,
      password: null,
      passwordConfirmation: null
    }
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
      form: {
        password: { required, minLength: minLength(6) },
        passwordConfirmation: { required, minLength: minLength(6), sameAs: sameAs('password') }
      }
    };
    if (!this.admin) {
      validations.form.currentPassword = { required };
    }
    return validations;
  },

  computed: {
    ...mapState('users', ['user']),
    ...mapState('app', ['showProgress']),

    currentPasswordErrors () {
      const errors = [];
      if (!this.$v.form.currentPassword.$dirty) return errors;
      !this.$v.form.currentPassword.required && errors.push('Current password is required');
      this.setFormIsEmpty();
      return errors;
    },

    passwordErrors () {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push('New password is required');
      !this.$v.form.password.minLength && errors.push('New password must be at least six characters');
      this.setFormIsEmpty();
      return errors;
    },

    passwordConfirmationErrors () {
      const errors = [];
      if (!this.$v.form.passwordConfirmation.$dirty) return errors;
      !this.$v.form.passwordConfirmation.required && errors.push('New password is required');
      !this.$v.form.passwordConfirmation.minLength &&
        errors.push('New password must be at least six characters');
      !this.$v.form.passwordConfirmation.sameAs && errors.push('New passwords do not match');
      this.setFormIsEmpty();
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
        password: this.form.password,
        passwordConfirmation: this.form.passwordConfirmation
      };
      if (!this.admin) {
        data.currentPassword = this.form.currentPassword;
      }
      this.updatePassword(data).then(() => {
        this.clearForm();
      });
    },

    clearForm () {
      this.$refs.form.reset();
      this.$v.$reset();
      this.formIsEmpty = true;
    },

    setFormIsEmpty () {
      if (this.$v.form.$dirty) {
        this.formIsEmpty = false;
        return;
      }
      for (let field in this.form) {
        if (this.form[field]) {
          this.formIsEmpty = false;
          return;
        }
      }
      this.formIsEmpty = true;
    }
  }
};
</script>
