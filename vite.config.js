import { sveltekit } from '@sveltejs/kit/vite';
import path, { dirname } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@peerpiper/dag-jose-kit': path.resolve('src/lib')
		}
	},
	// workaround for common-js issues of default export
	// https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
	build: {
		commonjsOptions: {
			include: [/immortal-db/, /node_modules/, /hypns/]
		}
	},
	optimizeDeps: {
		include: ['immortal-db', 'hypns']
	}
};

export default config;
