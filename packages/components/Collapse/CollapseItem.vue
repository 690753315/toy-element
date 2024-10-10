<script setup lang="ts">
import { inject, computed } from "vue"
import type { CollapseItemProps } from "./types"
import { COLLAPSE_CTX_KEY } from "./constants"

import { ErIcon } from "../Icon"

import transitionEvents from "./transitionEvents"

defineOptions({
  name: "ErCollapseItem"
})

const ctx = inject(COLLAPSE_CTX_KEY, void 0)

const props = defineProps<CollapseItemProps>()

const isActive = computed(() => ctx?.activeNames.value?.includes(props.name))

function handleClick() {
  if (props.disabled) return
  ctx?.handleItemClick(props.name)
}
</script>

<template>
  <div
    class="er-collapse-item"
    :class="{
      'is-disabled': disabled
    }"
  >
    <div
      class="er-collapse-item__header"
      :id="`item-header-${name}`"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive
      }"
      @click="handleClick"
    >
      <span class="er-collapse-item__title">
        <slot name="title">
          {{ title }}
        </slot>
      </span>
      <er-icon icon="angle-right" class="header-angle" />
    </div>

    <transition name="slide" v-on="transitionEvents">
      <div v-show="isActive" class="er-collapse-item__wrapper">
        <div :id="`item-content-${name}`" class="er-collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
