import cesium from 'vite-plugin-cesium';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ['@unocss/nuxt'],
  devtools: { enabled: true },
  unocss: { attributify: true },
  vite: { plugins: [cesium()] },
  css: ['@unocss/reset/tailwind.css'],
  runtimeConfig: { public: { cesiumToken: '' } }
})
