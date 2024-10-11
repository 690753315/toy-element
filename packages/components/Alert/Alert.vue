<script setup lang="ts">
import { ref, computed } from "vue"
import type { AlertProps, AlertEmits, AlertInstance } from "./types"
import { ErIcon } from "../Icon"
import { typeIconMap } from "@zanwu-toy-element/utils"

defineOptions({
  name: "ErAlert"
})

const props = withDefaults(defineProps<AlertProps>(), {
  type: "info",
  effect: "light",
  closable: true
})

const emits = defineEmits<AlertEmits>()

const slots = defineSlots()

const visible = ref(true)

const iconName = computed(
  () => typeIconMap.get(props.type) ?? typeIconMap.get("info")!
)
const withDescription = computed(() => props.description || slots.default)

function close() {
  visible.value = false
  emits("close")
}

function open() {
  visible.value = true
}

defineExpose<AlertInstance>({
  close,
  open
})
</script>

<template>
  <transition name="er-alert-fade">
    <div
      v-show="visible"
      class="er-alert"
      role="alert"
      :class="{
        [`er-alert__${type}`]: type,
        [`er-alert__${effect}`]: effect,
        'text-center': center
      }"
    >
      <er-icon
        v-if="showIcon"
        class="er-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />

      <div class="er-alert__content">
        <span
          class="er-alert__title"
          :class="{
            'with-desc': withDescription
          }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>

        <p class="er-alert__description">
          <slot>{{ description }}</slot>
        </p>

        <div v-if="closable" class="er-alert__close">
          <er-icon icon="xmark" @click.stop="close" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import "./style.css";
</style>
