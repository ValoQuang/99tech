import { createContext, useContext, useState, ReactNode } from "react";
import { themes } from "./mockData";

export type CurrencyPrice = {
  currency: string;
  date: string;
  price: number;
};

export type ExChangeRate = {
  exchange_rate: number;
  base_rate: number;
};

export type FormInput = {
  amount: number | null;
  fromCurrency: CurrencyPriceWithoutDate | null;
  toCurrency: CurrencyPriceWithoutDate | null;
};

type FormInputKey = keyof FormInput;

type FormInputValue = FormInput[FormInputKey];

export type CurrencyPriceWithoutDate = Omit<CurrencyPrice, "date">;
interface FormContextType {
  data: CurrencyPrice[] | null;
  formInput: FormInput;
  error: boolean;
  loading: boolean;
  theme: string;
  rate: ExChangeRate | null;
  setRate: (amount: { exchange_rate: number; base_rate: number }) => void;
  setData: (data: CurrencyPrice[]) => void;
  setError: (error: boolean) => void;
  setLoading: (loading: boolean) => void;
  handleUpdateForm: (key: FormInputKey, value: FormInputValue) => void;
  handleRefreshForm: () => void;
  handleSwapInputForm: () => void;
  setTheme: (theme: string) => void;
}

export const defaultValue: FormContextType = {
  loading: false,
  error: false,
  data: null,
  formInput:
    {
      amount: 1,
      fromCurrency: null,
      toCurrency: null,
    } || null,
  theme: themes[0],
  rate: null,
  setRate: () => {},
  handleUpdateForm: () => {},
  handleRefreshForm: () => {},
  handleSwapInputForm: () => {},
  setData: () => {},
  setError: () => {},
  setLoading: () => {},
  setTheme: () => {},
};

const ContextForm = createContext<FormContextType>(defaultValue);

export const useFormContext = () => useContext(ContextForm);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CurrencyPrice[] | null>(defaultValue.data);
  const [error, setError] = useState<boolean>(defaultValue.error);
  const [loading, setLoading] = useState<boolean>(defaultValue.loading);
  const [theme, setTheme] = useState<string>(themes[0]);
  const [rate, setRate] = useState<ExChangeRate | null>(defaultValue.rate);
  const [formInput, setFormInput] = useState<FormInput>(defaultValue.formInput);

  const handleUpdateForm = (key: FormInputKey, value: FormInputValue) => {
    setFormInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRefreshForm = () => {
    if (formInput.toCurrency?.currency && formInput.fromCurrency?.currency === null) return;
    setFormInput(defaultValue.formInput);
    setRate(null);
  };

  const handleSwapInputForm = () => {
    if (formInput.toCurrency?.currency === formInput.fromCurrency?.currency) return;
    setFormInput((prev) => ({
      ...prev,
      fromCurrency: formInput.toCurrency,
      toCurrency: formInput.fromCurrency,
    }));
  };

  return (
    <ContextForm.Provider
      value={{
        rate,
        setRate,
        formInput,
        handleRefreshForm,
        handleUpdateForm,
        handleSwapInputForm,
        theme,
        setTheme,
        data,
        setData,
        error,
        setError,
        loading,
        setLoading,
      }}
    >
      {children}
    </ContextForm.Provider>
  );
};
