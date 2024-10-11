<script setup lang="ts">
import { ref } from "vue"

const activeNames = ref(["a", "b", "c"])

const args = {
  title: "标题",
  description: "这是一段描述",
  type: "danger",
  effect: "light",
  closable: true,
  showIcon: true,
  visible: true
}
</script>

<template>
  <er-button type="success" round icon="search">按钮</er-button>

  <hr />

  <er-button-group type="primary">
    <er-button icon="search">按钮</er-button>
    <er-button icon="plus">按钮</er-button>
  </er-button-group>

  <hr />

  <er-collapse v-model="activeNames" :accordion="true">
    <er-collapse-item name="a" title="Title a">
      <div>this is content a</div>
    </er-collapse-item>
    <er-collapse-item name="b" title="title b">
      <div>this is content b</div>
    </er-collapse-item>
    <er-collapse-item name="c" title="title c  disable" disabled>
      <div>this is content c</div>
    </er-collapse-item>
  </er-collapse>

  <hr />

  <er-alert ref="alertRef" v-bind="args"></er-alert>
</template>

<style scoped></style>
