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
	showLabel?: boolean // 是否常态显示名称标签（不悬停也显示）
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
				path: `M 77 17 L 132 17 L 132 80 L 219 80 L 255 103 L 255 305 L 202 353 
					L 200 370 L 170 370 L 170 330 L 65 330 L 60 184 L 76 181 Z`,
				center: { x: 150, y: 160 },
				showLabel: true, // ← 新增：常态显示
				description: "B区",
			},
			{
				id: "a-size",
				name: "A区",
				type: "bombsite",
				path: `M 678 102 L 790 102 L 792 36 L 924 36 L 924 103 L 932 103 L 930 215 
					L 843 279 L 852 213 L 678 215 Z`,
				center: { x: 850, y: 160 },
				showLabel: true, // ← 新增：常态显示
				description: "A区",
			},
			{
				id: "dust-ground",
				name: "沙地",
				type: "default",
				path: `M 265 117 L 319 117 L 317 149 L 415 150 L 415 190 L 489 190 L 489 285 
					L 426 264 L 392 263 L 392 270 L 365 270 L 366 263 L 325 264 L 326 270 
					L 278 270 L 278 263 L 264 263 Z`,
				center: { x: 330, y: 190 },
				description: "沙地",
			},
			{
				id: "dust-ct",
				name: "警家",
				type: "spawn-ct",
				path: `M 488 211 L 553 211 L 570 195 L 574 155 L 677 154 L 674 216 L 722 214 
					L 722 197 L 731 198 L 733 191 L 791 191 L 791 213 L 850 213 L 843 278 
					L 763 278 L 763 270 L 677 271 L 625 270 L 627 259 L 614 260 L 614 270 
					L 585 271 L 563 285 L 488 285 Z`,
				center: { x: 590, y: 230 },
				showLabel: true, // ← 新增：常态显示
				description: "警家",
			},
			{
				id: "a-short",
				name: "a小",
				type: "connector",
				path: `M 531 386 L 531 371 L 577 371 L 575 387 L 616 383 L 617 303 L 627 300 
					L 626 260 L 614 258 L 617 155 L 625 154 L 625 114 L 619 114 L 617 103 
					L 680 103 L 679 429 L 629 429 L 627 433 L 548 433 L 531 447 Z`,
				center: { x: 650, y: 300 },
				description: "a小",
			},
			{
				id: "a-long",
				name: "a大",
				type: "connector",
				path: `M 930 216 L 967 216 L 972 268 L 971 317 L 955 318 L 953 329 L 941 329 
					L 927 355 L 927 416 L 924 417 L 924 495 L 967 500 L 967 669 L 929 670 
					L 927 663 L 921 663 L 922 699 L 847 699 L 849 661 L 843 661 L 843 690 
					L 775 690 L 775 594 L 776 595 L 777 575 L 763 560 L 746 560 L 747 556 
					L 735 557 L 732 558 L 723 559 L 726 568 L 687 569 L 690 559 L 684 560 
					L 683 556 L 672 554 L 671 468 L 720 458 L 841 456 L 842 386 L 839 386 
					L 837 330 L 842 326 L 841 278 Z`,
				center: { x: 860, y: 500 },
				description: "a大",
			},
			{
				id: "b1b2",
				name: "B区1-2层",
				type: "connector",
				path: `M 98 327 L 97 415 L 66 416 L 66 504 L 112 503 L 112 498 L 116 498 
					L  117 502 L 139 502 L 140 516 L 168 516 L 168 574 L 198 574 L 198 517 
					L 210 516 L 210 505 L 208 505 L 208 499 L 216 499 L 216 502 L 261 502 
					L 262 499 L 267 499 L 267 502 
					Q 332 510 332 442 
					L 330 437 L 437 437 L 437 385 L 290 385 L 290 387 L 284 387 L 284 434 
					L 288 434 L 288 436 L 300 436 L 298 442 L 266 442 L 266 446 L 264 446 
					L 262 442 L 216 442 L 214 446 L 209 446 L 209 442 L 185 442 L 185 413 
					L 132 413 L 132 416 L 128 416 L 128 327 Z`,
				center: { x: 170, y: 460 },
				description: "B区一二层",
			},
			{
				id: "back-garden",
				name: "后花",
				type: "default",
				path: `M 124 576 L 124 594 L 92 594 L 92 708 L 96 708 L 96 748 L 88 750 
					L 88 848 L 56 880 L 56 972 L 152 972 L 152 981 L 328 981 L 330 976 
					L 343 880 L 344 770 L 299 770 L 299 790 L 257 790 L 244 776 L 242 744 
					L 257 728 L 279 728 L 279 696 L 266 618 L 266 594 L 244 594 L 244 576 Z`,
				center: { x: 160, y: 800 },
				description: "后花",
			},
			{
				id: "dust-t",
				name: "匪家",
				type: "spawn-t",
				path: `M 344 874 L 295 873 L 295 956 L 327 976 L 487 976 L 486 1004 L 590 1004 
					L 605 982 L 605 966 L 665 966 L 666 878 L 648 878 L 648 822 L 683 822 
					L 683 828 L 739 828 L 735 780 L 736 676 L 731 676 L 731 671 L 725 671 
					L 725 664 L 735 664 L 738 568 L 679 568 L 679 664 L 688 664 L 688 670 
					L 686 670 L 684 675 L 668 676 L 668 666 L 671 665 L 670 624 L 546 624 
					L 490 670 L 473 683 L 445 692 L 445 879 L 402 879 L 402 892 L 352 892 
					L 352 882 L 343 882 Z`,
				center: { x: 550, y: 760 },
				showLabel: true, // ← 新增：常态显示
				description: "匪家",
			},
			{
				id: "dust -mid",
				name: "中路",
				type: "mid",
				path: `M 445 692 L 474 684 L 491 669 L 546 625 L 534 611 L 533 446 L 531 386 
					L 490 387 L 490 344 L 503 344 L 503 326 L 488 326 L 489 285 L 426 263 
					L 426 361 L 446 361 L 446 478 L 438 478 L 438 587 L 446 536 L 446 570 
					L 417 570 L 417 617 L 390 617 L 406 692 L 440 692 Z`,
				center: { x: 480, y: 500 },
				description: "中路",
			},
		],
	},
]
