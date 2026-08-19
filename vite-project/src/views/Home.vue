<script setup lang="ts">
import { useDevice } from '@/data/useDevice'
const { isMobile } = useDevice()
import homePC from '@/views/PC/Home.vue'
import homeMobile from '@/views/MOBILE/Home.vue'

</script>

<template>
<BackgroundImg >
  <slot>
    <homeMobile v-if="isMobile"/>
    <homePC v-else/>
  </slot>
</BackgroundImg>
</template>

<style lang="scss" scoped>

</style>