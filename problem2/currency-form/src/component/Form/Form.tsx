import {
  CurrencyPriceWithoutDate,
  useFormContext,
} from "../../AppContextProvider";
import Dropdown from "../Buttons/Dropdown";
import SwitchButton from "../Buttons/Switch";
import Input from "../Buttons/Input";
import { LuArrowLeftRight } from "react-icons/lu";
import { useEffect } from "react";
import { calculateExchangeRate } from "../../utils/calculateExchangeRate";
import Loading from "../Loading/Loading";

const Form = () => {
  const {
    data,
    loading,
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
  } = useFormContext();

  const handleFromCurrency = (currency: {
    currency: string;
    price: number;
  }) => {
    setFromCurrency(currency);
  };

  const handleToCurrency = (currency: { currency: string; price: number }) => {
    setToCurrency(currency);
  };

  const handleSwapCurrency = () => {
    if (toCurrency === fromCurrency) return;
    setFromCurrency(toCurrency as CurrencyPriceWithoutDate);
    setToCurrency(fromCurrency as CurrencyPriceWithoutDate);
  };

  const renderCalculator = () => {
    return (
      <>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex animate-fadeIn flex-col justify-between rounded-xl">
            <h1 className="items-center max-lg:text-xl text-2xl align-middle flex justify-center pt-10">
              Currency exchange calculator
            </h1>
            <div className="mt-5 flex h-24 w-full gap-5 max-lg:flex-col">
              <div className="w-1/3 max-lg:w-full">
                <Input />
              </div>

              <div className="gap-2 flex max-lg:w-full max-lg:px-0 w-2/3 justify-between">
                <Dropdown
                  label="From"
                  selectedCurrency={fromCurrency?.currency as string}
                  data={data}
                  onSelectCurrency={handleFromCurrency}
                />

                <SwitchButton
                  onSwap={handleSwapCurrency}
                  header="Swap"
                  icon={<LuArrowLeftRight />}
                />

                <Dropdown
                  label="To"
                  selectedCurrency={toCurrency?.currency as string}
                  data={data}
                  onSelectCurrency={handleToCurrency}
                />
              </div>
            </div>

            <div className="bg-base-100 card-bordered shadow-md max-lg:mt-28">
              <div className="card-body">
                <div className="card-title text-xl font-medium">
                  Exchange rate
                </div>
                <p className="pt-10">
                  1 {fromCurrency?.currency} is equal to {toCurrency?.currency}
                </p>
                <p>Exchange rate: {}</p>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-6 h-[500px] rounded-xl flex-col justify-between gap-5">
      {renderCalculator()}
    </div>
  );
};

export default Form;
