<script lang="ts">
    export let showModal
    export let toggleModal
    import { fade } from 'svelte/transition'
</script>

{#if showModal}
    <aside
        class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-50 p-5"
        transition:fade
    >
        <button
            class="absolute top-0 right-0 bg-white p-1"
            on:click={toggleModal}
            ><svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg></button
        >
        <div class="h-full w-full bg-white rounded shadow-xl" />
    </aside>
{/if}
