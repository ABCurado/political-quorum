export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', '[data-mode="dark"]'],
	plugins: [
		require('flowbite/plugin')
	],
	theme: {
		extend: {
			colors: {
				transparent: 'transparent',
			  },
		},
		fontFamily: {
			body: [],
			sans: []
		},
		backdropBlur: {
			'none': '0',
			'blur': 'blur(40px)',
		}
	}
};
