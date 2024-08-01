import { useState } from 'react'
import Input from './components/InputBox'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState()
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState()

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    // Recalculate the converted amount based on swapped currencies
    setConvertedAmount(amount * (currencyInfo[to] || 1))
    setAmount(convertedAmount)
  }

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to])
    } else {
      setConvertedAmount(0) // Handle conversion rate not available
    }
  }

  return (
    <div
      className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900 text-white"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/259132/pexels-photo-259132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-md">
        <h1 className="text-2xl font-bold text-center mb-4">Currency Converter</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-4">
            <Input
              label="From"
              amount={amount}
              currencyOptions={options}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount < 0 ? 0 : amount)}
              onCurrencyChange={(currency) => {
                if (currency !== from) {
                  setFrom(currency);
                  setAmount(0); // Reset amount on currency change
                }
              }}
            />
          </div>
          <div className="mb-4 flex justify-center">
            <button
              type="button"
              className="bg-blue-600 text-white text-lg font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="mb-6">
            <Input
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              selectCurrency={to}
              amountDisable
              onCurrencyChange={(currency) => setTo(currency)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;