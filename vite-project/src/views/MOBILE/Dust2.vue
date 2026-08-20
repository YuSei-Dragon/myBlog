<!-- c:\work\vue3-test\myBlog\vite-project\src\views\MOBILE\Dust2.vue -->
<script setup lang="ts">
import MapViewer from '@/components/MapViewer.vue'
import { cs2Maps, type CS2Map, type MapRegion } from '@/data/cs2Maps'

const router = useRouter()
const goBack = () => router.back()
const dust2Map = cs2Maps.find(m => m.id === 'dust2')!

// 解析 path 坐标，计算区域包围盒（用于聚焦放大）
const getRegionBBox = (region: MapRegion) => {
  const nums = region.path.match(/-?\d+(\.\d+)?/g)?.map(Number) || []
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const x = nums[i], y = nums[i + 1]
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }
  return { minX, minY, maxX, maxY }
}

const zoomedRegion = ref<MapRegion | null>(null)

const phase = computed<'select-region' | 'select-item'>(() =>
  zoomedRegion.value ? 'select-item' : 'select-region'
)

const phaseText = computed(() => {
  if (phase.value === 'select-region') return '请选择一个区域'
  return `已进入「${zoomedRegion.value?.name}」· 请选择想查看的道具`
})

// 第一阶段：完整地图；第二阶段：裁剪 viewBox 到选中区域实现等比放大
const displayMap = computed<CS2Map>(() => {
  if (!zoomedRegion.value) return dust2Map
  const b = getRegionBBox(zoomedRegion.value)
  const pad = 40
  const minX = Math.max(0, b.minX - pad)
  const minY = Math.max(0, b.minY - pad)
  const maxX = Math.min(1000, b.maxX + pad)
  const maxY = Math.min(1000, b.maxY + pad)
  return {
    ...dust2Map,
    radarImage: undefined,   // ← 新增：第二阶段隐藏雷达图，避免低分辨率放大模糊
    viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
  }
})

const handleRegionClick = (region: MapRegion) => {
  if (phase.value === 'select-region') {
    zoomedRegion.value = region
  }
}

const reset = () => {
  zoomedRegion.value = null
}
</script>

<template>
  <div class="dust2-page">
    <!-- 顶部标题栏 -->
    <div class="dust2-header">
      <div class="header-back" @click="goBack">
        <SvgIcon name="arrow-left" color="#fff" :size="20" />
      </div>
      <div class="header-title-group">
        <div class="header-title">沙二</div>
        <div class="header-sub">Dust II · 小众变态道具学</div>
      </div>
    </div>

    <!-- 地图主体（阶段切换时重新挂载，触发刷新动画） -->
    <div class="dust2-map-wrap">
      <MapViewer :key="phase" :map="displayMap" @region-click="handleRegionClick" />
    </div>

    <!-- 底部动态状态引导条 -->
    <div class="dust2-status-bar" :class="phase">
      <div class="status-icon">
        <SvgIcon
          :name="phase === 'select-item' ? 'star' : 'triangle-down'"
          color="#fff"
          :size="18"
        />
      </div>
      <div class="status-text">{{ phaseText }}</div>
      <div class="status-reset" v-if="phase === 'select-item'" @click="reset">
        <SvgIcon name="arrow-left" color="rgba(255,255,255,0.85)" :size="14" />
        <span>返回全图</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dust2-page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 顶部标题栏 */
.dust2-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.15);

  .header-back {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.15);
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
    &:active {
      transform: scale(0.92);
      background: rgba(255, 255, 255, 0.22);
    }
  }

  .header-title-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }

  .header-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: #fff;
    letter-spacing: 2px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
  }
  .header-sub {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.55);
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
}

/* 地图主体撑满中间区域 */
.dust2-map-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

/* 底部动态状态引导条 */
.dust2-status-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;

  .status-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.15);
    flex-shrink: 0;
    transition: all 0.3s ease;
  }
  .status-text {
    flex: 1;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
    letter-spacing: 0.5px;
  }
  .status-reset {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.2s ease;
    &:active { background: rgba(255, 255, 255, 0.22); }
  }

  /* 不同阶段配色 */
  &.select-region {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.15);
    .status-icon { background: rgba(255, 255, 255, 0.15); }
  }
  &.select-item {
    background: rgba(52, 152, 219, 0.15);
    border-color: rgba(52, 152, 219, 0.4);
    .status-icon { background: rgba(52, 152, 219, 0.3); }
  }
}
</style>