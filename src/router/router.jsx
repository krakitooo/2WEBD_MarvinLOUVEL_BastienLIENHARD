import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AdvancedSearch from "../pages/AdvancedSearch";
import ObjectDetail from "../pages/ObjectDetail";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/advanced-search",
        element: <AdvancedSearch />,
      },
      {
        path: "/object/:objectId",
        element: <ObjectDetail />,
      },
    ],
  },
]);
