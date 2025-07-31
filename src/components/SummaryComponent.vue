<script lang="ts" setup>
import { ref } from 'vue'

import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="mt-8 px-3">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Resumen" name="first">User</el-tab-pane>
      <el-tab-pane label="Detalles" name="second">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>
