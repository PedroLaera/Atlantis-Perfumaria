// src/components/ProductList.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";
import { Package, LayoutList } from "lucide-react"; // Mantenha apenas os ícones necessários para as abas

interface Product {
  id_product: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  ID_category?: number;
}

interface Category {
  ID_category: number;
  name: string;
}

export default function ProductList() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<"products" | "categories">(
    "products"
  );

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProductList(response.data);
    } catch {
      console.error("Erro ao carregar produtos");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/category");
      setCategoryList(response.data);
    } catch {
      console.error("Erro ao carregar categorias");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setProductList((prev) =>
        prev.filter((product) => product.id_product !== id)
      );
    } catch {
      alert("Produto não excluído!");
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await api.delete(`/category/${id}`);
      setCategoryList((prev) =>
        prev.filter((category) => category.ID_category !== id)
      );
    } catch {
      alert("Categoria não excluída!");
    }
  };

  const getCategoryName = (categoryId?: number) => {
    const category = categoryList.find((cat) => cat.ID_category === categoryId);
    return category
      ? `${category.ID_category} - ${category.name} `
      : "Sem categoria";
  };

  return (
    <div className="w-full text-white">
      {" "}
      {/* Remove o background e ajuste para ocupar largura total */}
      {/* Abas de Produtos/Categorias - Mantidas aqui */}
      <div className="flex justify-center mb-6">
        <div className="flex justify-center">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-6 py-2 rounded-l-md transition-all duration-200 border border-white ${
              activeTab === "products"
                ? "bg-blue-800 text-white shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-blue-700"
            }`}
          >
            <Package size={18} />
            Produtos
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center gap-2 px-6 py-2 rounded-r-md transition-all duration-200 border border-white ${
              activeTab === "categories"
                ? "bg-blue-800 text-white shadow-md"
                : "bg-gray-800 text-gray-300 hover:bg-purple-700"
            }`}
          >
            <LayoutList size={18} />
            Categorias
          </button>
        </div>
      </div>
      {/* Conteúdo da Tab de Produtos */}
      {activeTab === "products" && (
        <div className="bg-blue-900/80 border border-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold text-white">
              Produtos Cadastrados
            </h2>
            <Link
              to="/createProduct"
              className="px-4 py-1 border border-white rounded-full bg-white text-blue-900 hover:shadow-lg hover:shadow-white transition"
            >
              Adicionar Novo Produto
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded text-black text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Nome</th>
                  <th className="py-2 px-4 text-left">Preço</th>
                  <th className="py-2 px-4 text-left">Descrição</th>
                  <th className="py-2 px-4 text-left">Categoria</th>
                  <th className="py-2 px-4 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => (
                  <tr key={product.id_product} className="border-b">
                    <td className="py-2 px-4">{product.id_product}</td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">R$ {product.price}</td>
                    <td className="py-2 px-4">{product.description}</td>
                    <td className="py-2 px-4">
                      {getCategoryName(product.ID_category)}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => deleteProduct(product.id_product)}
                          className="bg-red-600 text-white px-4 h-8 rounded-full flex items-center justify-center hover:bg-red-700"
                        >
                          Excluir
                        </button>
                        <Link
                          to={`/editProduct/${product.id_product}`}
                          className="bg-blue-600 text-white px-4 h-8 rounded-full flex items-center justify-center hover:bg-blue-400"
                        >
                          Editar
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Conteúdo da Tab de Categorias */}
      {activeTab === "categories" && (
        <div className="bg-blue-900/80 border border-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold text-white">
              Categorias Cadastradas
            </h2>
            <Link
              to="/createCategory"
              className="px-4 py-1 border border-white rounded-full bg-white text-blue-900 hover:shadow-lg hover:shadow-white transition"
            >
              Adicionar Nova Categoria
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded text-black text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Nome</th>
                  <th className="py-2 px-4 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((category) => (
                  <tr key={category.ID_category} className="border-b">
                    <td className="py-2 px-4">{category.ID_category}</td>
                    <td className="py-2 px-4">{category.name}</td>
                    <td className="py-2 px-4">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => deleteCategory(category.ID_category)}
                          className="bg-red-600 text-white px-4 h-8 rounded-full flex items-center justify-center hover:bg-red-700"
                        >
                          Excluir
                        </button>
                        <Link
                          to={`/editCategory/${category.ID_category}`}
                          className="bg-blue-600 text-white px-4 h-8 rounded-full flex items-center justify-center hover:bg-blue-400"
                        >
                          Editar
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
