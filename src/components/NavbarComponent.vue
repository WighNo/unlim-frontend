<script setup>
/* eslint-disable */
import Menubar from 'primevue/menubar';
import Button from 'primevue/button'
import router from '@/router';
import { ref } from "vue";

const items = ref([
    {
        label: 'Обо мне',
        icon: 'pi pi-fw pi-user',
        command: () => router.push({ name: 'about-me' })
    },
    {
        label: 'Задание',
        icon: 'pi pi-fw pi-pencil',
        command: () => router.push({ name: 'task' })
    },
]);
</script>

<template>
    <Menubar :model="items"/>
</template>