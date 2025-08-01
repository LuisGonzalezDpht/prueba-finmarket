<script lang="ts" setup>
import type { Constituents } from '@/assets/interface/constituyente.interface'
import { ArrowsUpDownIcon } from '@heroicons/vue/24/solid'
import { computed, ref, type PropType } from 'vue'
import InstrumentItemComponent from './InstrumentItemComponent.vue'

const props = defineProps({
  list: {
    type: Object as PropType<Constituents[] | null>,
    required: true,
  },
})

const filtering = ref<{ status: boolean; col: string }>({ status: false, col: '' })

const filter = computed(() => {
  if (filtering.value.status && filtering.value.col !== '') {
    return props.list
  }

  return props.list
})
</script>

<template>
  <table class="text-sm">
    <thead>
      <tr
        class="[&>th>div]:inline-flex [&>th>div]:items-center [&>th>div]:gap-2 [&>th]:hover:bg-neutral-800 [&>th]:cursor-pointer text-xs"
      >
        <th class="w-1/3">
          <div>
            Nombre
            <ArrowsUpDownIcon class="w-5 h-5 shrink-0" />
          </div>
        </th>
        <th>
          <div>
            Último
            <ArrowsUpDownIcon class="w-5 h-5 shrink-0" />
          </div>
        </th>
        <th>
          <div>
            Monto (MM)
            <ArrowsUpDownIcon class="w-5 h-5 shrink-0" />
          </div>
        </th>
        <th>
          <div>
            Var. Día
            <ArrowsUpDownIcon class="w-5 h-5 shrink-0" />
          </div>
        </th>
        <th>
          <div>
            Var. 30d**
            <ArrowsUpDownIcon class="w-5 h-5 shrink-0" />
          </div>
        </th>
        <th>
          <div>
            Año Actual
            <ArrowsUpDownIcon class="w-5 h-5 shrink-0" />
          </div>
        </th>
        <th>
          <div>
            12 meses
            <ArrowsUpDownIcon class="w-5 h-5 shrink-0" />
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="props.list">
        <InstrumentItemComponent v-for="(item, index) in filter" :key="index" :data="item" />
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
