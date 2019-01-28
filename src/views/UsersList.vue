<template>
  <div class="users-list-view">
    <v-container fluid fill-height grid-list-xl>
      <v-layout wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <h2 class="headline primary--text">New Users</h2>
            </v-card-title>
            <v-card-text>
              <v-sparkline
                v-if="userCreatedDates.labels.length"
                :labels="userCreatedDates.labels"
                :value="userCreatedDates.values"
                :line-width="2"
                stroke-linecap="round"
                auto-draw
                smooth
                :height="50"
              >
              </v-sparkline>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="userCreatedDatesRange" mandatory>
                <v-btn flat value="day">
                  Day
                </v-btn>
                <v-btn flat value="month">
                  Month
                </v-btn>
                <v-btn flat value="year">
                  Year
                </v-btn>
              </v-btn-toggle>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <h2 class="headline primary--text">All Users</h2>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                :append-icon="search === '' ? 'fas fa-search' : 'fas fa-times'"
                label="Search"
                single-line
                hide-details
                @click:append="search = ''"
              ></v-text-field>
            </v-card-title>
            <v-data-table
              v-if="usersList.data"
              :headers="headers"
              :items="usersList.data.data"
              :pagination.sync="pagination"
              :total-items="usersList.data.meta.total"
              :loading="loading"
              class="elevation-1 users-table"
              sort-icon="fas fa-caret-up"
              :rows-per-page-items="rowsPerPageItems"
            >
              <template slot="items" slot-scope="props">
                <tr
                  :class="{ 'primary--text': $route.params.id === props.item.id }"
                  @click="$router.push({ path: `/users/${props.item.id}` })"
                >
                  <td>{{ props.item.first_name }}</td>
                  <td>{{ props.item.last_name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.username }}</td>
                  <td>{{ props.item.created_at | moment }}</td>
                  <td>{{ props.item.formatted_used_drive_bytes }}</td>
                  <td>{{ props.item.formatted_allocated_drive_bytes }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <router-view/>
  </div>
</template>

<script>
import appConfig from '@/app.config';
import { mapState, mapMutations, mapActions } from 'vuex';
import moment from 'moment';
import debounce from 'lodash.debounce';

export default {
  name: 'UsersList',

  metaInfo: {
    title: `All Users | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'List all Users.'
      }
    ]
  },

  data: () => ({
    userCreatedDatesRange: null,
    loading: true,
    search: '',
    rowsPerPageItems: [5, 10, 25, 50, 100, { text: 'All', value: -1 }],
    pagination: null,
    headers: [
      { text: 'First Name', align: 'left', value: 'first_name' },
      { text: 'Last Name', align: 'left', value: 'last_name' },
      { text: 'Email', align: 'left', value: 'email' },
      { text: 'Username', align: 'left', value: 'username' },
      { text: 'Member Since', align: 'left', value: 'created_at' },
      { text: 'Used Storage', align: 'left', value: 'used_drive_bytes' },
      { text: 'Allocated Storage', align: 'left', value: 'allocated_drive_bytes' }
    ]
  }),

  computed: {
    ...mapState('users', ['users', 'userCreatedDates', 'usersList'])
  },

  watch: {
    pagination: {
      handler () {
        this.fetchUsers();
      },
      deep: true
    },

    search: debounce(function (e) {
      this.fetchUsers();
    }, 500),

    userCreatedDatesRange () {
      this.SET_USER_CREATED_DATES_RANGE(this.userCreatedDatesRange);
      this.fetchUsersCreatedDates();
    }
  },

  filters: {
    moment: function (timestamp) {
      return moment.unix(timestamp).format('MM/DD/YYYY');
    }
  },

  methods: {
    ...mapMutations('app', ['SET_SNACKBAR']),
    ...mapMutations('users', ['SET_USER_CREATED_DATES_RANGE', 'SET_USERS_LIST_OPTIONS']),
    ...mapActions('users', ['fetchUsersPaginated', 'fetchUsersCreatedDates']),

    fetchUsers () {
      this.loading = true;
      this.SET_USERS_LIST_OPTIONS({
        ...this.pagination,
        search: this.search
      });
      this.fetchUsersPaginated()
        .then(response => {
          this.loading = false;
        });
    }
  },

  created () {
    // todo: fix loading twice on initial load
    this.userCreatedDatesRange = this.userCreatedDates.range;
    this.pagination = this.usersList.options;
    this.search = this.usersList.options.search;
  }
};
</script>

<style lang="scss" scoped>
.users-table /deep/ .fa-caret-up {
  float: right;
  margin-left: 4px;
}

/deep/ svg > g {
  font-size: 3px !important;
}

.users-table {
  /deep/ th {
    min-width: 160px;
  }

  /deep/ td {
    cursor: pointer;
  }
}
</style>
