<script lang="ts" setup>
import type { Constituents } from '@/assets/interface/constituyente.interface'
import { ArrowsUpDownIcon, BarsArrowDownIcon } from '@heroicons/vue/24/solid'
import { computed, ref, type PropType } from 'vue'
import InstrumentItemComponent from './InstrumentItemComponent.vue'
import { useGlobalStore } from '@/stores/global.store'

const props = defineProps({
  list: {
    type: Object as PropType<Constituents[] | null>,
    required: true,
  },
})

const globalStore = useGlobalStore()

const fltSt = computed(() => globalStore.filterSelected)

const filtering = ref(false)

function setFiltering(col: string) {
  if (fltSt.value === col || !filtering.value) {
    filtering.value = !filtering.value
  }

  if (!filtering.value) {
    globalStore.filterSelected = ''
    return
  }

  globalStore.filterSelected = col
  return
}

const tabs = [
  { name: 'Nombre', code: 'codeInstrument' },
  { name: 'Último', code: 'lastPrice' },
  { name: 'Monto (MM)', code: 'volumeMoney' },
  { name: 'Var. Día', code: 'pctDay' },
  { name: 'Var. 30D', code: 'pct30D' },
  { name: 'Año Actual', code: 'pctCY' },
  { name: '12 Meses', code: 'pct1Y' },
]
</script>

<template>
  <table class="text-sm">
    <thead>
      <tr
        class="[&>th>div]:inline-flex [&>th>div]:items-center [&>th>div]:gap-2 [&>th]:hover:bg-neutral-800 [&>th]:cursor-pointer text-xs"
      >
        <th
          v-for="(item, index) in tabs"
          :key="index"
          :class="{ 'w-1/3': index === 0 }"
          @click="setFiltering(item.code)"
        >
          <div>
            {{ item.name }}
            <template v-if="!filtering || fltSt !== item.code">
              <ArrowsUpDownIcon class="w-5 h-5 shrink-0" />
            </template>
            <template v-else>
              <BarsArrowDownIcon class="w-5 h-5 shrink-0" />
            </template>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="props.list">
        <InstrumentItemComponent v-for="(item, index) in props.list" :key="index" :data="item" />
      </template>
      <template v-else>
        <tr>
          <td>sin datos para mostrar</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  text-align: left;
}

thead {
  border-bottom: 1px solid #858484;
}

th {
  padding: 0.5rem 0.3rem;
}
</style>
