<template>
  <div class="daily-report-page">
    <!-- 若需要页面顶部Header，可自行引入 -->
    <!-- <Header :activeTab="currentTab" @update:activeTab="setActiveTab" /> -->

    <!-- 中间内容区域：可上下滚动 -->
    <div class="content-section">
      <h2>每日填报</h2>
      <el-form
          ref="dailyForm"
          :model="formData"
          label-width="120px"
      >
        <!-- 机台（下拉选择） -->
        <el-form-item label="机台">
          <el-select v-model="formData.machine" placeholder="请选择机台">
            <el-option
                v-for="(item, index) in machineOptions"
                :key="index"
                :label="item"
                :value="item"
            />
          </el-select>
        </el-form-item>

        <!-- 钻孔编号 -->
        <el-form-item label="钻孔编号">
          <el-input v-model="formData.drillNumber" placeholder="根据第一次数填报默认" />
        </el-form-item>

        <!-- 钻机型号 -->
        <el-form-item label="钻机型号">
          <el-input v-model="formData.drillType" placeholder="根据第一次数填报默认" />
        </el-form-item>

        <!-- 总进尺 -->
        <el-form-item label="总进尺">
          <el-input v-model="formData.totalDepth" placeholder="可根据实际情况填写" />
        </el-form-item>

        <!-- 设计孔深 -->
        <el-form-item label="设计孔深">
          <el-input v-model="formData.designDepth" placeholder="根据第一次数填报默认" />
        </el-form-item>

        <!-- 放孔日期 使用日期选择器 -->
        <el-form-item label="放孔日期">
          <el-date-picker
              v-model="formData.dateOfHolePlacement"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <!-- 当前孔深 -->
        <el-form-item label="当前孔深">
          <el-input v-model="formData.currentHoleDepth" placeholder="当前已钻深度" />
        </el-form-item>

        <!-- 当前倾角 -->
        <el-form-item label="当前倾角">
          <el-input v-model="formData.currentInclination" placeholder="当前钻孔倾斜角度" />
        </el-form-item>

        <!-- 当前方位角 -->
        <el-form-item label="当前方位角">
          <el-input v-model="formData.currentAzimuth" placeholder="当前钻孔方位角" />
        </el-form-item>

        <!-- 开孔日期 使用日期选择器 -->
        <el-form-item label="开孔日期">
          <el-date-picker
              v-model="formData.drillingStartDate"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <!-- 开层项目 -->
        <el-form-item label="开层项目">
          <el-input v-model="formData.stratumOpeningProject" placeholder="例如：岩心、泥浆护壁等" />
        </el-form-item>

        <!-- 工作区 -->
        <el-form-item label="工作区">
          <el-input v-model="formData.workArea" placeholder="填写工作区域" />
        </el-form-item>

        <!-- 施工负责人 -->
        <el-form-item label="施工负责人">
          <el-input v-model="formData.constructionSupervisor" placeholder="负责人姓名" />
        </el-form-item>

        <!-- 各班进尺 (一班、二班、三班) -->
        <el-form-item label="各班进尺">
          <div style="display: flex; gap: 8px;">
            <el-input
                v-model="formData.shiftDepthClassA"
                placeholder="一班"
                style="width: 33%;"
            />
            <el-input
                v-model="formData.shiftDepthClassB"
                placeholder="二班"
                style="width: 33%;"
            />
            <el-input
                v-model="formData.shiftDepthClassC"
                placeholder="三班"
                style="width: 33%;"
            />
          </div>
        </el-form-item>

        <!-- 当日进尺 -->
        <el-form-item label="当日进尺">
          <el-input
              v-model="formData.dailyDepth"
              placeholder="当天累计进尺"
          />
        </el-form-item>

        <!-- 孔内情况 (原“当内情况”) -->
        <el-form-item label="孔内情况">
          <el-input
              type="textarea"
              v-model="formData.currentSituation"
              placeholder="填写孔内情况"
          />
        </el-form-item>

        <!-- 设备情况 -->
        <el-form-item label="设备情况">
          <el-input
              type="textarea"
              v-model="formData.equipmentSituation"
              placeholder="填写设备情况"
          />
        </el-form-item>

        <!-- 备注 (选填) -->
        <el-form-item label="备注">
          <el-input
              type="textarea"
              v-model="formData.remark"
              placeholder="选填"
          />
        </el-form-item>

        <!-- 附件 (选填) -->
        <el-form-item label="附件">
          <el-upload
              class="upload-demo"
              drag
              action="#"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :limit="3"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>

        <!-- 是否终孔 -->
        <el-form-item>
          <el-checkbox v-model="formData.isEndHole">终孔</el-checkbox>
        </el-form-item>

        <!-- 表单提示 -->
        <div style="margin: 10px 0;">
          未完成表单自动套录，支持跨设备续填
        </div>

        <!-- 提交/保存按钮 -->
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 底部导航，固定在页面底部 -->
    <Footer />
  </div>
</template>

<script>
import { ref } from 'vue'
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
  ElSelect,
  ElOption,
  ElCheckbox,
  ElUpload,
  ElDatePicker
} from 'element-plus'
// 若需要页面顶部Header，可自行引入
// import Header from '@/components/Framework/ProjectHeader.vue'
import Footer from '@/components/Framework/Footer.vue'

export default {
  name: 'DailyReport',
  components: {
    // Header,
    Footer,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    ElCheckbox,
    ElUpload,
    ElDatePicker
  },
  setup() {
    const formData = ref({
      // 机台信息
      machine: '',
      // 钻孔编号
      drillNumber: '',
      // 钻机型号
      drillType: '',
      // 总进尺
      totalDepth: '',
      // 设计孔深
      designDepth: '',
      // 放孔日期
      dateOfHolePlacement: '',
      // 当前孔深
      currentHoleDepth: '',
      // 当前倾角
      currentInclination: '',
      // 当前方位角
      currentAzimuth: '',
      // 开孔日期
      drillingStartDate: '',
      // 开层项目
      stratumOpeningProject: '',
      // 工作区
      workArea: '',
      // 施工负责人
      constructionSupervisor: '',
      // 各班进尺：一班、二班、三班
      shiftDepthClassA: '',
      shiftDepthClassB: '',
      shiftDepthClassC: '',
      // 当日进尺
      dailyDepth: '',
      // 孔内情况
      currentSituation: '',
      // 设备情况
      equipmentSituation: '',
      // 备注
      remark: '',
      // 是否终孔
      isEndHole: false
    })

    // 示例机台选项
    const machineOptions = ['CSD-1800X', 'CSD-2000', 'XYZ-123']

    // 上传的附件列表
    const fileList = ref([])

    // 处理预览附件
    const handlePreview = (file) => {
      console.log('preview file:', file)
    }

    // 移除附件
    const handleRemove = (file, fileListNow) => {
      console.log('remove file:', file, fileListNow)
    }

    // 提交表单
    const handleSubmit = () => {
      // 这里写提交逻辑
      console.log('提交表单:', formData.value)
    }

    // 保存表单
    const handleSave = () => {
      // 这里写保存逻辑
      console.log('保存表单:', formData.value)
    }

    return {
      formData,
      fileList,
      machineOptions,
      handlePreview,
      handleRemove,
      handleSubmit,
      handleSave
    }
  }
}
</script>

<style scoped>
.daily-report-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

/* 中间滚动区域 */
.content-section {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
}

/* 上传区域示例样式 */
.upload-demo {
  width: 100%;
}
</style>
