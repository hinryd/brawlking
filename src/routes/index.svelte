<script lang="ts" context="module">
    export async function load({ fetch }) {
        const maps = await fetch('https://api.brawlapi.com/v1/maps').then(res =>
            res.json()
        )
        return { props: { maps: maps.list } }
    }
</script>

<script lang="ts">
    export let maps: any[]

    import fuse from '../fuse'

    let query = ''
    let showModal = false
    let filteredMaps: any[]

    const searchMaps = (query: string) =>
        fuse(maps, { keys: ['name'] }).search(query)
    const toggleModal = () => (showModal = !showModal)

    $: if (query) {
        filteredMaps = searchMaps(query)
            .map(obj => obj.item)
            .filter(map => !map.disabled)
    } else {
        filteredMaps = maps.filter(map => !map.disabled)
    }
</script>

<main>
    <div class="sticky top-0 p-3 bg-indigo-700">
        <input
            class="w-full px-4 py-2 rounded-full"
            placeholder="Search maps..."
            bind:value={query}
        />
    </div>

    {#each filteredMaps as map}
        <a
            class="flex justify-between border-b w-full text-left"
            w-active="bg-gray-200"
            on:click={toggleModal}
            href="/maps/{map.id}"
        >
            <div class="p-4 w-full">
                <div class="flex w-full">
                    <h2 class="font-bold text-xl">{map.name}</h2>
                    <span class="flex-grow text-xs font-mono text-bottom"
                        >v{map.version}</span
                    >
                    <span class="font-mono text-xs text-gray-300">
                        {map.id}
                    </span>
                </div>

                <div class="flex justify-between">
                    <div
                        class="inline text-xs text-white p-1 rounded"
                        style="background-color: {map.gameMode.color}"
                    >
                        {map.gameMode.name}
                    </div>
                    {#if map.disabled}
                        <div class="inline text-xs p-1 bg-red-400 rounded">
                            Inactive
                        </div>
                    {:else}
                        <div class="inline text-xs p-1 bg-green-400 rounded">
                            Active
                        </div>
                    {/if}
                </div>
            </div>
        </a>
    {/each}
</main>
