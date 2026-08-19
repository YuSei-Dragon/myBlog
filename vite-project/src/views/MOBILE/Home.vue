<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import pageRouter, { type Page } from '@/data/pageRouter'
const router = useRouter()
const input = ref('')
const pageList = ref<Page[]>([])
const isFocused = ref(false)  // 控制输入框是否获得焦点
const showScrollHint = ref(false)  // 是否显示下拉提示
const resultContainerRef = ref<HTMLElement | null>(null)  // 结果容器引用
const isSidebarOpen = ref(false)  // 控制侧边栏开关
const sidebarButtons = pageRouter.getButtons()  // 侧边栏菜单数据

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
const closeSidebar = () => {
  isSidebarOpen.value = false
}

const handleSearch = () => {
  if(input.value === '') {
    pageList.value = []
    showScrollHint.value = false
    return
  }
  const page = pageRouter.getAllMesPage().filter(item => item.label.includes(input.value))
  pageList.value = page
  
  // 检测内容是否超出容器高度
  nextTick(() => {
    checkScrollable()
  })

}// 检测内容是否超出容器高度
const checkScrollable = () => {
  if (resultContainerRef.value) {
    const container = resultContainerRef.value
    // 内容高度 > 可见高度，说明有滚动条
    showScrollHint.value = container.scrollHeight > container.clientHeight
  }
}
const handleFocus = () => {
  isFocused.value = true  // 获得焦点时设置为true
}

const handleBlur = () => {
  if (!input.value) {  // 如果没有内容，才失去焦点
    isFocused.value = false
  }
}
// 监听列表变化，重新检测
watch(pageList, () => {
  nextTick(() => {
    checkScrollable()
  })
})
const handleScroll = () => {
  if (resultContainerRef.value) {
    const container = resultContainerRef.value
    // 滚动超过50px后隐藏提示
    showScrollHint.value = container.scrollTop < 50
  }
}
// 点击快捷图标
const handleClick = (text: string) => {
  const page = pageRouter.handleClick(text)
  if(page) {
    router.push(page)
  }
}
</script>
<template>
<div class="home">
    <!-- 左上角更多功能按钮 -->
    <div class="menu-btn" @click="toggleSidebar" v-if="!isFocused">
      <SvgIcon name="menu" color="#fff" :size="24" />
    </div>
    <div class="home-title" v-if="!isFocused">
        <div class="title-main">YuSei Blog</div>
        <div class="title-sub">不但小众 · 还很变态</div>
    </div>
    <el-input 
        class="home-input search-container"
        :class="{ 'at-top': isFocused }"
        v-model="input"
        placeholder="寻找宝藏..."
        clearable
        :prefix-icon="Search"
        @input="handleSearch"
        @focus="handleFocus"
        @blur="handleBlur"
    />
    <div class="home-result" v-if="isFocused" ref="resultContainerRef"
      @scroll="handleScroll">
        <div v-for="item in pageList" :key="item.label" class="result-item">
            {{ item.label }}
        </div>
    </div>
    <div 
      class="scroll-hint" 
      v-if="showScrollHint && isFocused"
    >
      <div class="hint-content">
        <SvgIcon name="triangle-down" color="rgba(255, 255, 255, 0.7)" :size="20" />
        <span class="hint-text">下拉查看更多</span>
      </div>
    </div>
    <!-- 侧边栏遮罩 + 边栏（3/4宽度） -->
    <transition name="sidebar-fade">
      <div class="sidebar-overlay" v-if="isSidebarOpen" @click="closeSidebar">
        <div class="sidebar-panel" @click.stop>
          <div class="sidebar-header">
            <span class="sidebar-title">菜单</span>
            <div class="sidebar-close" @click="closeSidebar">
              <SvgIcon name="close" color="#fff" :size="20" />
            </div>
          </div>
          <div class="sidebar-content">
            <div 
              v-for="(item, index) in sidebarButtons" 
              :key="index" 
              class="sidebar-item"
              @click="handleClick(item.text)"
            >
              <SvgIcon :name="item.icon" color="rgba(255,255,255,0.8)" :size="20" />
              <span class="sidebar-item-text">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
</div>
</template>


<style lang="scss" scoped>
.home {
    width: 100%;
    height: 100%;
    position: relative;
}
.home-title {
    position: absolute;
    bottom: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    margin-bottom: 40px;
    
    .title-main {
    font-size: 2.8rem;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 8px;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.1);
    position: relative;
    }
    
    .title-sub {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 4px;
    text-align: center;
    margin-top: 12px;
    font-weight: 300;
    }
}
.home-input {
    width: 100%;
    padding: 0px 2rem;
    box-sizing: border-box;
    font-size: 1.5rem;
    
    /* 毛玻璃效果 */
    :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 12px 20px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.4);
        box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
    }
    
    &.is-focus {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        box-shadow: 
        0 12px 40px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        0 0 0 3px rgba(255, 255, 255, 0.1);
    }
    }
    
    /* 输入框文字 */
    :deep(.el-input__inner) {
    color: rgba(255, 255, 255, 0.95);
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 1px;
    
    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-weight: 300;
    }
    }
    
    /* 前缀图标 */
    :deep(.el-input__prefix) {
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.3s ease;
    }
    
    /* 清除按钮 */
    :deep(.el-input__clear) {
    color: rgba(255, 255, 255, 0.6);
    
    &:hover {
        color: rgba(255, 255, 255, 0.9);
    }
    }
}
.search-container {
  position: fixed;
  left: 50%;
  transform: translateX(-50%) translateY(40px);
  bottom: 50%;  // 默认在中间
  margin-top: 60px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.at-top {
    top: 0px;  // 获得焦点时移动到顶部
    bottom: auto;
    margin-top: 0px;
  }
}
.home-result {
    position: absolute;
    top: 100px;
    left: 0;
    width: 100%;
    height: calc(100% - 130px);
    text-align: center;
    color: #fff;
    padding: 0px 2rem;
    box-sizing: border-box;
    overflow-y: auto;
    .result-item{
        font-size: 1rem;
        padding: 12px 0px;
        text-align: center;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        margin-bottom: 12px;
    }
}
/* 下拉提示标签 */
.scroll-hint {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    animation: bounce 2s infinite;
    
    .hint-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        padding: 8px 16px;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        
        .hint-text {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
            letter-spacing: 1px;
        }
    }
}

/* 弹跳动画 */
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
    }
    40% {
        transform: translateX(-50%) translateY(-10px);
    }
    60% {
        transform: translateX(-50%) translateY(-5px);
    }
}

/* 左上角更多功能按钮 */
.menu-btn {
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 100;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:active {
        transform: scale(0.92);
        background: rgba(255, 255, 255, 0.25);
    }
}

/* 侧边栏遮罩层（点击收起） */
.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 200;
    display: flex;
}

/* 侧边栏面板（3/4宽度） */
.sidebar-panel {
    width: 75%;
    height: 100%;
    background: rgba(20, 20, 30, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    box-shadow: 4px 0 30px rgba(0, 0, 0, 0.3);
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .sidebar-title {
        color: #fff;
        font-size: 1.2rem;
        font-weight: 300;
        letter-spacing: 2px;
    }
    
    .sidebar-close {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        
        &:active {
            background: rgba(255, 255, 255, 0.1);
        }
    }
}

.sidebar-content {
    flex: 1;
    padding: 12px 0;
    overflow-y: auto;
}

.sidebar-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    color: rgba(255, 255, 255, 0.85);
    cursor: pointer;
    transition: background 0.2s ease;
    
    &:active {
        background: rgba(255, 255, 255, 0.1);
    }
    
    .sidebar-item-text {
        font-size: 0.95rem;
        letter-spacing: 1px;
    }
}

/* 侧边栏过渡动画 */
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
    transition: opacity 0.3s ease;
    
    .sidebar-panel {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
}
.sidebar-fade-enter-from,
.sidebar-fade-leave-to {
    opacity: 0;
    
    .sidebar-panel {
        transform: translateX(-100%);
    }
}
</style>