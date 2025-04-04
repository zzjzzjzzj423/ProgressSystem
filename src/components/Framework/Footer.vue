<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(item, index) in navItems" :key="index">
        <button
            :class="{ active: activeIndex === index }"
            @click="navigate(index, item.to)"
        >
          <div class="nav-icon">{{ item.icon }}</div>
          <div class="nav-text">{{ item.text }}</div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'Footer',
  setup() {
    const router = useRouter()
    const route = useRoute()

    // 定义导航项数组
    const navItems = [
      { to: '/', icon: '🏠', text: '进展总览' },
      { to: '/ProjectProgress', icon: '📈', text: '项目进度' },
      { to: '/MachineDetail', icon: '⚙️', text: '机台管理' },
      { to: '/DailyReport', icon: '📑', text: '人员填报' },
      { to: '/GenerateReport', icon: '📋', text: '生成报告' }
    ]

    // 用来记录当前选中的导航按钮索引
    const activeIndex = ref(0)

    // 根据当前路由自动确定激活的按钮
    onMounted(() => {
      navItems.forEach((item, index) => {
        if (route.path === item.to) {
          activeIndex.value = index
        }
      })
    })

    // 点击导航按钮时，更新激活索引并进行路由跳转
    const navigate = (index, to) => {
      activeIndex.value = index
      router.push(to)
    }

    return { navItems, activeIndex, navigate }
  }
}
</script>

<style scoped>
.bottom-nav {
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
.bottom-nav ul {
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 8px 0;
  list-style: none;
}
.bottom-nav li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 按钮样式 */
button {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  text-align: center;
  padding: 0;
  font-size: inherit;
  color: #333;
}

/* 激活状态下的按钮变为蓝色 */
button.active {
  color: blue;
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.nav-text {
  white-space: nowrap;
  font-size: 12px;
}
</style>
