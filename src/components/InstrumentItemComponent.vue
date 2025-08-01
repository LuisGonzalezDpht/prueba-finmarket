<script lang="ts" setup>
import type { Constituents } from '@/assets/interface/constituyente.interface'
import { formatPrices } from '@/composable/useFormatters'
import { useSearchStore } from '@/stores/search.store'
import { type PropType } from 'vue'

const searchStore = useSearchStore()

function setSelected(str: string) {
  searchStore.selected = str
}

const props = defineProps({
  data: {
    type: Object as PropType<Constituents | null>,
    required: true,
  },
})
</script>

<template>
  <template v-if="props.data">
    <tr
      class="font-semibold text-xs text-right hover:bg-neutral-800 cursor-pointer"
      @click="setSelected(data?.codeInstrument!!)"
    >
      <td class="text-left p-1">{{ data?.codeInstrument }}</td>
      <td>{{ formatPrices(data?.lastPrice!!) }}</td>
      <td>{{ formatPrices(data?.volumeMoney!! / 1000000) }}</td>
      <td
        :class="{
          'text-green-300': data?.pctDay!! > 0,
          'text-red-300': data?.pctDay!! < 0,
        }"
      >
        {{ formatPrices(data?.pctDay!!) }} %
      </td>
      <td
        :class="{
          'text-green-300': data?.pct30D!! > 0,
          'text-red-300': data?.pct30D!! < 0,
        }"
      >
        {{ formatPrices(data?.pct30D!!) }} %
      </td>
      <td
        :class="{
          'text-green-300': data?.pctCY!! > 0,
          'text-red-300': data?.pctCY!! < 0,
        }"
      >
        {{ formatPrices(data?.pctCY!!) }} %
      </td>
      <td
        :class="{
          'text-green-300': data?.pct1Y!! > 0,
          'text-red-300': data?.pct1Y!! < 0,
        }"
      >
        {{ formatPrices(data?.pct1Y!!) }} %
      </td>
    </tr>
  </template>
</template>
