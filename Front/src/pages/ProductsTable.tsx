// ProductList.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

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

  const deleteProduct = async (id: number, name: string) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir o produto ${name}?`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setProductList((prev) =>
        prev.filter((product) => product.id_product !== id)
      );
    } catch {
      alert("Erro ao tentar excluir produto");
    }
  };

  const deleteCategory = async (id: number, name: string) => {
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir a categoria ${name}? Todos os produtos associados a esta categoria também serão excluídos.`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/category/${id}`);
      setCategoryList((prev) =>
        prev.filter((category) => category.ID_category !== id)
      );
    } catch {
      alert("Erro ao tentar excluir categoria");
    }
  };

  const getCategoryName = (categoryId?: number) => {
    const category = categoryList.find((cat) => cat.ID_category === categoryId);
    return category
      ? `${category.ID_category} - ${category.name} `
      : "Sem categoria";
  };

  return (
    <div className="w-full min-h-screen p-4  bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-900 p-4 text-gray-800">
      {/* Produtos */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-xl font-semibold text-gray-300">
          Produtos Cadastrados
        </h1>
        <div className="flex gap-3 flex-wrap">
          <Link
            to="/createProduct"
            className="px-4 py-1 border border-none text-white! rounded hover:shadow-white transition"
          >
            Adicionar Novo Produto
          </Link>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white rounded shadow text-black text-sm">
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
                      onClick={() =>
                        deleteProduct(product.id_product, product.name)
                      }
                      className="bg-red-600! px-3 py-1 rounded text-white! hover:bg-red-600"
                    >
                      Excluir
                    </button>
                    <Link
                      to={`/editProduct/${product.id_product}`}
                      className="bg-blue-600 px-3 py-1 rounded text-white! hover:bg-blue-400"
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

      {/* Categorias */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold text-gray-300">
            Categorias Cadastradas
          </h2>
          <Link
            to="/createCategory"
            className="px-4 py-1 border border-none text-white! rounded hover:shadow-white transition"
          >
            Adicionar Categoria
          </Link>
        </div>

        {/* Tabela de Categorias */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-black text-sm">
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
                        onClick={() =>
                          deleteCategory(category.ID_category, category.name)
                        }
                        className="bg-red-600! px-3 py-1 rounded text-white! hover:bg-red-600"
                      >
                        Excluir
                      </button>
                      <Link
                        to={`/editCategory/${category.ID_category}`}
                        className="bg-blue-600 px-3 py-1 rounded text-white! hover:bg-blue-400"
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
    </div>
  );
}
