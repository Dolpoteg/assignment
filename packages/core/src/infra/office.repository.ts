import { pool } from '../db/pool'
import { Office } from '../types/types'
import { IOfficeRepository } from './interfaces'

class PostgressOfficeRepository implements IOfficeRepository {
  async findAll(): Promise<Office[]> {
    const result = await pool.query('Select * FROM location')
    return result.rows
  }

  async findById(id: number): Promise<Office | undefined> {
    const result = await pool.query(`SELECT * FROM location WHERE id = ${id}`)
    return result.rows.length ? result.rows[0] : undefined
  }
}

class InMemOfficeRepository implements IOfficeRepository {
  private office: Office[] = [
    { id: 1, name: 'Amsterdam', headcount: 100 },
    { id: 2, name: 'Rome', headcount: 200 },
    { id: 3, name: 'Paris', headcount: 50 }
  ]

  async findById(id): Promise<Office | undefined> {
    return this.office.find(office => office.id === id)
  }

  async findAll(): Promise<Office[]> {
    return this.office
  }
}

export function officeRepository() {
  return process.env.NODE_ENV !== 'test' ? new PostgressOfficeRepository() : new InMemOfficeRepository()
}
