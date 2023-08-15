<script setup lang="ts">
import { Ion, Viewer } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

onMounted(() => {
    const runtimeConfig = useRuntimeConfig()
    const viewer = new Viewer('cesiumContainer');
})
</script>

<template>
    <main id="cesiumContainer"></main>
</template>