<script lang="ts" context="module">
    export async function load({ page, fetch }) {
        const { id } = page.params
        const map = await fetch(
            `https://api.brawlapi.com/v1/maps/${id}`
        ).then(res => res.json())
        return { props: { map } }
    }
</script>

<script lang="ts">
    export let map: {
        environment: any
        stats: any[]
        name: string
        teamStats: any[]
        imageUrl: string
    }

    async function getBrawler(id) {
        return await fetch(
            `https://api.brawlapi.com/v1/brawlers/${id}`
        ).then(res => res.json())
    }
</script>

<main class="max-w-xl mx-auto">
    <figure class="relative">
        <img src={map.environment.imageUrl} alt="Environment" />

        <figcaption class="absolute flex justify-center -bottom-5 w-full">
            <span class="text-4xl font-bold bg-white bg-opacity-80 rounded p-2"
                >{map.name}</span
            >
        </figcaption>
    </figure>

    <div class="p-4">
        <h2 class="text-2xl font-bold text-center mb-3 text-gray-500">
            Brawlers
        </h2>
        <div class="grid grid-cols-2 gap-2">
            {#if !map.stats}
                <p class="text-center">No data available</p>
            {:else}
                {#each map.stats
                    .sort((a, b) => b.winRate - a.winRate)
                    .slice(0, 10) as stat}
                    <div class="flex justify-between border">
                        {#await getBrawler(stat.brawler)}
                            <p>Loading...</p>
                        {:then brawler}
                            <img
                                class="h-20 w-20"
                                src={brawler.imageUrl}
                                alt={brawler.name}
                                loading="lazy"
                            />
                        {/await}

                        <div
                            class="font-mono text-right flex flex-col justify-center pr-2"
                        >
                            <p>{stat.winRate.toFixed(2)}% 👍</p>
                            <p>{stat.useRate.toFixed(2)}% 🔥</p>
                            <p>{stat.starRate.toFixed(2)}% ⭐</p>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>
    </div>

    <div class="p-4">
        <h2 class="text-2xl font-bold text-center mb-3 text-gray-500">Teams</h2>
        {#if !map.teamStats}
            <p class="text-center">No data available</p>
        {:else}
            {#each map.teamStats
                .sort((a, b) => b.data.winRate - a.data.winRate)
                .slice(0, 5) as teamStat}
                <div class="flex justify-between border mb-2">
                    <div class="flex">
                        {#each teamStat.hash.split('+') as brawler}
                            <img
                                class="h-20 w-20"
                                src="https://cdn.brawlify.com/brawler/{brawler}.png"
                                alt={brawler}
                                loading="lazy"
                            />
                        {/each}
                    </div>

                    <div
                        class="font-mono text-right flex flex-col justify-center pr-2"
                    >
                        <p>{teamStat.data.winRate.toFixed(2)}% 👍</p>
                        <p>{teamStat.data.useRate.toFixed(2)}% 🔥</p>
                        <p>{teamStat.data.total} games 🎮</p>
                    </div>
                </div>
            {/each}
        {/if}
    </div>

    <h2 class="text-2xl font-bold text-center text-gray-500">Map</h2>
    <img src={map.imageUrl} alt="Map" loading="lazy" />
</main>
