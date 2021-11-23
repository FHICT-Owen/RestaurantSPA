<template>
  <div class="nav-container">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <div class="container">
        <div class="navbar-brand"></div>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/menu" class="nav-link">Menu</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/table_plan" class="nav-link">Table Plan</router-link>
            </li>
          </ul>
          <ul class="navbar-nav d-none d-md-block">
            <li v-if="!isAuthenticated && !loading" class="nav-item">
              <button
                id="qsLoginBtn"
                class="btn btn-primary btn-margin"
                @click.prevent="login"
              >
                Login
              </button>
            </li>

            <li class="nav-item dropdown" v-if="isAuthenticated">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="profileDropDown"
                data-toggle="dropdown"
              >
                <img
                  :src="user.picture"
                  alt="User's profile picture"
                  class="nav-user-profile rounded-circle"
                  width="50"
                />
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="dropdown-header">{{ user.name }}</div>
                <router-link
                  to="/profile"
                  class="dropdown-item dropdown-profile flex flex-row"
                >
                  <UserCircleIcon class="mr-3 w-6 h-6" />
                  Profile
                </router-link>
                <a
                  id="qsLogoutBtn"
                  href="#"
                  class="dropdown-item flex flex-row"
                  @click.prevent="logout"
                >
                  <LogoutIcon class="mr-3 w-6 h-6" />
                  Log out
                </a>
              </div>
            </li>
          </ul>

          <ul class="navbar-nav d-md-none" v-if="!isAuthenticated && !loading">
            <button
              id="qsLoginBtn"
              class="btn btn-primary btn-block"
              @click="login"
            >
              Log in
            </button>
          </ul>

          <ul
            id="mobileAuthNavBar"
            class="navbar-nav d-md-none d-flex"
            v-if="isAuthenticated"
          >
            <li class="nav-item">
              <span class="user-info">
                <img
                  :src="user.picture"
                  alt="User's profile picture"
                  class="nav-user-profile d-inline-block rounded-circle mr-3"
                  width="50"
                />
                <h6 class="d-inline-block">{{ user.name }}</h6>
              </span>
            </li>
            <li class="flex flex-row">
              <UserCircleIcon class="mr-3 w-6 h-6" />
              <router-link to="/profile">Profile</router-link>
            </li>

            <li class="flex flex-row">
              <LogoutIcon class="mr-3 w-6 h-6 flex flex-row" />
              <a id="qsLogoutBtn" href="#" class @click.prevent="logout"
                >Log out</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { inject } from 'vue'
import { UserCircleIcon, LogoutIcon } from '@heroicons/vue/outline'

export default {
  components: {
    UserCircleIcon,
    LogoutIcon
  },
  name: 'NavBar',
  inject: ['Auth'],
  methods: {
    login () {
      this.Auth.loginWithRedirect()
    },
    logout () {
      this.Auth.logout()
      this.$router.push({ path: '/' })
    }
  },
  setup () {
    const auth = inject('Auth')
    return { ...auth }
  }
}
</script>

<style scoped>
#mobileAuthNavBar {
  min-height: 125px;
  justify-content: space-between;
}
</style>
