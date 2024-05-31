import React, { ReactNode } from "react";

interface SwitchButton {
  onSwap: () => void;
  header?: string;
  icon: ReactNode;
}

const SwitchButton = React.memo(({ onSwap, header, icon }: SwitchButton) => {
  return (
    <div className="flex flex-col items-center">
      <span>{header}</span>
      <button className="btn rounded-xl" onClick={onSwap}>
        {icon}
      </button>
    </div>
  );
});

export default SwitchButton;
