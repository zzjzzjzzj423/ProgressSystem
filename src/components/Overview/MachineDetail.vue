<template>
  <div class="drill-page">
    <!-- 顶部区域 -->
    <header class="top-bar">
      <!-- 左侧两个按钮：开孔、终孔 -->
      <div class="tab-buttons">
        <el-button-group>
          <el-button
              :type="activeTab === 'kaikong' ? 'primary' : 'default'"
              @click="setActiveTab('kaikong')"
          >
            开孔
          </el-button>
          <el-button
              :type="activeTab === 'zhongkong' ? 'primary' : 'default'"
              @click="setActiveTab('zhongkong')"
          >
            终孔
          </el-button>
        </el-button-group>
      </div>

      <!-- 右侧“+”按钮：引入 Plus 图标组件 -->
      <div class="plus-button">
        <el-button
            :icon="Plus"
            circle
            @click="handleAdd"
        />
      </div>
    </header>

    <!-- 内容区域：显示钻孔列表 -->
    <main class="drill-list">
      <div
          v-for="(item, index) in drillData"
          :key="index"
          class="drill-item"
      >
        <div class="drill-title">{{ item.code }}</div>
        <div class="drill-info">
          <div>钻孔编号：{{ item.drillNo }}</div>
          <div>所属项目：{{ item.project }}</div>
          <div>当前孔深：{{ item.currentDepth }}</div>
          <div>设计孔深：{{ item.designDepth }}</div>
        </div>
      </div>
    </main>

    <!-- 底部区域使用 Footer 组件 -->
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElButton, ElButtonGroup } from 'element-plus'
import Footer from '@/components/Framework/Footer.vue' // 请根据项目实际路径调整
import { Plus } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

export default {
  name: 'DrillPage',
  components: {
    ElButton,
    ElButtonGroup,
    Footer
  },
  setup() {
    // 当前激活的 Tab
    const activeTab = ref('kaikong')

    // 钻孔数据示例
    const drillData = ref([
      {
        code: 'CS001',
        drillNo: 'CS001',
        project: '某某项目',
        currentDepth: '50m',
        designDepth: '80m'
      },
      {
        code: 'CS002',
        drillNo: 'CS002',
        project: '某某项目2',
        currentDepth: '30m',
        designDepth: '60m'
      }
    ])

    // 切换 Tab
    const setActiveTab = (tab) => {
      activeTab.value = tab
      console.log('当前选中的标签:', tab)
    }


    const router = useRouter()
    const handleAdd = () => {
      router.push({ name: 'NewDrillTask' })
    }

    return {
      activeTab,
      drillData,
      setActiveTab,
      handleAdd,
      Plus  // 将 Plus 图标暴露给模板使用
    }
  }
}
</script>

<style scoped>
/* 整体布局：上下结构，高度 100vh */
.drill-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9f9f9;
}

/* 顶部区域 */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.tab-buttons {
  display: flex;
  align-items: center;
}

.plus-button {
  margin-left: 10px;
  /* 可根据需求调整按钮颜色、大小等样式 */
}

/* 内容区：占满剩余高度，滚动展示 */
.drill-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

/* 钻孔卡片 */
.drill-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}
.drill-title {
  font-weight: bold;
  margin-bottom: 8px;
}
.drill-info div {
  margin-bottom: 4px;
}
</style>
