<template>
  <v-form novalidate @submit.prevent="validate">
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-text-field
          v-model="firstName"
          type="text"
          name="firstName"
          label="First Name"
          required
          :error-messages="firstNameErrors"
          @input="$v.firstName.$touch()"
          @blur="$v.firstName.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          v-model="lastName"
          type="text"
          name="lastName"
          label="Last Name"
          required
          :error-messages="lastNameErrors"
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="email"
          type="email"
          name="email"
          label="Email Address"
          required
          :error-messages="emailErrors"
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="username"
          name="username"
          label="Userame"
          required
          :error-messages="usernameErrors"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
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
      </v-flex>
      <v-flex xs12>
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
      <v-flex xs12 sm6>
        <v-select
          v-model="verified"
          name="verified"
          label="Email Address Verified"
          required
          :error-messages="verifiedErrors"
          @input="$v.verified.$touch()"
          @blur="$v.verified.$touch()"
          :disabled="showProgress"
          :items="verifiedOptions"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select
          v-model="allocatedDriveBytes"
          name="allocatedDriveBytes"
          label="Allocated Drive Storage"
          required
          :error-messages="allocatedDriveBytesErrors"
          @input="$v.allocatedDriveBytes.$touch()"
          @blur="$v.allocatedDriveBytes.$touch()"
          :disabled="showProgress"
          :items="allocatedDriveBytesOptions"
        ></v-select>
      </v-flex>
      <v-flex
        xs6
        v-for="(role, index) in roles"
        :key="index"
      >
        <v-checkbox
          :label="role.display_name"
          v-model="userRoles[role.name]"
        ></v-checkbox>
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
          Create User
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email, helpers, sameAs, minLength } from 'vuelidate/lib/validators';
import { processInvalidForm } from '@/functions';

const usernameRegex = helpers.regex('alpha', /^[a-zA-Z0-9._-]{0,30}$/);

export default {
  name: 'FormCreateUser',

  data: () => ({
    verifiedOptions: [
      { text: 'Yes', value: true },
      { text: 'No', value: false }
    ],
    allocatedDriveBytesOptions: [
      { text: 'None', value: 0 },
      { text: '1 GB', value: 1073741824 },
      { text: '2 GB', value: 2147483648 },
      { text: '5 GB', value: 5368709120 },
      { text: '10 GB', value: 10737418240 },
      { text: '25 GB', value: 26843545600 },
      { text: '50 GB', value: 53687091200 },
      { text: '100 GB', value: 107374182400 },
      { text: '200 GB', value: 214748364800 }
    ],
    roles: null,
    userRoles: {},
    formIsEmpty: true,
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    verified: '',
    allocatedDriveBytes: '',
    password: '',
    passwordConfirmation: ''
  }),

  mixins: [validationMixin],

  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    username: { required, usernameRegex },
    password: { required, minLength: minLength(6) },
    passwordConfirmation: { required, minLength: minLength(6), sameAs: sameAs('password') },
    verified: { required },
    allocatedDriveBytes: { required }
  },

  computed: {
    ...mapState('users', ['user']),
    ...mapState('app', ['showProgress']),

    firstNameErrors () {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push('First name is required');
      return errors;
    },

    lastNameErrors () {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push('Last name is required');
      return errors;
    },

    emailErrors () {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('First name is required');
      !this.$v.email.email && errors.push('Email be a valid email address');
      return errors;
    },

    usernameErrors () {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push('Last name is required');
      !this.$v.username.usernameRegex &&
        errors.push('Username can only contain letters, numbers, underscores, periods, and dashes');
      return errors;
    },

    verifiedErrors () {
      const errors = [];
      if (!this.$v.verified.$dirty) return errors;
      !this.$v.verified.required && errors.push('Email Address Verified is required');
      return errors;
    },

    allocatedDriveBytesErrors () {
      const errors = [];
      if (!this.$v.allocatedDriveBytes.$dirty) return errors;
      !this.$v.allocatedDriveBytes.required && errors.push('Allocated Drive Storage is required');
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
    ...mapActions('users', ['createUser', 'fetchRoles']),
    ...mapMutations('app', ['SET_SNACKBAR', 'SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      this.SET_SHOW_PROGRESS(true);
      let setRoles = [];
      for (let roleName in this.userRoles) {
        if (this.userRoles[roleName]) setRoles.push(roleName);
      }
      return this.createUser({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        username: this.username,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        verified: this.verified,
        allocatedDriveBytes: this.allocatedDriveBytes,
        roles: setRoles
      })
        .then((user) => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: 'User has been created.',
            class: 'success--text'
          });
        })
        .catch(error => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: processInvalidForm(error, 'Failed to create new user.'),
            class: 'error--text'
          });
        });
    },

    clearForm () {
      this.$v.$reset();
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.username = null;
      this.password = null;
      this.passwordConfirmation = null;
      this.verified = null;
      this.allocatedDriveBytes = null;
      this.formIsEmpty = true;
    },

    checkFormIsEmpty () {
      if (this.firstName === null &&
        this.lastName === null &&
        this.email === null &&
        this.username === null &&
        this.verified === null &&
        this.password === null &&
        this.passwordConfirmation === null &&
        this.allocatedDriveBytes === null
      ) {
        this.formIsEmpty = true;
      } else {
        this.formIsEmpty = false;
      }
    }
  },

  mounted () {
    this.fetchRoles().then(roles => {
      this.roles = roles;
      for (let i = 0; i < roles.length; i++) {
        this.userRoles[roles[i].name] = false;
      }
    });
  }
};
</script>
