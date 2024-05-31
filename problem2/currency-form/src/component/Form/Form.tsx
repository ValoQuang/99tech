import {
  CurrencyPriceWithoutDate,
  useFormContext,
} from "../../AppContextProvider";
import Dropdown from "../Buttons/Dropdown";
import SwitchButton from "../Buttons/Switch";
import Input from "../Buttons/Input";
import { LuArrowLeftRight } from "react-icons/lu";

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
          <div className="w-full flex items-center justify-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : (
          <div className="flex animate-fadeIn flex-col gap-5 rounded-xl">
            <h1 className="items-center max-lg:text-xl text-2xl align-middle flex justify-center pt-10">
              Currency exchange calculator
            </h1>
            <section className="flex w-full gap-5 max-lg:flex-col">
              <div className="w-1/3 max-lg:w-full">
                <Input />
              </div>

              <div className="gap-3 flex max-lg:w-full max-lg:px-0 w-2/3 justify-between">
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
            </section>

            <section>
              <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  Exchange rate
                </div>
                <div className="collapse-content">
                  <p>
                    1 {fromCurrency?.currency} is equal to{" "}
                    {toCurrency?.currency}
                  </p>
                </div>
              </div>
            </section>
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
