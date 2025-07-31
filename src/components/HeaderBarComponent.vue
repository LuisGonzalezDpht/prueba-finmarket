<script lang="ts" setup>
import { formatPrices } from '@/composable/useFormatters'
import { useGlobalStore } from '@/stores/global.store'
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted } from 'vue'

const globalStore = useGlobalStore()

onMounted(async () => {
  await globalStore.getResumen()
})

const resumen = computed(() => globalStore.resumenData!!)
</script>

<template>
  <div v-if="globalStore.resumenData" class="grid gap-y-3">
    <h1>
      {{ `${resumen.data.info.codeInstrument}, ${resumen.data.info.countryName}` }}
    </h1>
    <div class="space-y-2">
      <h4 class="text-neutral-400">Indice</h4>
      <hr />
      <div class="text-neutral-400 text-xs">
        <p class="flex gap-5">
          <span>Valor Actual</span>
          <span class="flex gap-1 text-neutral-100">
            <template v-if="resumen.data.price.tend === 'up'">
              <ArrowUpIcon class="h-4" />
            </template>
            <template v-if="resumen.data.price.tend === 'same'">
              <MinusIcon class="h-4" />
            </template>
            <template v-if="resumen.data.price.tend === 'down'">
              <ArrowDownIcon class="h-4" />
            </template>
            {{ formatPrices(resumen.data.price.lastPrice) }}
          </span>
        </p>
      </div>
      <hr />
    </div>
  </div>
</template>
