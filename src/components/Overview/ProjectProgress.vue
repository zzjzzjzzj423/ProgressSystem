<template>
  <div class="project-progress">
    <!-- 顶部Header -->
    <Header :activeTab="currentTab" @update:activeTab="setActiveTab" />

    <!-- 中间内容区：项目列表 -->
    <div class="content-section">
      <!-- 年份选择下拉框，筛选项目 -->
      <el-select v-model="selectedYear" placeholder="选择年份" class="year-select">
        <el-option
            v-for="year in availableYears"
            :key="year"
            :label="year + '年'"
            :value="year.toString()"
        />
      </el-select>

      <!-- 项目卡片列表 -->
      <div
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="project-card"
          @click="openProjectDetail(project)"
      >
        <h3>{{ project.projectName }}</h3>
        <p>工作区：{{ project.projectPlace }}</p>
        <p>工作名：{{ project.jobName }}</p>
        <p>负责人：{{ project.owner }}</p>
        <p>机台编号：{{ project.machineNo }}</p>
        <p>浇筑日期：{{ project.startDate }}</p>
        <p>预计完工：{{ project.endDate }}</p>
      </div>
    </div>

    <!-- 底部Footer -->
    <Footer />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { useRouter } from 'vue-router'
import Header from '@/components/Framework/ProjectHeader.vue'
import Footer from '@/components/Framework/Footer.vue'
import router from "@/Router/index.js";

export default {
  name: 'ProjectProgress',
  components: {
    Header,
    Footer,
    ElSelect,
    ElOption
  },
  setup(_, { root }) {
    // 当前Tab，由 Header 控制
    const currentTab = ref('inProgress')
    const selectedYear = ref('2024')
    const availableYears = ['2024', '2025']

    // 模拟项目列表（示例数据）
    const projects = ref([
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
      },
      // 新增示例，包含 holes 数组
      {
        status: 'inProgress',
        projectName: '长沙中心杯化-邵阳项目',
        projectPlace: '湖南省邵阳市隆回县',
        owner: '张三',
        machineNo: 'CS003',
        drillType: 'CSD-1800X',
        startDate: '2024-10-01',
        endDate: '2025-07-10',
        plannedHoleCount: 5,
        progressPercent: '68.5%',
        holes: [
          {
            drillNumber: 'ZK3001',
            currentDepth: '151.2米',
            designedDepth: '300米',
            completionRate: '50.1%',
            holePlacementDate: '2024-10-28',
            holeStartDate: '2024-10-30',
            holeEndDate: '2024-12-29',
            designedInclination: '90°',
            currentInclination: '89.85°',
            designedAzimuth: '20°',
            currentAzimuth: '19.87°',
            holeSituation: '孔内情况'
          },
          {
            drillNumber: 'ZK3002',
            currentDepth: '200米',
            designedDepth: '300米',
            completionRate: '66.7%',
            holePlacementDate: '2024-10-29',
            holeStartDate: '2024-11-01',
            holeEndDate: '未完成',
            designedInclination: '90°',
            currentInclination: '88.5°',
            designedAzimuth: '20°',
            currentAzimuth: '18.0°',
            holeSituation: '钻进中'
          }
        ]
      }
    ])

    // 过滤当前Tab和选中年份
    const filteredProjects = computed(() => {
      return projects.value.filter((p) => {
        const projectYear = new Date(p.startDate).getFullYear().toString()
        return p.status === currentTab.value && projectYear === selectedYear.value
      })
    })

    // 点击项目卡片后跳转到详情页面，并将项目数据通过 query 传递
    // 点击项目卡片后跳转到详情页面，并将项目数据通过 query 传递
    const openProjectDetail = (project) => {
      router.push({
        name: 'ProjectDetail',
        query: { project: JSON.stringify(project) }
      })
    }

    // Header 回调
    const setActiveTab = (tab) => {
      currentTab.value = tab
    }

    return {
      currentTab,
      setActiveTab,
      selectedYear,
      availableYears,
      filteredProjects,
      openProjectDetail
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

.content-section {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.year-select {
  margin-bottom: 10px;
}

.project-card {
  background-color: #337ab7;
  color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  cursor: pointer;
}
.project-card h3 {
  margin-bottom: 6px;
}
.project-card p {
  margin: 4px 0;
}
</style>
