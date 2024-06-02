import React, { ChangeEvent } from "react";
import { useFormContext } from "../../AppContextProvider";

const InputButton: React.FC = () => {
  const { amount, setAmount } = useFormContext();

  const handleEnterAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAmount(parseFloat(event.target.value));
  };

  return (
    <div className="flex flex-col w-full">
      <span>Amount</span>
      <input
        type="number"
        placeholder="Enter your amount"
        min={0}
        max={10000}
        className="input input-bordered rounded-xl"
        value={amount}
        onChange={(e) => handleEnterAmount(e)}
      />
      {Number.isNaN(amount) ? (
        <span className="text-red-500 text-xs">Please enter a valid number</span>
      ) : null}
    </div>
  );
};

export default InputButton;
