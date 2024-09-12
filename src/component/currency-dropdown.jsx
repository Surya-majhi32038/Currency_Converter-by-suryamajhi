import React from 'react'

const CurrencyDropdown = ({
    currencies,
    currency,
    setCurrency,
    title = ""
}) => {
  return (
    <div className='xsm:flex xsm:flex-col'>
        {/* lable for country of currency  */}
        <label 
            htmlFor={title}
            className='block text-sm font-medium text-gray-700'
        > {title} </label>


        <div className='mt-1 relative'>
            <select 
                className='w-full p-2 border border-gray-300 rounded-md shadow-sm  focus:outline-none focus:ring-indigo-500 mt-1 foucs:ring-1'
                value={currency}
                onChange={(e)=>setCurrency(e.target.value)}
            >
                {currencies.map((currency)=>{
                    return(
                        <option value={currency} key={currency}>
                            {currency}
                        </option>
                    )
                })}

            </select>
        </div>
    </div>
  )
}

export default CurrencyDropdown