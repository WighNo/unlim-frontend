<script setup>
import Image from 'primevue/image';

</script>

<template>
  <div class="grid">
      <div class="col"></div>
      <div class="text-center">
          <Image class="mt-5 border-round-3xl" :src="require(`@/assets/photo.jpg`)" alt="Image" width="250" preview />
          <div class="text-4xl font-light text-800">Рудных Павел</div>
      </div>
      <div class="col"></div>
  </div>
</template>