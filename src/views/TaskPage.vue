<script setup>
/* eslint-disable */
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import GroupBox from "@/components/GroupBox.vue";

import {Players} from "@/data/Source.js";
import {Grouper} from "@/scripts/Grouper";
import {onMounted, ref} from "vue";

const reactiveFirst = ref([])

const grouper = new Grouper(
    ['Группа 1', 'Группа 2'],
    (value) => {reactiveFirst.value.push(value)}, 
    () => {}
)

const players = ref(Array.from(Players));
const selectedPlayer = ref(null);
const mock = ref();

function onPlayerSelected(player){
    if(selectedPlayer.value != null && selectedPlayer.value.id === player.id){
        addPlayerToGroup();
        return;
    }
    
    selectedPlayer.value = player;
}

function addPlayerToGroup(){
    grouper.addToGroup(selectedPlayer.value);
    removeFreePlayer();
    selectedPlayer.value = null;
}

function removeFreePlayer(){
    const index = players.value.indexOf(selectedPlayer.value);
    players.value.splice(index, 1);
}

onMounted(() => {
    console.log(players.value)
    players.value.forEach(element => {
        element.fullName = `${element.name} ${element.surname}`
    })
})
</script>

<template>
    <div class="grid mt-2">
        <div class="col-1"></div>
        <div class="col-4">
        <DataTable v-model:selection="mock" @update:selection="onPlayerSelected" class="user-select-none border-1 border-400" :value="players" selectionMode="single">
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
                <GroupBox :group-title="grouper.getGroupName(0)" :data="grouper.getReactive(0)"/>
                <GroupBox :group-title="grouper.getGroupName(1)" :data="grouper.getReactive(1)"/>
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