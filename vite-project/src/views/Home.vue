<script setup lang="ts">
import { ref } from 'vue'
import {  Search } from '@element-plus/icons-vue'
const input = ref('')
</script>

<template>
  <div class="home">
    <div class="home-content">
        <el-input
          v-model="input"
          style="width: 240px"
          placeholder="Please input"
          clearable
          :prefix-icon="Search"
        />
    </div>
  </div>
</template>

<style  lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background: url("../assets/fishing.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* opacity: 0.5; */
  .home-content {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
}

</style>