import {
  Navigate,
  Link,
  RouteObject,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import { ComponentType, lazy } from "react";
import App from "../App";

const pageTsx = import.meta.glob("../views/**");

const routesConfig = [
  {
    path: "/mi",
    name: "浅色落框",
  },
  {
    path: "/si",
    name: "巳巳落框",
  },
  {
    path: "/frame",
    name: "极简单一",
  },
  {
    path: "/jamb",
    name: "边框简字",
  },
  {
    path: "/flag",
    name: "边框标志",
  },
  {
    path: "/gins",
    name: "边框简参",
  },
  {
    path: "/centre",
    name: "中心拍摄",
  },
  {
    path: "/morn",
    name: "杨晨风格",
  },
  {
    path: "/xmage",
    name: "浅色扇坠",
  },
  {
    path: "/loong",
    name: "游龙落框",
  },
];

const routesItems = Object.entries(pageTsx).map(([path]) => {
  const key = path.replace("../views", "").replace(".tsx", "").toLowerCase();
  const name = routesConfig.find((i) => i.path === key)?.name || "敬请期待";
  return {
    key,
    name,
    label: (
      <Link to={key} replace>
        {name}
      </Link>
    ),
  };
});

const subRoutes: RouteObject[] = Object.entries(pageTsx).map(([path, tsx]) => {
  const url = path.replace("../views/", "").replace(".tsx", "").toLowerCase();
  const El = lazy(
    tsx as () => Promise<{
      default: ComponentType;
    }>
  );
  return {
    path: url,
    element: <El />,
  };
});

const createRouter =
  import.meta.env.MODE == "app" ? createHashRouter : createBrowserRouter;
const router = createRouter([
  {
    path: "/",
    element: <Navigate to="mi" replace />,
  },
  {
    path: "/",
    element: <App />,
    children: subRoutes,
  },
]);

export { router, routesItems, routesConfig };
