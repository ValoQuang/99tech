import { ReactNode, memo } from "react";

interface SwitchButton {
  onClick: () => void;
  span?: string;
  icon: ReactNode;
  header?: string | null;
  error?: boolean;
}

const SwitchButton: React.FC<SwitchButton> = memo(
  ({ error, onClick, span, icon, header }: SwitchButton) => {
    return (
      <div className="flex flex-col items-center">
        <span>{span}</span>
        <button disabled={error} className="btn rounded-xl" onClick={onClick}>
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
  }
);

export default SwitchButton;
