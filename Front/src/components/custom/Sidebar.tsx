// src/components/custom/Sidebar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  FileText,
  PlusCircle,
  User,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  FolderPlus,
  ListCollapse,
  LogOut,
} from "lucide-react";

/**
 * Interface para as propriedades do componente Sidebar.
 * @param children - Os elementos React que serão renderizados ao lado da barra lateral.
 */
interface SidebarProps {
  children: React.ReactNode;
}

/**
 * Componente Sidebar
 *
 * Esta barra lateral inclui funcionalidade de recolhimento e abertura
 * para dispositivos móveis, e links de navegação para várias seções da aplicação.
 * O estilo utiliza Tailwind CSS e um gradiente personalizado.
 */
export default function Sidebar({ children }: SidebarProps) {
  // Estado para controlar a abertura/fechamento da barra lateral em telas menores
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Estado para controlar o recolhimento/expansão da barra lateral
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Obtém a localização atual para destacar o link ativo
  const location = useLocation();

  /**
   * Alterna o estado de recolhimento da barra lateral.
   */
  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  /**
   * Manipulador para o botão de logout.
   * Em uma aplicação real, aqui seria implementada a lógica de autenticação.
   */
  const handleLogout = () => {
    console.log("Logout clicado! Implementar a lógica de logout real aqui.");
    // Exemplo: auth.signOut(); navigate('/login');
  };

  // Define os itens de navegação com seus nomes, caminhos, ícones e seções.
  // Apenas os itens solicitados foram mantidos.
  const navItems = [
    { name: "Vendas", path: "/sales", icon: ShoppingCart },
    { name: "Emitir Nota", path: "/invoice", icon: FileText },
    { name: "Criar Produto", path: "/createProduct", icon: PlusCircle },
    { name: "Adicionar Categoria", path: "/createCategory", icon: FolderPlus },
    { name: "Visualizar Produtos", path: "/addproduct", icon: ListCollapse },
    { name: "Perfil", path: "/profile", icon: User },
  ];

  return (
    // Contêiner principal com layout flexível para barra lateral e conteúdo
    <div className="flex min-h-screen w-full" id="main-layout-container">
      {/* Barra lateral principal */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white p-4 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-20" : "w-64" // Controla a largura recolhida/expandida
        } ${
          // Controla a visibilidade em telas menores: oculta por padrão, mostra quando isSidebarOpen é true
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0 z-50`} // MD e acima: static, visível, não encolhe
        style={{
          background: `
            linear-gradient(180deg, #1e3a8a 0%, #4c1d95 100%)
          `,
        }}
        id="sidebar-main-aside"
      >
        {/* Cabeçalho da barra lateral com botão de recolher/expandir */}
        <div className="flex items-center justify-between mb-6">
          {!isSidebarCollapsed && (
            <h1
              className="text-2xl font-bold transition-opacity duration-200"
              id="sidebar-title"
            >
              Menu
            </h1>
          )}
          {/* Botão para recolher/expandir a barra lateral (visível em desktop) */}
          <button
            className={`text-white transition-transform duration-200 ${
              isSidebarCollapsed ? "mx-auto" : ""
            } `}
            onClick={toggleSidebarCollapse}
            id="sidebar-toggle-button"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen size={24} />
            ) : (
              <PanelLeftClose size={24} />
            )}
          </button>
          {/* Botão para fechar a barra lateral em dispositivos móveis (quando isSidebarOpen é true) */}
          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setIsSidebarOpen(false)}
            id="sidebar-close-mobile-button"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navegação da barra lateral */}
        <nav id="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path} className="mb-4">
                <Link
                  to={item.path}
                  // Destaca o link ativo e aplica estilos de hover
                  className={`flex items-center gap-3 p-3 rounded-lg text-white transition-all duration-200
                    ${
                      location.pathname === item.path
                        ? "bg-indigo-700 shadow-md"
                        : "hover:bg-indigo-700"
                    }
                    ${isSidebarCollapsed ? "justify-center" : ""}
                  `}
                  id={`link-${item.name.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => setIsSidebarOpen(false)} // Fecha sidebar móvel ao clicar em um link
                >
                  <item.icon size={20} />
                  {!isSidebarCollapsed && (
                    <span className="whitespace-nowrap">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botão de Logout na parte inferior da barra lateral */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-md text-lg w-full text-left transition-colors duration-200 hover:bg-red-700 bg-red-600 text-white shadow-md"
          >
            <LogOut className="mr-3 w-5 h-5" />
            {!isSidebarCollapsed && (
              <span className="whitespace-nowrap">Sair</span>
            )}
          </button>
        </div>
      </aside>

      {/* Área de conteúdo principal - Ocupa o restante da largura disponível */}
      <div
        className="flex-1 p-4 relative z-10 transition-all duration-300"
        style={{
          backgroundImage: `
            radial-gradient(at 20% 30%, #1e3a8a 0%, transparent 40%),
            radial-gradient(at 80% 20%, #4c1d95 0%, transparent 50%),
            radial-gradient(at 50% 100%,rgb(16, 103, 185) 0%, transparent 70%),
            radial-gradient(at 70% 70%, #1e40af 0%, transparent 40%),
            linear-gradient(135deg, #0f172a 0%, #0c0c1c 100%)
          `,
          backgroundColor: "#0f172a",
          backgroundBlendMode: "screen",
        }}
        id="main-content-area"
      >
        {/* Botão de abrir menu para mobile (fixo, acima do conteúdo principal) */}
        <button
          className="md:hidden fixed top-4 left-4 text-white z-40 bg-gray-800 p-2 rounded-md shadow-lg"
          onClick={() => setIsSidebarOpen(true)}
          id="mobile-menu-button"
        >
          <Menu size={24} />
        </button>

        {/* Overlay para fechar o sidebar em mobile (quando aberto) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            id="mobile-sidebar-overlay"
          ></div>
        )}

        {/* Renderiza o conteúdo passado como children (as Rotas do App.tsx) */}
        {children}
      </div>
    </div>
  );
}
