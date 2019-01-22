<template>
  <v-form novalidate @submit.prevent="validate">
    <v-layout wrap>
      <v-flex xs12>
        <v-select
          v-model="style"
          name="style"
          label="Background Style"
          required
          :error-messages="styleErrors"
          @input="$v.style.$touch()"
          @blur="$v.style.$touch()"
          :disabled="showProgress"
          :items="options.styles"
        ></v-select>
        <v-select
          v-model="accessories"
          name="accessories"
          label="Accessory"
          required
          :error-messages="accessoriesErrors"
          @input="$v.accessories.$touch()"
          @blur="$v.accessories.$touch()"
          :disabled="showProgress"
          :items="options.accessories"
        ></v-select>
        <v-select
          v-model="clothesType"
          name="clothesType"
          label="Clothes Type"
          required
          :error-messages="clothesTypeErrors"
          @input="$v.clothesType.$touch()"
          @blur="$v.clothesType.$touch()"
          :disabled="showProgress"
          :items="options.clothesTypes"
        ></v-select>
        <v-select
          v-model="eyebrowType"
          name="eyebrowType"
          label="Eyebrows Type"
          required
          :error-messages="eyebrowTypeErrors"
          @input="$v.eyebrowType.$touch()"
          @blur="$v.eyebrowType.$touch()"
          :disabled="showProgress"
          :items="options.eyebrowTypes"
        ></v-select>
        <v-select
          v-model="eyeType"
          name="eyeType"
          label="Eye Type"
          required
          :error-messages="eyeTypeErrors"
          @input="$v.eyeType.$touch()"
          @blur="$v.eyeType.$touch()"
          :disabled="showProgress"
          :items="options.eyeTypes"
        ></v-select>
        <v-select
          v-model="facialHairType"
          name="facialHairType"
          label="Facial Hair Type"
          required
          :error-messages="facialHairTypeErrors"
          @input="$v.facialHairType.$touch()"
          @blur="$v.facialHairType.$touch()"
          :disabled="showProgress"
          :items="options.facialHairTypes"
        ></v-select>
        <v-select
          v-model="facialHairColor"
          name="facialHairColor"
          label="Facial Hair Color"
          required
          :error-messages="facialHairColorErrors"
          @input="$v.facialHairColor.$touch()"
          @blur="$v.facialHairColor.$touch()"
          :disabled="showProgress"
          :items="options.facialHairColors"
        ></v-select>
        <v-select
          v-model="hairColor"
          name="hairColor"
          label="Hair Color"
          required
          :error-messages="hairColorErrors"
          @input="$v.hairColor.$touch()"
          @blur="$v.hairColor.$touch()"
          :disabled="showProgress"
          :items="options.hairColors"
        ></v-select>
        <v-select
          v-model="mouthType"
          name="mouthType"
          label="Mouth Type"
          required
          :error-messages="mouthTypeErrors"
          @input="$v.mouthType.$touch()"
          @blur="$v.mouthType.$touch()"
          :disabled="showProgress"
          :items="options.mouthTypes"
        ></v-select>
        <v-select
          v-model="skinColor"
          name="skinColor"
          label="Skin Color"
          required
          :error-messages="skinColorErrors"
          @input="$v.skinColor.$touch()"
          @blur="$v.skinColor.$touch()"
          :disabled="showProgress"
          :items="options.skinColors"
        ></v-select>
        <v-select
          v-model="topType"
          name="topType"
          label="top Type"
          required
          :error-messages="topTypeErrors"
          @input="$v.topType.$touch()"
          @blur="$v.topType.$touch()"
          :disabled="showProgress"
          :items="options.topTypes"
        ></v-select>
      </v-flex>
      <v-flex xs12 text-xs-right>
        <v-btn color="primary" type="submit" :disabled="showProgress">
          Update Avatar
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions, mapMutations } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { processInvalidForm } from '@/functions';

export default {
  name: 'FormUpdateEmail',

  data: () => ({
    options: {},
    style: '',
    accessories: '',
    clothesType: '',
    eyebrowType: '',
    eyeType: '',
    facialHairType: '',
    facialHairColor: '',
    hairColor: '',
    mouthType: '',
    skinColor: '',
    topType: ''
  }),

  mixins: [validationMixin],

  validations: {
    style: { required },
    accessories: { required },
    clothesType: { required },
    eyebrowType: { required },
    eyeType: { required },
    facialHairType: { required },
    facialHairColor: { required },
    hairColor: { required },
    mouthType: { required },
    skinColor: { required },
    topType: { required }
  },

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('app', ['showProgress']),

    styleErrors () {
      const errors = [];
      if (!this.$v.style.$dirty) return errors;
      !this.$v.style.required && errors.push('Style is required');
      return errors;
    },

    accessoriesErrors () {
      const errors = [];
      if (!this.$v.accessories.$dirty) return errors;
      !this.$v.accessories.required && errors.push('Accessory is required');
      return errors;
    },

    clothesTypeErrors () {
      const errors = [];
      if (!this.$v.clothesType.$dirty) return errors;
      !this.$v.clothesType.required && errors.push('Clothes Type is required');
      return errors;
    },

    eyebrowTypeErrors () {
      const errors = [];
      if (!this.$v.eyebrowType.$dirty) return errors;
      !this.$v.eyebrowType.required && errors.push('Eyebrow Type is required');
      return errors;
    },

    eyeTypeErrors () {
      const errors = [];
      if (!this.$v.eyeType.$dirty) return errors;
      !this.$v.eyeType.required && errors.push('Eye Type is required');
      return errors;
    },

    facialHairTypeErrors () {
      const errors = [];
      if (!this.$v.facialHairType.$dirty) return errors;
      !this.$v.facialHairType.required && errors.push('Facial Hair Type is required');
      return errors;
    },

    facialHairColorErrors () {
      const errors = [];
      if (!this.$v.facialHairColor.$dirty) return errors;
      !this.$v.facialHairColor.required && errors.push('Facial Hair Color is required');
      return errors;
    },

    hairColorErrors () {
      const errors = [];
      if (!this.$v.hairColor.$dirty) return errors;
      !this.$v.hairColor.required && errors.push('Hair Color is required');
      return errors;
    },

    mouthTypeErrors () {
      const errors = [];
      if (!this.$v.mouthType.$dirty) return errors;
      !this.$v.mouthType.required && errors.push('Mouth Type is required');
      return errors;
    },

    skinColorErrors () {
      const errors = [];
      if (!this.$v.skinColor.$dirty) return errors;
      !this.$v.skinColor.required && errors.push('Skin Color is required');
      return errors;
    },

    topTypeErrors () {
      const errors = [];
      if (!this.$v.topType.$dirty) return errors;
      !this.$v.topType.required && errors.push('Top Type is required');
      return errors;
    }
  },

  methods: {
    ...mapActions('auth', ['updateEmail']),
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
            text: 'Your email has been updated.',
            class: 'success--text'
          });
        })
        .catch(error => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: processInvalidForm(error, 'Failed to update your email address.'),
            class: 'error--text'
          });
        });
    }
  },

  mounted () {
    axios.get(`${process.env.VUE_APP_API_URL}/v1/avatar/options`)
      .then(res => {
        this.options = res.data;
      })
      .catch(error => {
        this.SET_SNACKBAR({
          show: true,
          text: processInvalidForm(error, 'Failed to load avatar options.'),
          class: 'error--text'
        });
      });
    this.style = this.user.avatar.style;
    this.accessories = this.user.avatar.accessories;
    this.clothesType = this.user.avatar.clothes_type;
    this.eyebrowType = this.user.avatar.eyebrow_type;
    this.eyeType = this.user.avatar.eye_type;
    this.facialHairType = this.user.avatar.facial_hair_type;
    this.facialHairColor = this.user.avatar.facial_hair_color;
    this.hairColor = this.user.avatar.hair_color;
    this.mouthType = this.user.avatar.mouth_type;
    this.skinColor = this.user.avatar.skin_color;
    this.topType = this.user.avatar.top_type;
  }
};
</script>
