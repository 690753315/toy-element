import { createApp } from "vue"
import App from "./App.vue"

import toyElement from "@toy-element/core"

const app = createApp(App)

app.use(toyElement)

app.mount("#app")
