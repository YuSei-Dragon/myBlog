import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"

export default defineConfig({
	plugins: [
		vue(),
		// 自动导入 API
		AutoImport({
			imports: [
				// 自动导入 Vue 3 API
				"vue",
				// 自动导入 Vue Router API
				"vue-router",
				// 自动导入其他库
				{
					"@/data/pageRouter": ["default as pageRouter"],
				},
			],
			// 生成类型声明文件
			dts: "src/auto-imports.d.ts",
			// 自定义解析
			resolvers: [],
			// 配置文件生成位置
			dirs: ["src/composables", "src/stores"],
		}),
		// 自动导入组件
		Components({
			dirs: ["src/components"],
			extensions: ["vue"],
			deep: true,
			dts: "src/components.d.ts",
		}),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
})
