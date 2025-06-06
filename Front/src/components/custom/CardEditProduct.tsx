import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { api } from "../../services/api";

interface Category {
  ID_category: number;
  name: string;
}

export default function CardEditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_product: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    ID_category: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) return alert("Usuário não autenticado.");

      try {
        const [prodRes, catRes] = await Promise.all([
          api.get(`http://localhost:3000/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("http://localhost:3000/Category", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const p = prodRes.data;
        setFormData({
          id_product: String(p.id_product),
          name: p.name,
          description: p.description,
          price: String(p.price),
          stock: String(p.stock),
          ID_category: String(p.ID_category),
        });
        setCategories(catRes.data);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const { id_product, name, description, price, stock, ID_category } =
      formData;

    if (
      !id_product ||
      !name ||
      !description ||
      !price ||
      !stock ||
      !ID_category
    ) {
      alert("Preencha todos os campos corretamente!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado.");
      return;
    }

    const payload = {
      id_product: id_product.toString(),
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      ID_category: parseInt(ID_category),
    };

    try {
      const response = await api.put(`/products/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Produto atualizado com sucesso:", response.data);
      alert("Produto atualizado com sucesso!");
      navigate("/addproduct");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as {
          response?: { data?: unknown };
          message?: string;
        };
        console.error(
          "Erro ao atualizar produto:",
          err.response?.data || err.message
        );
        alert(
          "Erro ao atualizar produto:\n" +
            JSON.stringify(err.response?.data || err.message)
        );
      } else {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto:\n" + String(error));
      }
    }
  };

  if (loading) return <p className="text-white">Carregando...</p>;

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-4"
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
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="w-full max-w-4xl p-8 border border-white/30 bg-transparent text-white rounded-xl backdrop-blur-sm font-thin">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              Editar Produto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <label className="text-white/90">Nome:</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-black bg-white rounded-md"
              />

              <label className="text-white/90">Descrição:</label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="text-black bg-white rounded-md"
              />

              <label className="text-white/90">Preço:</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="text-black bg-white rounded-md"
              />

              <label className="text-white/90">Estoque:</label>
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="text-black bg-white rounded-md"
              />

              <label className="text-white/90">Categoria:</label>
              {categories.length === 0 ? (
                <p className="text-red-400">Nenhuma categoria cadastrada!</p>
              ) : (
                <select
                  name="ID_category"
                  value={formData.ID_category}
                  onChange={handleChange}
                  className="text-black bg-white rounded-md px-4 py-2"
                >
                  <option value="">Selecione</option>
                  {categories.map((cat) => (
                    <option key={cat.ID_category} value={cat.ID_category}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}

              <Button
                onClick={handleSave}
                className="mt-4 py-4 text-lg font-semibold rounded-md text-white border-white/50"
                style={{
                  background:
                    "linear-gradient(90deg, #7b3fe4, #3b82f6, #1e40af, #06b6d4)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.6)",
                }}
              >
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
