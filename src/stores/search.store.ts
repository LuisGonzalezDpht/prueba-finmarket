import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAPI } from '@/api'
import type ConstituyenteInterface from '@/assets/interface/constituyente.interface'

export const useSearchStore = defineStore('searchStore', () => {
  const searchList = ref<string[]>([])
  const selected = ref<string>('')

  async function getSearchData() {
    const response = await getAPI<ConstituyenteInterface>(
      '/data/constituyentes/constituensList.json',
    )

    if (response.status && response.data) {
      const data = response.data.data

      searchList.value.push(data.info.codeInstrument)
      searchList.value.push(...data.constituents.map((m) => m.codeInstrument).flat())

      if (selected.value === '') {
        selected.value = data.info.codeInstrument
      }
    }
  }

  return { searchList, selected, getSearchData }
})
