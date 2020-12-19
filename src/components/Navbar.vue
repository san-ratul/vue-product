<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <div class="container">
        <b-navbar-brand>
          <router-link class="nav-link text-white" to="/">
            Product CRUD
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav>
              <router-link class="nav-link" :to="{ name: 'Home' }">
                Home
              </router-link>
              <router-link
                class="nav-link"
                :to="{ name: 'CreateProduct' }"
                v-if="isLoggedIn"
              >
                Create
              </router-link>
              <router-link
                class="nav-link"
                :to="{ name: 'Login' }"
                v-if="!isLoggedIn"
              >
                Login
              </router-link>
              <router-link
                class="nav-link"
                :to="{ name: 'Register' }"
                v-if="!isLoggedIn"
              >
                Register
              </router-link>
            </b-navbar-nav>
            <b-nav-item-dropdown right v-if="isLoggedIn">
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ user.name }}</em>
              </template>
              <b-dropdown-item href="#" @click.prevent="logout"
                >Signout</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import User from "../apis/User";
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["isLoggedIn"]),
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  watch: {
    isLoggedIn() {
      // Do whatever makes sense now
      User.auth()
        .then((response) => {
          this.$store.commit("AUTH_USER", response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("token");
            this.$store.commit("LOGIN", false);
          }
        });
    },
  },
  methods: {
    logout() {
      User.logout().then(() => {
        localStorage.removeItem("token");
        this.$store.commit("LOGIN", false);
      });
    },
  },
};
</script>

