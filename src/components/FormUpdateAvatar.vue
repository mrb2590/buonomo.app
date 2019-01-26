<template>
  <v-form novalidate @submit.prevent="validate">
    <v-layout wrap>
      <v-flex xs12>
        <v-select
          v-model="avatarStyle"
          name="avatarStyle"
          label="Avatar Style"
          required
          :error-messages="avatarStyleErrors"
          @input="$v.avatarStyle.$touch()"
          @blur="$v.avatarStyle.$touch()"
          :disabled="showProgress"
          :items="options.avatarStyles"
        ></v-select>
        <v-select
          v-model="accessoriesType"
          name="accessoriesType"
          label="Accessories Type"
          required
          :error-messages="accessoriesTypeErrors"
          @input="$v.accessoriesType.$touch()"
          @blur="$v.accessoriesType.$touch()"
          :disabled="showProgress"
          :items="options.accessoriesTypes"
        ></v-select>
        <v-select
          v-model="clotheType"
          name="clotheType"
          label="Clothe Type"
          required
          :error-messages="clotheTypeErrors"
          @input="$v.clotheType.$touch()"
          @blur="$v.clotheType.$touch()"
          :disabled="showProgress"
          :items="options.clotheTypes"
        ></v-select>
        <v-select
          v-model="clotheColor"
          name="clotheColor"
          label="Clothe Color"
          required
          :error-messages="clotheColorErrors"
          @input="$v.clotheColor.$touch()"
          @blur="$v.clotheColor.$touch()"
          :disabled="showProgress"
          :items="options.clotheColors"
        ></v-select>
        <v-select
          v-model="graphicType"
          name="graphicType"
          label="Clothe Type"
          required
          :error-messages="graphicTypeErrors"
          @input="$v.graphicType.$touch()"
          @blur="$v.graphicType.$touch()"
          :disabled="showProgress"
          :items="options.graphicTypes"
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
    avatarStyle: '',
    accessoriesType: '',
    clotheType: '',
    clotheColor: '',
    graphicType: '',
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
    avatarStyle: { required },
    accessoriesType: { required },
    clotheType: { required },
    clotheColor: { required },
    graphicType: { required },
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

    avatarStyleErrors () {
      const errors = [];
      if (!this.$v.avatarStyle.$dirty) return errors;
      !this.$v.avatarStyle.required && errors.push('Avatar Style is required');
      return errors;
    },

    accessoriesTypeErrors () {
      const errors = [];
      if (!this.$v.accessoriesType.$dirty) return errors;
      !this.$v.accessoriesType.required && errors.push('Accessories Type is required');
      return errors;
    },

    clotheTypeErrors () {
      const errors = [];
      if (!this.$v.clotheType.$dirty) return errors;
      !this.$v.clotheType.required && errors.push('Clothe Type is required');
      return errors;
    },

    clotheColorErrors () {
      const errors = [];
      if (!this.$v.clotheColor.$dirty) return errors;
      !this.$v.clotheColor.required && errors.push('Clothe Color is required');
      return errors;
    },

    graphicTypeErrors () {
      const errors = [];
      if (!this.$v.graphicType.$dirty) return errors;
      !this.$v.graphicType.required && errors.push('Graphic Type is required');
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
    ...mapActions('auth', ['updateAvatar']),
    ...mapMutations('app', ['SET_SNACKBAR', 'SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      this.SET_SHOW_PROGRESS(true);
      return this.updateAvatar({
        id: this.user.id,
        avatarStyle: this.avatarStyle,
        accessoriesType: this.accessoriesType,
        clotheType: this.clotheType,
        clotheColor: this.clotheColor,
        graphicType: this.graphicType,
        eyebrowType: this.eyebrowType,
        eyeType: this.eyeType,
        facialHairType: this.facialHairType,
        facialHairColor: this.facialHairColor,
        hairColor: this.hairColor,
        mouthType: this.mouthType,
        skinColor: this.skinColor,
        topType: this.topType
      })
        .then((user) => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: 'Your avatar has been updated.',
            class: 'success--text'
          });
        })
        .catch(error => {
          this.SET_SHOW_PROGRESS(false);
          this.SET_SNACKBAR({
            show: true,
            text: processInvalidForm(error, 'Failed to update your avatar.'),
            class: 'error--text'
          });
        });
    }
  },

  mounted () {
    axios.get(`${process.env.VUE_APP_API_URL}/v1/avatars/options`)
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
    this.avatarStyle = this.user.avatar.avatar_style;
    this.accessoriesType = this.user.avatar.accessories_type;
    this.clotheType = this.user.avatar.clothe_type;
    this.clotheColor = this.user.avatar.clothe_color;
    this.graphicType = this.user.avatar.graphic_type;
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
