import React from 'react'
import { HiStar } from 'react-icons/hi'
import { HiOutlineStar } from 'react-icons/hi2'

const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    favorites,
    handleFavorite,
    title = ""
}) => {
    const isFavorite = curr => favorites.includes(curr)
    return (
        <div>
            <label htmlFor={title} className='block text-sm font-medium text-gray-700'>{title}</label>
            <div className='mt-1 relative'>
                <select className='w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500' value={currency} onChange={e => setCurrency(e.target.value)}>
                    {/* render favourtes */}
                    {
                        favorites.map((currency) => {
                            return (
                                <option className='bg-gray-200' value={currency} key={currency}>{currency}</option>
                            )
                        })
                    }
                    <hr />
                    {
                        currencies?.filter((c) => !favorites.includes(c))
                        .map((currency) => {
                            return (
                                <option value={currency} key={currency}>{currency}</option>
                            )
                        })
                    }
                </select>
                <button className='absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5' onClick={() => handleFavorite(currency)}>
                    {isFavorite(currency) ? <HiStar/> : <HiOutlineStar />}
                </button>
            </div>
        </div>
    )
}

export default CurrencyDropdown