<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useGlobalStore } from '@/stores/global.store'
import { formatPrices, justALineInTheDate } from '@/composable/useFormatters'

const globalStore = useGlobalStore()

onMounted(async () => {
  globalStore.getSummary()
})

const summary = computed(() => globalStore.summaryData)

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<template>
  <div class="mt-8 px-3">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs_">
      <el-tab-pane label="Resumen" name="first">
        <div
          class="space-y-1 text-sm [&>div>p]:flex [&>div>p]:justify-between [&>div>p>b]:uppercase [&>div>p>b]:font-semibold [&>div>p>span]:text-right"
        >
          <div>
            <p>
              <b>Nombre Instrumento</b>
              <span>{{ summary?.data.info.name }}</span>
            </p>
          </div>
          <hr />
          <div class="space-y-1">
            <p>
              <b>Ultimo Precio</b>
              <span>{{ formatPrices(summary?.data.price.lastPrice!!) }}</span>
            </p>
            <p>
              <b>Hora del último precio</b>
              <span>{{ summary?.data.price.datetimeLastPrice }}</span>
            </p>
            <p>
              <b>Moneda</b>
              <span>
                {{ `${summary?.data.info.currencyName} - ${summary?.data.info.currencySymbol}` }}
              </span>
            </p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Detalles" name="second">
        <div
          class="space-y-1 text-sm [&>div>p]:flex [&>div>p]:justify-between [&>div>p>b]:uppercase [&>div>p>b]:font-semibold"
        >
          <div>
            <p>
              <b>Cotización</b>
              <span>{{ justALineInTheDate(`${summary?.data.price.datetimeLastPrice}`) }}</span>
            </p>
          </div>
          <hr />
          <div class="space-y-1">
            <p>
              <b>Mercado</b>
              <span>{{ summary?.data.info.marketName }}</span>
            </p>
            <p>
              <b>Apertura</b>
              <span>{{ formatPrices(summary?.data.price.openPrice!!) }}</span>
            </p>
            <p>
              <b>Cierre Anterior</b>
              <span>{{ formatPrices(summary?.data.price.closePrice!!) }}</span>
            </p>
            <p>
              <b>Máximo Diario</b>
              <span>{{ formatPrices(summary?.data.price.maxDay!!) }}</span>
            </p>
            <p>
              <b>Mínimo Diario</b>
              <span>{{ formatPrices(summary?.data.price.minDay!!) }}</span>
            </p>
            <p>
              <b>Máximo 52 Semanas</b>
              <span>{{ formatPrices(summary?.data.price.max52W!!) }}</span>
            </p>
            <p>
              <b>Mínimo 52 Semanas</b>
              <span>{{ formatPrices(summary?.data.price.min52W!!) }}</span>
            </p>
            <p class="py-3">
              <b>Variación</b>
              <span>%</span>
            </p>
          </div>
          <hr />
          <div>
            <p>
              <b>1 Mes</b>
              <span
                :class="{
                  'text-green-300': summary?.data.price.pct30D!! > 0,
                  'text-red-300': summary?.data.price.pct30D!! < 0,
                }"
              >
                {{ formatPrices(summary?.data.price.pct30D!!) }} %
              </span>
            </p>
            <p>
              <b>1 Año</b>
              <span
                :class="{
                  'text-green-300': summary?.data.price.pctRelW52!! > 0,
                  'text-red-300': summary?.data.price.pctRelW52!! < 0,
                }"
              >
                {{ formatPrices(summary?.data.price.pctRelW52!!) }} %
              </span>
            </p>
            <p>
              <b>Año a la fecha</b>
              <span
                :class="{
                  'text-green-300': summary?.data.price.pctRelCY!! > 0,
                  'text-red-300': summary?.data.price.pctRelCY!! < 0,
                }"
              >
                {{ formatPrices(summary?.data.price.pctRelCY!!) }} %
              </span>
            </p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
