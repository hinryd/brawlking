export default {
    darkMode: 'class',
    attributify: {
        prefix: 'w-'
    },
    theme: {
        extend: {
            animation: {
                flash: 'flash 500ms ease-in-out 1'
            }
        }
    },
    plugins: [
        require('windicss/plugin/scroll-snap'),
        require('windicss/plugin/forms')
    ]
}
