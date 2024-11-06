import { Pool } from 'pg'

export const pool = new Pool({
  user: 'candidate',
  host: process.env.DB_HOST || 'localhost',
  database: 'fruity',
  password: 'candidate',
  port: 5432
})
