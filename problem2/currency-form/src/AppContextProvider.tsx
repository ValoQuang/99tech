import { createContext, useContext, useState, ReactNode } from "react";
import { themes } from "./mockData";

export interface CurrencyPrice {
  currency: string;
  date: string;
  price: number;
}

export type CurrencyPriceWithoutDate = Omit<CurrencyPrice, "date">;

interface FormContextType {
  amount: number;
  data: CurrencyPrice[];
  error: boolean;
  loading: boolean;
  fromCurrency: CurrencyPriceWithoutDate | null;
  toCurrency: CurrencyPriceWithoutDate | null;
  theme: string;
  setData: (data: CurrencyPrice[]) => void;
  setError: (error: boolean) => void;
  setLoading: (loading: boolean) => void;
  setFromCurrency: (
    currency: { currency: string; price: number } | null
  ) => void;
  setToCurrency: (currency: { currency: string; price: number } | null) => void;
  setAmount: (amount: number) => void;
  setTheme: (theme: string) => void;
}

export const defaultValue: FormContextType = {
  amount: 1,
  loading: false,
  error: false,
  data: [
    {
      currency: "",
      date: "",
      price: 0,
    },
  ],
  fromCurrency: null,
  theme: themes[0],
  toCurrency: null,
  setFromCurrency: () => {},
  setToCurrency: () => {},
  setData: () => {},
  setError: () => {},
  setLoading: () => {},
  setAmount: () => {},
  setTheme: () => {},
};

const ContextForm = createContext<FormContextType>(defaultValue);

export const useFormContext = () => useContext(ContextForm);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<CurrencyPrice[]>(defaultValue.data);
  const [error, setError] = useState<boolean>(defaultValue.error);
  const [loading, setLoading] = useState<boolean>(defaultValue.loading);
  const [fromCurrency, setFromCurrency] = useState<CurrencyPriceWithoutDate | null>(defaultValue.fromCurrency);
  const [toCurrency, setToCurrency] = useState<CurrencyPriceWithoutDate | null>(defaultValue.toCurrency);
  const [theme, setTheme] = useState<string>(themes[0]);
  const [amount, setAmount] = useState<number>(defaultValue.amount);

  return (
    <ContextForm.Provider
      value={{
        amount,
        setAmount,
        theme,
        setTheme,
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
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
