import createAuth0Client, {
  Auth0Client,
  GetIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  RedirectLoginOptions,
  User
} from '@auth0/auth0-spa-js'
import { App, Plugin, computed, reactive, watchEffect, ComputedRef } from 'vue'
import { NavigationGuardWithThis } from 'vue-router'

let client: Auth0Client

interface Auth0PluginState {
  loading: boolean,
  isAuthenticated: boolean;
  user: User | undefined,
  popupOpen: boolean;
  error: any
}

const state = reactive<Auth0PluginState>({
  loading: true,
  isAuthenticated: false,
  user: {},
  popupOpen: false,
  error: null
})

async function handleRedirectCallback () {
  state.loading = true
  try {
    await client.handleRedirectCallback()
    state.user = await client.getUser()
    state.isAuthenticated = true
  } catch (e) {
    state.error = e
  } finally {
    state.loading = false
  }
}

const loginWithRedirect = (o: RedirectLoginOptions) => client.loginWithRedirect(o)

const getIdTokenClaims = (o: GetIdTokenClaimsOptions) => client.getIdTokenClaims(o)

const getTokenSilently = (o: GetTokenSilentlyOptions) => client.getTokenSilently(o)

const getTokenWithPopup = (o: GetTokenWithPopupOptions) => client.getTokenWithPopup(o)

const logout = (o: LogoutOptions) => client.logout(o)

const authPlugin = {
  isAuthenticated: computed(() => state.isAuthenticated),
  loading: computed(() => state.loading),
  user: computed(() => state.user),
  getIdTokenClaims,
  getTokenSilently,
  getTokenWithPopup,
  handleRedirectCallback,
  loginWithRedirect,
  logout
}

export interface AuthPlugin {
  isAuthenticated: ComputedRef<boolean>
  loading: ComputedRef<boolean>
  user: ComputedRef<any> // TODO: replace any type
  getIdTokenClaims: () => Promise<IdToken>
  getTokenSilently: () => Promise<string>
  getTokenWithPopup: () => Promise<string>
  handleRedirectCallback: () => Promise<void>
  loginWithRedirect: () => Promise<void>
  logout: () => void | Promise<void>
}

const routeGuard: NavigationGuardWithThis<undefined> = (to: any, from: any, next: any) => {
  const { isAuthenticated, loading, loginWithRedirect } = authPlugin

  const verify = async () => {
    // If the user is authenticated, continue with the route
    if (isAuthenticated.value) return next()

    // Otherwise, log in
    await loginWithRedirect({ appState: { targetUrl: to.fullPath } })
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!loading.value) return verify()

  // Watch for the loading property to change before we check isAuthenticated
  watchEffect(() => {
    if (!loading.value) return verify()
  })
}

interface Auth0PluginOptions {
  domain: string,
  clientId: string,
  audience: string,
  redirectUri: string,

  onRedirectCallback(appState: any): void
}

async function init (options: Auth0PluginOptions): Promise<Plugin> {
  client = await createAuth0Client({
    // domain: process.env.VUE_APP_AUTH0_DOMAIN,
    // client_id: process.env.VUE_APP_AUTH0_CLIENT_KEY,
    domain: options.domain,
    client_id: options.clientId,
    audience: options.audience,
    redirect_uri: options.redirectUri
  })

  try {
    // If the user is returning to the app after authentication
    if (
      window.location.search.includes('code=') &&
      window.location.search.includes('state=')
    ) {
      // handle the redirect and retrieve tokens
      const { appState } = await client.handleRedirectCallback()

      // Notify subscribers that the redirect callback has happened, passing the appState
      // (useful for retrieving any pre-authentication state)
      options.onRedirectCallback(appState)
    }
  } catch (e) {
    state.error = e
  } finally {
    // Initialize our internal authentication state
    state.isAuthenticated = await client.isAuthenticated()
    state.user = await client.getUser()
    if (state.user) {
      if (state.user['http://restaurant-manager/roles']) {
        state.user.roles = state.user['http://restaurant-manager/roles']
        delete state.user['http://restaurant-manager/roles']
      }        
    }
    state.loading = false
  }

  return {
    install: (app: App) => {
      app.provide('Auth', authPlugin)
    }
  }
}

interface Auth0Plugin {
  init(options: Auth0PluginOptions): Promise<Plugin>;
  routeGuard: NavigationGuardWithThis<undefined>
}

export const Auth0: Auth0Plugin = {
  init,
  routeGuard
}
