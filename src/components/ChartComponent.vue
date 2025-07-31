<script lang="ts" setup>
import constants from '@/assets/constants'
import type { rangeDate } from '@/assets/type/range.type'
import { getUltimaFecha } from '@/composable/useComparators'
import { useGlobalStore } from '@/stores/global.store'
import { CalendarDateRangeIcon } from '@heroicons/vue/24/solid'
import { AreaSeries, createChart, type IChartApi, type ISeriesApi } from 'lightweight-charts'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const globalStore = useGlobalStore()

const areaPoints = computed(() => globalStore.historyArea!!)
const seleccionado = computed(() => globalStore.seleccionado)

let chart: IChartApi | null
const chartContainer = ref()
let areaSeries: ISeriesApi<'Area', any>

const sortBy = ref<rangeDate | null>(null)

onMounted(async () => {
  await globalStore.getHistory()

  chart = createChart(chartContainer.value, {
    timeScale: { visible: false },
    leftPriceScale: { visible: true },
    rightPriceScale: { visible: false },
    layout: {
      background: { color: '#111' },
      textColor: '#cccccc',
      attributionLogo: false,
    },
    grid: {
      vertLines: { color: 'rgba(197, 203, 206, 0.1)' },
      horzLines: { color: 'rgba(197, 203, 206, 0.1)' },
    },
  })

  areaSeries = chart.addSeries(AreaSeries, {
    topColor: 'rgba(32, 150, 255, 0.4)',
    bottomColor: 'rgba(32, 150, 255, 0)',
    lineColor: 'rgba(32, 150, 255, 1)',
    priceScaleId: 'left',
    lineWidth: 2,
  })

  if (sortBy.value) {
    areaSeries.setData(getUltimaFecha(areaPoints.value, sortBy.value))
  } else {
    areaSeries.setData(areaPoints.value)
  }

  chart.timeScale().fitContent()
})

watch([seleccionado, sortBy], (newValue, oldValue) => {
  if (newValue != oldValue && areaPoints.value && areaPoints.value.length > 0) {
    if (sortBy.value) {
      areaSeries.setData(getUltimaFecha(areaPoints.value, sortBy.value))
    } else {
      areaSeries.setData(areaPoints.value)
    }

    chart?.timeScale().fitContent()
  }
})

onUnmounted(() => {
  if (chart) {
    chart.remove()
    chart = null
  }
})
</script>

<template>
  <div class="flex flex-col justify-center gap-5 pt-5">
    <div class="w-full md:h-72 h-48" ref="chartContainer"></div>
    <div class="bg-neutral-900 p-2 rounded-lg border border-neutral-800 flex justify-center gap-2">
      <el-button-group size="small">
        <el-button
          v-for="(item, index) in constants.buttons_fechas"
          :key="index"
          :type="sortBy ? (sortBy === item ? 'primary' : 'ghost') : 'ghost'"
          @click="sortBy = item"
        >
          {{ item }}
        </el-button>
      </el-button-group>
      <el-button :type="!sortBy ? 'primary' : 'ghost'" size="small" @click="sortBy = null">
        <CalendarDateRangeIcon class="h-4" />
      </el-button>
    </div>
  </div>
</template>
