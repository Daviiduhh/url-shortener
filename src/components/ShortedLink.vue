<template>
    <div class="url-shortener__response glass">
        <span>{{ shortenedUrl }}</span>
        <button @click="copyToClipboard(shortenedUrl)" @mouseleave="clipboardMessage = 'Copy to clipboard.'"
            class="url-shortener__response__copy">
            <span v-text="clipboardMessage" class="tooltip"></span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="height: 22px;">
                <path fill="#ffffff"
                    d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
            </svg>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

defineProps<{ shortenedUrl: string }>()

const clipboardMessage = ref("Copy to clipboard.")

const copyToClipboard = (str: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        clipboardMessage.value = "Copied to clipboard."
        return navigator.clipboard.writeText(str);
    }

    clipboardMessage.value = "The Clipboard API is not available."
    return Promise.reject('The Clipboard API is not available.');
};
</script>

<style lang="scss" scoped>
.url-shortener {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    &__response {
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 1rem;

        border-radius: 5px;
        padding: 0.5rem 1rem;

        &__copy {
            position: relative;
            display: inline-block;
            border-bottom: 1px dotted black;

            .tooltip {
                visibility: hidden;
                width: 120px;
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                z-index: 1;
                bottom: 125%;
                left: 50%;
                margin-left: -60px;
                opacity: 0;
                transition: opacity 0.3s;

                font-size: 0.7em;

                /* Glassmorphism effect */
                backdrop-filter: blur(16px) saturate(180%);
                -webkit-backdrop-filter: blur(16px) saturate(180%);
                background-color: rgba(229, 190, 255, 0.17);
                border-radius: 5px;
                border: 1px solid rgba(130, 108, 162, 0.13);

                &::after {
                    content: "";
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    margin-left: -5px;
                    border-width: 5px;
                    border-style: solid;
                    border-color: #555 transparent transparent transparent;
                }
            }

            &:hover {
                .tooltip {
                    visibility: visible;
                    opacity: 1;
                }
            }
        }
    }
}
</style>