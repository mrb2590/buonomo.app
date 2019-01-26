<template>
  <v-form novalidate @submit.prevent="validate">
    <v-layout wrap>
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
      <v-flex xs12 text-xs-right>
        <v-btn
          v-show="!formIsEmpty && !showProgress"
          flat
          @click="clearForm"
        >
          clear
        </v-btn>
        <v-btn color="primary" type="submit" :disabled="showProgress">
          Update Email
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { processInvalidForm } from '@/functions';

export default {
  name: 'FormUpdateEmail',

  data: () => ({
    formIsEmpty: false,
    email: ''
  }),

  mixins: [validationMixin],

  validations: {
    email: { required, email }
  },

  computed: {
    ...mapState('users', ['user']),
    ...mapState('app', ['showProgress']),

    emailErrors () {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('First name is required');
      !this.$v.email.email && errors.push('Email be a valid email address');
      return errors;
    }
  },

  methods: {
    ...mapActions('users', ['updateEmail']),
    ...mapMutations('app', ['SET_SNACKBAR', 'SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      this.SET_SHOW_PROGRESS(true);
      return this.updateEmail({
        id: this.user.id,
        email: this.email
      })
        .then((user) => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: 'Email address has been updated.',
            class: 'success--text'
          });
        })
        .catch(error => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: processInvalidForm(error, 'Failed to update email address.'),
            class: 'error--text'
          });
        });
    },

    clearForm () {
      this.$v.$reset();
      this.email = '';
      this.formIsEmpty = true;
    },

    checkFormIsEmpty () {
      if (this.email === '') {
        this.formIsEmpty = true;
      } else {
        this.formIsEmpty = false;
      }
    }
  },

  watch: {
    user () {
      this.email = this.user.email;
    }
  }
};
</script>
