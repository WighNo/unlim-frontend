<script setup>
/* eslint-disable */
import Menubar from 'primevue/menubar';
import Button from 'primevue/button'
import router from '@/router';
import { ref } from "vue";

const items = ref([
    {
        label: 'Главная',
        icon: 'pi pi-fw pi-user',
        command: () => router.push({ name: 'home' })
    },
    {
        label: 'Формирование групп',
        icon: 'pi pi-fw pi-pencil',
        command: () => router.push({ name: 'task' })
    },
]);
</script>

<template>
    <Menubar :model="items"/>
</template>