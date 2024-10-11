import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"

import { makeInstaller } from "@zanwu-toy-element/utils"

import components from "./components"

import "@zanwu-toy-element/theme/index.css"

// 添加fontawesome图标
library.add(fas)

// 返回installer方法，该方法可以批量注册组件
const installer = makeInstaller(components)

// 暴露多个组件，供按需引入
export * from "../components"

// 暴露install方法，供一次性引入
export default installer
