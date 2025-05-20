import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/custom/NavBar";
import Home from "./pages/Home";
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

export function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<Product />} />
        <Route path="/presentation/:id" element={<ProductPresentation />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/addAndress" element={<AddAndress />} />
        <Route path="/createCategory" element={<CreateCategory />} />
        <Route path="/editCategory/:id" element={<EditCategory />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
    </Router>
  );
}
