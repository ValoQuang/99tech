import { ReactNode, memo } from "react";

interface SwitchButton {
  onClick: () => void;
  span?: string;
  icon: ReactNode;
  header?: string | null;
}

const SwitchButton = memo(({ onClick, span, icon, header }: SwitchButton) => {
  return (
    <div className="flex flex-col items-center">
      <span>{span}</span>
      <button className="btn rounded-xl" onClick={onClick}>
        {header ? (
          <>
            {icon} {header}
          </>
        ) : (
          <>{icon}</>
        )}
      </button>
    </div>
  );
});

export default SwitchButton;
