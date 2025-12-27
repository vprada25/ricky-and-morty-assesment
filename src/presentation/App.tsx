import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@infrastructure/index";
import RouterProvider from "./providers/RouterProvider";

export const App: FC = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <RouterProvider />
    </ApolloProvider>
  );
};
