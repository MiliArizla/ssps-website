import React from "react";

export interface InfoToolTipProps {
  information: string;
}

export const InfoToolTip: React.FC<
  React.PropsWithChildren<InfoToolTipProps>
> = ({ information, children }) => {
  return (
    <div className="relative w-full">
      <span
        className="info-button absolute -right-2 cursor-pointer"
        title={information}
      >
        i
      </span>
      {children}
    </div>
  );
};
