<script setup lang="ts">
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Ion, Viewer, Terrain, Cesium3DTileset, IonResource } from 'cesium';

// const runtimeConfig = useRuntimeConfig()
// Ion.defaultAccessToken = runtimeConfig.public.cesiumToken;

onMounted(async () => {
    const viewer = new Viewer('cesiumContainer', {
        infoBox: false,
        geocoder: false,
        timeline: false,
        animation: false,
        homeButton: false,
        baseLayerPicker: false,
        sceneModePicker: false,
        fullscreenButton: false,
        navigationHelpButton: false,
        terrain: Terrain.fromWorldTerrain()
    });

    try {
        const resource = await IonResource.fromAssetId(40866);
        const tileset = await Cesium3DTileset.fromUrl(resource);

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