import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { resolve } from "path"

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
        }
      }
    }
  }
})
