import React from "react";
import { CurrencyPrice } from "../../AppContextProvider";

interface DropdownButton {
  label: string;
  selectedCurrency: string; 
  onSelectCurrency: (currency: string) => void; 
  data: CurrencyPrice[];
}

const DropdownButton = React.memo(({ label, selectedCurrency, data, onSelectCurrency }: DropdownButton) => {
  return (
    <div className="w-full">
      <span>{label}</span>
      <div className="dropdown w-full">
        <div tabIndex={0} role="button" className="btn w-full rounded-xl">
          {selectedCurrency !== null ? selectedCurrency : <p className="max-lg:text-xs">Choose currency</p>}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[9] menu p-2 shadow bg-base-100 rounded-xl w-52 overflow-scroll"
        >
          <div className="h-64">
            {data.map((item: CurrencyPrice, index: number) => (
              <li
                className="hover:bg-base-200 cursor-pointer"
                key={index}
                onClick={() => onSelectCurrency(item.currency)}
              >
                {item.currency}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
});

export default DropdownButton;