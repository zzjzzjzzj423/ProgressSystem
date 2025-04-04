<template>
  <div class="bottom-nav">
    <ul>
      <li>
        <router-link to="/">
          <div class="nav-icon">🏠</div>
          <div class="nav-text">进展总览</div>
        </router-link>
      </li>
      <li>
        <router-link to="/ProjectProgress">
          <div class="nav-icon">📈</div>
          <div class="nav-text">项目进度</div>
        </router-link>
      </li>
      <li>
        <router-link to="/MachineDetail">
          <div class="nav-icon">⚙️</div>
          <div class="nav-text">机台管理</div>
        </router-link>
      </li>
      <li>
        <router-link to="/DailyReport">
          <div class="nav-icon">📑</div>
          <div class="nav-text">人员填报</div>
        </router-link>
      </li>
      <li>
        <router-link to="/generate-report">
          <div class="nav-icon">📋</div>
          <div class="nav-text">生成报告</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.bottom-nav {
  background-color: #fff;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}
.bottom-nav ul {
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 8px 0;
  list-style: none;
}
.bottom-nav li {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: #333;
  cursor: pointer;
}
.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
}
.nav-text {
  white-space: nowrap;
}
</style>
