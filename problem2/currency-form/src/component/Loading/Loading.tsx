import React from "react";

const Loading = React.memo(() => {
  return (
    <div className="w-full flex items-center justify-center">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
});

export default Loading;
