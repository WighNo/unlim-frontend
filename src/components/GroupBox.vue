<script setup>
import {onMounted} from "vue";

// eslint-disable-next-line
const props = defineProps({
    groupTitle: {
        required: true
    },
    data: {
        required: true
    }
})

onMounted(() =>{
    console.log(props.data.value.length)
})
</script>

<template>
    <div class="flex flex-column align-items-center">
        <p class="text-xl text-gray-800">{{props.groupTitle}}</p>
        <div class="w-17rem h-17rem bg-gray-200 px-4 pt-1">
            <div v-for="player in props.data.value" :key="player" class="group-record -m-2">
                <p class="text-xl text-center text-700 p-1">
                    {{player.name}} {{player.surname}}
                </p> 
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.group-record{
    cursor: pointer;
    user-select: none;
    background-color: #fafafa;
    
    :hover {
        outline: 1px solid #7da7c7;
    }
}
</style>