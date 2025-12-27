import { FC } from "react";
import { RouterProvider as ReactRouterProvider } from "react-router-dom";
import { router } from "@/presentation/routes";

export const RouterProvider: FC = () => {
  return <ReactRouterProvider router={router} />;
};

export default RouterProvider;
