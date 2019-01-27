<template>
  <v-form novalidate @submit.prevent="validate">
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          v-model="firstName"
          name="first_name"
          label="First Name"
          required
          :error-messages="firstNameErrors"
          @input="$v.firstName.$touch()"
          @blur="$v.firstName.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
        <v-text-field
          v-model="lastName"
          name="last_name"
          label="Last Name"
          required
          :error-messages="lastNameErrors"
          @input="$v.lastName.$touch()"
          @blur="$v.lastName.$touch()"
          @keyup="checkFormIsEmpty"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
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
        <v-select
          v-if="admin"
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
        <v-select
          v-if="admin"
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
        <div v-if="admin">
          <span class="title">Roles</span>
          <v-checkbox
          v-for="(role, index) in roles"
          :key="index"
            :label="role.display_name"
            v-model="userRoles[role.name]"
          ></v-checkbox>
        </div>
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
          Update Profile
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, helpers } from 'vuelidate/lib/validators';
import { processInvalidForm } from '@/functions';

const usernameRegex = helpers.regex('alpha', /^[a-zA-Z0-9._-]{0,30}$/);

export default {
  name: 'FormUpdateProfile',

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
    formIsEmpty: false,
    firstName: null,
    lastName: null,
    username: null,
    verified: null,
    allocatedDriveBytes: null
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
      firstName: { required },
      lastName: { required },
      username: { required, usernameRegex }
    };
    if (this.admin) {
      validations.verified = { required };
      validations.allocatedDriveBytes = { required };
    }
    return validations;
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
    }
  },

  methods: {
    ...mapActions('users', ['updateProfile', 'fetchRoles']),
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
      this.updateProfile({
        id: this.user.id,
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        verified: this.verified,
        allocatedDriveBytes: this.allocatedDriveBytes,
        roles: setRoles
      })
        .then((user) => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: 'Profile has been updated.',
            class: 'success--text'
          });
        })
        .catch(error => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: processInvalidForm(error, 'Failed to update profile.'),
            class: 'error--text'
          });
        });
    },

    clearForm () {
      this.$v.$reset();
      this.firstName = null;
      this.lastName = null;
      this.username = null;
      this.verified = null;
      this.allocatedDriveBytes = null;
      this.formIsEmpty = true;
    },

    checkFormIsEmpty () {
      if (this.firstName === null &&
        this.lastName === null &&
        this.username === null &&
        this.verified === null &&
        this.allocatedDriveBytes === null
      ) {
        this.formIsEmpty = true;
      } else {
        this.formIsEmpty = false;
      }
    }
  },

  watch: {
    user () {
      this.firstName = this.user.first_name;
      this.lastName = this.user.last_name;
      this.username = this.user.username;
      this.verified = !!this.user.email_verified_at;
      this.allocatedDriveBytes = this.user.allocated_drive_bytes;
      if (this.roles) {
        for (let i = 0; i < this.roles.length; i++) {
          this.userRoles[this.roles[i].name] = false;
          for (let j = 0; j < this.user.roles.length; j++) {
            if (this.user.roles[j].name === this.roles[i].name) {
              this.userRoles[this.roles[i].name] = true;
            }
          }
        }
      }
    }
  },

  mounted () {
    this.fetchRoles().then(roles => {
      this.roles = roles;
      for (let i = 0; i < roles.length; i++) {
        this.userRoles[roles[i].name] = false;
        if (this.user) {
          for (let j = 0; j < this.user.roles.length; j++) {
            if (this.user.roles[j].name === roles[i].name) {
              this.userRoles[roles[i].name] = true;
            }
          }
        }
      }
    });
  }
};
</script>
