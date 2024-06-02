import React, { memo } from "react";

const Footer: React.FC = memo(() => {
  return (
    <div className="w-full flex gap-1 px-8 h-10 max-lg:text-xs justify-between">
      @Quang Truong, 31st - May - 2024 - 99Tech problem 2 assignment
    </div>
  );
});

export default Footer;
