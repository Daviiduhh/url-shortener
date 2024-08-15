<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ placeholder: string }>()

const longUrl = ref("")


</script>

<template>
  <div class="url-shortener">
    <div class="url-shortener__payload glass">
      <input v-model="longUrl" :placeholder="placeholder" type="text">
      <button @click="$emit('shortUrl', longUrl)">Short!</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.url-shortener {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  &__payload {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1rem;

    border-radius: 5px;
    padding: 0.5rem 1rem;
  }
}
</style>
