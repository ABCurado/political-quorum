import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [enhancedImages(),sveltekit()],
	build: {
		rollupOptions: {
			external: ["eu-parliment-votes-sdk"]
		}
	}
});
