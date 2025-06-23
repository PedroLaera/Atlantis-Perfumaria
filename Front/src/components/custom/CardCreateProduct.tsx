import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { motion } from "framer-motion";

interface Category {
  ID_category: number;
  name: string;
}

export default function CardCreateProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    ID_category: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Usuário não autenticado. Faça login para continuar.");
        setLoadingCategories(false);
        return;
      }

      try {
        const response = await api.get("/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        alert("Erro ao carregar categorias. Tente novamente mais tarde.");
        console.error("Erro ao carregar categorias", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createProduct = async () => {
    if (
      !formData.name ||
      !formData.price ||
      !formData.description ||
      !formData.stock ||
      !formData.ID_category
    ) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado. Faça login para cadastrar produtos.");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      ID_category: Number(formData.ID_category),
    };

    try {
      await api.post("/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Produto cadastrado com sucesso!");
      navigate("/addproduct");
    } catch (error) {
      const errorMessage =
        (error instanceof Error &&
          (error as { response?: { data?: { error?: string } } })?.response
            ?.data?.error) ||
        "Erro ao cadastrar o produto";
      alert(errorMessage);
      console.error("Erro ao cadastrar produto:", errorMessage);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-4"
      id="create-product-page-container"
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
        id="create-product-motion-container"
      >
        <Card
          className="w-full max-w-4xl px-12! py-12! h-auto p-8 border border-white/30 text-white shadow-x1 rounded-xl backdrop-blur-sm font-thin"
          id="create-product-card"
          style={{
            backgroundColor: "rgba(20, 30, 80, 0.7)", // Azul escuro transparente
          }}
        >
          <CardHeader id="card-header-create-product">
            <CardTitle
              className="text-3xl font-thin text-center mb-4 text-white"
              id="card-title-new-product"
            >
              Novo Produto
            </CardTitle>
          </CardHeader>
          <CardContent id="card-content-create-product">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="input-product-name"
                className="text-white/90 font-thin"
              >
                Digite o nome do produto:
              </label>
              <Input
                type="text"
                name="name"
                id="input-product-name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite o nome"
                className="text-black px-12 py-4 bg-white rounded-md"
                style={{ height: "38px" }}
              />

              <label
                htmlFor="input-product-description"
                className="text-white/90 font-thin"
              >
                Descrição:
              </label>
              <Input
                type="text"
                name="description"
                id="input-product-description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Digite a descrição"
                className="text-black px-12 py-4 bg-white rounded-md"
                style={{ height: "38px" }}
              />

              <label
                htmlFor="input-product-price"
                className="text-white/90 font-thin"
              >
                Preço:
              </label>
              <Input
                type="number"
                name="price"
                id="input-product-price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Digite o preço"
                className="text-black px-12 py-4 bg-white rounded-md"
                style={{ height: "38px" }}
                min="0"
                step="0.01"
              />

              <label
                htmlFor="input-product-stock"
                className="text-white/90 font-thin"
              >
                Quantidade no estoque:
              </label>
              <Input
                type="number"
                name="stock"
                id="input-product-stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Digite a quantidade em estoque"
                className="text-black px-12 py-4 bg-white rounded-md"
                style={{ height: "38px" }}
                min="0"
              />

              <label
                htmlFor="select-product-category"
                className="text-white/90 font-thin"
              >
                Escolha a categoria:
              </label>
              {loadingCategories ? (
                <p
                  className="text-white font-thin"
                  id="loading-categories-message"
                >
                  Carregando categorias...
                </p>
              ) : categories.length === 0 ? (
                <p
                  className="text-red-400 font-thin"
                  id="no-categories-message"
                >
                  Nenhuma categoria cadastrada. Cadastre uma categoria antes.
                </p>
              ) : (
                <select
                  name="ID_category"
                  id="select-product-category"
                  value={formData.ID_category}
                  onChange={handleChange}
                  required
                  className="text-black bg-white px-4 py-2 rounded-md"
                  style={{ height: "38px" }}
                >
                  <option value="" disabled>
                    Seleccione a categoria
                  </option>
                  {categories.map((cat) => (
                    <option
                      key={cat.ID_category}
                      value={cat.ID_category}
                      id={`option-category-${cat.ID_category}`}
                    >
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}

              <Button
                onClick={createProduct}
                id="button-create-product"
                className="mt-2 w-full py-4 text-lg font-semibold rounded-md text-white border-white/50! transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(90deg, #7b3fe4, #3b82f6, #1e40af, #06b6d4)",
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.6)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.filter =
                    "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.filter = "none";
                }}
              >
                Criar Produto
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
