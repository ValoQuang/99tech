import { createContext, useContext, useState, ReactNode } from "react";
import { themes } from "./mockData";

export type CurrencyPrice = {
  currency: string;
  price: number;
  icon: string;
};

export type ExChangeRate = {
  exchange_rate: number;
  base_rate: number;
};

export type FormInput = {
  amount: number | null;
  fromCurrency: CurrencyPrice | null;
  toCurrency: CurrencyPrice | null;
};

type FormInputKey = keyof FormInput;

type FormInputValue = FormInput[FormInputKey];

interface FormContextType {
  data: CurrencyPrice[] | null;
  formInput: FormInput;
  error: boolean;
  theme: string;
  rate: ExChangeRate | null;
  setRate: (amount: { exchange_rate: number; base_rate: number }) => void;
  setData: (data: CurrencyPrice[]) => void;
  setError: (error: boolean) => void;
  handleUpdateForm: (key: FormInputKey, value: FormInputValue) => void;
  handleResetForm: () => void;
  handleSwapInputForm: () => void;
  handleChangeTheme: () => void;
}

export const defaultValue: FormContextType = {
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
  handleResetForm: () => {},
  handleSwapInputForm: () => {},
  setData: () => {},
  setError: () => {},
  handleChangeTheme: () => {},
};

const ContextForm = createContext<FormContextType>(defaultValue);

export const useFormContext = () => useContext(ContextForm);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CurrencyPrice[] | null>(defaultValue.data);
  const [error, setError] = useState<boolean>(defaultValue.error);
  const [theme, setTheme] = useState<string>(themes[0]);
  const [rate, setRate] = useState<ExChangeRate | null>(defaultValue.rate);
  const [formInput, setFormInput] = useState<FormInput>(defaultValue.formInput);

  const handleUpdateForm = (key: FormInputKey, value: FormInputValue) => {
    if (error) return;
    setFormInput((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetForm = () => {
    if (
      formInput.toCurrency?.currency &&
      formInput.fromCurrency?.currency === null
    )
      return;
    setFormInput(defaultValue.formInput);
    setRate(null);
  };

  const handleSwapInputForm = () => {
    if (formInput.toCurrency?.currency === formInput.fromCurrency?.currency)
      return;
    if (error) return;
    setFormInput((prev) => ({
      ...prev,
      fromCurrency: formInput.toCurrency,
      toCurrency: formInput.fromCurrency,
    }));
  };

  const handleChangeTheme = () => {
    const currentThemeIndex = themes.indexOf(theme);
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setTheme(themes[nextThemeIndex]);
  };

  return (
    <ContextForm.Provider
      value={{
        rate,
        formInput,
        theme,
        data,
        error,
        setRate,
        handleResetForm,
        handleUpdateForm,
        handleSwapInputForm,
        handleChangeTheme,
        setData,
        setError,
      }}
    >
      {children}
    </ContextForm.Provider>
  );
};
