export const KCAL_LIMIT = 250
export const DEFAULT_OFFICE = 'Amsterdam'

export const ERROR_MESSAGE_CALORIES = 'Too much calories!'

export interface Office {
  id: number
  name: string
  headcount: number
}

export interface Fruit {
  id: number
  name: string
  kcal: number
}

export interface StockEvent {
  fruitId: number
  officeId: number
  amount: number
  time?: string
}

export interface ConsumptionReport {
  mostConsumedFruitId: number
  mostConsumedFruitValue: number
  yearlyConsumption: number
}
