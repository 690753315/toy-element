import { makeInstaller } from "@toy-element/utils"

import components from "./components"

import "@toy-element/theme/index.css"

// 返回installer方法，该方法可以批量注册组件
const installer = makeInstaller(components)

// 暴露多个组件，供按需引入
export * from "@toy-element/components"

// 暴露install方法，供一次性引入
export default installer
