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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrors({
          geral: "Usuário não autenticado. Faça login para continuar.",
        });
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
        setErrors({
          geral: "Erro ao carregar categorias. Tente novamente mais tarde.",
        });
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
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const createProduct = async () => {
    const validationErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) validationErrors.name = "O nome é obrigatório.";
    if (!formData.description.trim())
      validationErrors.description = "A descrição é obrigatória.";
    if (!formData.price.trim())
      validationErrors.price = "O preço é obrigatório.";
    if (!formData.stock.trim())
      validationErrors.stock = "O estoque é obrigatório.";
    if (!formData.ID_category.trim())
      validationErrors.ID_category = "A categoria é obrigatória.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrors({
        geral: "Usuário não autenticado. Faça login para cadastrar produtos.",
      });
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

      navigate("/addproduct");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Erro ao cadastrar o produto.";
      setErrors({ geral: errorMessage });
      console.error("Erro ao cadastrar produto:", errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="2"
    >
      <Card
        className="w-full max-w-4xl px-12! py-12! h-auto p-8 border border-white/30 text-white shadow-x1 rounded-xl backdrop-blur-sm font-thin"
        id="3"
        style={{
          backgroundColor: "rgba(20, 30, 80, 0.7)",
        }}
      >
        <CardHeader id="card-header-create-product">
          <CardTitle
            className="text-3xl font-thin text-center mb-4 text-white"
            id="4"
          >
            Novo Produto
          </CardTitle>
        </CardHeader>
        <CardContent id="5">
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
              id="6"
              value={formData.name}
              onChange={handleChange}
              className="text-black px-12 py-4 bg-white rounded-md"
              style={{ height: "38px" }}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <label
              htmlFor="input-product-description"
              className="text-white/90 font-thin"
            >
              Descrição:
            </label>
            <Input
              type="text"
              name="description"
              id="7"
              value={formData.description}
              onChange={handleChange}
              className="text-black px-12 py-4 bg-white rounded-md"
              style={{ height: "38px" }}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}

            <label
              htmlFor="input-product-price"
              className="text-white/90 font-thin"
            >
              Preço:
            </label>
            <Input
              type="number"
              name="price"
              id="8"
              value={formData.price}
              onChange={handleChange}
              className="text-black px-12 py-4 bg-white rounded-md"
              style={{ height: "38px" }}
              min="0"
              step="0.01"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}

            <label
              htmlFor="input-product-stock"
              className="text-white/90 font-thin"
            >
              Quantidade no estoque:
            </label>
            <Input
              type="number"
              name="stock"
              id="9"
              value={formData.stock}
              onChange={handleChange}
              className="text-black px-12 py-4 bg-white rounded-md"
              style={{ height: "38px" }}
              min="0"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock}</p>
            )}

            <label
              htmlFor="select-product-category"
              className="text-white/90 font-thin"
            >
              Escolha a categoria:
            </label>
            {loadingCategories ? (
              <p className="text-white font-thin" id="10">
                Carregando categorias...
              </p>
            ) : categories.length === 0 ? (
              <p className="text-red-400 font-thin" id="11">
                Nenhuma categoria cadastrada. Cadastre uma categoria antes.
              </p>
            ) : (
              <select
                name="ID_category"
                id="12"
                value={formData.ID_category}
                onChange={handleChange}
                required
                className="text-black bg-white px-4 py-2 rounded-md"
                style={{ height: "38px" }}
              >
                <option value="" disabled>
                  Selecione a categoria
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
            {errors.ID_category && (
              <p className="text-red-500 text-sm">{errors.ID_category}</p>
            )}

            {errors.geral && (
              <p className="text-red-500 text-sm mt-2">{errors.geral}</p>
            )}

            <Button
              onClick={createProduct}
              id="13"
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
  );
}
