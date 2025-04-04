<template>
  <div class="progress-overview">
    <!-- 顶部 Header 组件 -->
    <Header @tab-changed="handleTabChange" />

    <!-- 中部内容区：根据 currentTab 切换内容 -->
    <div class="content-section">
      <!-- 进展总览内容 -->
      <div v-if="currentTab === 'overview'">
        <!-- 昨日进展 -->
        <div class="yesterday-progress">
          <h3>昨日进展</h3>
          <div class="progress-details">
            <div>昨日浇筑量：XXX  &nbsp; 预计完工日期：YYYY-MM-DD</div>
            <div>昨日其他进度：XXX  &nbsp;  预计剩余工期：Z 天</div>
          </div>
        </div>
        <!-- 累计进度 -->
        <div class="accumulated-progress">
          <h3>累计进度</h3>
          <div class="chart-section">
            <div class="chart-placeholder">饼图</div>
            <div class="chart-info">
              <p>累计进度：XX%</p>
              <p>累计总进尺：N 天</p>
              <p>完成率：XX%</p>
              <p>进行中的项目：XX%</p>
              <p>进行中的钻孔：XX%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 最新消息内容 -->
      <div v-else-if="currentTab === 'news'">
        <div class="news-content">
          <div class="news-item">
            <p>机台编号：CS001</p>
            <p>项目名称：长沙中心xx项目</p>
            <p>10:15</p>
          </div>
          <hr />
          <div class="news-item">
            <p>机台编号：CS002</p>
            <p>项目名称：长沙中心xx项目</p>
            <p>昨天</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部 Footer 组件 -->
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Framework/Header.vue'
import Footer from '@/components/Framework/Footer.vue'
export default {
  name: 'ProgressOverview',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      currentTab: 'overview'
    }
  },
  methods: {
    handleTabChange(tab) {
      this.currentTab = tab
    }
  }
}
</script>

<style scoped>
.progress-overview {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}
.content-section {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

/* 以下样式与之前一致 */
.yesterday-progress,
.accumulated-progress,
.news-content {
  background-color: #fff;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
}
.progress-details > div {
  margin-bottom: 5px;
}
.chart-section {
  display: flex;
  align-items: center;
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
</style>
