import React, { useEffect, useState } from 'react'
import { ConsumptionReport } from '@lepaya/core'

export default function Report({ fruit, selectedOffice }) {
  const [years, setYears] = useState([])
  const [selectedYear, setSelectedYear] = useState()
  const [consumptionReport, setConsumptionReport] = useState<ConsumptionReport>()

  const getData = endpoint => {
    return fetch(endpoint, {
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
    getData(`/api/office-years/${selectedOffice.id}`).then(years => {
      setSelectedYear(years[0])
      setYears(years)
    })
  }, [selectedOffice])

  useEffect(() => {
    if (selectedOffice && selectedYear) {
      getData(`/api/report/${selectedOffice?.id}/${selectedYear}`).then(setConsumptionReport)
    }
  }, [selectedOffice, selectedYear])

  function handleYearChange(e) {
    const selectedYear = e.target.value
    setSelectedYear(selectedYear)
  }

  return (
    <div>
      <div style={{ margin: '20px' }}>
        <label>Select a year </label>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {consumptionReport && (
        <div>
          <p>Most consumed fruit: {fruit.find(f => f.id === consumptionReport.mostConsumedFruitId)?.name}</p>
          <p>Consumed: {consumptionReport.mostConsumedFruitValue}</p>
          <p>
            Fruit consumed this year per person:{' '}
            {consumptionReport.yearlyConsumption / (selectedOffice?.headcount || 0)}{' '}
          </p>
        </div>
      )}
    </div>
  )
}
