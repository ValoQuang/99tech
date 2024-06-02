import React, { useEffect, useState } from "react";
import { useFormContext } from "../../AppContextProvider";

const InputButton: React.FC = () => {
  const { setError, setLoading, handleUpdateForm } = useFormContext();
  const [inputValue, setInputValue] = useState("1");

  const handleEnterAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const parsedValue = parseInt(inputValue);
    if (isNaN(parsedValue)) {
      setError(true);
    } else {
      setError(false);
      const debounceInputAmount = setTimeout(
        () => handleUpdateForm("amount", parsedValue),
        300
      );
      return () => {
        clearTimeout(debounceInputAmount);
      };
    }
  }, [inputValue, handleUpdateForm, setLoading]);

  return (
    <div className="flex flex-col w-full">
      <span>Amount</span>
      <input
        type="text"
        placeholder="Enter your amount"
        className="input input-bordered rounded-xl"
        value={inputValue}
        onChange={(e) => handleEnterAmount(e)}
      />
      {isNaN(parseInt(inputValue)) ? (
        <span className="text-red-500 text-xs mt-1">
          Please enter a valid number
        </span>
      ) : null}
    </div>
  );
};

export default InputButton;
