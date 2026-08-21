<!-- c:\work\vue3-test\myBlog\vite-project\src\components\MapViewer.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { type CS2Map, type MapRegion, regionTypeColors, regionTypeLabels } from '@/data/cs2Maps'

interface Props {
  map: CS2Map                // 当前要渲染的地图数据
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'region-click': [region: MapRegion]
  'region-hover': [region: MapRegion | null]
}>()

const hoveredRegionId = ref<string | null>(null)
const selectedRegionId = ref<string | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)

const currentMap = computed(() => props.map)
const hoveredRegion = computed(() =>
  currentMap.value?.regions.find(r => r.id === hoveredRegionId.value) || null
)
const selectedRegion = computed(() =>
  currentMap.value?.regions.find(r => r.id === selectedRegionId.value) || null
)

const regionBaseOpacity = computed(() =>
  currentMap.value.regionOpacity ?? (currentMap.value.radarImage ? 0.3 : 0.45)
)

const getRegionColor = (region: MapRegion) =>
  region.color || regionTypeColors[region.type || 'default']

const handleRegionHover = (region: MapRegion) => {
  hoveredRegionId.value = region.id
  emit('region-hover', region)
}
const handleRegionLeave = () => {
  hoveredRegionId.value = null
  emit('region-hover', null)
}
const handleRegionClick = (region: MapRegion) => {
  selectedRegionId.value = region.id
  emit('region-click', region)
}
const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

</script>

<template>
  <div class="map-viewer">
    <!-- 地图主体 -->
    <div
      class="map-container"
      @mousemove="handleMouseMove"
      @mouseleave="handleRegionLeave"
    >
      <svg
        :viewBox="currentMap.viewBox"
        class="map-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <!-- 雷达图背景 -->
        <image 
          v-if="currentMap.radarImage"
          :href="currentMap.radarImage"
          width="100%" 
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          class="radar-bg"
        />
        <defs v-if="!currentMap.radarImage">
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
          </pattern>
        </defs>

        <rect class="map-bg" width="1000" height="1000" fill="url(#grid)" />

        <!-- 区域渲染 -->
        <g class="regions-group">
          <path
            v-for="region in currentMap.regions"
            :key="region.id"
            :d="region.path"
            class="region"
            :class="{
              hovered: hoveredRegionId === region.id,
              selected: selectedRegionId === region.id,
            }"
            :style="{ 
              fill: getRegionColor(region),
              fillOpacity: hoveredRegionId === region.id || selectedRegionId === region.id 
                ? 1 
                : regionBaseOpacity 
            }"
            @mouseenter="handleRegionHover(region)"
            @click="handleRegionClick(region)"
          />
        </g>

        <!-- 常态显示的标签（showLabel=true 的区域，始终可见） -->
        <g class="always-visible-labels">
          <text
            v-for="region in currentMap.regions.filter(r => r.showLabel && r.center)"
            :key="'label-' + region.id"
            :x="region.center!.x"
            :y="region.center!.y"
            class="region-label always-label"
            text-anchor="middle"
            dominant-baseline="middle"
          >{{ region.name }}</text>
        </g>

        <!-- 悬停区域名称（SVG内标签） -->
        <text
          v-if="hoveredRegion && hoveredRegion.center && hoveredRegionId !== selectedRegionId"
          :x="hoveredRegion.center.x"
          :y="hoveredRegion.center.y"
          class="region-label hover-label"
          text-anchor="middle"
          dominant-baseline="middle"
        >{{ hoveredRegion.name }}</text>

        <!-- 选中区域名称（SVG内标签） -->
        <text
          v-if="selectedRegion && selectedRegion.center"
          :x="selectedRegion.center.x"
          :y="selectedRegion.center.y"
          class="region-label selected-label"
          text-anchor="middle"
          dominant-baseline="middle"
        >{{ selectedRegion.name }}</text>
      </svg>

      <!-- 跟随鼠标的提示框 -->
      <transition name="tooltip-fade">
        <div
          v-if="hoveredRegion"
          class="region-tooltip"
          :style="{ left: mouseX + 16 + 'px', top: mouseY + 16 + 'px' }"
        >
          <span class="tooltip-name">{{ hoveredRegion.name }}</span>
          <span class="tooltip-type" v-if="hoveredRegion.type">
            {{ regionTypeLabels[hoveredRegion.type] }}
          </span>
        </div>
      </transition>
    </div>

    <!-- 选中区域信息卡 -->
    <transition name="info-slide">
      <div class="region-info" v-if="selectedRegion">
        <div class="info-header">
          <span
            class="info-dot"
            :style="{ background: getRegionColor(selectedRegion) }"
          ></span>
          <span class="info-name">{{ selectedRegion.name }}</span>
          <div class="info-close" @click="selectedRegionId = null">
            <SvgIcon name="close" color="#fff" :size="18" />
          </div>
        </div>
        <div class="info-type" v-if="selectedRegion.type">
          类型：{{ regionTypeLabels[selectedRegion.type] }}
        </div>
        <div class="info-desc" v-if="selectedRegion.description">
          {{ selectedRegion.description }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.map-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 地图容器 */
.map-container {
  position: relative;
  flex: 1;
  min-height: 400px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;

  .map-svg {
    width: 100%;
    height: 100%;
    display: block;
  }
}
/* 雷达图背景 */
.radar-bg {
  opacity: 1;
}
/* 区域 */
.region {
  stroke: rgba(255, 255, 255, 0.25);
  stroke-width: 1.5;
  cursor: pointer;
  transition: fill 0.25s ease, filter 0.25s ease, stroke 0.25s ease, opacity 0.25s ease;

  &:hover {
    filter: brightness(1.35) saturate(1.15);
    stroke: rgba(255, 255, 255, 0.6);
  }
  &.selected {
    filter: brightness(1.5) saturate(1.2);
    stroke: #fff;
    stroke-width: 2.5;
    animation: region-pulse 1.8s ease-in-out infinite;
  }
}

/* 非选中区域在选中时略微降低存在感 */
.regions-group:has(.region.selected) .region:not(.selected) {
  opacity: 0.55;
}

/* 区域名称标签 */
.region-label {
  fill: #fff;
  font-size: 28px;
  font-weight: 600;
  pointer-events: none;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  &.hover-label {
    opacity: 0.85;
    font-size: 24px;
  }
  &.selected-label {
    animation: label-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
}

/* 跟随鼠标提示框 */
.region-tooltip {
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 14px;
  background: rgba(15, 15, 20, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  pointer-events: none;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

  .tooltip-name {
    color: #fff;
    font-size: 0.95rem;
    font-weight: 600;
  }
  .tooltip-type {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.75rem;
  }
}

/* 选中信息卡 */
.region-info {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 30;
  width: 220px;
  padding: 16px;
  background: rgba(15, 15, 20, 0.82);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);

  .info-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    .info-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .info-name {
      flex: 1;
      color: #fff;
      font-size: 1.05rem;
      font-weight: 600;
    }
    .info-close {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease;
      &:active { background: rgba(255, 255, 255, 0.12); }
    }
  }
  .info-type {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.82rem;
    margin-bottom: 6px;
  }
  .info-desc {
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.82rem;
    line-height: 1.5;
  }
}

/* 区域脉冲动画 */
@keyframes region-pulse {
  0%, 100% { filter: brightness(1.5) saturate(1.2) drop-shadow(0 0 6px rgba(255,255,255,0.4)); }
  50% { filter: brightness(1.7) saturate(1.3) drop-shadow(0 0 16px rgba(255,255,255,0.7)); }
}

/* 标签弹出动画 */
@keyframes label-pop {
  0% { opacity: 0; transform: scale(0.6); transform-origin: center; }
  100% { opacity: 1; transform: scale(1); }
}

/* 提示框过渡 */
.tooltip-fade-enter-active, .tooltip-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.tooltip-fade-enter-from, .tooltip-fade-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.95);
}

/* 信息卡过渡 */
.info-slide-enter-active, .info-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.info-slide-enter-from, .info-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
}

/* 移动端适配（<768px，与 useDevice 判定一致） */
@media (max-width: 768px) {
  .map-container {
    min-height: 300px;
  }
  /* 区域名称标签缩小，避免遮挡地图 */
  .region-label {
    font-size: 18px;
    &.hover-label { font-size: 16px; }
  }
  /* 跟随鼠标提示框缩小 */
  .region-tooltip {
    padding: 6px 10px;
    .tooltip-name { font-size: 0.85rem; }
    .tooltip-type { font-size: 0.7rem; }
  }
  /* 信息卡改为底部全宽抽屉，避免遮挡地图主体 */
  .region-info {
    left: 8px;
    right: 8px;
    bottom: 8px;
    width: auto;
    padding: 12px;
    .info-name { font-size: 0.95rem; }
    .info-type, .info-desc { font-size: 0.78rem; }
  }
}
/* 常态标签 */
.always-label {
  fill: #fff;
  font-size: 30px;
  font-weight: 600;
  pointer-events: none;
  text-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.8),
    0 0 12px rgba(0, 0, 0, 0.5);
  opacity: 0.85;
}
</style>