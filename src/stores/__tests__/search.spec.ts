import { setActivePinia, createPinia } from 'pinia'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useSearchStore } from '../search.store'
import * as apiModule from '@/api'

// Mockeamos getAPI para que no haga llamadas reales a la API
vi.mock('@/api', () => ({
  getAPI: vi.fn(),
}))

describe('Search Store', () => {
  beforeEach(() => {
    // Antes de cada test, inicializamos Pinia para que funcione bien
    setActivePinia(createPinia())
  })

  it('getSearchData actualiza searchList y selected bien', async () => {
    const store = useSearchStore()
    const mockResponse = {
      status: true,
      data: {
        data: {
          info: { codeInstrument: 'ABC' },
          constituents: [{ codeInstrument: ['DEF', 'GHI'] }, { codeInstrument: ['JKL'] }],
        },
      },
    }
    // Hacemos que la llamada a la API devuelva este mock en vez de llamar de verdad
    // @ts-ignore
    apiModule.getAPI.mockResolvedValueOnce(mockResponse)

    await store.getSearchData()

    // El primer elemento que se agrega es el codeInstrument que viene en info
    expect(store.searchList[0]).toBe('ABC')
    // Después se agregan todos los codeInstrument de constituents, uno a uno
    expect(store.searchList).toContain('DEF')
    expect(store.searchList).toContain('GHI')
    expect(store.searchList).toContain('JKL')

    // Si selected estaba vacío, se setea con el codeInstrument de info
    expect(store.selected).toBe('ABC')
  })

  it('no toca searchList ni selected si la respuesta viene con status falso', async () => {
    const store = useSearchStore()
    // Simulamos que la API responde con status falso
    // @ts-ignore
    apiModule.getAPI.mockResolvedValueOnce({ status: false })

    await store.getSearchData()

    // No debería cambiar nada, sigue vacío
    expect(store.searchList.length).toBe(0)
    expect(store.selected).toBe('')
  })
})
