<template>
  <div class="project-detail">
    <!-- 顶部Header，可选，详情页一般带返回按钮 -->
    <Header />

    <!-- 详情内容区，支持上下滑动 -->
    <div class="detail-container">
      <div class="detail-header">
        <h2>{{ project.projectName }}</h2>
        <el-button type="text" @click="goBack">返回</el-button>
      </div>

      <!-- 项目整体信息 -->
      <div class="project-info">
        <p>工作区：{{ project.projectPlace }}</p>
        <p>负责人：{{ project.owner }}</p>
        <p>机台编号：{{ project.machineNo }}</p>
        <p v-if="project.drillType">钻机型号：{{ project.drillType }}</p>
        <p>开始时间：{{ project.startDate }}</p>
        <p>结束时间：{{ project.endDate }}</p>
        <p v-if="project.plannedHoleCount">
          计划钻孔数：{{ project.plannedHoleCount }}个
        </p>
        <p v-if="project.progressPercent">
          完成进尺占比：{{ project.progressPercent }}
        </p>
      </div>

      <!-- 钻孔切换视图（如果存在holes数组） -->
      <div v-if="project.holes && project.holes.length" class="hole-view">
        <div class="hole-nav">
          <el-button @click="prevHole" :disabled="currentHoleIndex <= 0">←</el-button>
          <span>钻孔 {{ currentHoleIndex + 1 }} / {{ project.holes.length }}</span>
          <el-button
              @click="nextHole"
              :disabled="currentHoleIndex >= project.holes.length - 1"
          >
            →
          </el-button>
        </div>
        <div class="hole-detail">
          <h3>钻孔编号: {{ currentHole.drillNumber }}</h3>
          <p>当前孔深: {{ currentHole.currentDepth }}</p>
          <p>设计孔深: {{ currentHole.designedDepth }}</p>
          <p>完成进度: {{ currentHole.completionRate }}</p>
          <p>放孔日期: {{ currentHole.holePlacementDate }}</p>
          <p>开孔日期: {{ currentHole.holeStartDate }}</p>
          <p>终孔日期: {{ currentHole.holeEndDate }}</p>
          <p>设计倾角: {{ currentHole.designedInclination }}</p>
          <p>当前倾角: {{ currentHole.currentInclination }}</p>
          <p>设计方位角: {{ currentHole.designedAzimuth }}</p>
          <p>当前方位角: {{ currentHole.currentAzimuth }}</p>
          <p>孔内情况: {{ currentHole.holeSituation || '无' }}</p>
          <!-- 进度条示例 -->
          <div class="hole-progress">
            <!-- 进度条 -->
            <div class="progress-bar">
              <div
                  class="progress-bar-completed"
                  :style="{ height: currentHole.completionRate }"
              ></div>
            </div>

            <!-- 图例 -->
            <div class="progress-legend">
              <div class="legend-item">
                <div class="legend-color" style="background-color: green;"></div>
                <span>完成</span>
              </div>
              <div class="legend-item">
                <div class="legend-color" style="background-color: #ccc;"></div>
                <span>未完成</span>
              </div>
            </div>
          </div>
          <p>完成进度：{{ currentHole.completionRate }}</p>


        </div>
      </div>
    </div>

    <!-- 底部Footer -->
    <Footer />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { ElButton } from 'element-plus'
import Header from '@/components/Framework/ProjectHeader.vue'
import Footer from '@/components/Framework/Footer.vue'
import { useRoute, useRouter } from 'vue-router'


export default {
  name: 'ProjectDetail',
  components: {
    Header,
    Footer,
    ElButton
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // 从路由 query 中获取传递过来的项目数据（JSON 字符串）
    const projectData = route.query.project;
    const project = projectData ? JSON.parse(projectData) : {};

    const currentHoleIndex = ref(0);
    const currentHole = computed(() => {
      const holes = project.holes || [];
      return holes[currentHoleIndex.value] || {};
    });

    // 切换钻孔
    const prevHole = () => {
      if (currentHoleIndex.value > 0) {
        currentHoleIndex.value--;
      }
    };
    const nextHole = () => {
      if (project.holes && currentHoleIndex.value < project.holes.length - 1) {
        currentHoleIndex.value++;
      }
    };

    // 返回上一页
    const goBack = () => {
      router.back();
    };

    return {
      project,
      currentHoleIndex,
      currentHole,
      prevHole,
      nextHole,
      goBack
    };

  }

}
</script>

<style scoped>
.project-detail {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.detail-container {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-header h2 {
  margin: 0;
}

.project-info {
  margin-top: 10px;
  color: #333;
}

/* 钻孔切换 */
.hole-view {
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 10px;
}
.hole-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.hole-detail {
  margin-top: 10px;
}

.hole-progress {
  display: flex;
  align-items: flex-end; /* 进度条和图例底部对齐 */
  gap: 10px;            /* 进度条与图例之间的间距 */
  margin-top: 10px;
}

/* 进度条本体：灰色 */
.progress-bar {
  position: relative;
  width: 40px;
  height: 120px; /* 可根据需求调整 */
  background-color: #ccc; /* 灰色 */
  border-radius: 4px;
  overflow: hidden;
}

/* 已完成部分：绿色 */
.progress-bar-completed {
  position: absolute;
  top: 0;           /* 绿色从顶部开始 */
  width: 100%;
  background-color: green;
}

/* 图例整体 */
.progress-legend {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  gap: 6px;
}

/* 每个图例项 */
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
}

/* 图例方块 */
.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

</style>
