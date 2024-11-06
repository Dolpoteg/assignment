import { IStockRepository } from './interfaces'
import { StockEvent } from '../types/types'
import { pool } from '../db/pool'

export class PostgressStockRepository implements IStockRepository {
  async addStock(newFruit: StockEvent[], time: string) {
    const valuesString = newFruit
      .map((_, index) => `($${index * 3 + 1}, $${index * 3 + 2}, $${index * 3 + 3}, '${time}')`)
      .join(', ')

    const values = newFruit.flatMap(e => [e.fruitId, e.officeId, e.amount])
    const query = `INSERT INTO public.ledger (fruit_id, location_id, amount, time) VALUES ${valuesString}`

    await pool.query(query, values)
  }

  async getStockEventByOfficeAndYear(officeId: number, year: number): Promise<StockEvent[]> {
    const querySQL = `
        SELECT location_id as "officeId", fruit_id as "fruitId", amount FROM public.ledger 
        WHERE location_id = $1 
        AND EXTRACT(YEAR FROM time) = $2
        ORDER BY location_id`
    return (await pool.query(querySQL, [officeId, year])).rows
  }

  async getYearsForOffice(officeId: number): Promise<number[]> {
    const query = `
      SELECT DISTINCT EXTRACT(YEAR FROM time) AS year
      FROM public.ledger
      WHERE location_id = $1
      ORDER BY year;`
    return (await pool.query(query, [officeId])).rows.map(r => r.year)
  }
}

export class InMemStockRepository implements IStockRepository {
  private stock: StockEvent[] = []

  async addStock(newFruit: StockEvent[], time: string) {
    newFruit.forEach(stock => {
      stock.time = time
    })

    this.stock.push(...newFruit)
  }

  async getStockEventByOfficeAndYear(officeId: number, year: number): Promise<StockEvent[]> {
    return this.stock.filter(stock => {
      const stockYear = new Date(stock.time!).getFullYear()
      return stock.officeId === officeId && stockYear === year
    })
  }

  async getYearsForOffice(officeId: number): Promise<number[]> {
    return [...new Set(this.stock.filter(s => s.officeId === officeId).map(s => new Date(s.time || 0).getFullYear()))]
  }
}

export function stockRepository(): IStockRepository {
  return process.env.NODE_ENV !== 'test' ? new PostgressStockRepository() : new InMemStockRepository()
}
