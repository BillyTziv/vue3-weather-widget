<template>
    <div class="m-2 bg-white rounded-lg bg-opacity-50 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <a href="#" class="block max-w-sm p-6 ">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              {{ data }} {{ metric }}
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 text-center">
              {{ label }}
            </p>
        </a>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        data: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        metric: {
            type: String,
            default: '',
        },
    });
</script>
