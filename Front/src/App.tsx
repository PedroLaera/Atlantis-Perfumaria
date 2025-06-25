// src/App.tsx
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

// Importa o componente Sidebar que agora encapsula o layout
import Sidebar from "./components/custom/Sidebar.tsx";

// Importa páginas e componentes existentes
import WelcomePage from "./pages/WelcomePage.tsx";
import Login from "./pages/Login.tsx";
import Teste from "./pages/teste.tsx";
import Product from "./pages/Product.tsx";
import ProductPresentation from "./pages/ProductPresentation.tsx";
import Register from "./pages/Register.tsx";
import AddProduct from "./pages/ProductsTable.tsx"; // Assumindo que este é ProductsTable
import CreateProduct from "./pages/CreateProduct.tsx";
import ProfilePage from "./pages/Profile.tsx";
import EditProduct from "./pages/EditProduct.tsx";
import CreateCategory from "./pages/CreateCategory.tsx";
import EditCategory from "./pages/EditCategory.tsx";
import AddAndress from "./pages/AddAndress.tsx";
import Checkout from "./pages/Checkout.tsx";
import SupportPage from "./pages/Suport.tsx";
import CardEditUser from "./pages/EditProfile.tsx";
import ProtectedRoute from "./components/custom/ProtectedRoute.tsx";
import Footer from "./components/custom/Footer.tsx";

// *************************************************************
// Componentes Placeholder para novas rotas do Sidebar
// Por favor, crie esses arquivos em suas respectivas pastas (e.g., src/pages/SalesPage.tsx)
// *************************************************************
const SalesPage = () => (
  <div className="text-white text-3xl p-8">
    Página de Vendas (Em Construção)
  </div>
);
const InvoicePage = () => (
  <div className="text-white text-3xl p-8">
    Página de Emitir Nota (Em Construção)
  </div>
);
// *************************************************************

/**
 * Componente AppRoutes
 *
 * Gerencia a lógica de roteamento para a aplicação.
 * Condicionalmente renderiza a barra lateral e o rodapé com base na rota atual.
 * Rotas como '/', '/login', '/register' são consideradas páginas "sem layout".
 * Todas as outras rotas são envolvidas por um componente de rota protegida e exibidas
 * dentro do layout da barra lateral e rodapé.
 */
function AppRoutes() {
  const location = useLocation();

  // Determina se a página atual deve ocultar o layout principal (barra lateral + rodapé)
  const hideLayout = ["/", "/login", "/register"].includes(location.pathname);

  // Rolagem para o topo na mudança de rota para uma melhor experiência do utilizador
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {/* Rotas que não incluem o layout principal (barra lateral, rodapé) */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {/* Renderização condicional para páginas que incluem o layout principal */}
      {!hideLayout && (
        // O Sidebar agora encapsula o conteúdo principal, passando as rotas e o rodapé como children.
        <Sidebar>
          {/* Este div interna garante que o conteúdo da página cresça e empurre o Footer para o final */}
          <div className="flex flex-col flex-1 min-h-full font-inter">
            {" "}
            {/* Adicionado min-h-full e font-inter aqui */}
            {/* O container para as Rotas ocupa todo o espaço disponível, empurrando o Footer para baixo */}
            <div className="flex-grow">
              <Routes>
                {/* Rotas aninhadas para páginas protegidas e com layout */}
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
                      <Product />{" "}
                      {/* Pode ser ProductDetails ou ProductSingle, dependendo do seu design */}
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
                <Route
                  path="/teste"
                  element={
                    <ProtectedRoute>
                      {" "}
                      {/* Se 'Teste' também precisa de proteção */}
                      <Teste />
                    </ProtectedRoute>
                  }
                />
                {/* Novas rotas para Vendas e Emitir Nota */}
                <Route
                  path="/sales"
                  element={
                    <ProtectedRoute>
                      <SalesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/invoice"
                  element={
                    <ProtectedRoute>
                      <InvoicePage />
                    </ProtectedRoute>
                  }
                />

                {/* Rota de fallback para caminhos não correspondentes dentro do layout protegido */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            {/* Rodapé posicionado na parte inferior da área de conteúdo principal */}
            <Footer />
          </div>
        </Sidebar>
      )}
    </>
  );
}

/**
 * Componente App
 *
 * O componente principal que envolve toda a aplicação dentro do BrowserRouter
 * para ativar o roteamento do lado do cliente.
 */
export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
