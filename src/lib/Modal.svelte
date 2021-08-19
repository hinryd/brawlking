<script lang="ts">
    export let open = false
</script>

{#if open}
    <aside class="fixed w-screen h-screen bg-black bg-opacity-50">
        <button on:click={() => (open = false)}>Close</button>
    </aside>
{/if}
