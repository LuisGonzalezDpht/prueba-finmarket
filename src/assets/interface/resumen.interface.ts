export default interface ResumenInterface {
  success: boolean
  code: number
  data: Data
}

interface Data {
  info: Info
  price: Price
}

interface Info {
  name: string
  shortName: string
  countryName: string
  currencyName: string
  currencySymbol: string
  codeInstrument: string
  marketName: string
  hourOpen: string
  hourClose: string
  trading: boolean
  exchangeRate: number
}

interface Price {
  lastPrice: number
  datetimeLastPrice: string
  openPrice: number
  closePrice: number
  datetimeClosePrice: string
  performanceAbsolute: number
  performanceRelative: number
  bid: number
  bidVolume: number
  bidDatetime: string
  ask: number
  askVolume: number
  askDatetime: string
  volumeMoney: number
  accumulatedVolumeMoney: number
  volumeInstrument: number
  accumulatedVolumeInstrument: number
  tend: 'up' | 'down' | 'same'
  maxDay: number
  minDay: number
  min52W: number
  max52W: number
  pct30D: number
  pctRelW52: number
  pctRelCY: number
}
