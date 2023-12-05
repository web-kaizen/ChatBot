import { resolve } from 'path'

export default {
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                botx: resolve(__dirname, 'botx/index.html'),
                buttons: resolve(__dirname, 'buttons/index.html'),
                fullcomp: resolve(__dirname, 'fullcomp/index.html'),
                inputs: resolve(__dirname, 'inputs/index.html'),
                modals: resolve(__dirname, 'modals/index.html'),
            }
        }
    }
}