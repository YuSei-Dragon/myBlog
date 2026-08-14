<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

// 全局变量：Canvas 元素和上下文
let canvas: HTMLCanvasElement
let ctx: CanvasRenderingContext2D
let animationId: number  // 动画帧ID，用于取消动画
let raindrops: Raindrop[] = []  // 存储所有雨滴的数组

// 定义雨滴的数据结构
interface Raindrop {
  x: number        // 横坐标位置
  y: number        // 纵坐标位置
  length: number   // 雨滴长度
  speed: number    // 下落速度
  opacity: number  // 透明度（0-1）
}

/**
 * 初始化函数
 * 获取 Canvas 元素，设置尺寸，创建雨滴，启动动画
 */
const init = () => {
  // 获取 Canvas 元素
  canvas = document.getElementById('rain-canvas') as HTMLCanvasElement
  // 获取 2D 绑图上下文
  ctx = canvas.getContext('2d')!
  
  // 调整 Canvas 尺寸
  resizeCanvas()
  // 创建雨滴
  createRaindrops()
  // 启动动画循环
  animate()
}

/**
 * 调整 Canvas 尺寸为窗口大小
 * 确保雨滴覆盖整个屏幕
 */
const resizeCanvas = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

/**
 * 创建雨滴数组
 * 根据屏幕宽度计算雨滴数量，随机生成每个雨滴的属性
 */
const createRaindrops = () => {
  raindrops = []
  // 根据屏幕宽度计算雨滴数量（每5像素一个雨滴）
  // 增加密度（更密集）
// const numberOfDrops = Math.floor(window.innerWidth / 3)  // 每3像素一个雨滴

// const numberOfDrops = Math.floor(window.innerWidth / 5)

// // 减少密度（更稀疏）
// const numberOfDrops = Math.floor(window.innerWidth / 10)  // 每10像素一个雨滴

// // 超密集（暴雨效果）
// const numberOfDrops = Math.floor(window.innerWidth / 2)  // 每2像素一个雨滴

// 超稀疏（小雨效果）
const numberOfDrops = Math.floor(window.innerWidth / 15)  // 每15像素一个雨滴
  
  // 循环创建每个雨滴
  for (let i = 0; i < numberOfDrops; i++) {
    raindrops.push({
      x: Math.random() * canvas.width,      // 随机横坐标
      y: Math.random() * canvas.height,     // 随机纵坐标
      length: Math.random() * 20 + 10,      // 随机长度（10-30像素）
      speed: Math.random() * 10 + 15,       // 随机速度（15-25像素/帧）
      opacity: Math.random() * 0.5 + 0.3    // 随机透明度（0.3-0.8）
    })
  }
}

/**
 * 动画循环函数
 * 每帧清除画布，重新绘制所有雨滴，并更新位置
 */
const animate = () => {
  // 清除整个画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  
  // 遍历所有雨滴进行绘制
  raindrops.forEach(drop => {
    // 开始绘制路径
    ctx.beginPath()
    // 移动画笔到雨滴起点
    ctx.moveTo(drop.x, drop.y)
    // 画线到雨滴终点（稍微倾斜1像素，模拟雨滴角度）
    ctx.lineTo(drop.x + 1, drop.y + drop.length)
    // 设置线条颜色和透明度
    ctx.strokeStyle = `rgba(174, 194, 224, ${drop.opacity})`
    // 设置线条宽度
    ctx.lineWidth = 1
    // 绘制线条
    ctx.stroke()
    
    // 更新雨滴位置（向下移动）
    drop.y += drop.speed
    
    // 如果雨滴超出屏幕底部，重置到顶部
    if (drop.y > canvas.height) {
      drop.y = -drop.length  // 从屏幕上方开始
      drop.x = Math.random() * canvas.width  // 随机新的横坐标
    }
  })
  
  // 请求下一帧动画（递归调用，形成循环）
  animationId = requestAnimationFrame(animate)
}

/**
 * 组件挂载时执行
 * 初始化雨滴效果，并监听窗口大小变化
 */
onMounted(() => {
  init()
  // 监听窗口大小变化，重新调整 Canvas 和雨滴
  window.addEventListener('resize', () => {
    resizeCanvas()
    createRaindrops()
  })
})

/**
 * 组件卸载时执行
 * 清理动画和事件监听，避免内存泄漏
 */
onUnmounted(() => {
  // 取消动画帧
  cancelAnimationFrame(animationId)
  // 移除窗口大小变化监听
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<template>
  <!-- Canvas 元素，用于绘制雨滴 -->
  <canvas id="rain-canvas" class="rain-canvas"></canvas>
</template>

<style scoped>
/* 雨滴画布样式 */
.rain-canvas {
  position: fixed;        /* 固定定位，不随页面滚动 */
  top: 0;
  left: 0;
  width: 100%;            /* 占满整个屏幕 */
  height: 100%;
  pointer-events: none;   /* 不拦截鼠标事件，让用户可以点击到下层元素 */
  z-index: 9999;          /* 最顶层显示 */
}
</style>