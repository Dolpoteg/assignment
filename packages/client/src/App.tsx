import React, { useEffect, useState } from 'react'
import './App.css'
import { Office, Fruit } from '@lepaya/core'
import Order from './components/Order'
import Report from './components/Report'

export default function App() {
  const [selectedOffice, setSelectedOffice] = useState<Office>()
  const [offices, setOffices] = useState<Office[]>([])
  const [fruit, setFruit] = useState<Fruit[]>([])
  
  const getData = async (endpoint) => {
    return await fetch(endpoint, {
      method: 'GET'
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        return json
      })
  }

  useEffect(() => {
    getData('/api/fruit').then(setFruit)

    getData('/api/offices')
    .then(offices => {
      setSelectedOffice(offices[0])
      setOffices(offices)
    })
  }, [])

  function handleOfficeChange(e) {
    setSelectedOffice(offices.find(o => o.id === parseInt(e.target.value)))
  }

  return (
    <div className="App">
      <h1>Chocolate Inc. fruit corner</h1>
      <div style={{ padding: '20px'}}>
        <label>Select an office </label>
        <select value={selectedOffice?.id} onChange={handleOfficeChange}>
          {offices.map(office => (
            <option key={office.id} value={office.id}>
              {office.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {selectedOffice && <Order fruit={fruit} selectedOfficeId={selectedOffice.id}></Order>}
      </div>
      <div>
        {selectedOffice && <Report fruit={fruit} selectedOffice={selectedOffice}></Report>}
      </div>
    </div>
  )
}
