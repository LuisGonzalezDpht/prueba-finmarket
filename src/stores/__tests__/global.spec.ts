import { setActivePinia, createPinia } from 'pinia'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useGlobalStore } from '../global.store'
import * as apiModule from '@/api'

// Mockeamos getAPI para que no haga llamadas reales durante los tests
vi.mock('@/api', () => ({
  getAPI: vi.fn(),
}))

describe('Global Store', () => {
  beforeEach(() => {
    // Antes de cada test, inicializo Pinia para que el store funcione bien
    setActivePinia(createPinia())
  })

  it('getSummary actualiza summaryData cuando la API responde bien', async () => {
    const store = useGlobalStore()
    const mockData = { some: 'data' }
    // Simulo que la API responde con status true y datos falsos
    // @ts-ignore para ignorar error de tipos por el mock
    apiModule.getAPI.mockResolvedValueOnce({ status: true, code: 200, data: mockData })

    await store.getSummary()

    // Verifico que summaryData quedó igual al mock que devolvió la API
    expect(store.summaryData).toEqual(mockData)
  })

  it('getHistory actualiza historyData si la API responde ok', async () => {
    const store = useGlobalStore()
    const mockHistory = { data: { chart: [] } }
    // Simulo respuesta de la API
    // @ts-ignore
    apiModule.getAPI.mockResolvedValueOnce({ status: true, data: mockHistory })

    await store.getHistory()

    // Verifico que historyData quedó igual a lo que mockeé
    expect(store.historyData).toEqual(mockHistory)
  })

  it('getConstituyent actualiza constituyentData cuando la API responde bien', async () => {
    const store = useGlobalStore()
    const mockConstituent = { list: [] }
    // Simulo la respuesta de la API
    // @ts-ignore
    apiModule.getAPI.mockResolvedValueOnce({ status: true, data: mockConstituent })

    await store.getConstituyent()

    // Verifico que constituyentData quedó igual al mock
    expect(store.constituyentData).toEqual(mockConstituent)
  })

  it('historyArea computed entrega los datos listos para el gráfico', () => {
    const store = useGlobalStore()
    const mockHistory = {
      data: {
        chart: [
          { datetimeLastPriceTs: 1, lastPrice: 100 },
          { datetimeLastPriceTs: 2, lastPrice: 200 },
        ],
      },
    }
    // Le asigno el mock a historyData
    // @ts-ignore
    store.historyData = mockHistory

    // Espero que el computed transforme los datos como corresponde
    expect(store.historyArea).toEqual([
      { time: 1, value: 100 },
      { time: 2, value: 200 },
    ])
  })
})
