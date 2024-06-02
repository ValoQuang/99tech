import React, { ReactNode } from "react";

interface SwitchButton {
  onSwap: () => void;
  span?: string;
  icon: ReactNode;
  header?: string | null;
}

const SwitchButton = React.memo(({ onSwap, span, icon, header }: SwitchButton) => {
  return (
    <div className="flex flex-col items-center">
      <span>{span}</span>
      <button className="btn rounded-xl" onClick={onSwap}>
        {header ? <>{icon} {header}</> : <>{icon}</> }
      </button>
    </div>
  );
});

export default SwitchButton;
