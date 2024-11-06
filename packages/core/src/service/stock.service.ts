import { IStockRepository } from '../infra/interfaces'
import { stockRepository } from '../infra/stock.repository'
import { StockEvent, ConsumptionReport, ERROR_MESSAGE_CALORIES, KCAL_LIMIT } from '../types/types'
import { FruitService } from './fruit.service'

export class StockService {
  private stockRepo: IStockRepository
  private fruitService: FruitService

  constructor() {
    this.stockRepo = stockRepository()
    this.fruitService = new FruitService()
  }

  async addStock(newStock: StockEvent[], time?: string) {
    await this.validateStock(newStock)
    this.stockRepo.addStock(newStock, time || new Date().toISOString())
  }

  async getConsumptionReport(officeId: number, year: number): Promise<ConsumptionReport> {
    const events = await this.stockRepo.getStockEventByOfficeAndYear(officeId, year)
    const aggregate = this.getConsumptionAggregate(events)
    return reportFromAggregate(aggregate)
  }

  async getAvailableYears(officeId: number) {
    return await this.stockRepo.getYearsForOffice(officeId)
  }

  private getConsumptionAggregate(events: StockEvent[]): Map<number, number> {
    const cnt = new Map<number, number>()

    events.map(e => {
      if (e.amount < 0) {
        const currentAmount = cnt.get(e.fruitId) || 0
        cnt.set(e.fruitId, currentAmount + e.amount)
      }
    })
    return cnt
  }

  private async validateStock(newStock: StockEvent[]) {
    const fruitKcalMap = await this.fruitService.getKcalMap()
    let kcal_value = 0
    newStock.forEach(stock => {
      kcal_value += (fruitKcalMap.get(stock.fruitId) || 0) * stock.amount
      if (kcal_value > KCAL_LIMIT) {
        throw new Error(ERROR_MESSAGE_CALORIES)
      }
    })
  }
}

function reportFromAggregate(aggregate: Map<number, number>): ConsumptionReport {
  let maxValue = 0
  let maxId: number = 0
  let sum = 0

  aggregate.forEach((v, k) => {
    const absValue = Math.abs(v)
    sum += absValue
    if (absValue > maxValue) {
      maxValue = absValue
      maxId = parseInt(k as unknown as string)
    }
  })

  return {
    mostConsumedFruitId: maxId,
    mostConsumedFruitValue: maxValue,
    yearlyConsumption: sum
  }
}
