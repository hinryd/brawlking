<script lang="ts">
    import { onMount } from 'svelte'
    onMount(() =>
        window.addEventListener('sveltekit:navigation-end', () =>
            console.log('hello')
        )
    )
</script>
