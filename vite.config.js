import { resolve } from 'path';
import watchAndRun from 'vite-plugin-watch-and-run'

export default {
    root: resolve(__dirname, 'src'),
    build: {
        outDir: '../dist'
    },
    plugins: [
        watchAndRun([
            {
                name: 'build',
                watchKind: ['add', 'change', 'unlink'],
                watch: resolve('src/**/*'),
                run: 'npm run build',
                delay: 300
            }
        ]),
    ]
}
