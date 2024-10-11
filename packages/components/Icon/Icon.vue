<script setup lang="ts">
import { ref, computed } from "vue"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import { omit } from "lodash-es"

import type { IconProps } from "./types"

defineOptions({
  name: "ErIcon",
  inheritAttrs: false
})

const props = defineProps<IconProps>()

const filterProps = computed(() => omit(props, ["type", "color"]))
</script>

<template>
  <i
    class="er-icon"
    :class="{ [`er-icon--${type}`]: type }"
    :style="{ color: props.color }"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style scoped>
@import "./style.css";
</style>
