<script setup lang="ts">
import { ref } from "vue"
import type { ButtonProps } from "./types"

defineOptions({
  name: "ErButton"
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button"
})

const _ref = ref<HTMLButtonElement>()
</script>

<template>
  <!-- https://www.jianshu.com/p/bc235723e902  void 0 表示什么都不做-->
  <component
    :is="tag"
    ref="_ref"
    class="er-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="disabled || loading ? type : void 0"
    :class="{
      [`er-button--${type}`]: type,
      [`er-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
  >
    <slot />
  </component>
</template>

<style scoped>
@import "./style.css";
</style>
