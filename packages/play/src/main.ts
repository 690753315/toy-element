import { createApp } from "vue"
import App from "./App.vue"

import toyElement from "zanwu-toy-element"
import "zanwu-toy-element/dist/index.css"

const app = createApp(App)

// 安装组件
app.use(toyElement)

app.mount("#app")
