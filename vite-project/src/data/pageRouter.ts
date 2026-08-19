export interface Page {
	name: string //姓名
	label: string //标签
	path: string //路径
}
const pageMes = [
	{
		name: "沙二小众变态道具",
		label: "沙二小众变态道具",
		path: "/Dust2",
	},
	{
		name: "测试1",
		label: "未公开1",
		path: "/Unknow",
	},
	{
		name: "测试2",
		label: "未公开2",
		path: "/Unknow",
	},
	{
		name: "测试1",
		label: "未公开3",
		path: "/Unknow",
	},
	{
		name: "测试2",
		label: "未公开4",
		path: "/Unknow",
	},
	{
		name: "测试1",
		label: "未公开5",
		path: "/Unknow",
	},
	{
		name: "测试2",
		label: "未公开6",
		path: "/Unknow",
	},
	{
		name: "测试1",
		label: "未公开7",
		path: "/Unknow",
	},
	{
		name: "测试2",
		label: "未公开8",
		path: "/Unknow",
	},
	{
		name: "测试1",
		label: "未公开9",
		path: "/Unknow",
	},
	{
		name: "测试2",
		label: "未公开10",
		path: "/Unknow",
	},
]
const buttons = [
	{
		text: "沙二小众变态道具",
		icon: "folder",
	},
	{
		text: "未发布",
		icon: "settings",
	},
	{
		text: "未发布",
		icon: "settings",
	},
] //快捷图标区
export default {
	getAllMesPage() {
		return pageMes
	},
	// 点击快捷图标
	handleClick(text: string) {
		const page = pageMes.find((item) => item.name === text)
		return page ? page.path : null // 返回路径字符串
	},
	getButtons() {
		return buttons
	},
}
