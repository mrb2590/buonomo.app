<template>
  <v-form novalidate @submit.prevent="validate" ref="form">
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field
          v-model="form.firstName"
          name="first_name"
          label="First Name"
          required
          :error-messages="firstNameErrors"
          @input="$v.form.firstName.$touch()"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
        <v-text-field
          v-model="form.lastName"
          name="last_name"
          label="Last Name"
          required
          :error-messages="lastNameErrors"
          @input="$v.form.lastName.$touch()"
          autocomplete="off"
          :disabled="showProgress"
        ></v-text-field>
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
        <v-select
          v-if="admin"
          v-model="form.verified"
          name="verified"
          label="Email Address Verified"
          required
          :error-messages="verifiedErrors"
          @input="$v.form.verified.$touch()"
          :disabled="showProgress"
          :items="selectOptions.verified"
        ></v-select>
        <v-select
          v-if="admin"
          v-model="form.allocatedDriveBytes"
          name="allocatedDriveBytes"
          label="Allocated Drive Storage"
          required
          :error-messages="allocatedDriveBytesErrors"
          @input="$v.form.allocatedDriveBytes.$touch()"
          :disabled="showProgress"
          :items="selectOptions.allocatedDriveBytes"
        ></v-select>
        <div v-if="admin">
          <v-checkbox
            v-for="(role, index) in roles"
            :key="index"
            :label="role.display_name"
            v-model="form.roles[role.name]"
            :disabled="showProgress"
            @change="setFormIsEmpty"
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

const usernameRegex = helpers.regex('alpha', /^[a-zA-Z0-9._-]{0,30}$/);

export default {
  name: 'FormUpdateProfile',

  data: () => ({
    formIsEmpty: false,
    form: {
      firstName: null,
      lastName: null,
      username: null,
      verified: null,
      allocatedDriveBytes: null,
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
        firstName: { required },
        lastName: { required },
        username: { required, usernameRegex }
      }
    };
    if (this.admin) {
      validations.form.verified = { required };
      validations.form.allocatedDriveBytes = { required };
    }
    return validations;
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
      !this.$v.form.allocatedDriveBytes.required && errors.push('Allocated Drive Storage is required');
      this.setFormIsEmpty();
      return errors;
    }
  },

  methods: {
    ...mapActions('users', ['updateProfile', 'fetchRoles']),
    ...mapMutations('app', ['SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      let setRoles = [];
      for (let roleName in this.form.roles) {
        if (this.form.roles[roleName]) setRoles.push(roleName);
      }
      this.updateProfile({
        id: this.user.id,
        ...this.form,
        roles: setRoles,
        isUserManager: this.admin
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

  watch: {
    user () {
      this.form.firstName = this.user.first_name;
      this.form.lastName = this.user.last_name;
      this.form.username = this.user.username;
      this.form.verified = !!this.user.email_verified_at;
      this.form.allocatedDriveBytes = this.user.allocated_drive_bytes;
      if (this.roles) {
        for (let i = 0; i < this.roles.length; i++) {
          this.form.roles[this.roles[i].name] = false;
          for (let j = 0; j < this.user.roles.length; j++) {
            if (this.user.roles[j].name === this.roles[i].name) {
              this.form.roles[this.roles[i].name] = true;
            }
          }
        }
      }
    }
  },

  mounted () {
    if (!this.roles) {
      this.fetchRoles().then(roles => {
        for (let roleName in this.form.roles) {
          for (let i = 0; i < this.user.roles.length; i++) {
            if (this.user.roles[i].name === roleName) {
              this.form.roles[roleName] = true;
            }
          }
          this.form.roles[roleName] = false;
        }
      });
    }
  }

  // mounted () {
  //   if (!this.roles) {
  //     this.fetchRoles().then(roles => {
  //       for (let i = 0; i < roles.length; i++) {
  //         this.form.roles[roles[i].name] = false;
  //         if (this.user) {
  //           for (let j = 0; j < this.user.roles.length; j++) {
  //             if (this.user.roles[j].name === roles[i].name) {
  //               this.form.roles[roles[i].name] = true;
  //             }
  //           }
  //         }
  //       }
  //     });
  //   }
  // }
};
</script>
