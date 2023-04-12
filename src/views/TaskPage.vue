<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import {Players} from "@/data/Source.js";
import {ref} from "vue";

const players = Array.from(Players);
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
    selectedPlayer.value = null;
}
</script>

<template>
    <div class="grid mt-2">
        <div class="col-1"></div>
        <div class="col-4">
        <DataTable v-model:selection="mock" @update:selection="onPlayerSelected" class="user-select-none" :value="players" selectionMode="single">
            <Column header="№" style="width: 15%;">
                <template #body="slotProps">
                    {{ slotProps.index + 1 }}
                </template>
            </Column>
            <Column field="name" header="Имя" sortable style="width: 25%"></Column>
            <Column field="birthday" header="Дата рождения" sortable style="width: 25%"></Column>
        </DataTable>
        </div>
        <div class="col-1"></div>
        <div class="col-5">
            <div class="flex justify-content-between w-100">
                <div class="flex flex-column align-items-center">
                    <p class="text-xl text-gray-800">Группа 1</p>
                    <div class="w-17rem h-17rem bg-gray-200">
                        
                    </div>
                </div>

                <div class="flex flex-column align-items-center">
                    <p class="text-xl text-gray-800">Группа 2</p>
                    <div class="w-17rem h-17rem bg-gray-200">

                    </div>
                </div>
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