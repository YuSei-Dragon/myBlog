export interface Page {
	name: string //姓名
	label: string //标签
	path: string //路径
}
const pageMes = [
	{
		name: "沙二小众变态道具",
		label: "沙二小众变态道具",
		path: "@/views/Dust2.vue",
	},
	{
		name: "测试1",
		label: "未公开1",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试2",
		label: "未公开2",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试1",
		label: "未公开3",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试2",
		label: "未公开4",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试1",
		label: "未公开5",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试2",
		label: "未公开6",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试1",
		label: "未公开7",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试2",
		label: "未公开8",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试1",
		label: "未公开9",
		path: "@/views/Unknow.vue",
	},
	{
		name: "测试2",
		label: "未公开10",
		path: "@/views/Unknow.vue",
	},
]
export default {
	getAllMesPage() {
		return pageMes
	},
}
