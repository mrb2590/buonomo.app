<template>
  <v-form novalidate @submit.prevent="validate" ref="form">
    <v-layout wrap>
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

export default {
  name: 'FormUpdateEmail',

  data: () => ({
    formIsEmpty: false,
    form: {
      email: null
    }
  }),

  mixins: [validationMixin],

  validations: {
    form: {
      email: { required, email }
    }
  },

  computed: {
    ...mapState('users', ['user']),
    ...mapState('app', ['showProgress']),

    emailErrors () {
      const errors = [];
      if (!this.$v.form.email.$dirty) return errors;
      !this.$v.form.email.required && errors.push('Email is required');
      !this.$v.form.email.email && errors.push('Email be a valid email address');
      this.setFormIsEmpty();
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
      this.updateEmail({
        id: this.user.id,
        email: this.form.email
      });
    },

    clearForm () {
      this.$refs.form.reset();
      this.$v.$reset();
      this.formIsEmpty = true;
    },

    setFormIsEmpty () {
      for (let field in this.form) {
        if (this.form[field]) {
          this.formIsEmpty = false;
          return;
        }
      }
      this.formIsEmpty = true;
    }
  },

  watch: {
    user () {
      this.form.email = this.user.email;
    }
  }
};
</script>
