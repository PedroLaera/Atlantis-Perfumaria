import { useParams } from "react-router-dom";
import products from "../components/data/products";
import ProductCardPage from "../components/custom/CardProduct";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="text-center text-2xl text-red-500">
        Produto não encontrado
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-900 p-4">
      <ProductCardPage
        id_product={product.id}
        name={product.name}
        price={product.price}
      />
    </div>
  );
}
