import { createApp } from "vue"
import App from "./App.vue"

import toyElement from "toy-element"

const app = createApp(App)

// 安装组件
app.use(toyElement)

app.mount("#app")
