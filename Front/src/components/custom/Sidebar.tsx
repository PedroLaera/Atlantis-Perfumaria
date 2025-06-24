import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen" id="main-layout-container">
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white p-4 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex-shrink-0 z-50`}
        style={{
          background: `
            linear-gradient(180deg, #1e3a8a 0%, #4c1d95 100%)
          `,
        }}
        id="sidebar-container"
      >
        <div className="flex items-center justify-between mb-6">
          {!isSidebarCollapsed && (
            <h1
              className="text-2xl font-bold transition-opacity duration-200"
              id="sidebar-menu-title"
            >
              Menu
            </h1>
          )}
          <button
            className={`text-white transition-transform duration-200 ${
              isSidebarCollapsed ? "mx-auto" : ""
            } ${isSidebarOpen ? "md:hidden" : ""}`}
            onClick={() => {
              if (!isSidebarOpen) {
                toggleSidebarCollapse();
              }
            }}
            id="sidebar-toggle-button"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen size={24} />
            ) : (
              <PanelLeftClose size={24} />
            )}
          </button>
          <button
            className="md:hidden text-white ml-auto"
            onClick={() => setIsSidebarOpen(false)}
            id="sidebar-close-mobile-button"
          >
            <X size={24} />
          </button>
        </div>
        <nav id="sidebar-navigation">
          <ul>
            <li className="mb-4">
              <Link
                to="/sales"
                className={`flex items-center gap-3 p-3 rounded-lg text-white hover:bg-indigo-700 transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center" : ""
                }`}
                id="link-sales"
              >
                <ShoppingCart size={20} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Vendas</span>
                )}
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/invoice"
                className={`flex items-center gap-3 p-3 rounded-lg text-white hover:bg-indigo-700 transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center" : ""
                }`}
                id="link-invoice"
              >
                <FileText size={20} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Emitir Nota</span>
                )}
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/createProduct"
                className={`flex items-center gap-3 p-3 rounded-lg text-white hover:bg-indigo-700 transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center" : ""
                }`}
                id="link-create-product"
              >
                <PlusCircle size={20} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Adicionar Produto</span>
                )}
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/createCategory"
                className={`flex items-center gap-3 p-3 rounded-lg text-white hover:bg-indigo-700 transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center" : ""
                }`}
                id="link-create-category"
              >
                <FolderPlus size={20} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Adicionar Categoria</span>
                )}
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/addproduct"
                className={`flex items-center gap-3 p-3 rounded-lg text-white hover:bg-indigo-700 transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center" : ""
                }`}
                id="link-view-products-categories"
              >
                <ListCollapse size={20} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Visualizar</span>
                )}
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/profile"
                className={`flex items-center gap-3 p-3 rounded-lg text-white hover:bg-indigo-700 transition-all duration-200 ${
                  isSidebarCollapsed ? "justify-center" : ""
                }`}
                id="link-profile"
              >
                <User size={20} />
                {!isSidebarCollapsed && (
                  <span className="whitespace-nowrap">Perfil</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-0 md:ml-64"
        }`}
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
        <button
          className="md:hidden fixed top-4 left-4 text-white z-40 bg-gray-800 p-2 rounded-md shadow-lg"
          onClick={() => setIsSidebarOpen(true)}
          id="mobile-sidebar-open-button"
        >
          <Menu size={24} />
        </button>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            id="mobile-sidebar-overlay"
          ></div>
        )}

        {children}
      </div>
    </div>
  );
}
