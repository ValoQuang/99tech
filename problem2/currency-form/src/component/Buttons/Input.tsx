import React from "react";

const InputButton = React.memo(() => {
  return (
    <div className="flex flex-col w-full">
      <span>Amount</span>
      <input
        type="number"
        defaultValue={1}
        placeholder="Enter your amount"
        max={100000}
        className="input input-bordered rounded-xl"
      />
    </div>
  );
});

export default InputButton;