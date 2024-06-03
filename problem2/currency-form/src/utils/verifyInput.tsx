import { FormInput } from "../AppContextProvider";

export const verifyInput = (formInput: FormInput): boolean => {
  return !isNaN(formInput.amount as number);
};
