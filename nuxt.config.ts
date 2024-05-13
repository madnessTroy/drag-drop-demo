// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	typescript: {
		typeCheck: true,
		strict: false,
	},

	imports: {
		dirs: ['@types/*.ts', '@types/**/*.ts'],
	},

	modules: ['@element-plus/nuxt'],
	elementPlus: {},

	css: ['@/assets/styles/main.scss'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
})
