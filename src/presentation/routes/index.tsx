import { createBrowserRouter, Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import Layout from "@/presentation/components/templates/Layout";
import { PATHS } from "@/presentation/constants/routes";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: PATHS.home,
        element: <Navigate to="/character" replace />,
      },
      {
        path: "/character",
        lazy: async () => ({
          Component: (await import("@/presentation/pages/HomePage")).HomePage,
        }),
      },
      {
        path: PATHS.characterDetail,
        lazy: async () => ({
          Component: (await import("@/presentation/pages/HomePage")).HomePage,
        }),
      },
      {
        path: PATHS.notFound,
        lazy: async () => ({
          Component: (await import("@/presentation/pages/NotFoundPage"))
            .NotFoundPage,
        }),
      },
      { path: "*", element: <Navigate to={PATHS.notFound} replace /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default router;
