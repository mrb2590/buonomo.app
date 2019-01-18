<template>
  <v-card class="user-profile-overview text-xs-center">
    <v-card-title primary-title class="avatar-title">
      <img class="main-avatar" src="https://avataaars.io/?accessoriesType=Sunglasses&avatarStyle=Circle&clotheType=GraphicShirt&clotheColor=Black&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&facialHairColor=Brown&facialHairType=BeardLight&graphicType=Pizza&mouthType=Smile&skinColor=Light&topType=Hat" alt="avatar">
    </v-card-title>
    <v-card-text>
      <div v-if="user">
        <h1 class="display-1 mb-2 primary--text">{{ `${user.first_name} ${user.last_name}` }}</h1>
        <p>@{{ user.slug }}</p>
        <p>{{ user.email }}</p>
        <p>Used {{ user.formatted_used_drive_bytes }} of {{ user.formatted_allocated_drive_bytes }} drive storage</p>
        <p v-if="withId">{{ user.id }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'UserProfileOverview',

  props: {
    user: {
      required: true
    },
    'with-id': {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.user-profile-overview {
  margin-top: 80px;
}

.avatar-title {
  justify-content: center;

  > img {
    margin-top: -116px;
  }
}
</style>
