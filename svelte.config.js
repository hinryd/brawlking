import preprocess from 'svelte-preprocess'
import WindiCSS from 'vite-plugin-windicss'
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        target: 'body',
        vite: () => ({
            plugins: [WindiCSS.default()]
        }),
        adapter: vercel()
    }
}

export default config
