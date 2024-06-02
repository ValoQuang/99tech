import { useFormContext } from "../../AppContextProvider";
import Dropdown from "../Buttons/Dropdown";
import SwitchButton from "../Buttons/Switch";
import Input from "../Buttons/Input";
import { LuArrowLeftRight, LuUndo2 } from "react-icons/lu";
import { calculateExchangeRate } from "../../utils/calculateExchangeRate";
import Loading from "../Loading/Loading";
import React, { useEffect, useState } from "react";

const Form: React.FC = () => {
  const {
    formInput,
    rate,
    data,
    loading,
    error,
    handleSwapInputForm,
    handleUpdateForm,
    handleRefreshForm,
    setRate,
    setError,
  } = useFormContext();
  const [load, setLoad] = useState(false);
  const [fromCurrency, toCurrency, amount] =
    formInput !== null
      ? [
          formInput.fromCurrency?.currency,
          formInput.toCurrency?.currency,
          formInput.amount,
        ]
      : [];

  useEffect(() => {
    if (formInput.toCurrency && formInput.fromCurrency && !error) {
      setLoad(true);
      const mockAPIresponse = setTimeout(() => {
        const [exchange_rate, base_rate] = calculateExchangeRate({
          amount: formInput.amount!,
          from: formInput.fromCurrency!,
          to: formInput.toCurrency!,
        });
        setRate({
          exchange_rate: exchange_rate,
          base_rate: base_rate,
        });
        setError(false);
        setLoad(false);
      }, 300);

      return () => {
        clearTimeout(mockAPIresponse);
      };
    }
  }, [formInput.amount, formInput.toCurrency, formInput.fromCurrency]);

  return (
    <div className="p-6 h-[500px] rounded-xl flex-col justify-between gap-5">
      <div className="p-5 card-bordered flex animate-fadeIn flex-col gap-2 max-lg:gap-5 justify-between rounded-xl">
        <h1 className="items-center max-lg:text-xl text-2xl align-middle flex justify-center">
          Currency exchange calculator {loading} {error}
        </h1>
        <div className="flex w-full h-20 gap-5 max-lg:gap-1 max-lg:flex-col">
          <div className="w-1/3 max-lg:w-full">
            <Input />
          </div>
          <div className="gap-2 flex max-lg:w-full max-lg:px-0 w-2/3 justify-between">
            <Dropdown
              label="From"
              selectedCurrency={fromCurrency as string}
              data={data}
              onSelectCurrency={(currency) =>
                handleUpdateForm("fromCurrency", currency)
              }
            />
            <SwitchButton
              onClick={() => handleSwapInputForm()}
              span="Swap"
              icon={<LuArrowLeftRight />}
            />
            <Dropdown
              label="To"
              selectedCurrency={toCurrency as string}
              data={data}
              onSelectCurrency={(currency) =>
                handleUpdateForm("toCurrency", currency)
              }
            />
          </div>
        </div>
        <div className="flex gap-2 items-center flex-row-reverse max-lg:w-full max-lg:mt-20 max-lg:justify-between">
          <SwitchButton
            onClick={() => handleRefreshForm()}
            header="Refresh"
            icon={<LuUndo2 />}
          />
        </div>
        <div>
          {load ? (
            <Loading />
          ) : (
            <>
              {rate && (
                <div className="flex flex-col gap-5">
                  <div className="text-xl">Exchange rate</div>
                  <p className="text-3xl font-medium">
                    {amount} {fromCurrency} is equal to {rate?.exchange_rate}{" "}
                    {toCurrency}
                  </p>
                  <p>
                    1 {fromCurrency} is equal to {rate?.base_rate} {toCurrency}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
