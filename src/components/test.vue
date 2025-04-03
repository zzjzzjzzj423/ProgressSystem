<template>
  <div class="progress-overview">
    <!-- 顶部按钮区域 -->
    <div class="button-container">
      <el-button-group>
        <!-- 进展总览按钮 -->
        <el-button
            :type="activeTab === 'overview' ? 'primary' : 'default'"
            @click="setActiveTab('overview')"
        >
          进展总览
        </el-button>

        <!-- 最新消息按钮 -->
        <el-button
            :type="activeTab === 'news' ? 'primary' : 'default'"
            @click="setActiveTab('news')"
        >
          最新消息
          <!-- 当 hasNewMessage 为 true 时显示红点 -->
          <el-badge v-if="hasNewMessage" is-dot class="news-badge" />
        </el-button>
      </el-button-group>
    </div>

    <!-- 中部内容区 -->
    <div class="content-section">
      <!-- 昨日进展 -->
      <div class="yesterday-progress">
        <h3>昨日进展</h3>
        <div class="progress-details">
          <div>昨日浇筑量：XXX  &nbsp; 预计完工日期：YYYY-MM-DD</div>
          <div>昨日其他进度：XXX  &nbsp;  预计剩余工期：Z 天</div>
        </div>
      </div>

      <!-- 累计进度（示例为饼图占位） -->
      <div class="accumulated-progress">
        <h3>累计进度</h3>
        <div class="chart-section">
          <!-- 在这里可以嵌入 ECharts 或其他图表组件 -->
          <div class="chart-placeholder">
            饼图
          </div>
          <div class="chart-info">
            <p>进度：XX%</p>
            <p>已完成工期：N 天</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部导航区 -->
    <div class="bottom-nav">
      <ul>
        <li>
          <div class="nav-icon">🏠</div>
          <div class="nav-text">进展总览</div>
        </li>
        <li>
          <div class="nav-icon">📈</div>
          <div class="nav-text">项目进度</div>
        </li>
        <li>
          <div class="nav-icon">🏢</div>
          <div class="nav-text">机构详情</div>
        </li>
        <li>
          <div class="nav-icon">👥</div>
          <div class="nav-text">人员管理</div>
        </li>
        <li>
          <div class="nav-icon">📋</div>
          <div class="nav-text">牛皮报告</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ElButton, ElButtonGroup, ElBadge } from 'element-plus'

export default {
  name: 'MyButtonTabs',
  components: {
    ElButton,
    ElButtonGroup,
    ElBadge
  },
  data() {
    return {
      activeTab: 'overview', // 当前选中的按钮
      hasNewMessage: false   // 是否有最新消息
    }
  },
  methods: {
    // 设置激活的按钮（同时只有一个按钮会被设置为 active）
    setActiveTab(tabName) {
      this.activeTab = tabName
      console.log('当前标签:', tabName)
    },
    // 模拟逻辑检测到新消息
    checkNewMessage() {
      this.hasNewMessage = true
    }
  },
  mounted() {
    // 模拟组件挂载后延时检测新消息
    setTimeout(() => {
      this.checkNewMessage()
    }, 2000)
  }
}
</script>

<style scoped>
/* 整体容器 */
.progress-overview {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}
.button-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

/* 控制红点的位置 */
.news-badge {
  margin-left: 5px;
}

/* 中部内容区 */
.content-section {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

/* 昨日进展 */
.yesterday-progress {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
}
.yesterday-progress h3 {
  margin-bottom: 10px;
}
.progress-details > div {
  margin-bottom: 5px;
}

/* 累计进度 */
.accumulated-progress {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
}
.accumulated-progress h3 {
  margin-bottom: 10px;
}
.chart-section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.chart-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #d9edf7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}
.chart-info {
  font-size: 14px;
}

/* 底部导航 */
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
  font-size: 12px;
  color: #333;
  cursor: pointer;
}
.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.nav-text {
  white-space: nowrap;
}
</style>
