import React from "react";
import { LuArrowLeftRight } from "react-icons/lu";

const SwapButton = React.memo(({ onSwap }: any) => {
    return (
      <div className="flex flex-col items-center">
        <span>Swap</span>
        <button className="btn rounded-xl" onClick={onSwap}>
          <LuArrowLeftRight />
        </button>
      </div>
    );
  });

export default SwapButton;