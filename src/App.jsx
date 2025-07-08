import React from 'react'
import CurrencyConverter from './components/currency-converter'

const App = () => {
  //https://api.frankfurter.app/currencies
  //https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center'>
      <div className='container'>
      <CurrencyConverter/>
      </div>
    </div>
  )
}

export default App