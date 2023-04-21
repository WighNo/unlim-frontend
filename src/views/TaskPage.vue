<script setup>
/* eslint-disable */
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button"
import GroupBox from "@/components/GroupBox.vue";

import {Players, Groups} from "@/data/Source.js";
import {Grouper, Group} from "@/scripts/Grouper";
import {DataFormatter} from "@/scripts/DataFormatter";
import {onMounted, ref} from "vue";
import router from "@/router";
import {onBeforeRouteLeave} from "vue-router";

const hasNotSavedChanges = ref(false);

const groups = [new Group(Groups[0]), new Group(Groups[1])]
const grouper = new Grouper(
    groups,
    () => {
        removeFreePlayer();
        selectedPlayer.value = null;
        hasNotSavedChanges.value = true;
    }, 
    () => hasNotSavedChanges.value = true
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
    selectedPlayer.value = null;
    players.value.push(player);
    grouper.removeFromGroup(groupName, player)
}

function saveChanges(){
    const formatter = new DataFormatter(grouper)
    console.log(formatter.format())
    hasNotSavedChanges.value = false;
}

onMounted(() => {
    players.value.forEach(element => {
        element.fullName = `${element.name} ${element.surname}`
    })
})

onBeforeRouteLeave((to, from) => {
    if (hasNotSavedChanges.value === false) return true;

    if (hasNotSavedChanges.value === true && grouper.hasFreeGroup() === true) {
        alert("Сохраните внесённые изменения");
        return false;
    }

    const confirm = window.confirm("Сохранить внесённые изменения?");
    if (confirm === false) return false;
    saveChanges()
    router.push({name: 'home'})
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
                          :group-title="group.name" 
                          :group="grouper.getData(group.name)"
                          @click="tryAddPlayerToGroup(group)"
                          @player-removed="onRemovedPlayerFromGroup"/>
            </div>
            <Button :disabled="grouper.hasFreeGroup() || !hasNotSavedChanges"
                    @click="saveChanges"
                    class="mt-5 w-full"
                    label="Сохранить"/>
        </div>
        <div class="col-1"></div>
    </div>
</template>

<style scoped>
.user-select-none{
    user-select: none;
}
</style>