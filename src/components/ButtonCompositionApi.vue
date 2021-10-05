<template>
    <button @click="increment">increment: count {{count}} (composition api) </button>
</template>

<script lang="ts">
import store from '@/store'
import { computed } from 'vue'

export default ({
	setup() {
		let count = computed(() => store.state.countComp)

		const increment = () => {
			store.dispatch('incrementComp')
		}

		return { count, increment }
	}
})
</script>