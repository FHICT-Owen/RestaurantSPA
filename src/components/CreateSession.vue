<template>
  <div></div>
</template>

<script lang="ts">

import router from '../router/index'
import SessionDataService from '../services/SessionDataService'
import RestaurantDataService from '../services/RestaurantDataService'
import { Session } from '../classes'
import { VueCookieNext } from 'vue-cookie-next'

const randomstring = require('randomstring')

export default {
  setup() {
    const tableQuery = <string>router.currentRoute.value.query.tableId
    if (tableQuery == null) return console.log('test')
    const tableId = Number.parseInt(tableQuery)
    let secret = randomstring(25)
    let cookie = VueCookieNext.getCookie('GenericRestaurantSesh')
    if(cookie == null) {
      cookie = VueCookieNext.setCookie('GenericRestaurantSesh', `${secret}`)
    } else {
      secret = cookie
    }
    const tableObj = RestaurantDataService.getTable(tableId)
    tableObj.then( table => {
      if (table.isActive && !table.inUse) {
        const session = new Session(0, tableId, secret)
        SessionDataService.createSession(session).then(val => {
          console.log(val)
          if(val != false) {
            console.log(val)
            RestaurantDataService.setInUse(tableId).then(val => {
              if(val) {
                console.log(val)
                router.push('menu')
              } else {
                SessionDataService.removeSession(val)
              }
            })            
          }
        })
      }
      return
    }).catch()
    
  }
}
</script>