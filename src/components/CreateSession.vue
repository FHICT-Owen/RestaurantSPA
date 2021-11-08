<template>
  <div></div>
</template>

<script lang="ts">

import router from '../router/index'
import SessionDataService from '../services/SessionDataService'
import RestaurantDataService from '../services/RestaurantDataService'
import { Session } from '../classes'
import { VueCookieNext } from 'vue-cookie-next'
import stringGen from 'crypto-random-string'

export default {
  setup() {
    const tableQuery = <string>router.currentRoute.value.query.tableid
    if (tableQuery == null) return console.log('test')
    const tableId = Number.parseInt(tableQuery)
    console.log(`tableId: ${tableId}`)
    let cookie = VueCookieNext.getCookie('GenericRestaurantSesh')
    // try { SessionDataService.getSessionByCookie(cookie) } catch { VueCookieNext.removeCookie('GenericRestaurantSesh')}
    let secret = stringGen({length: 25})
    const tableObj = RestaurantDataService.getTable(tableId)
    tableObj.then( table => {
      if (table.isActive && !table.inUse) {
        if(!!cookie) {
          secret = cookie
        }
        const session = new Session(0, tableId, secret)
        SessionDataService.createSession(session).then(response => {
          console.log(response)
          if (response == true) {
            RestaurantDataService.setInUse(tableId, true).then(val => {
              console.log(val)
              if(val) {                
                VueCookieNext.setCookie('GenericRestaurantSesh', `${secret}`)
                router.push('session_page')
              } else {
                SessionDataService.removeSession(tableId)
              }
            })            
          } else {
            SessionDataService.removeSession(tableId)
          }         
        }).catch(() => {return})
      }
    }).catch()    
  }
}
</script>