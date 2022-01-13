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
import TableDataService from '@/services/TableDataService'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  setup() {
    const tableQuery = <string>router.currentRoute.value.query.tableId
    if (tableQuery != null) {
      const tableId = Number.parseInt(tableQuery)
      console.log(`tableId: ${tableId}`)
      const cookie = VueCookieNext.getCookie('GenericRestaurantSesh')
      try { SessionDataService.getSessionByCookie(cookie) } catch { VueCookieNext.removeCookie('GenericRestaurantSesh')}
      let secret = stringGen({length: 25})
      let tableObj = TableDataService.getTable(tableId)
      tableObj.then( async table => {
        if (table.isActive && !table.inUse) {
          if(!!cookie) {
            secret = cookie
          }
          const session = new Session(0, tableId, secret)
          try {
            await SessionDataService.createSession(session).then(response => {
              console.log(response)
              if (response == true) {
                RestaurantDataService.setInUse(tableId, true).then(val => {
                  console.log(val)
                  if(val != null) {
                    VueCookieNext.setCookie('GenericRestaurantSesh', `${secret}`)
                    router.push('session_page')
                  } else {
                    SessionDataService.removeSession(tableId)
                  }
                })
              }
            })
          } catch { return router.push('/') }
        }
      }).catch()
    } else { return router.push('/') }  
  }
})
</script>