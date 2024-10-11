import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { resolve } from "path"

import { readdirSync, readdir } from "fs"

import { filter, map, includes } from "lodash-es"

// 获取basePath下所有文件夹名组成的数组
function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true })

  return map(
    filter(entries, (entry) => entry.isDirectory()),
    (entry) => entry.name
  )
}

export default defineConfig({
  plugins: [
    vue(),
    // 生成ts提示文件
    dts({
      // 配置的路径
      tsconfigPath: "../../tsconfig.build.json",
      // 输出的路径
      outDir: "dist/types"
    })
  ],
  build: {
    outDir: "dist/es",
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "ToyElement",
      fileName: "index",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "vue",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-solid-svg-icons",
        "@fortawesome/vue-fontawesome",
        "@popperjs/core",
        "async-valid"
      ],
      output: {
        assetFileNames: (assetInfo) => {
          return assetInfo.name !== "style.css"
            ? (assetInfo.name as string)
            : "index.css"
        },
        manualChunks(id) {
          if (includes(id, "node_modules")) return "vendor"

          if (includes(id, "/packages/hooks")) return "hooks"

          if (
            includes(id, "/packages/utils") ||
            includes(id, "plugin-vue:export-helper")
          )
            return "utils" // 如果是components下的文件夹，以每个文件夹的名字为单独一个包

          for (const item of getDirectoriesSync("../components")) {
            if (includes(id, `/packages/components/${item}`)) return item
          }
        }
      }
    }
  }
})
