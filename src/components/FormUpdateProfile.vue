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
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'FormUpdateProfile',

  data: () => ({
    formIsEmpty: false,
    firstName: '',
    lastName: ''
  }),

  mixins: [validationMixin],

  validations: {
    firstName: { required },
    lastName: { required }
  },

  computed: {
    ...mapState('auth', ['user']),
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
    }
  },

  methods: {
    ...mapActions('auth', ['updateProfile']),
    ...mapMutations('app', ['SET_SNACKBAR', 'SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      this.SET_SHOW_PROGRESS(true);
      return this.updateProfile({
        id: this.user.id,
        firstName: this.firstName,
        lastName: this.lastName
      })
        .then((user) => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: 'Your profile has been updated.',
            class: 'success--text'
          });
        })
        .catch(error => {
          console.log(error);
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: 'Failed to update your profile.',
            class: 'error--text'
          });
        });
    },

    clearForm () {
      this.$v.$reset();
      this.firstName = '';
      this.lastName = '';
      this.formIsEmpty = true;
    },

    checkFormIsEmpty () {
      if (this.firstName === '' && this.lastName === '') {
        this.formIsEmpty = true;
      } else {
        this.formIsEmpty = false;
      }
    }
  },

  mounted () {
    this.firstName = this.user.first_name;
    this.lastName = this.user.last_name;
  }
};
</script>
