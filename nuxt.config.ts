import cesium from 'vite-plugin-cesium';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@unocss/nuxt'],
  devtools: { enabled: true },
  unocss: { attributify: true },
  css: ['@unocss/reset/tailwind.css'],
  runtimeConfig: { public: { cesiumToken: '' } },
  vite: {
    plugins: [cesium()],
    server: {
      proxy: {
        '/api': {
          changeOrigin: true,
          target: 'https://sandcastle.cesium.com',
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      }
    }
  },
})
