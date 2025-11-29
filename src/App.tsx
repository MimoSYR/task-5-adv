import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Authorization from "./layout/Authorization";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Dashboard from "./layout/Dashboard";
import AddProductPage from "./Pages/AddProductPage";
import ProductsPage from "./Pages/ProductsPage";
import EditProductPage from "./Pages/EditProductPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ErrorBoundaryPage from "./Pages/ErrorBoundaryPage";
import type { Product } from "./types/interfaces";

const dataLoader = async (): Promise<Product[]> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const response = await fetch(
    "https://dashboard-i552.onrender.com/api/items",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  
  const data = await response.json();
  
  return data;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Authorization />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorBoundaryPage />,
    children: [
      {
        path: "",
        loader: dataLoader,
        element: <ProductsPage />,
      },
      {
        path: "add",
        element: <AddProductPage />,
      },
      {
        path: "edit/:id",
        element: <EditProductPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailsPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
