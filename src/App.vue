<script setup lang="ts">
import { ref } from 'vue'
import SearchBarComponent from './components/SearchBarComponent.vue'
import SummaryComponent from './components/SummaryComponent.vue'
import HeaderBarComponent from './components/HeaderBarComponent.vue'
import ChartComponent from './components/ChartComponent.vue'
import TabComponent from './components/TabComponent.vue'

const searchBar = ref(null)
</script>

<template>
  <div class="w-full min-h-screen flex justify-center">
    <div class="max-w-7xl w-full h-full p-5 grid gap-2">
      <SearchBarComponent v-model="searchBar" />
      <div class="grid md:grid-cols-6 grid-cols-1">
        <div class="md:col-span-4 md:col-start-1">
          <HeaderBarComponent />
          <ChartComponent />
        </div>
        <div class="md:col-span-2 md:col-start-5">
          <SummaryComponent />
        </div>
      </div>
      <TabComponent />
    </div>
  </div>
</template>
