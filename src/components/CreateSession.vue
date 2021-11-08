<script lang="ts">

import router from '../router/index'
import SessionDataService from '../services/SessionDataService'
import RestaurantDataService from '../services/RestaurantDataService'
import { Session } from '../classes'
import { VueCookieNext } from 'vue-cookie-next'
import stringGen from 'crypto-random-string'

export default {
  setup() {
    const tableQuery = <string>router.currentRoute.value.query.tableId
    if (tableQuery == null) return console.log('test')
    const tableId = Number.parseInt(tableQuery)
    let cookie = VueCookieNext.getCookie('GenericRestaurantSesh')
    let secret = stringGen({length: 25})
    const tableObj = RestaurantDataService.getTable(tableId)
    tableObj.then( table => {
      if (table.isActive && table.inUse == false) {
        if(!!cookie) {
          secret = cookie
        }
        const session = new Session(0, tableId, secret)
        SessionDataService.createSession(session).then(id => {
          console.log(id)
          RestaurantDataService.setInUse(tableId, true).then(val => {
            console.log(val)
            if(val) {                
              VueCookieNext.setCookie('GenericRestaurantSesh', `${secret}`)
              router.push('session_page')
            } else {
              SessionDataService.removeSession(id)
            }
          })            
          
        })
      }
      return
    }).catch()
    
  }
}
</script>