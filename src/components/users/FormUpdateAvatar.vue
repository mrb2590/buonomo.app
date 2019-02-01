<template>
  <v-form novalidate @submit.prevent="validate" ref="form">
    <v-layout wrap>
      <v-flex xs12 v-if="avatarOptions">
        <v-select
          v-model="form.avatarStyle"
          name="avatarStyle"
          label="Avatar Style"
          required
          :error-messages="avatarStyleErrors"
          @input="$v.form.avatarStyle.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.avatarStyles"
        ></v-select>
        <v-select
          v-model="form.accessoriesType"
          name="accessoriesType"
          label="Accessories Type"
          required
          :error-messages="accessoriesTypeErrors"
          @input="$v.form.accessoriesType.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.accessoriesTypes"
        ></v-select>
        <v-select
          v-model="form.clotheType"
          name="clotheType"
          label="Clothe Type"
          required
          :error-messages="clotheTypeErrors"
          @input="$v.form.clotheType.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.clotheTypes"
        ></v-select>
        <v-select
          v-model="form.clotheColor"
          name="clotheColor"
          label="Clothe Color"
          required
          :error-messages="clotheColorErrors"
          @input="$v.form.clotheColor.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.clotheColors"
        ></v-select>
        <v-select
          v-model="form.graphicType"
          name="graphicType"
          label="Clothe Type"
          required
          :error-messages="graphicTypeErrors"
          @input="$v.form.graphicType.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.graphicTypes"
        ></v-select>
        <v-select
          v-model="form.eyebrowType"
          name="eyebrowType"
          label="Eyebrows Type"
          required
          :error-messages="eyebrowTypeErrors"
          @input="$v.form.eyebrowType.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.eyebrowTypes"
        ></v-select>
        <v-select
          v-model="form.eyeType"
          name="eyeType"
          label="Eye Type"
          required
          :error-messages="eyeTypeErrors"
          @input="$v.form.eyeType.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.eyeTypes"
        ></v-select>
        <v-select
          v-model="form.facialHairType"
          name="facialHairType"
          label="Facial Hair Type"
          required
          :error-messages="facialHairTypeErrors"
          @input="$v.form.facialHairType.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.facialHairTypes"
        ></v-select>
        <v-select
          v-model="form.facialHairColor"
          name="facialHairColor"
          label="Facial Hair Color"
          required
          :error-messages="facialHairColorErrors"
          @input="$v.form.facialHairColor.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.facialHairColors"
        ></v-select>
        <v-select
          v-model="form.hairColor"
          name="hairColor"
          label="Hair Color"
          required
          :error-messages="hairColorErrors"
          @input="$v.form.hairColor.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.hairColors"
        ></v-select>
        <v-select
          v-model="form.mouthType"
          name="mouthType"
          label="Mouth Type"
          required
          :error-messages="mouthTypeErrors"
          @input="$v.form.mouthType.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.mouthTypes"
        ></v-select>
        <v-select
          v-model="form.skinColor"
          name="skinColor"
          label="Skin Color"
          required
          :error-messages="skinColorErrors"
          @input="$v.form.skinColor.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.skinColors"
        ></v-select>
        <v-select
          v-model="form.topType"
          name="topType"
          label="top Type"
          required
          :error-messages="topTypeErrors"
          @input="$v.form.topType.$touch()"
          :disabled="showProgress"
          :items="avatarOptions.topTypes"
        ></v-select>
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
          Update Avatar
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
  name: 'FormUpdateEmail',

  data: () => ({
    formIsEmpty: false,
    form: {
      avatarStyle: null,
      accessoriesType: null,
      clotheType: null,
      clotheColor: null,
      graphicType: null,
      eyebrowType: null,
      eyeType: null,
      facialHairType: null,
      facialHairColor: null,
      hairColor: null,
      mouthType: null,
      skinColor: null,
      topType: null
    }
  }),

  mixins: [validationMixin],

  validations: {
    form: {
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
    }
  },

  computed: {
    ...mapState('users', ['user', 'avatarOptions']),
    ...mapState('app', ['showProgress']),

    avatarStyleErrors () {
      const errors = [];
      if (!this.$v.form.avatarStyle.$dirty) return errors;
      !this.$v.form.avatarStyle.required && errors.push('Avatar Style is required');
      this.setFormIsEmpty();
      return errors;
    },

    accessoriesTypeErrors () {
      const errors = [];
      if (!this.$v.form.accessoriesType.$dirty) return errors;
      !this.$v.form.accessoriesType.required && errors.push('Accessories Type is required');
      this.setFormIsEmpty();
      return errors;
    },

    clotheTypeErrors () {
      const errors = [];
      if (!this.$v.form.clotheType.$dirty) return errors;
      !this.$v.form.clotheType.required && errors.push('Clothe Type is required');
      this.setFormIsEmpty();
      return errors;
    },

    clotheColorErrors () {
      const errors = [];
      if (!this.$v.form.clotheColor.$dirty) return errors;
      !this.$v.form.clotheColor.required && errors.push('Clothe Color is required');
      this.setFormIsEmpty();
      return errors;
    },

    graphicTypeErrors () {
      const errors = [];
      if (!this.$v.form.graphicType.$dirty) return errors;
      !this.$v.form.graphicType.required && errors.push('Graphic Type is required');
      this.setFormIsEmpty();
      return errors;
    },

    eyebrowTypeErrors () {
      const errors = [];
      if (!this.$v.form.eyebrowType.$dirty) return errors;
      !this.$v.form.eyebrowType.required && errors.push('Eyebrow Type is required');
      this.setFormIsEmpty();
      return errors;
    },

    eyeTypeErrors () {
      const errors = [];
      if (!this.$v.form.eyeType.$dirty) return errors;
      !this.$v.form.eyeType.required && errors.push('Eye Type is required');
      this.setFormIsEmpty();
      return errors;
    },

    facialHairTypeErrors () {
      const errors = [];
      if (!this.$v.form.facialHairType.$dirty) return errors;
      !this.$v.form.facialHairType.required && errors.push('Facial Hair Type is required');
      this.setFormIsEmpty();
      return errors;
    },

    facialHairColorErrors () {
      const errors = [];
      if (!this.$v.form.facialHairColor.$dirty) return errors;
      !this.$v.form.facialHairColor.required && errors.push('Facial Hair Color is required');
      this.setFormIsEmpty();
      return errors;
    },

    hairColorErrors () {
      const errors = [];
      if (!this.$v.form.hairColor.$dirty) return errors;
      !this.$v.form.hairColor.required && errors.push('Hair Color is required');
      this.setFormIsEmpty();
      return errors;
    },

    mouthTypeErrors () {
      const errors = [];
      if (!this.$v.form.mouthType.$dirty) return errors;
      !this.$v.form.mouthType.required && errors.push('Mouth Type is required');
      this.setFormIsEmpty();
      return errors;
    },

    skinColorErrors () {
      const errors = [];
      if (!this.$v.form.skinColor.$dirty) return errors;
      !this.$v.form.skinColor.required && errors.push('Skin Color is required');
      this.setFormIsEmpty();
      return errors;
    },

    topTypeErrors () {
      const errors = [];
      if (!this.$v.form.topType.$dirty) return errors;
      !this.$v.form.topType.required && errors.push('Top Type is required');
      this.setFormIsEmpty();
      return errors;
    }
  },

  methods: {
    ...mapActions('users', ['updateAvatar', 'fetchAvatarOptions']),
    ...mapMutations('app', ['SET_SHOW_PROGRESS']),

    validate () {
      this.$v.$touch();
      if (!this.$v.$invalid) this.submit();
    },

    submit () {
      this.SET_SHOW_PROGRESS(true);
      return this.updateAvatar({
        id: this.user.id,
        ...this.form
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
  },

  watch: {
    user () {
      this.form.avatarStyle = this.user.avatar.avatar_style;
      this.form.accessoriesType = this.user.avatar.accessories_type;
      this.form.clotheType = this.user.avatar.clothe_type;
      this.form.clotheColor = this.user.avatar.clothe_color;
      this.form.graphicType = this.user.avatar.graphic_type;
      this.form.eyebrowType = this.user.avatar.eyebrow_type;
      this.form.eyeType = this.user.avatar.eye_type;
      this.form.facialHairType = this.user.avatar.facial_hair_type;
      this.form.facialHairColor = this.user.avatar.facial_hair_color;
      this.form.hairColor = this.user.avatar.hair_color;
      this.form.mouthType = this.user.avatar.mouth_type;
      this.form.skinColor = this.user.avatar.skin_color;
      this.form.topType = this.user.avatar.top_type;
    }
  },

  mounted () {
    if (!this.avatarOptions) {
      this.fetchAvatarOptions();
    }
  }
};
</script>
