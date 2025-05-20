import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";

interface ProductCardProps {
  id_product: number;
  name: string;
  price: number;
}

const imageMap: { [key: number]: string } = {
  1: "img1.jpg",
  2: "img2.jpg",
  3: "img3.webp",
  4: "img4.jpg",
  5: "img5.jpg",
  6: "img6.jpg",
  7: "img7.jpg",
};

export function ProductCard({ id_product, name, price }: ProductCardProps) {
  const imageSrc = `../../assets/${imageMap[id_product] || "img1.jpg"}`;

  return (
    <div className="bg-zinc-600  p-6 rounded-lg transition transform hover:scale-105 text-center w-64">
      <img
        src={imageSrc}
        alt={name}
        className="w-full h-60 object-cover rounded-lg mb-4"
        onError={(e) => {
          e.currentTarget.src = "/assets/img1.jpg";
        }}
      />
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="text-xl text-white mt-2 font-thin">R$ {price}</p>
      <Link
        to={`/presentation/${id_product}`}
        className="mt-4 inline-block px-6 py-3 bg-black text-white! rounded-lg hover:bg-blue-700"
      >
        Ver Detalhes
      </Link>
    </div>
  );
}

export default function ProductCardPage({ id_product }: ProductCardProps) {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product =
    products.find(
      (p) =>
        p.id === Number(paramId) ||
        p.id === id_product ||
        p.id_product === id_product
    ) || null;

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center text-2xl text-red-500">
        Produto não encontrado
      </div>
    );
  }

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = (
    parseFloat(product.price.replace?.("R$ ", "") || product.price) * quantity
  ).toFixed(2);

  return (
    <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg flex flex-col">
      <div className="flex flex-col justify-between w-full">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product?.description}</p>
        <p className="text-xl text-green-600 mt-2">
          Valor Unitário: R$ {product.price}
        </p>

        <div className="flex items-center mt-4">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
          >
            -
          </button>
          <span className="px-4 text-lg">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded"
          >
            +
          </button>
        </div>

        <p className="text-xl font-semibold text-gray-800 mt-4">
          Total: R$ {totalPrice}
        </p>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}
