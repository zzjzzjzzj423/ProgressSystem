<template>
  <div class="project-detail">
    <h1>项目详情</h1>
    <!-- 示例：只显示当前项目 ID -->
    <p>项目 ID: {{ projectId }}</p>

    <!-- 这里可以放你要展示的详细信息，如：
    <p>项目名称: {{ projectData.projectName }}</p>
    <p>工作名: {{ projectData.jobName }}</p>
    <p>负责人: {{ projectData.owner }}</p>
    ...等等
    -->
  </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
  data() {
    return {
      projectId: null,
      // projectData: {} // 如果要请求真实数据，可以在这里存储
    }
  },
  created() {
    // 获取路由参数
    this.projectId = this.$route.params.id

    // TODO: 如果需要，请求接口或从 Vuex/Pinia 获取项目详情
    // this.fetchProjectData(this.projectId)
  },
  methods: {
    // fetchProjectData(id) {
    //   // 例如从接口获取项目详情，赋值给 this.projectData
    // }
  }
}
</script>

<style scoped>
.project-detail {
  padding: 20px;
  background-color: #f5f5f5;
}
</style>
