import { CurrencyPrice } from "../AppContextProvider";

interface ExchangeRateProps {
  amount: number;
  from: CurrencyPrice;
  to: CurrencyPrice;
}

export const calculateExchangeRate = ({
  amount,
  from,
  to,
}: ExchangeRateProps): number[] => {
  const exchange_rate = from.price / to.price;
  const exchanged_amount = amount * (from.price / to.price);
  return [exchanged_amount, exchange_rate];
};
