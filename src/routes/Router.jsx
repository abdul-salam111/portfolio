import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "../components/common/loading/Loading";

const Home = lazy(() => import("../pages/Home"));
const Main = lazy(() => import("../layouts/Main"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const Admin = lazy(() => import("../pages/Admin"));

const repoName = import.meta.env.VITE_REPO_NAME || "";

export const router = createBrowserRouter(
  [
    {
      path: `/salam-admin`,
      element: (
        <Suspense fallback={<Loading />}>
          <Admin />
        </Suspense>
      ),
    },
    {
      path: `/`,
      element: (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/project/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <ProjectDetail />
            </Suspense>
          ),
        },
        {
          path: "/blog/:id",
          element: (
            <Suspense fallback={<Loading />}>
              <BlogDetail />
            </Suspense>
          ),
        },
      ],
    },
  ],
  { basename: `/${repoName}` }
);
