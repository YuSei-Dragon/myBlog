<script setup lang="ts">

</script>

<template>
  <div class="home">
    <slot></slot>
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
}
</style>