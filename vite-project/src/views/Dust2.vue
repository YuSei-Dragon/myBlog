<!-- c:\work\vue3-test\myBlog\vite-project\src\views\Dust2.vue -->
<script setup lang="ts">
import dust2Mobile from '@/views/MOBILE/Dust2.vue'
import { useDevice } from '@/data/useDevice'
const { isMobile } = useDevice()

const handleRegionClick = (region: any) => {
  console.log('选中区域：', region.name)
}
</script>

<template>
  <BackgroundImg>
    <dust2Mobile v-if="isMobile"/>
  </BackgroundImg>
</template>

<style lang="scss" scoped>

</style>