<template>
  <div class="report-generation-page">
    <!-- 中间内容区域 -->
    <div class="content-section">
      <h2>生成报表</h2>

      <!-- 报表类型（日报、周报、年报） -->
      <el-form>
        <el-form-item label="报表类型">
          <el-radio-group v-model="reportType">
            <el-radio label="日报">日报</el-radio>
            <el-radio label="周报">周报</el-radio>
            <el-radio label="年报">年报</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 导出格式（PDF、Excel） -->
        <el-form-item label="导出格式">
          <el-radio-group v-model="reportFormat">
            <el-radio label="PDF">PDF</el-radio>
            <el-radio label="Excel">Excel</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 生成报表按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleGenerateReport">生成报表</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 使用Footer组件作为底部导航 -->
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElRadioGroup,
  ElRadio,
  ElButton
} from 'element-plus'
import Footer from '@/components/Framework/Footer.vue'

export default {
  name: 'ReportGeneration',
  components: {
    ElForm,
    ElFormItem,
    ElRadioGroup,
    ElRadio,
    ElButton,
    Footer
  },
  setup() {
    // 报表类型：日报/周报/年报
    const reportType = ref('日报')

    // 导出格式：PDF/Excel
    const reportFormat = ref('PDF')

    // 点击“生成报表”按钮
    const handleGenerateReport = () => {
      console.log('选择的报表类型:', reportType.value)
      console.log('选择的导出格式:', reportFormat.value)
      // 在此处执行具体的报表生成逻辑
      alert(`生成 ${reportType.value} - ${reportFormat.value} 报表！`)
    }

    return {
      reportType,
      reportFormat,
      handleGenerateReport
    }
  }
}
</script>

<style scoped>
.report-generation-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 中间滚动区域 */
.content-section {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  box-sizing: border-box;
}
</style>
