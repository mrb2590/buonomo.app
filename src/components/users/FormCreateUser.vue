<template>
  <v-form novalidate @submit.prevent="validate" ref="form">
    <v-layout wrap>
      <v-flex xs12 sm6>
        <v-text-field
          v-model="form.firstName"
          type="text"
          name="firstName"
          label="First Name"
          required
          :error-messages="firstNameErrors"
          @input="$v.form.firstName.$touch()"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6>
        <v-text-field
          v-model="form.lastName"
          type="text"
          name="lastName"
          label="Last Name"
          required
          :error-messages="lastNameErrors"
          @input="$v.form.lastName.$touch()"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="form.email"
          type="email"
          name="email"
          label="Email Address"
          required
          :error-messages="emailErrors"
          @input="$v.form.email.$touch()"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          v-model="form.username"
          name="username"
          label="Userame"
          required
          :error-messages="usernameErrors"
          @input="$v.form.username.$touch()"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
      </v-flex>
      <v-flex xs12>
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
      </v-flex>
      <v-flex xs12>
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
      <v-flex xs12 sm6>
        <v-select
          v-model="form.verified"
          name="verified"
          label="Email Address Verified"
          required
          :error-messages="verifiedErrors"
          @input="$v.form.verified.$touch()"
          :disabled="showProgress"
          :items="selectOptions.verified"
        ></v-select>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select
          v-model="form.allocatedDriveBytes"
          name="allocatedDriveBytes"
          label="Allocated Drive Storage"
          required
          :error-messages="allocatedDriveBytesErrors"
          @input="$v.form.allocatedDriveBytes.$touch()"
          :disabled="showProgress"
          :items="selectOptions.allocatedDriveBytes"
        ></v-select>
      </v-flex>
      <v-flex
        xs6
        v-for="(role, index) in roles"
        :key="index"
      >
        <v-checkbox
          :label="role.display_name"
          v-model="form.roles[role.name]"
          :disabled="showProgress"
          @change="setFormIsEmpty"
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

const usernameRegex = helpers.regex('alpha', /^[a-zA-Z0-9._-]{0,30}$/);

export default {
  name: 'FormCreateUser',

  data: () => ({
    formIsEmpty: true,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      verified: '',
      allocatedDriveBytes: '',
      password: '',
      passwordConfirmation: '',
      roles: {}
    },
    selectOptions: {
      verified: [
        { text: 'Yes', value: true },
        { text: 'No', value: false }
      ],
      allocatedDriveBytes: [
        { text: 'None', value: 0 },
        { text: '1 GB', value: 1073741824 },
        { text: '2 GB', value: 2147483648 },
        { text: '5 GB', value: 5368709120 },
        { text: '10 GB', value: 10737418240 },
        { text: '25 GB', value: 26843545600 },
        { text: '50 GB', value: 53687091200 },
        { text: '100 GB', value: 107374182400 },
        { text: '200 GB', value: 214748364800 }
      ]
    }
  }),

  mixins: [validationMixin],

  validations: {
    form: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      username: { required, usernameRegex },
      password: { required, minLength: minLength(6) },
      passwordConfirmation: { required, minLength: minLength(6), sameAs: sameAs('password') },
      verified: { required },
      allocatedDriveBytes: { required }
    }
  },

  computed: {
    ...mapState('users', ['user', 'roles']),
    ...mapState('app', ['showProgress']),

    firstNameErrors () {
      const errors = [];
      if (!this.$v.form.firstName.$dirty) return errors;
      !this.$v.form.firstName.required && errors.push('First name is required');
      this.setFormIsEmpty();
      return errors;
    },

    lastNameErrors () {
      const errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;
      !this.$v.form.lastName.required && errors.push('Last name is required');
      this.setFormIsEmpty();
      return errors;
    },

    emailErrors () {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.required && errors.push('First name is required');
      !this.$v.form.email.email && errors.push('Email be a valid email address');
      this.setFormIsEmpty();
      return errors;
    },

    usernameErrors () {
      const errors = [];
      if (!this.$v.form.username.$dirty) return errors;
      !this.$v.form.username.required && errors.push('Last name is required');
      !this.$v.form.username.usernameRegex &&
        errors.push('Username can only contain letters, numbers, underscores, periods, and dashes');
      this.setFormIsEmpty();
      return errors;
    },

    verifiedErrors () {
      const errors = [];
      if (!this.$v.form.verified.$dirty) return errors;
      !this.$v.form.verified.required && errors.push('Email Address Verified is required');
      this.setFormIsEmpty();
      return errors;
    },

    allocatedDriveBytesErrors () {
      const errors = [];
      if (!this.$v.form.allocatedDriveBytes.$dirty) return errors;
      !this.$v.form.allocatedDriveBytes.required &&
        errors.push('Allocated Drive Storage is required');
      this.setFormIsEmpty();
      return errors;
    },

    passwordErrors () {
      const errors = [];
      if (!this.$v.form.password.$dirty) return errors;
      !this.$v.form.password.required && errors.push('New password is required');
      !this.$v.form.password.minLength &&
        errors.push('New password must be at least six characters');
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
    ...mapActions('users', ['createUser', 'fetchRoles']),
    ...mapMutations('app', ['SET_SNACKBAR', 'SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      this.SET_SHOW_PROGRESS(true);
      let setRoles = [];
      for (let roleName in this.form.roles) {
        if (this.form.roles[roleName]) setRoles.push(roleName);
      }
      this.createUser({
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        username: this.form.username,
        password: this.form.password,
        passwordConfirmation: this.form.passwordConfirmation,
        verified: this.form.verified,
        allocatedDriveBytes: this.form.allocatedDriveBytes,
        roles: setRoles
      })
        .then(response => this.clearForm());
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
        if (field === 'roles') continue;
        if (this.form[field]) {
          this.formIsEmpty = false;
          return;
        }
      }
      for (let role in this.form.roles) {
        if (this.form.roles[role]) {
          this.formIsEmpty = false;
          return;
        }
      }
      this.formIsEmpty = true;
    }
  },

  mounted () {
    if (!this.roles) {
      this.fetchRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          this.form.roles[roles[i].name] = false;
        }
      });
    }
  }
};
</script>
