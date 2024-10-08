import Button from "./Button.vue"
import ButtonGroup from "./ButtonGroup.vue"

import { withInstall } from "@toy-element/utils"

// 往组件上添加install方法，暴露返回的组件
export const ErButton = withInstall(Button)

export const ErButtonGroup = withInstall(ButtonGroup)

// 把类型也导出
export * from "./types"
