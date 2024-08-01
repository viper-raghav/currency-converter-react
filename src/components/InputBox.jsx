import React, { useId } from 'react';

export default function Input({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
    const amountInputId = useId();

    return (
        <div className={`bg-gray-800 p-4 rounded-lg flex ${className}`}>
        <div className="w-1/2 pr-2">
          <label htmlFor={amountInputId} className="text-gray-400 mb-2 block">
            {label}
          </label>
          <input
            id={amountInputId}
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-md outline-none"
            type="number"
            placeholder="Amount"
            disabled={amountDisable}
            value={amount}
            onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
          />
        </div>
        <div className="w-1/2 pl-2">
          <label className="text-gray-400 mb-2 block">Currency Type</label>
          <select
            className="w-full bg-gray-700 text-white py-2 px-3 rounded-md outline-none"
            value={selectCurrency}
            onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
            disabled={currencyDisable}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
