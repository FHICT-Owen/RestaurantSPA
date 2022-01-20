<template>
  <div class="flex items-center p-auto font-semibold justify-center text-4xl shadow text-white bg-indigo-500 h-screen">
    <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Loading session...
  </div>
</template>

<script lang="ts">
import router from '../router/index'
import SessionDataService from '../services/SessionDataService'
import { Session } from '../classes'
import { VueCookieNext } from 'vue-cookie-next'
import TableDataService from '@/services/TableDataService'
import { defineComponent, onMounted } from 'vue'
import store from '@/store'

export default defineComponent({
  setup() {
    // has cookie -> get session (validate if exists and validate if table id is correct) -> set table id -> go to menu page

    // has cookie -> get session (session or table id is not correct) -> clear cookie and push to home page

    // does not have cookie -> validate table id -> validate if table is active and not in use -> correct create new session -> set cookie -> commit tableId -> push to session_page

    // does not have cookie -> validate table -> incorrect push to home page

    onMounted(() => {
      const cookie = VueCookieNext.getCookie('sessionId')
      if (!!cookie)
        SessionDataService.getSessionByCookie(cookie)
          .then(response => {
            TableDataService.getTable(tableId).then(table => {
              if (table.isActive && table.inUse) {
                store.commit('setCurrentSession', response)
                return router.push('session_page')
              } else { 
                VueCookieNext.removeCookie('sessionId')
                return router.push('/') 
              }
            })
          })
          .catch(() => {
            VueCookieNext.removeCookie('sessionId')
            return router.push('/')
          })

      const tableId = parseInt(<string>router.currentRoute.value.query.tableId)
      if (!tableId) return router.push('/')

      TableDataService.getTable(tableId).then(async table => {
        if (table.isActive && !table.inUse) {
          try {
            TableDataService.setTableInUse(tableId)
              .then(() => { 
                SessionDataService.createSession(new Session(tableId, table.tableNumber))
                  .then(response => {
                    VueCookieNext.setCookie('sessionId', `${response.id}`)
                    store.commit('setCurrentSession', response)
                    router.push('session_page')
                  })
              })
          } catch { return router.push('/') }
        } else { return router.push('/') }
      })
    
    })
    
  }
})
</script>