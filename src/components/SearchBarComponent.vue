<script lang="ts" setup>
import constants from '@/assets/constants'
import { useBuscadorStore } from '@/stores/dataBuscador.store'
import { useGlobalStore } from '@/stores/global.store'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted, ref, watch } from 'vue'

const buscadorStore = useBuscadorStore()
const globalStore = useGlobalStore()

onMounted(async () => {
  await buscadorStore.getDataBuscador()
})

const resultadoBusqueda = ref('')

const instrumentosFiltrados = computed(() => {
  const lista = buscadorStore.listaBuscador

  return lista
    .filter((item) => item.toLowerCase().includes(resultadoBusqueda.value.toLowerCase()))
    .sort()
})

/**
 * este watch sirve para seleccionar el elemento buscado en la store
 */
watch(resultadoBusqueda, (value) => {
  const fnd = instrumentosFiltrados.value.find((f) => f.toLowerCase() === value.toLowerCase())

  if (fnd) {
    buscadorStore.seleccionado = fnd
  } else {
    buscadorStore.seleccionado = instrumentosFiltrados.value.find(
      (f) => f.toLowerCase() === constants.default,
    )!!
  }

  globalStore.getResumen()
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
      v-model="resultadoBusqueda"
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
          v-for="(item, index) in instrumentosFiltrados"
          :key="index"
          @click="resultadoBusqueda = item"
        >
          {{ item }}
        </li>
      </ul>
    </transition>
  </div>
</template>
