import type { AreaInterface } from '@/assets/interface/history.interface'
import type { letterDate, rangeDate } from '@/assets/type/range.type'
import type { Time } from 'lightweight-charts'

/**
 * esta funcion esta pensada para transformar los timestamps que esten en
 * segundos a milisegundos, esto para que lightweigth tenga buen soporte
 * con las fechas
 */
function timestampsSegToMs(tms: Time): number {
  const num = Number(tms)
  return num > 1e12 ? num : num * 1000
}

/**
 * esta funcion es para obtener el dia de la fecha, es mas por si se requiere filtrar por dia
 */
function dateDay(date: Date): string {
  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * esta funcion es tambien para obtener algo especifico de una fecha en este caso
 * la semana por si requiere filtrar por semana
 */
function dateToWeekNumber(date: Date): number {
  const dt = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const numDay = dt.getDay() || 7 // domingo = 0 → 7

  dt.setDate(dt.getDate() + 4 - numDay) // ajusta al jueves de esa semana

  const YrStart = new Date(dt.getFullYear(), 0, 1) // se obtiene el inicio del año en que se trabaja
  const diffDays =
    Math.floor((dt.getTime() - YrStart.getTime()) / 86400000 /** los ms de un dia */) + 1

  return Math.ceil(diffDays / 7)
}

function getLastDate(lista: AreaInterface[], type: rangeDate = '1A') {
  const rangeSplited = type.split('')
  const rangeLetter: letterDate = rangeSplited[1] as letterDate

  // se procesa la lista retornando la fecha separada junto con el item de la lista de area
  const proccessed = lista.map((item) => {
    const timestamp = timestampsSegToMs(item.time)

    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const week = dateToWeekNumber(date)
    const day = dateDay(date)

    return { ...item, timestamp, year, month, week, day }
  })

  /**
   * el uso de maxValue es para identificar el rango maximo que se debe de usar por ejemplo en las fechas
   * el año seria 2025 o el mes julio (6 -1)
   */
  let maxValue: number
  switch (rangeLetter) {
    case 'D': {
      const dias = [...new Set(proccessed.map((i) => i.day))]
      const ultimosDias = dias.slice(
        -parseInt(rangeSplited[0]) /** <-- este es el valor del maximo de años o meses a usar */,
      )
      return proccessed.filter((i) => ultimosDias.includes(i.day))
    }
    case 'M': {
      maxValue = Math.max(...proccessed.map((i) => i.year * 12 + i.month))
      return proccessed.filter(
        (i) => i.year * 12 + i.month >= maxValue - (parseInt(rangeSplited[0]) - 1),
      )
    }
    case 'S': {
      maxValue = Math.max(...proccessed.map((i) => i.year * 52 + i.week))
      return proccessed.filter(
        (i) => i.year * 52 + i.week >= maxValue - (parseInt(rangeSplited[0]) - 1),
      )
    }
    case 'A':
    default: {
      maxValue = Math.max(...proccessed.map((i) => i.year))
      return proccessed.filter((i) => i.year >= maxValue - (parseInt(rangeSplited[0]) - 1))
    }
  }
}

export { getLastDate }
