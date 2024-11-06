import { pool } from '../db/pool'
import { Fruit } from '../types/types'
import { IFruitRepository } from './interfaces'

class InMemFruitRepository implements IFruitRepository {
  private fruits: Fruit[] = [
    { id: 1, name: 'banana', kcal: 100 },
    { id: 2, name: 'apple', kcal: 25 },
    { id: 3, name: 'orange', kcal: 50 }
  ]

  async findById(id: number): Promise<Fruit | undefined> {
    return this.fruits[id] || undefined
  }

  async findAll(): Promise<Fruit[]> {
    return Object.values(this.fruits)
  }
}

class postgressFruitRepository implements IFruitRepository {
  async findAll(): Promise<Fruit[]> {
    const result = await pool.query('Select * FROM fruit')
    return result.rows
  }

  async findById(id: number): Promise<Fruit | undefined> {
    const result = await pool.query(`SELECT * FROM fruit WHERE id = ${id}`)
    return result.rows.length ? result.rows[0] : undefined
  }
}

export function fruitRepository(): IFruitRepository {
  return process.env.NODE_ENV !== 'test' ? new postgressFruitRepository() : new InMemFruitRepository()
}
