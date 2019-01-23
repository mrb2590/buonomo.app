<template>
  <div class="users-view">
    <router-view/>
    <v-container grid-list-xl fluid fill-height>
      <v-layout wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <v-icon color="primary">fas fa-users fa-md fa-3x</v-icon>
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
              :headers="headers"
              :items="listedUsers"
              :pagination.sync="pagination"
              :total-items="totalUsers"
              :loading="loading"
              class="elevation-1 users-table"
              sort-icon="fas fa-caret-up"
            >
              <template slot="items" slot-scope="props">
                <tr @click="$router.push({ path: `/users/${props.item.id}` })">
                  <td>{{ props.item.first_name }}</td>
                  <td>{{ props.item.last_name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.created_at | moment }}</td>
                  <td>{{ props.item.formatted_used_drive_bytes }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import appConfig from '@/app.config';
import { mapState, mapMutations } from 'vuex';
import axios from 'axios';
import { processInvalidForm } from '@/functions';
import moment from 'moment';
import debounce from 'lodash.debounce';

export default {
  name: 'Users',

  metaInfo: {
    title: `Users | ${appConfig.title}`,
    meta: [
      {
        name: 'description',
        content: 'Users.'
      }
    ]
  },

  data: () => ({
    totalUsers: 0,
    listedUsers: [],
    loading: true,
    search: '',
    pagination: {
      descending: false,
      page: 1,
      rowsPerPage: 10,
      sortBy: 'last_name',
      totalItems: 0
    },
    headers: [
      {
        text: 'First Name',
        align: 'left',
        value: 'first_name'
      },
      {
        text: 'Last Name',
        align: 'left',
        value: 'last_name'
      },
      {
        text: 'Email',
        align: 'left',
        value: 'email'
      },
      {
        text: 'Member Since',
        align: 'left',
        value: 'created_at'
      },
      {
        text: 'Used Storage',
        align: 'left',
        value: 'used_drive_bytes'
      }
    ]
  }),

  computed: {
    ...mapState('users', ['users'])
  },

  watch: {
    pagination: {
      handler () {
        this.getUsersPaginated();
      },
      deep: true
    },

    search: debounce(function (e) {
      this.getUsersPaginated();
    }, 500)
  },

  filters: {
    moment: function (timestamp) {
      return moment.unix(timestamp).format('MM/DD/YYYY');
    }
  },

  methods: {
    ...mapMutations('app', ['SET_SNACKBAR']),

    async getUsersPaginated () {
      this.loading = true;
      const { sortBy, descending, page, rowsPerPage } = this.pagination;
      const params = {
        page: page,
        limit: rowsPerPage
      };
      if (descending !== null) {
        params.sort = descending ? 'desc' : 'asc';
        params.sortby = sortBy;
      }
      if (this.search) {
        params.search = this.search;
      }
      return axios.get(`${process.env.VUE_APP_API_URL}/v1/users`, { params: params })
        .then(res => {
          this.loading = false;
          this.listedUsers = res.data.data;
          this.totalUsers = res.data.meta.total;
          return res;
        })
        .catch(error => {
          this.loading = false;
          this.SET_SNACKBAR({
            show: true,
            text: processInvalidForm(error),
            class: 'error--text'
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.users-table /deep/ .fa-caret-up {
  float: right;
  margin-left: 4px;
}

.users-table {
  /deep/ th {
    min-width: 150px;
  }

  /deep/ td {
    cursor: pointer;
  }
}
</style>
