import type { AreaInterface } from '@/assets/interface/history.interface'
import type { letterDate, rangeDate } from '@/assets/type/range.type'
import type { Time } from 'lightweight-charts'

function timestampStoMs(tms: Time): number {
  const numero = Number(tms)
  return numero > 1e12 ? numero : numero * 1000
}

function dateDay(date: Date): string {
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

function dateToWeekNumber(date: Date): number {
  const fecha = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const numeroDia = fecha.getUTCDay() || 7
  fecha.setUTCDate(fecha.getUTCDate() + 4 - numeroDia)
  const inicioA = new Date(Date.UTC(fecha.getUTCFullYear(), 0, 1))
  return Math.ceil(((+fecha - +inicioA) / 86400000 + 1) / 7)
}

function getUltimaFecha(lista: AreaInterface[], type: rangeDate = '1A') {
  const rangeSplited = type.split('')
  const rangeLetter: letterDate = rangeSplited[1] as letterDate

  const listaProcesada = lista.map((item) => {
    const timestamp = timestampStoMs(item.time)

    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const week = dateToWeekNumber(date)
    const day = dateDay(date)

    return { ...item, timestamp, year, month, week, day }
  })

  let maxValue: number
  switch (rangeLetter) {
    case 'D': {
      const dias = [...new Set(listaProcesada.map((i) => i.day))]
      const ultimosDias = dias.slice(-parseInt(rangeSplited[0]))
      return listaProcesada.filter((i) => ultimosDias.includes(i.day))
    }
    case 'M': {
      maxValue = Math.max(...listaProcesada.map((i) => i.year * 12 + i.month))
      return listaProcesada.filter(
        (i) => i.year * 12 + i.month >= maxValue - (parseInt(rangeSplited[0]) - 1),
      )
    }
    case 'S': {
      maxValue = Math.max(...listaProcesada.map((i) => i.year * 52 + i.week))
      return listaProcesada.filter(
        (i) => i.year * 52 + i.week >= maxValue - (parseInt(rangeSplited[0]) - 1),
      )
    }
    case 'A':
    default: {
      maxValue = Math.max(...listaProcesada.map((i) => i.year))
      return listaProcesada.filter((i) => i.year >= maxValue - (parseInt(rangeSplited[0]) - 1))
    }
  }
}

export { getUltimaFecha }
