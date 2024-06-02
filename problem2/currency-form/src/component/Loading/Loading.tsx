import React, { memo } from "react";

const Loading: React.FC = memo(() => {
  return (
    <div className="w-full flex items-center justify-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
});

export default Loading;
