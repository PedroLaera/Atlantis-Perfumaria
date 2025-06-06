import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import WelcomePage from "./pages/WelcomePage";
import Login from "./pages/Login";
import Teste from "./pages/teste";
import Product from "./pages/Product";
import ProductPresentation from "./pages/ProductPresentation";
import Register from "./pages/Register";
import AddProduct from "./pages/ProductsTable";
import CreateProduct from "./pages/CreateProduct";
import ProfilePage from "./pages/Profile";
import EditProduct from "./pages/EditProduct";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import AddAndress from "./pages/AddAndress";
import Checkout from "./pages/Checkout";
import SupportPage from "./pages/Suport";
import CardEditUser from "./pages/EditProfile";
import ProtectedRoute from "./components/custom/ProtectedRoute";

import NavBar from "./components/custom/NavBar";
import Footer from "./components/custom/Footer";

function AppRoutes() {
  const location = useLocation();
  const hideNavBar = ["/", "/login", "/register"].includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {!hideNavBar && <NavBar />}
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="/presentation/:id"
          element={
            <ProtectedRoute>
              <ProductPresentation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createProduct"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addproduct"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editProduct/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edituser"
          element={
            <ProtectedRoute>
              <CardEditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addAndress"
          element={
            <ProtectedRoute>
              <AddAndress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createCategory"
          element={
            <ProtectedRoute>
              <CreateCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editCategory/:id"
          element={
            <ProtectedRoute>
              <EditCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportPage />
            </ProtectedRoute>
          }
        />
        <Route path="/teste" element={<Teste />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!hideNavBar && <Footer />}
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
