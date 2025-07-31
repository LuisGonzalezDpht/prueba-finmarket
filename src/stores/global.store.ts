import { defineStore } from 'pinia'
import { useSearchStore } from './search.store'
import type ResumenInterface from '@/assets/interface/resumen.interface'
import { computed, ref, watch } from 'vue'
import { getAPI } from '@/api'
import constants from '@/assets/constants'
import type HistoryInterface from '@/assets/interface/history.interface'
import type { AreaInterface } from '@/assets/interface/history.interface'

export const useGlobalStore = defineStore('globalStore', () => {
  const searchStore = useSearchStore()
  const selected = computed(() => searchStore.selected)

  const summaryData = ref<ResumenInterface | null>(null)

  async function getSummary() {
    let searchRes = selected.value
    if (searchRes === '') searchRes = constants.default.toUpperCase()

    const response = await getAPI<ResumenInterface>(`/data/resumen/${searchRes}.json`)

    if (response.status && response.data) {
      const data = response.data

      summaryData.value = data
    }
  }

  watch(selected, async (newValue, oldValue) => {
    if (newValue != oldValue) {
      await getHistory()
    }
  })

  const historyData = ref<HistoryInterface | null>(null)

  async function getHistory() {
    let searchRes = searchStore.selected
    if (searchRes === '') searchRes = constants.default.toUpperCase()

    const response = await getAPI<HistoryInterface>(`/data/history/history-${searchRes}.json`)

    if (response.status && response.data) {
      const data = response.data

      historyData.value = data
    }
  }

  /**
   *  se formatea a AreaPoints para ser usados en el lightweigth charts
   * @param intentos estos intentos sirven para recargar una cierta cantidad de intentos esta funcion por si los datos del historial no pueden ser traidos a la primera
   * @returns
   */
  const historyArea = computed(() => {
    if (historyData.value && historyData.value.data) {
      return historyData.value.data.chart.map((m) => {
        return {
          time: m.datetimeLastPriceTs,
          value: m.lastPrice,
        } as AreaInterface
      })
    }

    return []
  })

  return { getSummary, summaryData, getHistory, historyData, historyArea, selected }
})
