import { FC } from "react";

export const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-primary"></div>
    </div>
  );
};
