import type { App, Plugin } from "vue"

import { each } from "lodash-es"

type SFCWithInstall<T> = T & Plugin

// 返回installer方法，该方法可以批量注册组件
export function makeInstaller(components: Plugin[]) {
  const installer = (app: App) =>
    each(components, (component) => app.use(component))

  return installer as Plugin
}

// 往组件上添加 install 方法
export const withInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App) => {
    // 获取组件的name
    const name = (component as any).name

    // 注册组件
    app.component(name, component as Plugin)
  }

  return component as SFCWithInstall<T>
}
