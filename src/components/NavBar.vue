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
              <router-link to="/table_plan" class="nav-link"
                >Table Plan</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/live_view" class="nav-link"
                >Live view</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/restaurant_detail" class="nav-link"
                >Restaurant details</router-link
              >
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

  <nav class="flex items-center justify-between flex-wrap">
    
    <div class="w-full block flex-grow md:flex sm:items-center  md:w-auto py-4 bg-yellow-500  z-50">
      <div class="block md:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 border-white text-white"
      >
        <svg
          class="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
      <div class="text-sm md:flex-grow">
        <div
          class="block mt-4 md:inline-block md:mt-0 text-white text-2xl rounded-lg bg-black bg-opacity-0 hover:bg-opacity-10 text-opacity-60 list-none px-2 mx-2"
        >
          <router-link
            to="/"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
              ]"
            >
              <a :href="href" @click="navigate" class="text-decoration-line: no-underline hover:text-white "> <div class="w-full">Home</div></a>
            </li>
          </router-link>
        </div>
        <div
          class="block mt-4 md:inline-block md:mt-0 text-white text-2xl rounded-lg bg-black bg-opacity-0 hover:bg-opacity-10 text-opacity-60 list-none px-2 mx-2"
        >
          <router-link
            to="/menu"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
              ]"
            >
              <a :href="href" @click="navigate" class="text-decoration-line: no-underline hover:text-white "><div class="w-full">Menu</div></a>
            </li>
          </router-link>
        </div>
        <div
          class="block mt-4 md:inline-block md:mt-0 text-white text-2xl rounded-lg bg-black bg-opacity-0 hover:bg-opacity-10 text-opacity-60 list-none px-2 mx-2"
        >
          <router-link
            to="/table_plan"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
              ]"
            >
              <a :href="href" @click="navigate" class="text-decoration-line: no-underline hover:text-white"> <div class="w-full"> Table Plan</div></a>
            </li>
          </router-link>
        </div>
        <div
          class="block mt-4 md:inline-block md:mt-0 text-white text-2xl rounded-lg  bg-black bg-opacity-0 hover:bg-opacity-10 text-opacity-60 list-none px-2 mx-2"
        >
          <router-link
            to="/live_view"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
              ]"
            >
              <a :href="href" @click="navigate" class="text-decoration-line: no-underline hover:text-white "> <div class="w-full"> Live View</div></a>
            </li>
          </router-link>
        </div>
        <div
          class="block mt-4 md:inline-block md:mt-0 text-white text-2xl  rounded-lg bg-black bg-opacity-0 hover:bg-opacity-10 text-opacity-60 list-none px-2 mx-2"
        >
          <!-- <router-link to="/restaurant_detail" class="text-decoration-line: no-underline hover:text-white">Restaurant details</router-link> -->
          <router-link
            to="/restaurant_detail"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
              ,]"
            >
              <a :href="href" @click="navigate" class="text-decoration-line: no-underline hover:text-white"> <div class="w-full"> Restaurant Details </div></a>
            </li>
          </router-link>
        </div>
      </div>
      <div>
        <div
          class="inline-block mx-3 text-sm p-3 leading-none border rounded-full text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        ></div>
      </div>
    </div>
  </nav>
</template>

<script>
import { inject } from "vue";
import { UserCircleIcon, LogoutIcon } from "@heroicons/vue/outline";

export default {
  components: {
    UserCircleIcon,
    LogoutIcon,
  },
  name: "NavBar",
  inject: ["Auth"],
  data: function() {
    const lang = localStorage.getItem("lang") || "en";
    return {
      lang: lang,
    };
  },
  methods: {
    login() {
      this.Auth.loginWithRedirect();
    },
    logout() {
      this.Auth.logout();
      this.$router.push({ path: "/" });
    },
  },
  setup() {
    const auth = inject("Auth");
    return { ...auth };
  },
};
</script>

<style scoped>
#mobileAuthNavBar {
  min-height: 125px;
  justify-content: space-between;
}

nav li.router-link-exact-active {
   color: white;
   cursor: pointer;
 }

</style>
