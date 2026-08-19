// c:\work\vue3-test\myBlog\vite-project\src\data\cs2Maps.ts

export type RegionType =
	| "bombsite" // 爆破点
	| "spawn-ct" // CT出生
	| "spawn-t" // T出生
	| "connector" // 通道/连接
	| "mid" // 中路
	| "default" // 普通区域

export interface MapRegion {
	id: string // 区域唯一标识
	name: string // 区域名称（callout）
	path: string // SVG path 数据（区域多边形）
	type?: RegionType // 区域类型（决定默认配色）
	color?: string // 自定义颜色（覆盖类型默认色）
	center?: { x: number; y: number } // 名称标签锚点
	description?: string // 区域描述
}

export interface CS2Map {
	id: string // 地图唯一标识
	name: string // 地图名称
	viewBox: string // SVG viewBox
	regions: MapRegion[] // 区域集合
}

// 类型默认配色表
export const regionTypeColors: Record<RegionType, string> = {
	bombsite: "#e74c3c",
	"spawn-ct": "#3498db",
	"spawn-t": "#e67e22",
	connector: "#9b59b6",
	mid: "#2ecc71",
	default: "#7f8c8d",
}

// 类型中文标签
export const regionTypeLabels: Record<RegionType, string> = {
	bombsite: "爆破点",
	"spawn-ct": "CT出生",
	"spawn-t": "T出生",
	connector: "通道",
	mid: "中路",
	default: "区域",
}

export const cs2Maps: CS2Map[] = [
	{
		id: "dust2",
		name: "Dust II",
		viewBox: "0 0 1000 1000",
		regions: [
			{
				id: "t-spawn",
				name: "T Spawn",
				type: "spawn-t",
				path: "M 680 680 L 920 680 L 920 920 L 680 920 Z",
				center: { x: 800, y: 800 },
				description: "恐怖分子出生点",
			},
			{
				id: "ct-spawn",
				name: "CT Spawn",
				type: "spawn-ct",
				path: "M 80 80 L 320 80 L 320 320 L 80 320 Z",
				center: { x: 200, y: 200 },
				description: "反恐精英出生点",
			},
			{
				id: "a-site",
				name: "A Site",
				type: "bombsite",
				path: "M 80 680 L 360 680 L 360 920 L 200 920 L 200 820 L 80 820 Z",
				center: { x: 220, y: 800 },
				description: "A爆破点",
			},
			{
				id: "b-site",
				name: "B Site",
				type: "bombsite",
				path: "M 640 80 L 920 80 L 920 320 L 800 320 L 800 200 L 640 200 Z",
				center: { x: 780, y: 200 },
				description: "B爆破点",
			},
			{
				id: "mid",
				name: "Mid",
				type: "mid",
				path: "M 400 400 L 600 400 L 600 600 L 400 600 Z",
				center: { x: 500, y: 500 },
				description: "中路核心区域",
			},
			{
				id: "long",
				name: "Long A",
				type: "default",
				path: "M 40 400 L 200 400 L 200 600 L 40 600 Z",
				center: { x: 120, y: 500 },
				description: "A区长通道",
			},
			{
				id: "catwalk",
				name: "Catwalk",
				type: "connector",
				path: "M 360 600 L 400 600 L 400 680 L 360 680 Z",
				center: { x: 380, y: 640 },
				description: "连接中路与A点",
			},
			{
				id: "tunnels",
				name: "Tunnels",
				type: "connector",
				path: "M 800 320 L 920 320 L 920 680 L 800 680 Z",
				center: { x: 860, y: 500 },
				description: "通往B点的隧道",
			},
			{
				id: "upper-tunnels",
				name: "Upper Tunnels",
				type: "connector",
				path: "M 600 360 L 800 360 L 800 400 L 600 400 Z",
				center: { x: 700, y: 380 },
				description: "隧道上层入口",
			},
			{
				id: "outside-long",
				name: "Outside Long",
				type: "default",
				path: "M 200 600 L 360 600 L 360 680 L 200 680 Z",
				center: { x: 280, y: 640 },
				description: "A点外围区域",
			},
		],
	},
	{
		id: "mirage",
		name: "Mirage",
		viewBox: "0 0 1000 1000",
		regions: [
			{
				id: "t-spawn-m",
				name: "T Spawn",
				type: "spawn-t",
				path: "M 400 800 L 600 800 L 600 920 L 400 920 Z",
				center: { x: 500, y: 860 },
				description: "恐怖分子出生点",
			},
			{
				id: "ct-spawn-m",
				name: "CT Spawn",
				type: "spawn-ct",
				path: "M 400 80 L 600 80 L 600 200 L 400 200 Z",
				center: { x: 500, y: 140 },
				description: "反恐精英出生点",
			},
			{
				id: "a-site-m",
				name: "A Site",
				type: "bombsite",
				path: "M 700 200 L 920 200 L 920 420 L 700 420 Z",
				center: { x: 810, y: 310 },
				description: "A爆破点",
			},
			{
				id: "b-site-m",
				name: "B Site",
				type: "bombsite",
				path: "M 80 200 L 300 200 L 300 420 L 80 420 Z",
				center: { x: 190, y: 310 },
				description: "B爆破点（公寓）",
			},
			{
				id: "mid-m",
				name: "Mid",
				type: "mid",
				path: "M 420 420 L 580 420 L 580 580 L 420 580 Z",
				center: { x: 500, y: 500 },
				description: "中路",
			},
			{
				id: "connector-m",
				name: "Connector",
				type: "connector",
				path: "M 580 420 L 700 420 L 700 480 L 580 480 Z",
				center: { x: 640, y: 450 },
				description: "连接中路与A点",
			},
			{
				id: "palace-m",
				name: "Palace",
				type: "default",
				path: "M 700 80 L 920 80 L 920 200 L 700 200 Z",
				center: { x: 810, y: 140 },
				description: "A点二楼",
			},
		],
	},
]
