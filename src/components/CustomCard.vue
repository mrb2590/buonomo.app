<template>
  <v-card
    v-bind="$attrs"
    :style="styles"
    v-on="$listeners"
    class="main-card"
  >
    <div
      class="offset"
      :class="{ 'text-xs-center': offsetType === 'avatar' }"
    >
      <v-card
        :color="color"
        class="heading-card elevation-10"
        dark
        v-if="offsetType === 'card'"
      >
        <slot
          v-if="!title && !text"
          name="header"
        />
        <span v-else>
          <h4
            class="title mb-2"
            v-text="title"
          />
          <p
            class="category"
            v-text="text"
          />
        </span>
      </v-card>
      <v-avatar
        :size="160"
        v-if="offsetType === 'avatar'"
      >
        <img src="https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheType=GraphicShirt&clotheColor=Black&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&facialHairColor=Brown&facialHairType=BeardLight&graphicType=Pizza&mouthType=Smile&skinColor=Light&topType=Hat" alt="avatar">
      </v-avatar>
      <slot
        name="offset"
      />
    </div>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider
      v-if="$slots.actions"
      class="mx-3"
    />

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CustomCard',

  inheritAttrs: false,

  props: {
    offsetType: {
      type: String,
      default: 'card'
    },

    color: {
      type: String,
      default: 'secondary'
    },

    inline: {
      type: Boolean,
      default: false
    },

    fullWidth: {
      type: Boolean,
      default: false
    },

    offset: {
      type: [Number, String],
      default: 20
    },

    title: {
      type: String,
      default: undefined
    },

    text: {
      type: String,
      default: undefined
    }
  },

  computed: {
    hasOffset () {
      return this.$slots.header ||
        this.$slots.offset ||
        this.title ||
        this.text;
    },

    styles () {
      if (!this.hasOffset) {
        return null;
      }

      return {
        marginBottom: `${this.offset}px`,
        marginTop: `${this.offset}px`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.main-card {
  .offset {
    margin: 0 auto;
    max-width: calc(100% - 32px);
    position: relative;
    top: -20px;
    margin-bottom: -20px;
  }

  .heading-card {
    border-radius: 4px;
    padding: 15px;

    .category {
      margin: 0;
      color: hsla(0, 0%, 100%, 0.62);
    }
  }
}
</style>
