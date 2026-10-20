import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import { products } from "../data/products";

// Loaders run before the page renders; read their result with useLoaderData()
const productsLoader = () => products;

const productLoader = ({ params }) => {
  const product = products.find((p) => p.id === params.id);
  if (!product) throw new Response("Not found", { status: 404 });
  return product;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home />, loader: productsLoader },
      { path: "product/:id", element: <ProductDetails />, loader: productLoader },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <AuthRoute><Login /></AuthRoute> },
      { path: "register", element: <AuthRoute><Register /></AuthRoute> },
      { path: "forgot-password", element: <AuthRoute><ForgotPassword /></AuthRoute> },
    ],
  },
]);

export default router;
