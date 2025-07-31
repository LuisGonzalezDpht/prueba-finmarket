import { defineStore } from 'pinia'
import { useBuscadorStore } from './dataBuscador.store'
import type ResumenInterface from '@/assets/interface/resumen.interface'
import { computed, ref, watch } from 'vue'
import { getAPI } from '@/api'
import constants from '@/assets/constants'
import type HistoryInterface from '@/assets/interface/history.interface'
import type { AreaInterface } from '@/assets/interface/history.interface'

export const useGlobalStore = defineStore('globalStore', () => {
  const buscadorStore = useBuscadorStore()
  const seleccionado = computed(() => buscadorStore.seleccionado)

  const resumenData = ref<ResumenInterface | null>(null)

  async function getResumen() {
    let buscador = seleccionado.value
    if (buscador === '') buscador = constants.default.toUpperCase()

    const response = await getAPI<ResumenInterface>(`/data/resumen/${buscador}.json`)

    if (response.status && response.data) {
      const data = response.data

      resumenData.value = data
    }
  }

  watch(seleccionado, async (newValue, oldValue) => {
    if (newValue != oldValue) {
      await getHistory()
    }
  })

  const historyData = ref<HistoryInterface | null>(null)

  async function getHistory() {
    let buscador = buscadorStore.seleccionado
    if (buscador === '') buscador = constants.default.toUpperCase()

    const response = await getAPI<HistoryInterface>(`/data/history/history-${buscador}.json`)

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
  })

  return { getResumen, resumenData, getHistory, historyData, historyArea, seleccionado }
})
