<!-- c:\work\vue3-test\myBlog\vite-project\src\components\SvgIcon.vue -->
<script setup lang="ts">
/**
 * 通用SVG图标组件
 * 支持自定义颜色、大小、样式
 */
interface Props {
  name: string        // 图标名称
  color?: string      // 颜色（可选，默认使用 currentColor）
  size?: number       // 大小（可选，默认24px）
  class?: string      // 自定义类名
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor'
})
</script>

<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    :class="props.class"
    class="svg-icon"
  >
    <!-- 搜索图标 -->
    <template v-if="name === 'search'">
      <path 
        d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 爱心图标 -->
    <template v-else-if="name === 'heart'">
      <path 
        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" 
        :fill="color"
      />
    </template>
    
    <!-- 星星图标 -->
    <template v-else-if="name === 'star'">
      <path 
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
        :fill="color"
      />
    </template>
    
    <!-- 用户图标 -->
    <template v-else-if="name === 'user'">
      <path 
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 设置图标 -->
    <template v-else-if="name === 'settings'">
      <path 
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <path 
        d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.5003 16.5842 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3764 18.0322 20.3764 18.295C20.3764 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2964 18.375 20.2964C18.1122 20.2964 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6642 19.4203 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.5316 19.6572 14.3517 19.9255C14.1718 20.1938 14.0723 20.5082 14.07 20.83V21C14.07 21.5304 13.8593 22.0391 13.4842 22.4142C13.1091 22.7893 12.6004 23 12.07 23C11.5396 23 11.0309 22.7893 10.6558 22.4142C10.2807 22.0391 10.07 21.5304 10.07 21V20.91C10.0623 20.579 9.95439 20.2589 9.76 20C9.56561 19.7411 9.29435 19.5487 8.98 19.45C8.67838 19.3169 8.34381 19.2772 8.01941 19.336C7.69502 19.3948 7.39583 19.5503 7.16 19.78L7.1 19.84C6.91425 20.026 6.69368 20.1735 6.45088 20.2741C6.20808 20.3748 5.94783 20.4264 5.685 20.4264C5.42217 20.4264 5.16192 20.3748 4.91912 20.2741C4.67632 20.1735 4.45575 20.026 4.27 19.84C4.08405 19.6543 3.93653 19.4337 3.83588 19.1909C3.73523 18.9481 3.68361 18.6878 3.68361 18.425C3.68361 18.1622 3.73523 17.9019 3.83588 17.6591C3.93653 17.4163 4.08405 17.1957 4.27 17.01L4.33 16.95C4.55965 16.7142 4.71519 16.415 4.774 16.0906C4.83281 15.7662 4.79314 15.4316 4.66 15.13C4.53325 14.8342 4.32279 14.5816 4.05452 14.4017C3.78624 14.2218 3.47183 14.1223 3.15 14.12H3C2.46957 14.12 1.96086 13.9093 1.58579 13.5342C1.21071 13.1591 1 12.6504 1 12.12C1 11.5896 1.21071 11.0809 1.58579 10.7058C1.96086 10.3307 2.46957 10.12 3 10.12H3.09C3.42099 10.1123 3.74106 10.0044 4 9.81C4.25894 9.61561 4.45125 9.34435 4.55 9.03C4.68314 8.72838 4.72281 8.39381 4.664 8.06941C4.60519 7.74502 4.44965 7.44583 4.22 7.21L4.16 7.15C3.97405 6.96425 3.82653 6.74368 3.72588 6.50088C3.62523 6.25808 3.57361 5.99783 3.57361 5.735C3.57361 5.47217 3.62523 5.21192 3.72588 4.96912C3.82653 4.72632 3.97405 4.50575 4.16 4.32C4.34575 4.13405 4.56632 3.98653 4.80912 3.88588C5.05192 3.78523 5.31217 3.73361 5.575 3.73361C5.83783 3.73361 6.09808 3.78523 6.34088 3.88588C6.58368 3.98653 6.80425 4.13405 6.99 4.32L7.05 4.38C7.28583 4.60965 7.58502 4.76519 7.90941 4.824C8.23381 4.88281 8.56838 4.84314 8.87 4.71H8.95C9.24583 4.58325 9.49837 4.37279 9.67828 4.10452C9.85819 3.83624 9.95767 3.52183 9.96 3.2V3.12C9.96 2.58957 10.1707 2.08086 10.5458 1.70579C10.9209 1.33071 11.4296 1.12 11.96 1.12C12.4904 1.12 12.9991 1.33071 13.3742 1.70579C13.7493 2.08086 13.96 2.58957 13.96 3.12V3.21C13.9623 3.53183 14.0618 3.84624 14.2417 4.11452C14.4216 4.38279 14.6742 4.59325 14.97 4.72C15.2716 4.85314 15.6062 4.89281 15.9306 4.834C16.255 4.77519 16.5542 4.61965 16.79 4.39L16.85 4.33C17.0357 4.14405 17.2563 3.99653 17.4991 3.89588C17.7419 3.79523 18.0022 3.74361 18.265 3.74361C18.5278 3.74361 18.7881 3.79523 19.0309 3.89588C19.2737 3.99653 19.4943 4.14405 19.68 4.33C19.866 4.51575 20.0135 4.73632 20.1141 4.97912C20.2148 5.22192 20.2664 5.48217 20.2664 5.745C20.2664 6.00783 20.2148 6.26808 20.1141 6.51088C20.0135 6.75368 19.866 6.97425 19.68 7.16L19.62 7.22C19.3903 7.45583 19.2348 7.75502 19.176 8.07941C19.1172 8.40381 19.1569 8.73838 19.29 9.04V9.12C19.4168 9.41583 19.6272 9.66837 19.8955 9.84828C20.1638 10.0282 20.4782 10.1277 20.8 10.13H20.88C21.4104 10.13 21.9191 10.3407 22.2942 10.7158C22.6693 11.0909 22.88 11.5996 22.88 12.13C22.88 12.6604 22.6693 13.1691 22.2942 13.5442C21.9191 13.9193 21.4104 14.13 20.88 14.13H20.79C20.4682 14.1323 20.1538 14.2318 19.8855 14.4117C19.6172 14.5916 19.4068 14.8442 19.28 15.14Z" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 首页图标 -->
    <template v-else-if="name === 'home'">
      <path 
        d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <path 
        d="M9 22V12H15V22" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 文件夹图标 -->
    <template v-else-if="name === 'folder'">
      <path 
        d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 编辑图标 -->
    <template v-else-if="name === 'edit'">
      <path 
        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <path 
        d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 删除图标 -->
    <template v-else-if="name === 'delete'">
      <path 
        d="M3 6H5H21" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <path 
        d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 关闭图标 -->
    <template v-else-if="name === 'close'">
      <path 
        d="M18 6L6 18M6 6L18 18" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 添加图标 -->
    <template v-else-if="name === 'plus'">
      <path 
        d="M12 5V19M5 12H19" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 减少图标 -->
    <template v-else-if="name === 'minus'">
      <path 
        d="M5 12H19" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 箭头右图标 -->
    <template v-else-if="name === 'arrow-right'">
      <path 
        d="M5 12H19M19 12L12 5M19 12L12 19" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 箭头左图标 -->
    <template v-else-if="name === 'arrow-left'">
      <path 
        d="M19 12H5M5 12L12 19M5 12L12 5" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 箭头下图标 -->
    <template v-else-if="name === 'arrow-down'">
      <path 
        d="M12 5V19M12 19L5 12M12 19L19 12" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 箭头上图标 -->
    <template v-else-if="name === 'arrow-up'">
      <path 
        d="M12 19V5M12 5L5 12M12 5L19 12" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 三角形下图标（书名号样式） -->
    <template v-else-if="name === 'triangle-down'">
      <path 
        d="M6 9L12 15L18 9" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 三角形上图标（书名号样式） -->
    <template v-else-if="name === 'triangle-up'">
      <path 
        d="M6 15L12 9L18 15" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 三角形左图标（书名号样式） -->
    <template v-else-if="name === 'triangle-left'">
      <path 
        d="M15 6L9 12L15 18" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 三角形右图标（书名号样式） -->
    <template v-else-if="name === 'triangle-right'">
      <path 
        d="M9 6L15 12L9 18" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 三条杠图标（更多选项） -->
    <template v-else-if="name === 'menu'">
      <path 
        d="M3 6H21M3 12H21M3 18H21" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 查看详情图标（放大镜+文档） -->
    <template v-else-if="name === 'view-detail'">
      <!-- 文档主体 -->
      <path 
        d="M14 3H6C5.46957 3 4.96086 3.21071 4.58579 3.58579C4.21071 3.96086 4 4.46957 4 5V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H12" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <!-- 文档内容线 -->
      <path 
        d="M8 8H11M8 12H11" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
      <!-- 放大镜镜片 -->
      <circle cx="17.5" cy="15.5" r="3.5" :stroke="color" stroke-width="2"/>
      <!-- 放大镜手柄 -->
      <path 
        d="M20 18L22 20" 
        :stroke="color"
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 烟雾弹图标（弹体+顶部烟雾云朵） -->
    <template v-else-if="name === 'smoke'">
      <!-- 弹体 -->
      <path 
        d="M8 11H16V19C16 20.1046 15.1046 21 14 21H10C8.89543 21 8 20.1046 8 19V11Z" 
        :fill="color"
        fill-opacity="0.25"
        :stroke="color"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
      <!-- 弹体顶部横纹 -->
      <path 
        d="M8.5 14H15.5" 
        :stroke="color"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <!-- 烟雾云朵1（左） -->
      <path 
        d="M6 9C4.8954 9 4 8.1046 4 7C4 6.2 4.5 5.5 5.2 5.2C5.3 4 6.3 3 7.5 3C8.7 3 9.7 4 9.8 5.2C10.5 5.5 11 6.2 11 7C11 8.1046 10.1046 9 9 9H6Z" 
        :fill="color"
        fill-opacity="0.15"
        :stroke="color"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <!-- 烟雾云朵2（右） -->
      <path 
        d="M15 9C13.8954 9 13 8.1046 13 7C13 6.2 13.5 5.5 14.2 5.2C14.3 4 15.3 3 16.5 3C17.7 3 18.7 4 18.8 5.2C19.5 5.5 20 6.2 20 7C20 8.1046 19.1046 9 18 9H15Z" 
        :fill="color"
        fill-opacity="0.15"
        :stroke="color"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
    </template>
    
    <!-- 闪光弹图标（弹体+顶部放射光芒） -->
    <template v-else-if="name === 'flash'">
      <!-- 弹体 -->
      <path 
        d="M8 11H16V19C16 20.1046 15.1046 21 14 21H10C8.89543 21 8 20.1046 8 19V11Z" 
        :fill="color"
        fill-opacity="0.25"
        :stroke="color"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
      <!-- 弹体顶部横纹 -->
      <path 
        d="M8.5 14H15.5" 
        :stroke="color"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <!-- 中心闪光点 -->
      <circle cx="12" cy="6" r="1.8" :fill="color"/>
      <!-- 放射光芒（8方向） -->
      <path 
        d="M12 2.5V1M12 11V9.5M15.5 6H17M7 6H8.5M14.8 3.2L15.8 2.2M8.2 3.2L7.2 2.2M14.8 8.8L15.8 9.8M8.2 8.8L7.2 9.8" 
        :stroke="color"
        stroke-width="1.6"
        stroke-linecap="round"
      />
    </template>
    
    <!-- 燃烧弹图标（弹体+顶部火焰） -->
    <template v-else-if="name === 'fire'">
      <!-- 弹体 -->
      <path 
        d="M8 11H16V19C16 20.1046 15.1046 21 14 21H10C8.89543 21 8 20.1046 8 19V11Z" 
        :fill="color"
        fill-opacity="0.25"
        :stroke="color"
        stroke-width="1.8"
        stroke-linejoin="round"
      />
      <!-- 弹体顶部横纹 -->
      <path 
        d="M8.5 14H15.5" 
        :stroke="color"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <!-- 火焰外焰 -->
      <path 
        d="M12 2C12 2 8.5 5 8.5 8C8.5 9.8 10 10.5 12 10.5C14 10.5 15.5 9.8 15.5 8C15.5 5 12 2 12 2Z" 
        :fill="color"
        fill-opacity="0.2"
        :stroke="color"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <!-- 火焰内焰 -->
      <path 
        d="M12 5C12 5 10.3 6.5 10.3 8C10.3 8.9 11 9.3 12 9.3C13 9.3 13.7 8.9 13.7 8C13.7 6.5 12 5 12 5Z" 
        :fill="color"
        fill-opacity="0.5"
      />
    </template>
    
    <!-- 手榴弹图标（椭圆弹体+顶部插销拉环） -->
    <template v-else-if="name === 'grenade'">
      <!-- 弹体（椭圆） -->
      <ellipse 
        cx="12" 
        cy="15" 
        rx="6" 
        ry="6.5" 
        :fill="color"
        fill-opacity="0.25"
        :stroke="color"
        stroke-width="1.8"
      />
      <!-- 弹体分割线（CS手雷经典纹路） -->
      <path 
        d="M6 15H18" 
        :stroke="color"
        stroke-width="1.4"
        stroke-linecap="round"
      />
      <path 
        d="M12 8.5V21.5" 
        :stroke="color"
        stroke-width="1.4"
        stroke-linecap="round"
      />
      <!-- 顶部连接座 -->
      <path 
        d="M10 8.5H14V7H10V8.5Z" 
        :fill="color"
        fill-opacity="0.4"
        :stroke="color"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <!-- 插销 -->
      <path 
        d="M12 7V4.5" 
        :stroke="color"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <!-- 拉环 -->
      <circle 
        cx="12" 
        cy="3.5" 
        r="1.8" 
        :stroke="color"
        stroke-width="1.6"
        fill="none"
      />
    </template>
    
    <!-- 默认图标（问号） -->
    <template v-else>
      <circle cx="12" cy="12" r="10" :stroke="color" stroke-width="2"/>
      <path d="M9 9C9 8.33333 9.5 7 12 7C14.5 7 15 8.5 15 9.5C15 11.5 12 11 12 13" :stroke="color" stroke-width="2" stroke-linecap="round"/>
      <circle cx="12" cy="17" r="0.5" :fill="color"/>
    </template>
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
}
</style>