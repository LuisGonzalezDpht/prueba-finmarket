<script lang="ts" setup>
import { formatPrices } from '@/composable/useFormatters'
import { useGlobalStore } from '@/stores/global.store'
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted } from 'vue'

const globalStore = useGlobalStore()

onMounted(async () => {
  await globalStore.getSummary()
})

const summary = computed(() => globalStore.summaryData!)
</script>

<template>
  <div v-if="globalStore.summaryData" class="grid gap-y-3">
    <h1>
      {{ `${summary.data.info.codeInstrument}, ${summary.data.info.countryName}` }}
    </h1>
    <div class="space-y-2">
      <h4 class="text-neutral-400">Indice</h4>
      <hr />
      <div class="text-neutral-400 text-xs">
        <p class="flex gap-3">
          <span>Valor Actual</span>
          <span class="flex gap-1 text-neutral-100">
            <template v-if="summary.data.price.tend === 'up'">
              <ArrowUpIcon class="h-4" />
            </template>
            <template v-if="summary.data.price.tend === 'same'">
              <MinusIcon class="h-4" />
            </template>
            <template v-if="summary.data.price.tend === 'down'">
              <ArrowDownIcon class="h-4" />
            </template>
            {{ formatPrices(summary.data.price.lastPrice) }}
          </span>
          <span>Var.% Actual</span>
          <span
            class="flex gap-1"
            :class="{
              'text-green-300': summary?.data.price.performanceRelative!! > 0,
              'text-red-300': summary?.data.price.performanceRelative!! < 0,
            }"
          >
            {{ formatPrices(summary.data.price.performanceRelative) }} %
          </span>
          <span>Var. Puntos Actual</span>
          <span
            class="flex gap-1"
            :class="{
              'text-green-300': summary?.data.price.performanceAbsolute!! > 0,
              'text-red-300': summary?.data.price.performanceAbsolute!! < 0,
            }"
          >
            {{ formatPrices(summary.data.price.performanceAbsolute) }} %
          </span>
        </p>
      </div>
      <hr />
    </div>
  </div>
</template>
