<template>
    <div className="food-card">
        <div className="menu-card">
            <div className="menu-image" style="backgroundImage: {{image}}"></div>
            <div className="menu-title">
                <h5>{{dish.name}}</h5>
            </div>
            <div className="description-frame">
                <p className="menu-description">{{dish.description}}</p>
            </div>
            <div className="plus-icon"></div>
        </div>
    </div>
</template>
<script lang="ts">
    import { onMounted, ref } from 'vue'
    import {convertNumberArrayToImageUrl} from '../utils'

export default ({

    setup() {
        const dish = ref<Dish>({id:0,name:"",description:"",image:[]})
        let image = "";

        onMounted(() => {
            image = convertNumberArrayToImageUrl(dish.value.image)
        })
        return {dish, image};
    },
})
</script>
