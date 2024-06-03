import React, { useEffect, useState, useCallback } from "react";
import { useFormContext } from "../../AppContextProvider";
import { LuArrowLeftRight, LuUndo2 } from "react-icons/lu";
import { calculateExchangeRate } from "../../utils/calculateExchangeRate";
import Loading from "../Loading/Loading";
import Dropdown from "../Buttons/Dropdown";
import SwitchButton from "../Buttons/Switch";
import Input from "../Buttons/Input";

const Form: React.FC = () => {
  const {
    formInput,
    rate,
    data,
    error,
    handleSwapInputForm,
    handleUpdateForm,
    handleResetForm,
    setRate,
    setError,
  } = useFormContext();
  const [load, setLoad] = useState(false);

  const fetchExchangeRate = useCallback(() => {
    setLoad(true);
    const mockAPIresponse = setTimeout(() => {
      if (
        formInput.amount &&
        formInput?.fromCurrency &&
        formInput?.toCurrency
      ) {
        const [exchange_rate, base_rate] = calculateExchangeRate({
          amount: formInput.amount,
          from: formInput?.fromCurrency,
          to: formInput?.toCurrency,
        });
        setRate({
          exchange_rate: exchange_rate,
          base_rate: base_rate,
        });
        setError(false);
        setLoad(false);
      }
    }, 300);
    return () => clearTimeout(mockAPIresponse);
  }, [
    formInput.amount,
    formInput?.fromCurrency,
    formInput?.toCurrency,
    setRate,
    setError,
  ]);

  useEffect(() => {
    if (formInput?.toCurrency && formInput?.fromCurrency && !error) {
      fetchExchangeRate();
    }
  }, [
    fetchExchangeRate,
    formInput?.amount,
    formInput?.toCurrency,
    formInput?.fromCurrency,
    data,
  ]);

  return (
    <div className="p-6 h-[500px] rounded-xl flex-col justify-between gap-5">
      <div className="p-2 card-bordered flex animate-fadeIn flex-col gap-5 max-lg:gap-5 justify-between rounded-xl">
        <h1 className="items-center max-lg:text-xl text-xl align-middle flex justify-center">
          Currency exchange calculator
        </h1>
        <div className="flex w-full h-20 gap-5 max-lg:gap-1 max-lg:flex-col">
          <div className="w-1/3 max-lg:w-full">
            <Input />
          </div>
          <div className="gap-2 flex max-lg:w-full max-lg:px-0 w-2/3 justify-between">
            <Dropdown
              label="From"
              selectedCurrency={formInput?.fromCurrency}
              data={data}
              onSelectCurrency={(currency) =>
                handleUpdateForm("fromCurrency", currency)
              }
            />
            <SwitchButton
              onClick={handleSwapInputForm}
              span="Swap"
              icon={<LuArrowLeftRight />}
            />
            <Dropdown
              label="To"
              selectedCurrency={formInput?.toCurrency}
              data={data}
              onSelectCurrency={(currency) =>
                handleUpdateForm("toCurrency", currency)
              }
            />
          </div>
        </div>
        <div className="flex gap-2 items-center flex-row-reverse max-lg:w-full max-lg:mt-16 max-lg:justify-between">
          <SwitchButton
            onClick={handleResetForm}
            header="Reset"
            icon={<LuUndo2 />}
          />
        </div>
        <div>
          {load ? (
            <Loading />
          ) : (
            rate && (
              <div className="flex flex-col gap-5">
                <div className="text-xl">Exchange rate</div>
                <span className="text-3xl flex-wrap max-lg:text-xl font-medium flex gap-2 items-center">
                  <img
                    className="w-12 h-12"
                    src={formInput.fromCurrency?.icon}
                    alt="i"
                  />
                  <p>
                    {formInput.amount} {formInput.fromCurrency?.currency} ={" "}
                    
                  </p>
                  <span className="flex gap-1 items-center">
                    <img
                      className="w-12 h-12"
                      src={formInput.toCurrency?.icon}
                      alt="i"
                    />
                    {rate?.exchange_rate.toFixed(5)}{" "}
                    <p>{formInput.toCurrency?.currency}</p>
                  </span>
                </span>
                <p className="max-lg:text-xs">
                  1 {formInput.fromCurrency?.currency} ={" "}
                  {rate?.base_rate.toFixed(5)} {formInput.toCurrency?.currency}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
