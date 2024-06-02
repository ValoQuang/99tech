import {
  CurrencyPriceWithoutDate,
  useFormContext,
} from "../../AppContextProvider";
import Dropdown from "../Buttons/Dropdown";
import SwitchButton from "../Buttons/Switch";
import Input from "../Buttons/Input";
import { LuArrowLeftRight, LuUndo2, LuSendHorizonal } from "react-icons/lu";
import { useEffect } from "react";
import { calculateExchangeRate } from "../../utils/calculateExchangeRate";
import Loading from "../Loading/Loading";

const Form: React.FC = () => {
  const {
    amount,
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

  const handleRefreshCurrency = () => {
    if (toCurrency && fromCurrency === null) return;
    setFromCurrency(null);
    setToCurrency(null);
  };
  const handleConvertCurrency = () => {
    if (toCurrency === fromCurrency) return;
    //set method call api to retrieve
  };

  return (
    <div className="p-6 h-[500px] rounded-xl flex-col justify-between gap-5">
      {loading ? (
        <Loading />
      ) : (
        <div className="p-5 card-bordered flex animate-fadeIn flex-col gap-2 max-lg:gap-5 justify-between rounded-xl">
          <h1 className="items-center max-lg:text-xl text-2xl align-middle flex justify-center">
            Currency exchange calculator
          </h1>

          <div className="flex w-full h-20 gap-5 max-lg:gap-1 max-lg:flex-col">
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
                span="Swap"
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

          <div className="flex gap-2 items-center flex-row-reverse max-lg:w-full max-lg:mt-14 max-lg:justify-between">
            <SwitchButton
              onSwap={handleConvertCurrency}
              header="Convert"
              icon={<LuSendHorizonal />}
            />
            <SwitchButton
              onSwap={handleRefreshCurrency}
              header="Refresh"
              icon={<LuUndo2 />}
            />
          </div>

          <div className="">
            <div className="text-xl font-medium">Exchange rate</div>
            <p className="pt-5">
              1 {fromCurrency?.currency} is equal to {toCurrency?.currency}
            </p>
            <p>Exchange rate: {}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
