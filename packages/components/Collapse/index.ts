import Collapse from "./Collapse.vue"
import CollapseItem from "./CollapseItem.vue"

import { withInstall } from "@zanwu-toy-element/utils"

// 往组件上添加install方法，暴露返回的组件
export const ErCollapse = withInstall(Collapse)

export const ErCollapseItem = withInstall(CollapseItem)

// 把类型也导出
export * from "./types"
