<script setup>
/* eslint-disable */
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import GroupBox from "@/components/GroupBox.vue";

import {Players} from "@/data/Source.js";
import {Grouper} from "@/scripts/Grouper";
import {onMounted, ref} from "vue";

const groups = ['Группа 1', 'Группа 2']
const grouper = new Grouper(
    groups,
    () => {
        removeFreePlayer();
        selectedPlayer.value = null;
    }, 
    () => {
        
    }
)

const players = ref(Array.from(Players));
const selectedPlayer = ref(null);

function tryAddPlayerToGroup(groupName){
    if(selectedPlayer.value != null){
        addPlayerToGroup(groupName);
    }
}

function addPlayerToGroup(groupName){
    grouper.addToGroup(groupName, selectedPlayer.value);

}

function removeFreePlayer(){
    const index = players.value.indexOf(selectedPlayer.value);
    players.value.splice(index, 1);
    selectedPlayer.value = null;
}

function onRemovedPlayerFromGroup(groupName, player){
    players.value.push(player);
    grouper.removeFromGroup(groupName, player)
}

onMounted(() => {
    players.value.forEach(element => {
        element.fullName = `${element.name} ${element.surname}`
    })
})
</script>

<template>
    <div class="grid mt-2">
        <div class="col-1"></div>
        <div class="col-4">
        <DataTable v-model:selection="selectedPlayer" class="user-select-none border-1 border-400" :value="players" selectionMode="single">
            <Column header="№" style="width: 15%;">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="fullName" header="ФИО" sortable style="width: 30%"></Column>
            <Column field="birthday" header="Дата рождения" sortable style="width: 25%"></Column>
        </DataTable>
        </div>
        <div class="col-1"></div>
        <div class="col-5">
            <div class="flex justify-content-between w-100">
                <GroupBox v-for="group in groups"
                          :group-title="group" 
                          :data="grouper.getReactive(group)"
                          @click="tryAddPlayerToGroup(group)"
                          @player-removed="onRemovedPlayerFromGroup"/>
            </div>
        </div>
        <div class="col-1"></div>
    </div>
</template>

<style scoped>
.user-select-none{
    user-select: none;
}
</style>