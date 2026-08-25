<script setup lang="ts">
// Your script here
import { utilityInfoList,type UtilityInfo } from '@/data/Utility';
const props = defineProps<{ mapId: string; regionId: string }>()
const utilityList = ref<UtilityInfo[]>([])
onMounted(() => {
  utilityList.value = utilityInfoList.filter(item => item.map === props.mapId && item.region === props.regionId)
  //筛选当前地图和区域道具
})
const selectedUtility = ref("")
</script>
<template>
<div style="margin-top: 20px">
    <el-radio-group v-model="selectedUtility" text-color="#fff" fill="#6c6cff">
        <el-radio-button value="smoke">
            <SvgIcon name="smoke" color="#aaa" :size="24" />
            <span class="radio-text">烟</span>
        </el-radio-button>
        <el-radio-button value="flash">
            <SvgIcon name="flash" color="#aaa" :size="24" />
            <span class="radio-text">闪</span>
        </el-radio-button>
        <el-radio-button value="fire">
            <SvgIcon name="fire" color="#aaa" :size="24" />
            <span class="radio-text">火</span>
        </el-radio-button>
        <el-radio-button value="grenade">
            <SvgIcon name="grenade" color="#aaa" :size="24" />
            <span class="radio-text">雷</span>
        </el-radio-button>
    </el-radio-group>
  </div>
</template>


<style lang="scss" scoped>
:deep(.el-radio-button__inner) {
  display: inline-flex;
  align-items: center;
  gap: 4px;           // 图标和文字间距
  padding: 8px 14px;
}
.radio-text {
  font-size: 24px;
}
</style>