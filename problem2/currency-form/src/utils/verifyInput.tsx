import { FormInput } from "../AppContextProvider";

export const verifyInput = (formInput: FormInput):boolean => {
  return (
    !isNaN(parseInt(formInput.amount as unknown as string)) &&
    formInput.fromCurrency !== null &&
    formInput.toCurrency !== null
  );
};
