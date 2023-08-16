<script setup lang="ts">
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Ion, Viewer, Terrain, Cesium3DTileset } from 'cesium';

const runtimeConfig = useRuntimeConfig()
Ion.defaultAccessToken = runtimeConfig.public.cesiumToken;

onMounted(async () => {
    const viewer = new Viewer('cesiumContainer', {
        infoBox: false,
        terrain: Terrain.fromWorldTerrain()
    });

    try {
        const tileset = await Cesium3DTileset.fromUrl('https://assets.ion.cesium.com/40866/tileset.json?v=2');

        viewer.scene.primitives.add(tileset);
        viewer.zoomTo(tileset);
    } catch (error) {
        console.log(`Error loading tileset: ${error}`);
    }
})
</script>

<template>
    <main id="cesiumContainer" h-screen></main>
</template>