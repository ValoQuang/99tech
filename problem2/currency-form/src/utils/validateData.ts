import { CurrencyPrice } from "../AppContextProvider";

// Iterate through the array
// Check if currency already exists in currencyMap
// Check if the date is newer
// If dates are the same, calculate average of prices
// If currency does not exist, add it to the map
// Convert currencyMap object back to array

export const validateCurrencyData = (array: CurrencyPrice[]) => {
  const currencyMap: CurrencyPrice | any = {};

  array.forEach((item) => {
    const { currency, date, price } = item;
    if (currencyMap[currency]) {
      if (new Date(date) > new Date(currencyMap[currency].date)) {
        currencyMap[currency].date = date;
        currencyMap[currency].price = price;
      } else if (new Date(date) === new Date(currencyMap[currency].date)) {
        currencyMap[currency].price = (currencyMap[currency].price + price) / 2;
      }
    } else {
      currencyMap[currency] = { date, price };
    }
  });

  const combinedArray = Object.keys(currencyMap).map((currency) => {
    return {
      currency,
      date: currencyMap[currency].date,
      price: currencyMap[currency].price,
    };
  });

  return combinedArray;
};
