import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAPI } from '@/api'
import type ConstituyenteInterface from '@/assets/interface/constituyente.interface'

export const useBuscadorStore = defineStore('buscadorStore', () => {
  const listaBuscador = ref<string[]>([])
  const seleccionado = ref<string>('')

  async function getDataBuscador() {
    const response = await getAPI<ConstituyenteInterface>(
      '/data/constituyentes/constituensList.json',
    )

    if (response.status && response.data) {
      const data = response.data.data

      listaBuscador.value.push(data.info.codeInstrument)
      listaBuscador.value.push(...data.constituents.map((m) => m.codeInstrument).flat())

      if (seleccionado.value === '') {
        seleccionado.value = data.info.codeInstrument
      }
    }
  }

  return { listaBuscador, seleccionado, getDataBuscador }
})
