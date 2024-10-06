import Button from "./Button.vue"

import { withInstall } from "@toy-element/utils"

// 往组件上添加install方法，暴露返回的组件
export const ErButton = withInstall(Button)
