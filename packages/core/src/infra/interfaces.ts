import { Office, Fruit, StockEvent } from '../types/types'

export interface IOfficeRepository {
  findById(id: number): Promise<Office | undefined>
  findAll(): Promise<Office[]>
}

export interface IFruitRepository {
  findById(id: number): Promise<Fruit | undefined>
  findAll(): Promise<Fruit[]>
}

export interface IStockRepository {
  addStock(stock: StockEvent[], time: string)
  getStockEventByOfficeAndYear(officeId: number, year: number): Promise<StockEvent[]>
  getYearsForOffice(officeId: number)
}
