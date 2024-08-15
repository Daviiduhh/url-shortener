<template>
    <div v-show="errorMessage !== ''" class="error-message glass">
        {{ errorMessage }}
    </div>
</template>

<script lang="ts" setup>
defineProps<{ errorMessage: string }>()
</script>