<script setup>
import Image from 'primevue/image';
import Divider from "primevue/divider";

const abilities = [
    'Опыт работы: ТИНГ, ~7 месяцев',
    'Занимался разработкой игр на Unity',
    'Создавал telegram-ботов на Python и C#',
    'Писал Backend на ASP.NET',
    'Разрабатывал ботов на ASP.NET и Python',
    'Дорабатывал API на Python (FastAPI)',
    'Vue 3 frontend'
] 
</script>

<template>
    <div class="grid">
        <div class="col"></div>
        <div class="text-center">
            <Image class="mt-5 border-round-3xl" :src="require(`@/assets/photo.jpg`)" alt="Image" width="250" preview />
            <div class="text-4xl font-light text-800">Рудных Павел</div>
            <div class="text-500 text-sm">Хочу быть как Мэри Сью</div>
        </div>
        <div class="col"></div>
    </div>
    <div class="flex justify-content-center">
        <Divider class="text-center w-30rem"/>
    </div>
    <div class="text-center">
        <div v-for="ability in abilities" :key="ability" class="text-2xl mt-5">
            {{ability}}
        </div>
    </div>
</template>