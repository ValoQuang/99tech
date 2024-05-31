import { useFormContext } from "../../AppContextProvider";
import Dropdown from "../Buttons/Dropdown";
import SwapButton from "../Buttons/Swap";
import Input from "../Buttons/Input";

const Form = () => {
  const {
    data,
    loading,
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
  } = useFormContext();

  const handleFromCurrency = (currency: string) => {
    setFromCurrency(currency);
  };

  const handleToCurrency = (currency: string) => {
    setToCurrency(currency);
  };

  const handleSwapCurrency = () => {
    if (toCurrency === fromCurrency) return;
    setFromCurrency(toCurrency as string);
    setToCurrency(fromCurrency as string);
  };

  const renderCalculator = () => {
    return (
      <>
        {loading ? (
          <div className="w-full">Loading ...</div>
        ) : (
          <div className="flex flex-col gap-5 rounded-xl">
            <section className="flex w-full gap-5 max-lg:flex-col">
              <div className="w-1/3 max-lg:w-full">
                <Input />
              </div>

              <div className="gap-3 flex max-lg:w-full max-lg:px-0 w-2/3 justify-between">
                <Dropdown
                  label="From"
                  selectedCurrency={fromCurrency as string}
                  data={data}
                  onSelectCurrency={handleFromCurrency}
                />

                <SwapButton onSwap={handleSwapCurrency} />

                <Dropdown
                  label="To"
                  selectedCurrency={toCurrency as string}
                  data={data}
                  onSelectCurrency={handleToCurrency}
                />
              </div>
            </section>

            <section>
              <div className="collapse bg-base-200">
                <input type="radio" name="my-accordion-1" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                  Exchange rate at {Date().toString()}
                </div>
                <div className="collapse-content">
                  <p>
                    1 {fromCurrency} is equal to {toCurrency}
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
    <div
      data-theme="retro"
      className="p-6 h-[500px] rounded-xl flex-col justify-between gap-5"
    >
      {renderCalculator()}
    </div>
  );
};

export default Form;
