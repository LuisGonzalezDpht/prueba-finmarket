<script lang="ts" setup>
import constants from '@/assets/constants'
import type { TabsPaneContext } from 'element-plus'
import { computed, onMounted, ref } from 'vue'
import InstrumentListComponent from './InstrumentListComponent.vue'
import { useGlobalStore } from '@/stores/global.store'

const activeName = ref(constants.default)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const globalStore = useGlobalStore()

onMounted(async () => {
  await globalStore.getConstituyent()
})

const list_div = computed(() => {
  const data = globalStore.constituyentData

  if (data && data.data.info.codeInstrument.toLowerCase() === activeName.value) {
    let list = [...data.data.constituents] // se clona para no modificar el original

    if (globalStore.filterSelected !== '') {
      list = list.sort((a, b) => {
        console.log(globalStore.filterSelected)
        const itemA = a[globalStore.filterSelected]
        const itemB = b[globalStore.filterSelected]

        if (typeof itemA === 'string' && typeof itemB === 'string') {
          return itemB.localeCompare(itemA)
        }

        if (typeof itemA === 'number' && typeof itemB === 'number') {
          return itemB - itemA
        }

        return 0
      })
    }

    const mitad = Math.ceil(list.length / 2)
    return [list.slice(0, mitad), list.slice(mitad)]
  }

  return [[], []]
})
</script>

<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in constants.tabs_defaults"
        :key="index"
        :label="item.toUpperCase()"
        :name="item"
      >
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <InstrumentListComponent v-for="(item, index) in list_div" :key="index" :list="item" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="text-xs text-neutral-600">
      <p>
        * Último precio, Monto Transado y Variación diaria con desfase de 15 minutos. Haz Click en
        cada instrumento para ver información actualizada en el gráfico.
      </p>
      <p>
        ** Variaciónes a 30d, Año Actual y 12 meses calculadas con el precio de cierre al último dia
        hábil.
      </p>
    </div>
  </div>
</template>
