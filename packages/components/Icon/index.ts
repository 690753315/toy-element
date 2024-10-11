import Icon from "./Icon.vue"

import { withInstall } from "@zanwu-toy-element/utils"

// 往组件上添加install方法，暴露返回的组件
export const ErIcon = withInstall(Icon)

// 把类型也导出
export * from "./types"
