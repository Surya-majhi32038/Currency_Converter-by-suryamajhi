import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import CurrencyDropdown from "./currency-dropdown";
import { MdSwapHoriz } from "react-icons/md";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(null);
  const [conversionMoment, setconversionMoment] = useState(false);
  // for a extra showing state which show the result according to situation 
  const [showingAmount, setShowingAmount] = useState(true)

  // function to fetch the currensies from API
  const fetchCurrencies = async () => {
    try {
      // steps to fetch the currencies form API
      const result = await fetch("https://api.frankfurter.app/currencies");
      const data = await result.json();
      // update this data
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error fetching ", error);
    }
  };

  // call the fetchCurrencies method to check the API is working or not
  useEffect(() => {
    fetchCurrencies();
  }, []);

  // check the currencies are listed or not
  //  console.log(currencies)

  // to convert the currencies
  const convetCurrency = async () => {
    //if amount is not present (no conversion )
    if (!amount || amount <=0) {
      notify("Please enter a valid amount.");
      setShowingAmount(false);
      return;
    }
     setShowingAmount(true);
    // else first change the conversion moment to true
    // and start the conversion process
    setconversionMoment(true);
    // actual conversion is now start
    try {
      // fetching happen
      const result = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await result.json();
      // convert the data
      setconvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.log("Error Fetching", error);
    } finally {
      setconversionMoment(false);
    }
  };

  // swap currency method
  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const notify = useCallback((massege) => {
    toast.error(massege, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }, []);

  const AmountElement = ({value}) => {
      return value ? (
        <div className="mt-4 text-lg font-medium text-right text-gray-600 xsm:text-sm">
          Converted Amount: {convertedAmount}
        </div>
      ) : null;
    
  };
  return (
    <div className="max-w-xl mx-auto my-10 rounded-lg bg-white p-5  xsm:flex xsm:flex-col xsm:justify-center xsm:items-center shadow-md xsm:max-w-[280px] ">
      {/* title of the application */}
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      {/* list of contries from API */}
      <div className="grid grid-cols-3 gap-4 xsm:gap-1 items-end">
        <CurrencyDropdown
          title="From:"
          currencies={currencies}
          currency={fromCurrency}
          setCurrency={setFromCurrency}
        />
        {/* swap button  */}
        <div className="flex justify-center mb-5 sm:mb-0">
          <button
            onClick={swapCurrency}
            className="p-2 bg-gray-200 rounded-full  cursor-pointer hover:bg-gray-300"
          >
            {/* swap icon  */}
            <MdSwapHoriz className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropdown
          title="To:"
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
        />
      </div>

      {/* amount input field */}
      <div className="mt-5 mx-10 xsm:w-full">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount{" "}
        </label>
        <input
          type="number"
          min={"1"}
          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-indigo-500 mt-1 focus:ring-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* amount convert button  */}
      <div className="flex flex-col justify-center items-center">
        <div className="flex justify-end mt-4">
          <button
            onClick={convetCurrency}
            className={`px-5  bg-indigo-500 text-white rounded-md hover:bg-indigo-700 py-2 focus:outline-none font-semibold
                ${conversionMoment ? "animate-pulse" : " "}
                `}
          >
            Converte
          </button>
        </div>

        {/* display converted amount  */}
        {convertedAmount && <AmountElement value={showingAmount} />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
      </div>
    </div>
  );
}
export default CurrencyConverter;
