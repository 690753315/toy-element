<script setup lang="ts">
import { ref } from "vue"

const activeNames = ref(["a", "b", "c"])
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped></style>
