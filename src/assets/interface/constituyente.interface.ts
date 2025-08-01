export default interface ConstituyenteInterface {
  success: boolean
  code: number
  data: Data
}

interface Data {
  info: Info
  constituents: Constituents[]
}

interface Info {
  name: string
  shortName: string
  countryName: string
  codeInstrument: string
}

export interface Constituents {
  codeInstrument: string
  name: string
  shortName: string
  pctDay: number
  pct30D: number
  pctCY: number
  pct1Y: number
  lastPrice: number
  datetimeLastPrice: string
  volumeMoney: number
  accumulatedVolumeMoney: number
  tend: 'up' | 'down' | 'same'
  performanceAbsolute: number
  performanceRelative: number
}
