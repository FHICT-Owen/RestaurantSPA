<template>
  <!-- <div class="nav-container">
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
  </div> -->

  <nav class="flex items-center justify-between flex-wrap shadow-sm">
    <div
      class="w-full block flex-grow md:flex sm:items-center md:w-auto py-4 z-50"
      style="background-color: #FFA825"
    >
      <div class="block ml-3 md:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 border-white text-white"
          @click="toggleNav"
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
      <div class="text-sm md:flex-grow" v-if="showNav">
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
              <a
                :href="href"
                @click="navigate"
                class="text-decoration-line: no-underline hover:text-white "
              >
                <div class="w-full">Home</div></a
              >
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
              <a
                :href="href"
                @click="navigate"
                class="text-decoration-line: no-underline hover:text-white "
                ><div class="w-full">Menu</div></a
              >
            </li>
          </router-link>
        </div>
        <div
          class="block mt-4 md:inline-block md:mt-0 text-white text-2xl rounded-lg bg-black bg-opacity-0 hover:bg-opacity-10 text-opacity-60 list-none px-2 mx-2"
        >
          <router-link
            to="/table_plan"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            v-if="isAuthenticated && (user.roles.includes('RestaurantOwner') || user.roles.includes('Waiter'))"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
              ]"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-decoration-line: no-underline hover:text-white"
              >
                <div class="w-full">Table Plan</div></a
              >
            </li>
          </router-link>
        </div>
        <div
          class="block mt-4 md:inline-block md:mt-0 text-white text-2xl rounded-lg  bg-black bg-opacity-0 hover:bg-opacity-10 text-opacity-60 list-none px-2 mx-2"
        >
          <router-link
            to="/live_view"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            v-if="isAuthenticated && (user.roles.includes('RestaurantOwner') || user.roles.includes('KitchenStaff'))"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
              ]"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-decoration-line: no-underline hover:text-white "
              >
                <div class="w-full">Live View</div></a
              >
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
            v-if="isAuthenticated && user.roles.includes('RestaurantOwner')"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
                ,
              ]"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-decoration-line: no-underline hover:text-white"
              >
                <div class="w-full">Restaurant Details</div></a
              >
            </li>
          </router-link>
        </div>
        <div
          class="block mt-4 md:inline-block md:mt-0 text-white text-2xl  rounded-lg bg-black bg-opacity-0 hover:bg-opacity-10 text-opacity-60 list-none px-2 mx-2"
        >
          <!-- <router-link to="/restaurant_detail" class="text-decoration-line: no-underline hover:text-white">Restaurant details</router-link> -->
          <router-link
            to="/inventory"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            v-if="isAuthenticated && user.roles.includes('RestaurantOwner')"
            custom
          >
            <li
              :class="[
                isActive && 'router-link-active',
                isExactActive && 'router-link-exact-active',
                ,
              ]"
            >
              <a
                :href="href"
                @click="navigate"
                class="text-decoration-line: no-underline hover:text-white"
              >
                <div class="w-full">Inventory</div></a
              >
            </li>
          </router-link>
        </div>
        <div class="inline-block md:float-right">
          <button
            @click="
              if (isAuthenticated) {
                logout();
              } else {
                login();
              }
            "
            class="inline-block mx-3 mt-3 text-sm p-3 leading-none border rounded-lg text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-black  md:mt-0 "
          >
            {{ isAuthenticated ? "Log Out" : "Log In" }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { inject, defineComponent, ref, computed } from 'vue'
// import { UserCircleIcon, LogoutIcon } from '@heroicons/vue/outline'
import { AuthPlugin } from '@/auth'
import router from '@/router'

export default defineComponent({
  components: {
    // UserCircleIcon,
    // LogoutIcon,
  },
  setup() {
    const auth = inject<AuthPlugin>('Auth')
    let showNavOnMobile = ref(false)
    let currentWidth = ref(window.innerWidth)
    let showNav = computed(() =>
      currentWidth.value >= 768 ? true : showNavOnMobile.value
    )

    // screen size > 768 else-if (shownavonmobile
    // let showNav = computed(() => )
    function login() {
      if (!!auth) auth.loginWithRedirect()
    }

    function logout() {
      if (!!auth) {
        auth.logout()
        router.push('/')
      }
    }

    function toggleNav() {
      showNavOnMobile.value = !showNavOnMobile.value
    }

    function reportWindowWidth() {
      currentWidth.value = window.innerWidth
    }

    window.onresize = reportWindowWidth
    return {
      ...auth,
      showNavOnMobile,
      login,
      logout,
      toggleNav,
      showNav,
      currentWidth
    }
  },
})
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
