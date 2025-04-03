<template>
  <div class="top-bar">
    <div class="left-buttons">
      <el-button-group>
        <el-button
            :type="activeTab === 'todo' ? 'primary' : 'default'"
            @click="setActiveTab('todo')"
        >
          待开始
        </el-button>
        <el-button
            :type="activeTab === 'inProgress' ? 'primary' : 'default'"
            @click="setActiveTab('inProgress')"
        >
          进行中
        </el-button>
        <el-button
            :type="activeTab === 'done' ? 'primary' : 'default'"
            @click="setActiveTab('done')"
        >
          已完成
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
import { ElButton, ElButtonGroup } from 'element-plus'

export default {
  name: 'ProjectHeader',
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  components: {
    ElButton,
    ElButtonGroup
  },
  methods: {
    setActiveTab(tab) {
      this.$emit('update:activeTab', tab)
      console.log('当前标签:', tab)
    }
  }
}
</script>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.left-buttons {
  display: flex;
  align-items: center;
}
</style>
