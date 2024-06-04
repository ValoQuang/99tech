import React, { useEffect, useState } from "react";
import { useFormContext } from "../../AppContextProvider";
import { verifyInput } from "../../utils/verifyInput";

const InputButton: React.FC = () => {
  const { formInput, error, setError, handleUpdateForm } = useFormContext();
  const [inputValue, setInputValue] = useState("1");

  const handleEnterAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const parsedValue = parseInt(inputValue);
    if (
      verifyInput({
        ...formInput,
        amount: parsedValue,
      })
    ) {
      setError(false);
      const debounceInputAmount = setTimeout(
        () => handleUpdateForm("amount", parsedValue),
        500
      );
      return () => {
        clearTimeout(debounceInputAmount);
      };
    } else {
      setError(true);
    }
  }, [inputValue, setError]);

  return (
    <div className="flex flex-col h-20 w-full">
      <span>Amount</span>
      <input
        type="text"
        placeholder="Enter your amount"
        className="input input-bordered rounded-xl"
        value={inputValue}
        onChange={(e) => handleEnterAmount(e)}
      />
      {error ? (
        <span className="text-red-500 text-xs mt-1">
          Please enter a valid number
        </span>
      ) : null}
    </div>
  );
};

export default InputButton;
