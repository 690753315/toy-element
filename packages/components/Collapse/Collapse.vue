<script setup lang="ts">
import { ref, computed, watch, watchEffect, provide } from "vue"
import type { CollapseProps, CollapseItemName, CollapseEmits } from "./types"
import { COLLAPSE_CTX_KEY } from "./constants"

defineOptions({
  name: "ErCollapse"
})

const props = defineProps<CollapseProps>()

const emits = defineEmits<CollapseEmits>()

const activeNames = ref(props.modelValue)

watchEffect(() => {
  // 如果是手风琴模式，activeNames只能有1个元素，只能同时展开1个
  if (props.accordion && activeNames.value.length > 1) {
    console.warn("accordion mode should only have one active item")
  }
})

// 点击item
function handleItemClick(item: CollapseItemName) {
  let _activeNames = [...activeNames.value]

  // 如果是手风琴模式，activeNames只能有1个元素
  if (props.accordion) {
    // 只切换当前item的展开/折叠
    _activeNames = [_activeNames[0] === item ? "" : item]
    updateActiveNames(_activeNames)
    return
  }

  // 非手风琴模式
  const index = _activeNames.indexOf(item)

  // 如果当前item已经展开，移除它
  if (index > -1) {
    _activeNames.splice(index, 1)
  } else {
    // 如果当前item未展开，添加它
    _activeNames.push(item)
  }

  updateActiveNames(_activeNames)
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames

  emits("update:modelValue", newNames)

  emits("change", newNames)
}

watch(
  () => props.modelValue,
  (newNames) => {
    updateActiveNames(newNames)
  }
)

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick
})
</script>

<template>
  <div class="er-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
