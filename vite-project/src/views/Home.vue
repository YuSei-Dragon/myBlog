<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import RainEffect from '@/components/RainEffect.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import pageRouter, { type Page } from '@/data/pageRouter'

const input = ref('')
const functionButtons = ref([
  {
    text: 'cs2沙二小众变态道具',
    icon: 'folder'
  },
  {
    text: '未发布',
    icon: 'settings'
  },
  {
    text: '未发布',
    icon: 'settings'
  }
])//快捷图标区
const pageList = ref<Page[]>([])
const handleSearch = () => {
  if(input.value === '') {
    pageList.value = []
    return
  }
  const page = pageRouter.getAllMesPage().filter(item => item.label.includes(input.value))
  if(Array.isArray(page)) {
    currentPage.value = 1
    allPageList.value = page
    reflashPageList()
  }
}
const pageSize = ref(8)
const currentPage = ref(1)
const allPage = ref(0)
const allPageList = ref<Page[]>([])
const total = ref(0)
// 分页
const reflashPageList = () => {
  total.value = allPageList.value.length
  allPage.value = Math.ceil(total.value/pageSize.value)
  pageList.value = allPageList.value.slice((currentPage.value-1)*pageSize.value,currentPage.value*pageSize.value)
}
// 鼠标滚轮事件处理
const handleWheel = (event: WheelEvent) => {
  // event.deltaY > 0 表示向下滚动（滚轮向下）
  // event.deltaY < 0 表示向上滚动（滚轮向上）
  
  if (event.deltaY > 0) {
    // console.log('向下滚动')
    if(currentPage.value < allPage.value) {
      currentPage.value++
    }

  } else if (event.deltaY < 0) {
    // console.log('向上滚动')
    if(currentPage.value > 1) {
      currentPage.value--
    }
  }
  reflashPageList()
}
</script>

<template>
  <div class="home">
    <RainEffect />
    <div class="home-content">
      <div class="home-title">
        <div class="title-main">YuSei Blog</div>
        <div class="title-sub">不但小众 · 还很变态</div>
      </div>
      <el-input 
        class="home-input"
        v-model="input"
        placeholder="寻找宝藏..."
        clearable
        :prefix-icon="Search"
        @input="handleSearch"
      />
      <div class="home-search-result" v-if="pageList.length>0" @wheel="handleWheel">
        <div class="home-search-result-item" v-for="item in pageList" :key="item.name">
          <div class="home-search-result-item-text">
            {{ item.label }}
          </div>
        </div>
        <div class="home-search-result-page">
          {{ currentPage }}/{{ allPage }}
        </div>
      </div>
      <div class="home-function-right">
        <div class="home-function-item" v-for="item in functionButtons" :key="item.text">
          <div class="home-function-item-text">
            {{ item.text }}
          </div>
          <div class="home-function-item-icon">
            <SvgIcon :name="item.icon" color="#ff9800" :size="32" />
          </div>
        </div>
      </div>
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
    .home-title {
      position: absolute;
      bottom: 50%;
      left: 50%;
      transform: translateX(-50%);
      font-size: 60px;
      color: #fff;
      margin-bottom: 80px;
      
      .title-main {
        font-size: 72px;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.9);
        letter-spacing: 8px;
        text-shadow: 
          0 2px 10px rgba(0, 0, 0, 0.3),
          0 0 40px rgba(255, 255, 255, 0.1);
        position: relative;
        
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -30px;
          width: 2px;
          height: 60%;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5), transparent);
          transform: translateY(-50%);
        }
        
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -30px;
          width: 2px;
          height: 60%;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.5), transparent);
          transform: translateY(-50%);
        }
      }
      
      .title-sub {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.6);
        letter-spacing: 4px;
        text-align: center;
        margin-top: 20px;
        font-weight: 300;
      }
    }
    
    .home-input {
      width: 400px;
      font-size: 24px;
      
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
        font-size: 16px;
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
    .home-search-result{
      position: absolute;
      top: calc(50% + 40px);
      left: 50%;
      transform: translateX(-50%);
      width: 400px;
      .home-search-result-item{
        width:100%;
        padding: 10px;
        box-sizing: border-box;
        white-space: nowrap; /* 确保文本不会换行 */
        overflow: hidden; /* 隐藏超出容器的文本 */
        text-overflow: ellipsis; /* 当文本超出容器时显示省略号 */
        cursor: pointer;
        .home-search-result-item-text{
          color: #fff;
        }
      }
      .home-search-result-page{
        text-align: center;
        font-size: 16px;
        color: #fff;
        letter-spacing: 4px;
        margin-top: 10px;
        font-weight: 300;
      }
    }
    .home-function-right {
      position: absolute;
      top: 0;
      right: 20px;
      z-index: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 20px;
      box-sizing: border-box;
      
      .home-function-item {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        border-radius: 4px;
        
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .home-function-item-text {
          font-size: 16px;
          color: #fff;
          white-space: nowrap;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.3s ease;
        }
        
        .home-function-item-icon {
          width: 32px;
          height: 32px;
          padding: 6px;
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, 0.3);
          flex-shrink: 0;
          border: 1px #999 solid;
        }
        
        &:hover .home-function-item-text {
          opacity: 1;
          transform: translateX(0);
        }
      }
    }
  }
}
</style>