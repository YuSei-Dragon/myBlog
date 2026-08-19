<script setup lang="ts">
import RainEffect from '@/components/RainEffect.vue'

</script>

<template>
  <div class="home">
    <RainEffect />
    <div class="home-content">
    <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background: url("../assets/fishing.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  .home-content {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    }
}
</style>