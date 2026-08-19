import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/Dust2",
		name: "Dust2",
		component: () => import("../views/Dust2.vue"),
	},
	{
		path: "/:pathMatch(.*)*",
		name: "Unknow",
		component: () => import("../views/Unknow.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
