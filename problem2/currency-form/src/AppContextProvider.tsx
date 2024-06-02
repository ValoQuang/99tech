import { createContext, useContext, useState, ReactNode } from "react";
import { themes } from "./mockData";

export interface CurrencyPrice {
  currency: string;
  date: string;
  price: number;
}

export type CurrencyPriceWithoutDate = Omit<CurrencyPrice, "date">;

interface FormContextType {
  data: CurrencyPrice[];
  setData: (data: CurrencyPrice[]) => void;
  error: boolean;
  setError: (error: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fromCurrency: CurrencyPriceWithoutDate | null;
  setFromCurrency: (currency: { currency: string; price: number } | null) => void;
  toCurrency: CurrencyPriceWithoutDate | null;
  setToCurrency: (currency: { currency: string; price: number } | null) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const defaultValue: FormContextType = {
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
  setFromCurrency: () => {},
  toCurrency: null,
  setToCurrency: () => {},
  setData: () => {},
  setError: () => {},
  setLoading: () => {},
  theme: themes[0],
  setTheme: () => {},
};

const TokenFormProvider = createContext<FormContextType>(defaultValue);

export const useFormContext = () => useContext(TokenFormProvider);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(defaultValue.data);
  const [error, setError] = useState(defaultValue.error);
  const [loading, setLoading] = useState(defaultValue.loading);
  const [fromCurrency, setFromCurrency] = useState(defaultValue.fromCurrency);
  const [toCurrency, setToCurrency] = useState(defaultValue.toCurrency);
  const [theme, setTheme] = useState(themes[0]);

  return (
    <TokenFormProvider.Provider
      value={{
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
    </TokenFormProvider.Provider>
  );
};
