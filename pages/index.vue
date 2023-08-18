<script setup lang="ts">
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Ion, Entity, Viewer, PositionProperty, Terrain, Cesium3DTileset, IonResource, CzmlDataSource, Cartesian3, HeadingPitchRoll, Matrix4 } from 'cesium';

// const runtimeConfig = useRuntimeConfig()
// Ion.defaultAccessToken = runtimeConfig.public.cesiumToken;

onMounted(async () => {
    let entity: Entity;
    let positionProperty: PositionProperty;
    const viewer = new Viewer("cesiumContainer", {
        terrain: Terrain.fromWorldTerrain(), // 设置地形
    });
    const { scene, clock } = viewer;
    const dataSourcePromise = CzmlDataSource.load(
        "api/SampleData/ClampToGround.czml"
    );
    viewer.dataSources.add(dataSourcePromise).then(dataSource => {
        entity = dataSource.entities.getById("CesiumMilkTruck")!;
        positionProperty = entity.position!;
    });
    // 视角定位
    viewer.camera.setView({
        destination: new Cartesian3(
            1216403.8845586285,
            -4736357.493351395,
            4081299.715698949
        ),
        orientation: new HeadingPitchRoll(
            4.2892217081808806,
            -0.4799070147502502,
            6.279789177843313
        ),
        endTransform: Matrix4.IDENTITY,
    });
    try {
        const resource = await IonResource.fromAssetId(40866);
        const tileset = await Cesium3DTileset.fromUrl(resource);
        viewer.scene.primitives.add(tileset);

        if (scene.clampToHeightSupported) {
            tileset.initialTilesLoaded.addEventListener(start);
        } else {
            window.alert("This browser does not support clampToHeight.");
        }
    } catch (error) {
        console.log(`Error loading tileset: ${error}`);
    }

    function start() {
        clock.shouldAnimate = true;
        const objectsToExclude = [entity];
        scene.postRender.addEventListener(() => {
            const position = positionProperty.getValue(clock.currentTime)!;

            entity.position = scene.clampToHeight(position, objectsToExclude);
        });
    }
})
</script>

<template>
    <main id="cesiumContainer" h-screen></main>
</template>