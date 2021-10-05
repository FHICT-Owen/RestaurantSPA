import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import {Auth0} from "@/auth";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import store from "./store";

const functions = require('firebase-functions');

async function init() {
  if (process.env.VUE_APP_AUTH0_CLIENT_KEY == null) {
    const AuthPlugin = await Auth0.init({
      onRedirectCallback: (appState) => {
        router.push(
          appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname,
        )
      },
      clientId: functions.config().auth0.clientid,
      domain: functions.config().auth0.domain,
      audience: functions.config().auth0.audience,
      redirectUri: window.location.origin,
    });
    const app = createApp(App);
    library.add(faLink, faUser, faPowerOff);
    app
      .use(AuthPlugin)
      .use(store)
      .use(router)
      .component("font-awesome-icon", FontAwesomeIcon)
      .mount('#app');
  } else {
    const AuthPlugin = await Auth0.init({
      onRedirectCallback: (appState) => {
        router.push(
          appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname,
        )
      },
      clientId: process.env.VUE_APP_AUTH0_CLIENT_KEY,
      domain: process.env.VUE_APP_AUTH0_DOMAIN,
      audience: process.env.VUE_APP_AUTH0_AUDIENCE,
      redirectUri: window.location.origin,
    });
    const app = createApp(App);
    library.add(faLink, faUser, faPowerOff);
    app
      .use(AuthPlugin)
      .use(store)
      .use(router)
      .component("font-awesome-icon", FontAwesomeIcon)
      .mount('#app');
  }    
}

init();