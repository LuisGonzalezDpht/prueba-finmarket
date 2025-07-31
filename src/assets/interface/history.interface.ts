import type { Time } from 'lightweight-charts'

export default interface HistoryInterface {
  success: boolean
  code: number
  data: Data
}

interface Data {
  info: Info
  chart: Chart[]
}

interface Info {
  name: string
  shortName: string
  countryName: string
  currencyName: string
  currencySymbol: string
  codeIntrument: string
  hourOpen: string
  hourClose: string
}

interface Chart {
  datetimeLastPrice: string
  datetimeLastPriceTs: Time
  lastPrice: number
  highPrice: number
  lowPrice: number
  openPrice: number
  closePrice: number
  volume: number
  volumeMoney: number
  performanceRelative: number
  performanceAbsolute: number
  tend: 'up' | 'down' | 'neutral'
}

export interface AreaInterface {
  time: Time
  value: number
}

export interface CandleInterface {
  time: Time
  open: number
  high: number
  low: number
  close: number
}
