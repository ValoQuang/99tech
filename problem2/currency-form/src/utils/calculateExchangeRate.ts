import { CurrencyPriceWithoutDate } from "../AppContextProvider";

export const calculateExchangeRate = (prop: {amount: number, from: CurrencyPriceWithoutDate, to: CurrencyPriceWithoutDate}) => {
    const {amount, from, to} = prop;
    const exchange_rate =  from.price / to.price;
    const exchanged_amount = amount *  exchange_rate;

    return [exchanged_amount, exchange_rate];
}