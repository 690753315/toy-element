<script setup lang="ts">
import { ref, computed, inject } from "vue"
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types"

import { throttle } from "lodash-es"

import { ErIcon } from "../Icon"

import { BUTTON_GROUP_CONTEXT_KEY } from "./constants"

defineOptions({
  name: "ErButton"
})

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  useThrottle: true,
  throttleDuration: 500
})

const buttonGroupContextKey = inject(BUTTON_GROUP_CONTEXT_KEY, void 0)
const size = computed(() => buttonGroupContextKey?.size ?? props?.size ?? "")
const type = computed(() => buttonGroupContextKey?.type ?? props?.type ?? "")
const disabled = computed(
  () => buttonGroupContextKey?.disabled ?? props?.disabled ?? ""
)

const emits = defineEmits<ButtonEmits>()
const handleBtnClick = (e: MouseEvent) => {
  emits("click", e)
}

// 点击节流
const handleBtnClickThrottle = throttle(
  handleBtnClick,
  props.throttleDuration,
  { trailing: false }
)

const slots = defineSlots()
const iconStyle = computed(() => ({
  marginRight: slots.default ? "6px" : "0"
}))

const _ref = ref<HTMLButtonElement>()
defineExpose<ButtonInstance>({
  ref: _ref,
  size,
  type,
  disabled
})
</script>

<template>
  <!-- https://www.jianshu.com/p/bc235723e902  void 0 表示什么都不做-->
  <component
    :is="tag"
    :autofocus="autofocus"
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
    @click="
      useThrottle ? handleBtnClickThrottle($event) : handleBtnClick($event)
    "
  >
    <!-- loading -->
    <template v-if="loading">
      <slot name="loading">
        <er-icon
          class="loading-icon"
          :icon="loadingIcon ?? 'spinner'"
          :style="iconStyle"
          size="1x"
          spin
        />
      </slot>
    </template>

    <!-- icon -->
    <er-icon
      v-if="icon && !loading"
      :icon="icon"
      :style="iconStyle"
      size="1x"
    />

    <slot />
  </component>
</template>

<style scoped>
@import "./style.css";
</style>
