import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./pages/App.jsx";
import Shop from "./pages/Shop.jsx";
import Login from './pages/Login.jsx';
import Cart from './pages/Cart.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Signup from './pages/Signup.jsx';
import AdminLayout from './layouts/AdminLayout.jsx'; //Admin layout
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminProductAdd from './pages/admin/AdminProductAdd.jsx';
import AdminProductEdit from './pages/admin/AdminProductEdit.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import UserLayout from './layouts/UserLayout.jsx'; //User layout
import UserDashboard from './pages/user/UserDashboard.jsx';
import UserOrderHistory from './pages/user/UserOrderHistory.jsx';
import PaymentSuccess from './pages/PaymentSuccess.jsx';
import PublicOnlyRoute from './routes/PublicOnlyRoute.jsx';
import ProtectedRoute from './routes/ProtectedRoutes.jsx';
import { GuestCartProvider } from './context/GuestCartContext.jsx';
import { NewStatusProvider } from "./context/NewOrderStatus.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AdminOrders from './pages/admin/AdminOrders.jsx';

const router = createBrowserRouter([
  {
    path: "",
    element: <App />
  },
  {
    path: "/shop",
    element: <Shop />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/checkout",
    element: <CheckoutPage />
  },
  {
    path: "/productpage/:id",
    element: <ProductPage />
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />
  },
  {
    path: "/login",
    element: 
      <PublicOnlyRoute> 
        <Login />
      </PublicOnlyRoute>
  },
  {
    path: "/signup",
    element: 
      <PublicOnlyRoute> 
        <Signup />
      </PublicOnlyRoute>
  },
  {
    path: "/user",
    element: 
      <ProtectedRoute>
        <UserLayout />
      </ProtectedRoute>,
      children : [
        {
          path: "",
          element: <UserDashboard />
        },        
        {
          path: "order-history",
          element: <UserOrderHistory />
        },
      ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboard />
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "products/add",
        element: <AdminProductAdd />,
      },
      {
        path: "products/edit/:id",
        element: <AdminProductEdit />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
    ]
  }
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GuestCartProvider>
    <NewStatusProvider>
      <RouterProvider router={router} />
    </NewStatusProvider>
    </GuestCartProvider>
  </React.StrictMode>
);