<script lang="ts">

import router from '../router/index'
import SessionDataService from '../services/SessionDataService'
import RestaurantDataService from '../services/RestaurantDataService'
import { Session } from '../classes'
import { VueCookieNext } from 'vue-cookie-next'

function createSecret(length: number): string {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var charactersLength = characters.length
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
 charactersLength))
  }
  return result
}

export default {
  setup() {
    const tableQuery = <string>router.currentRoute.value.query.tableId
    if (tableQuery == null) return console.log('test')
    const tableId = Number.parseInt(tableQuery)
    let secret = createSecret(25)
    let cookie = VueCookieNext.getCookie('GenericRestaurantSesh')
    if(cookie == null) {
      cookie = VueCookieNext.setCookie('GenericRestaurantSesh', `${secret}`)
    } else {
      secret = cookie
    }
    const tableObj = RestaurantDataService.getTable(tableId)
    tableObj.then( table => {
      if (table.isActive && table.inUse == false) {
        const session = new Session(0, tableId, secret)
        SessionDataService.createSession(session).then(val => {
          if(val) {
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