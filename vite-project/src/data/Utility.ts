export type Utility =
	| "Grenade" // 手雷
	| "Flash" // 闪光弹
	| "Smoke" // 烟雾
	| "fire" // 火

export interface UtilityInfo {
	id: string //唯一标识
	utility: Utility //道具类型
	name: string //道具名称
	description: string //道具描述
	map: string //道具对应地图
	region: string //道具对应区域
}

export const utilityInfoList: UtilityInfo[] = [
	//dust2
	{
		id: "Grenade",
		utility: "Grenade",
		name: "手雷",
		description: "手雷是一种用于在战斗中造成伤害的武器",
		map: "dust2",
		region: "a-size",
	},
]
