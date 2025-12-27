import { FC } from "react";
import { ResultCountProps } from "./ResultCount.types";

export const ResultCount: FC<ResultCountProps> = ({ count }) => {
  return (
    <span className="text-sm font-medium text-primary-600">
      {count} Result{count !== 1 ? "s" : ""}
    </span>
  );
};
