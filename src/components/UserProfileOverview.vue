<template>
  <BaseCustomCard
    class="user-profile-overview text-xs-center"
    color="primary"
    title="Edit Profile"
    offsetType="avatar"
  >
    <div v-if="user">
      <h1 class="display-1">{{ `${user.first_name} ${user.last_name}` }}</h1>
      <p>{{ user.email }}</p>
      <p>@{{ user.slug }}</p>
      <p>Used {{ user.formatted_used_drive_bytes }} of {{ user.formatted_allocated_drive_bytes }} drive storage</p>
      <p v-if="withId">{{ user.id }}</p>
    </div>
  </BaseCustomCard>
</template>

<script>
import BaseCustomCard from '@/components/BaseCustomCard';

export default {
  name: 'UserProfileOverview',

  components: {
    BaseCustomCard
  },

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
