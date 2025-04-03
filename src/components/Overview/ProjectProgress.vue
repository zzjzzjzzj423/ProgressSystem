<template>
  <div class="project-progress">
    <!-- 顶部区域：使用提取的 Header 组件 -->
    <Header :activeTab="currentTab" @update:activeTab="setActiveTab" />

    <!-- 中间内容区 -->
    <div class="content-section">
      <!-- 年份下拉框 -->
      <el-select v-model="selectedYear" placeholder="选择年份" class="year-select">
        <el-option
            v-for="year in availableYears"
            :key="year"
            :label="year + '年'"
            :value="year.toString()"
        />
      </el-select>

      <!-- 项目卡片列表：根据 activeTab 和选中的年份过滤后的项目 -->
      <div
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="project-card"
      >
        <h3>{{ project.projectName }}</h3>
        <p>工作区: {{project.projectPlace}}</p>
        <p>工作名：{{ project.jobName }}</p>
        <p>负责人：{{ project.owner }}</p>
        <p>机台编号：{{ project.machineNo }}</p>
        <p>浇筑日期：{{ project.startDate }}</p>
        <p>预计完工：{{ project.endDate }}</p>
      </div>
    </div>

    <!-- 底部导航 -->
    <Footer />
  </div>
</template>

<script>
import { ElButton, ElButtonGroup, ElSelect, ElOption } from 'element-plus'
import Header from '@/components/Framework/ProjectHeader.vue'
import Footer from '@/components/Framework/Footer.vue'

export default {
  name: 'ProjectProgress',
  components: {
    Header,
    Footer,
    ElButton,
    ElButtonGroup,
    ElSelect,
    ElOption
  },
  data() {
    return {
      currentTab: 'inProgress', // 默认选中进行中
      selectedYear: '2025', // 默认选中的年份
      availableYears: [ '2024', '2025' ], // 可选年份列表，可根据实际数据调整
      projects: [
        {
          status: 'inProgress',
          projectPlace: '湖南省xx',
          projectName: '长沙中心xx项目',
          jobName: '施xx',
          owner: '张三',
          machineNo: 'CSD-1800X',
          startDate: '2024-10-01',
          endDate: '2025-07-10'
        },
        {
          status: 'inProgress',
          projectPlace: '湖南省邵阳市',
          projectName: '长沙中心xx项目',
          jobName: '施yy',
          owner: '李四',
          machineNo: 'CSD-1800X',
          startDate: '2025-01-01',
          endDate: '2025-07-10'
        },
        {
          status: 'todo',
          projectPlace: '湖南省xx',
          projectName: '长沙中心xx项目',
          jobName: '施zz',
          owner: '王五',
          machineNo: 'CSD-1800X',
          startDate: '2025-03-01',
          endDate: '2025-10-01'
        },
        {
          status: 'done',
          projectPlace: '湖南省xx',
          projectName: '长沙中心xx项目',
          jobName: '施aa',
          owner: '赵六',
          machineNo: 'CSD-1800X',
          startDate: '2024-01-01',
          endDate: '2024-08-01'
        },
        {
          status: 'inProgress',
          projectName: '长沙中心xx项目',
          jobName: '施bb',
          owner: '张三',
          machineNo: 'CSD-1800X',
          startDate: '2025-04-01',
          endDate: '2025-09-01'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      // 过滤条件：状态和项目 startDate 的年份与选中年份匹配
      return this.projects.filter(p => {
        const projectYear = new Date(p.startDate).getFullYear().toString()
        return p.status === this.currentTab && projectYear === this.selectedYear
      })
    }
  },
  methods: {
    setActiveTab(tab) {
      this.currentTab = tab

    }
  }
}
</script>

<style scoped>
.project-progress {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 中部内容区 */
.content-section {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}
.year-select {
  margin-bottom: 10px;
}

/* 项目卡片样式 */
.project-card {
  background-color: #337ab7;
  color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
}
.project-card h3 {
  margin-bottom: 6px;
}
.project-card p {
  margin: 4px 0;
}
</style>
