import { memo } from "react";
import { CurrencyPrice } from "../../AppContextProvider";

interface DropdownButton {
  label: string;
  selectedCurrency: CurrencyPrice | null;
  onSelectCurrency: (currency: CurrencyPrice) => void;
  data: CurrencyPrice[] | null;
  error: boolean;
}

const DropdownButton: React.FC<DropdownButton> = memo(
  ({
    label,
    selectedCurrency,
    data,
    onSelectCurrency,
    error,
  }: DropdownButton) => {
    return (
      <div className="w-full">
        <span>{label}</span>
        <div className="dropdown w-full">
          <button
            disabled={error}
            tabIndex={0}
            role="button"
            className="btn w-full flex gap-1 rounded-xl"
          >
            {selectedCurrency ? (
              <>
                <img className="w-6 h-6" src={selectedCurrency.icon} alt="i" />
                <p>{selectedCurrency.currency}</p>
              </>
            ) : (
              "Choose currency"
            )}
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content z-[9] menu p-2 shadow bg-base-100 rounded-xl w-72 max-lg:w-48 overflow-scroll"
          >
            <div className="h-fit">
              {data?.map((item: CurrencyPrice, index: number) => (
                <li
                  className="hover:bg-base-200 cursor-pointer"
                  key={index}
                  onClick={() =>
                    onSelectCurrency({
                      currency: item.currency,
                      price: item.price,
                      icon: item.icon,
                    })
                  }
                >
                  <span className="items-center flex gap-1">
                    <img className="w-6 h-6" src={item.icon} alt="i" />
                    <p>{item.currency}</p>
                  </span>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    );
  }
);

export default DropdownButton;
