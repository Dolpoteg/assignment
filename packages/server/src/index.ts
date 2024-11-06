import express from 'express'
import cors from 'cors'
import { join } from 'path'

import { OfficeService, StockService, FruitService, StockEvent } from '@lepaya/core'

const clientPath = '../../client/build'
const app = express()
app.use(cors())
app.use(express.json())
const port = 8080 

app.use(express.static(join(__dirname, clientPath)))

const stockService = new StockService()
const officeService = new OfficeService()
const fruitService = new FruitService()

app.get('/api/offices', async (req, res) => {
  const offices = await officeService.getAllOffices()
  try {
    res.send(offices)
  } catch (e) {
    res.send(e)
  }
})

app.get('/api', async (req, res) => {
  const fruit = await fruitService.getAllFruit()
  try {
    res.send(fruit)
  } catch (e) {
    res.send(e)
  }
})

app.get('/api/fruit', async (req, res) => {
  const fruit = await fruitService.getAllFruit()
  try {
    res.send(fruit)
  } catch (e) {
    res.send(e)
  }
})

app.post('/api/add-stock', async (req, res) => {
  try {
    const newStock: StockEvent[] = req.body
    await stockService.addStock(newStock || [])
    res.send({ message: 'Added' })
  } catch (e) {
    res.send(e)
  }
})

app.get('/api/office-years/:officeId/', async (req, res) => {
  try {
    const years = await stockService.getAvailableYears(req.params.officeId)
    res.send(years)
  } catch (e) {
    res.send(e)
  }
})

app.get('/api/report/:officeId/:year', async (req, res) => {
  try {
    const report = await stockService.getConsumptionReport(req.params.officeId, req.params.year)
    res.send(report)
  } catch (e) {
    res.send(e)
  }
})

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, clientPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`app  started at http://localhost:${port}`)
})
