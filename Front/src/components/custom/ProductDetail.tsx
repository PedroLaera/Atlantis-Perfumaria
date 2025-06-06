import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

interface CommentSectionProps {
  productId: number;
}

interface CommentSectionProps {
  productId: number;
}

export function CommentSection({ productId }: CommentSectionProps) {
  // agora você pode usar productId normalmente
  return (
    <div>
      {/* exemplo de uso */}
      <p>ID do produto: {productId}</p>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/Products/${id}`);
        console.log("Produto encontrado:", response.data);
        setProduct(response.data);
        setError(null);
      } catch (err: unknown) {
        if (
          err &&
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response
        ) {
          console.error("Erro ao buscar produto:", err.response.data);
        } else if (err instanceof Error) {
          console.error("Erro ao buscar produto:", err.message);
        } else {
          console.error("Erro ao buscar produto:", err);
        }
        setError("Produto não encontrado");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div className="text-center text-2xl text-red-500 mt-10">{error}</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-xl text-gray-600 mt-10">
        Carregando produto...
      </div>
    );
  }

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-6 mt-6 rounded-lg shadow-lg flex flex-col md:flex-row">
      <img
        src={`../assets/${product.id_product}.jpg`}
        alt={product.name}
        onError={(e) => (e.currentTarget.src = "/images/products/default.jpg")}
        className="w-60 h-80 object-cover rounded-lg mb-4 md:mb-0 md:mr-8"
      />

      <div className="flex flex-col justify-between w-full md:ml-8">
        <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl text-green-600 mt-2">
          Valor Unitário: R$ {product.price}
        </p>

        <div className="flex items-center mt-4">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            -
          </button>
          <span className="px-4 text-lg">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            +
          </button>
        </div>

        <p className="text-xl font-semibold text-gray-800 mt-4">
          Total: R$ {totalPrice}
        </p>

        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold">Endereço de Entrega</h3>
          <p>Rua Exemplo, 123 - Bairro Centro - Cidade</p>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Confirmar Compra
        </button>

        {product && (
          <div className="mt-10 w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Comentários
            </h3>
            <CommentSection productId={product.id_product} />
          </div>
        )}
      </div>
    </div>
  );
}
