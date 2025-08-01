<script lang="ts" setup>
import constants from '@/assets/constants'
import { useSearchStore } from '@/stores/search.store'
import { useGlobalStore } from '@/stores/global.store'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted, ref, watch } from 'vue'

const searchStore = useSearchStore()
const globalStore = useGlobalStore()

onMounted(async () => {
  await searchStore.getSearchData()
})

const searchRes = ref('')

const instrumentosFilter = computed(() => {
  const lista = searchStore.searchList

  return lista.filter((item) => item.toLowerCase().includes(searchRes.value.toLowerCase())).sort()
})

/**
 * este watch sirve para seleccionar el elemento buscado en la store
 */
watch(searchRes, (value) => {
  const fnd = instrumentosFilter.value.find((f) => f.toLowerCase() === value.toLowerCase())

  if (fnd) {
    searchStore.selected = fnd
  } else {
    searchStore.selected = instrumentosFilter.value.find(
      (f) => f.toLowerCase() === constants.default,
    )!
  }

  globalStore.getSummary()
})

/**
 * funcion para desactivar la lista del buscador, este tiene un
 * timeout para que desaparezca 100ms despues de
 * que se haya eliminado el focus del input.
 */
const focused = ref(false)

function changeFocused(blur: boolean) {
  if (blur) {
    setTimeout(() => {
      focused.value = false
    }, 50)
  } else {
    //era para resetar el buscador
    // if (resultadoBusqueda.value !== '') {
    //   resultadoBusqueda.value = ''
    // }

    focused.value = true
  }
}
</script>

<template>
  <div class="relative">
    <el-input
      @focus="changeFocused(false)"
      @blur="changeFocused(true)"
      v-model="searchRes"
      placeholder="Busca un instrumento"
      :prefix-icon="MagnifyingGlassIcon"
      class="w-full"
    />
    <transition>
      <ul
        v-if="focused"
        class="absolute left-0 top-8 bg-neutral-800 border border-neutral-700 w-full rounded-sm text-sm max-h-56 overflow-y-scroll z-20"
      >
        <li
          class="hover:bg-neutral-700 p-2 cursor-pointer"
          v-for="(item, index) in instrumentosFilter"
          :key="index"
          @click="searchRes = item"
        >
          {{ item }}
        </li>
      </ul>
    </transition>
  </div>
</template>
