import { FC } from "react";
import { ErrorMessageProps } from "./ErrorMessage.types";

export const ErrorMessage: FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="mx-4 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onDismiss} className="font-bold">
          ×
        </button>
      </div>
    </div>
  );
};
