<script setup>
import {ref} from "vue";

// eslint-disable-next-line
const props = defineProps({
    groupTitle: {
        required: true
    },
    data: {
        required: true
    }
})

// eslint-disable-next-line
const emits = defineEmits(['playerRemoved']);
const selectedPlayer = ref(null);

function selectPlayer(player){
    if(selectedPlayer.value !== null && selectedPlayer.value.id === player.id){
        tryRemoveFromGroup(player)
        return;
    }
    
    selectedPlayer.value = player;
}

function tryRemoveFromGroup(player){
    emits('playerRemoved', props.groupTitle, player);
    selectedPlayer.value = null;
}
</script>

<template>
    <div class="flex flex-column align-items-center">
        <p class="text-xl text-gray-800">{{props.groupTitle}}</p>
        <div class="w-17rem h-17rem bg-gray-200 px-4 pt-1">
            <div v-for="player in props.data" :key="player" class="group-record -m-2">
                <div v-if="player != null">
                <p  class="text-xl text-center text-700 p-1" @click="selectPlayer(player)">
                    {{player.name}} {{player.surname}}
                </p>
                </div>
                <div v-else class="group-record-empty">
                    dwdw
                </div>
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

.group-record-empty{
    cursor: pointer;
    user-select: none;
    background-color: rgba(250, 250, 250, 0.49);

    :hover {
        outline: 1px solid #7da7c7;
    }
}
</style>