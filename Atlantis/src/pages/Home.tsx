import { useEffect, useState } from "react";
import { ProductCard } from "../components/custom/CardProduct";
import Footer from "../components/custom/Footer";
import { api } from "../services/api";
import { Button } from "../components/ui/button";

interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  ID_category?: number;
  category_name?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; // ← Agora com 6 produtos por página

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  // Lógica de Paginação
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-600 via-zinc-700 to-zinc-900 p-4">
      <div>
        <div className="text-center">
          <h1 className="text-4xl font-thin text-gray-100">
            Welcome to Atlantis
          </h1>
          <p className="text-gray-200 mt-2">Explore our product diversity!</p>
        </div>

        <div className="grid text-white! grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 justify-center place-items-center">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id_product}
              id_product={product.id_product}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-8 flex-wrap justify-center text-white">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
