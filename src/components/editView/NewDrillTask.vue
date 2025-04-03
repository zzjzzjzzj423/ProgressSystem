<template>
  <div class="new-drill-task">
    <!-- 顶部区域：返回箭头 + 标题 -->
    <header class="top-bar">
      <div class="back-icon" @click="handleBack">
        <!-- 使用 Element Plus 的箭头图标 -->
        <el-icon>
          <ArrowLeft />
        </el-icon>
      </div>
      <h2>新建钻探任务</h2>
    </header>

    <!-- 表单区域 -->
    <main class="form-container">
      <el-form
          :model="formData"
          :rules="rules"
          ref="formRef"
          label-width="80px"
      >
        <el-form-item label="机台" prop="machineNo">
          <el-input v-model="formData.machineNo" placeholder="请输入机台号" />
        </el-form-item>

        <el-form-item label="钻孔编号" prop="drillNo">
          <el-input v-model="formData.drillNo" placeholder="请输入钻孔编号" />
        </el-form-item>

        <el-form-item label="钻孔型号" prop="drillType">
          <el-input v-model="formData.drillType" placeholder="请输入钻孔型号" />
        </el-form-item>

        <el-form-item label="设计孔深" prop="designDepth">
          <el-input v-model="formData.designDepth" placeholder="请输入设计孔深" />
        </el-form-item>

        <el-form-item label="开孔日期" prop="startDate">
          <el-date-picker
              v-model="formData.startDate"
              type="date"
              placeholder="选择开孔日期"
          />
        </el-form-item>

        <el-form-item label="所属项目" prop="project">
          <el-input v-model="formData.project" placeholder="请输入项目名称" />
        </el-form-item>

        <el-form-item label="工作区" prop="workArea">
          <el-input v-model="formData.workArea" placeholder="请输入工作区" />
        </el-form-item>

        <el-form-item label="施工负责" prop="owner">
          <el-input v-model="formData.owner" placeholder="请输入负责人" />
        </el-form-item>
      </el-form>
    </main>

    <!-- 底部按钮区：保存、提交 -->
    <footer class="bottom-bar">
      <el-button @click="handleSave">保存</el-button>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElDatePicker, ElButton, ElIcon } from 'element-plus'
import { ArrowLeft } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

export default {
  name: 'NewDrillTask',
  components: {
    ElForm,
    ElFormItem,
    ElInput,
    ElDatePicker,
    ElButton,
    ElIcon,
    ArrowLeft
  },
  setup() {
    const router = useRouter()

    // 表单数据
    const formData = ref({
      machineNo: '',
      drillNo: '',
      drillType: '',
      designDepth: '',
      startDate: '',
      project: '',
      workArea: '',
      owner: ''
    })

    // 校验规则（可选）
    const rules = {
      machineNo: [{ required: true, message: '请输入机台号', trigger: 'blur' }],
      drillNo: [{ required: true, message: '请输入钻孔编号', trigger: 'blur' }]
      // 其他字段可自行添加校验
    }

    const formRef = ref(null)

    // 返回上一页
    const handleBack = () => {
      // 通过路由后退，也可以直接 router.push('/somewhere')
      router.back()
    }

    // 保存按钮
    const handleSave = () => {
      // 一般保存时先做校验
      formRef.value.validate(valid => {
        if (valid) {
          console.log('保存数据:', formData.value)
          // 这里可调用接口或做其他处理
        } else {
          console.log('校验失败')
        }
      })
    }

    // 提交按钮
    const handleSubmit = () => {
      formRef.value.validate(valid => {
        if (valid) {
          console.log('提交数据:', formData.value)
          // 这里可调用接口或做其他处理
        } else {
          console.log('校验失败')
        }
      })
    }

    return {
      formData,
      rules,
      formRef,
      handleBack,
      handleSave,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.new-drill-task {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9f9f9;
}

/* 顶部栏：返回箭头 + 标题 */
.top-bar {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.back-icon {
  cursor: pointer;
  margin-right: 10px;
}

.top-bar h2 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

/* 中间表单区 */
.form-container {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

/* 底部按钮 */
.bottom-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background-color: #fff;
  box-shadow: 0 -1px 4px rgba(0,0,0,0.1);
}
</style>
