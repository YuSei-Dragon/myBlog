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
	radarImage?: string // 新增：可选的雷达图背景URL
	regionOpacity?: number // 区域图层透明度（0-1），默认0.35
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
		viewBox: "0 0 1024 1024",
		radarImage: "public/radar/dust2.png",
		regionOpacity: 0.5, // ← 新增：半透明，能清晰看到底下雷达图地形
		regions: [
			{
				id: "b-size",
				name: "B区",
				type: "bombsite",
				path: "M 77 17 L 132 17 L 132 80 L 219 80 L 255 103 L 255 305 L 202 353 L 200 370 L 170 370 L 170 330 L 65 330 L 60 184 L 76 181 Z",
				center: { x: 150, y: 160 },
				description: "B区",
			},
			{
				id: "a-size",
				name: "A区",
				type: "bombsite",
				path: "M 678 102 L 790 102 L 792 36 L 924 36 L 924 103 L 932 103 L 930 215 L 678 215 Z",
				center: { x: 850, y: 160 },
				description: "A区",
			},
			{
				id: "dust-ground",
				name: "沙地",
				type: "default",
				path: "M 265 117 L 319 117 L 317 149 L 415 150 L 415 190 L 489 190 L 489 285 L 426 264 L 392 263 L 392 270 L 365 270 L 366 263 L 325 264 L 326 270 L   ",
				center: { x: 512, y: 512 },
				description: "沙地",
			},
		],
	},
]
