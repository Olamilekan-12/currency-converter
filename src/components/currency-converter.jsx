import React, { useEffect, useState } from 'react'
import CurrencyDropdown from './dropdown'
import { HiArrowsRightLeft } from 'react-icons/hi2'

const CurrencyConverter = () => {
    const [currencies,setCurrencies] = useState([])
    const [amount,setAmount] = useState(1)
   const [fromCurrency,setFromCurrency] =  useState("USD")
   const [toCurrency,setToCurrency] =  useState("INR")
   const [convertedAmount, setConvertedAmount] = useState(null)
   const [converting,setConverting] = useState(false)
   const [favorites,setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["INR","EUR"])

    const fetchCurrencies = async () => {
        try {
            const res = await fetch(`https://api.frankfurter.app/currencies`)
            const data = await res.json()
            setCurrencies(Object.keys(data))
        } catch (error) {
            console.error("Error fetching", error)
        }
    }

    const currencyConvert = async() => {
        if(!amount){
            return
        }
        setConverting(true)
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
            const data = await res.json()
            setConvertedAmount(data.rates[toCurrency] + " " + toCurrency)
            
        } catch (error) {
            console.error("Error fetching", error)
            
        }finally{
            setConverting(false)
        }
    }

    useEffect(() => {
fetchCurrencies()
    },[])

const handleFavorite = (currency) => {
     let updatedFavourites = [...favorites] 

     if(favorites.includes(currency)){
        updatedFavourites = updatedFavourites.filter(fav => fav !== currency)
     }else{
        updatedFavourites.push(currency)
     }
     localStorage.setItem("favorites", JSON.stringify(updatedFavourites))

}

const swapCurrencies = ()=> {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
}

  return (
    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700'>Currency Converter</h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
            <CurrencyDropdown currencies={currencies} title='From' handleFavorite={handleFavorite} currency={fromCurrency} setCurrency={setFromCurrency} favorites={favorites}/>
            {/* swapp currency button */}
            <div className=' flex justify-center -mb-5 sm:mb-0'>
                <button className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300' onClick={swapCurrencies}>
                    <HiArrowsRightLeft className='text-xl text-gray-700'/>
                </button>
            </div>
            <CurrencyDropdown currencies={currencies} title='To' handleFavorite={handleFavorite} currency={toCurrency} setCurrency={setToCurrency} favorites={favorites}/>
        </div>
        <div className='mt-4'>
            <label htmlFor="amount" className='block text-sm font-medium text-gray-700'>Amount:</label>
            <input type="number" className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1' value={amount} onChange={(e) => setAmount(e.target.value)}/>
        </div>
        <div className='flex justify-end mt-6'>
            <button className={`py-2 px-5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${converting ? "animate-pulse" : ""}`} onClick={currencyConvert}>Convert</button>
        </div>
        {
            convertedAmount && (
                <div className='mt-4 text-lg font-medium text-right text-green-600'>
                Converted Amount : {convertedAmount}
            </div>
            )
        }
       
    </div>
  )
}

export default CurrencyConverter