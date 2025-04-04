import { createRouter, createWebHistory } from 'vue-router'
import ProgressOverview from "@/components/Overview/ProgressOverview.vue"; // 假设 test.vue 放在 views 目录下
import ProjectProgress from "@/components/Overview/ProjectProgress.vue";
import MachineDetail from "@/components/Overview/MachineDetail.vue";
import NewDrillTask from "@/components/editView/NewDrillTask.vue";
import DailyReport from "@/components/Overview/DailyReport.vue";
import GenerateReport from "@/components/Overview/GenerateReport.vue";
import ProjectDetail from "@/components/Overview/ProjectDetail.vue";

const routes = [
    {
        path: '/',
        name: 'ProgressOverview',
        component: ProgressOverview  // 设置初始页面为 test.vue
    },
    {
        path: '/ProjectProgress',
        name: 'ProjectProgress',
        component: ProjectProgress
    },
    {
        path: '/MachineDetail',
        name: 'MachineDetail',
        component: MachineDetail
    },
    {
        path: '/MachineDetail/NewDrillTask',
        name: 'NewDrillTask',
        component: NewDrillTask
    },
    {
        path: '/DailyReport',
        name: 'DailyReport',
        component: DailyReport
    },
    {
        path: '/GenerateReport',
        name: 'GenerateReport',
        component: GenerateReport
    },
    {
        path: '/ProjectProgress/ProjectDetail',
        name: 'ProjectDetail',
        component: ProjectDetail
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
