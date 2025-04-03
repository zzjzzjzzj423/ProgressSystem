<template>
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
</template>

<script>
import { ElButton, ElButtonGroup, ElBadge } from 'element-plus'
export default {
  name: 'Header',
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
    // 设置激活的按钮，并通知父组件（如果需要）
    setActiveTab(tabName) {
      this.activeTab = tabName
      this.$emit('tab-changed', tabName)
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
.button-container {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}
.news-badge {
  margin-left: 5px;
}
</style>
