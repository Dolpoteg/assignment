import { StockService } from '../src/service/stock.service'
import { ConsumptionReport, ERROR_MESSAGE_CALORIES } from '../src/types/types'

const stockService = new StockService()

describe('Stock', () => {
  it('adds stock', async () => {
    const newStock = [
      { fruitId: 1, officeId: 1, amount: 2 },
      { fruitId: 2, officeId: 1, amount: 1 },
      { fruitId: 1, officeId: 1, amount: -1 },
      { fruitId: 1, officeId: 1, amount: -1 },
      { fruitId: 2, officeId: 1, amount: -1 }
    ]
    await stockService.addStock(newStock, new Date().toISOString())
    await stockService.addStock(structuredClone(newStock), new Date(2023, 5, 1).toISOString())
  })

  it('returns years', async () => {
    const years = await stockService.getAvailableYears(1)
    expect(years).toContain(2023)
    expect(years).toContain(new Date().getFullYear())
  })

  it('throws an exception', async () => {
    await expect(async () => {
      await stockService.addStock([{ fruitId: 1, officeId: 1, amount: 100 }], new Date().toISOString())
    }).rejects.toThrow(ERROR_MESSAGE_CALORIES)
  })

  it('returns a report', async () => {
    const report: ConsumptionReport = await stockService.getConsumptionReport(1, new Date().getFullYear())
    expect(report.mostConsumedFruitId).toBe(1)
    expect(report.mostConsumedFruitValue).toBe(2)
    expect(report.yearlyConsumption).toBe(3)
  })
})
