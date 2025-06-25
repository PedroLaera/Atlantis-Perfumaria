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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrors({ geral: "Usuário não autenticado." });
        return;
      }

      try {
        const [prodRes, catRes] = await Promise.all([
          api.get(`/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/category", {
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
        setErrors({ geral: "Erro ao carregar dados." });
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
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSave = async () => {
    const { id_product, name, description, price, stock, ID_category } =
      formData;

    const validationErrors: { [key: string]: string } = {};

    if (!id_product)
      validationErrors.id_product = "ID do produto é obrigatório.";
    if (!name.trim()) validationErrors.name = "O nome é obrigatório.";
    if (!description.trim())
      validationErrors.description = "A descrição é obrigatória.";
    if (!price.trim()) validationErrors.price = "O preço é obrigatório.";
    if (!stock.trim()) validationErrors.stock = "O estoque é obrigatório.";
    if (!ID_category.trim())
      validationErrors.ID_category = "A categoria é obrigatória.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrors({ geral: "Usuário não autenticado." });
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
      navigate("/addproduct");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Erro ao atualizar produto.";
      setErrors({ geral: errorMessage });
      console.error("Erro ao atualizar produto:", errorMessage);
    }
  };

  if (loading)
    return (
      <p className="text-white" id="loading-message-edit-product">
        Carregando...
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="2"
    >
      <Card
        className="w-full max-w-4xl p-8 border border-white/30 text-white rounded-xl backdrop-blur-sm font-thin"
        id="3"
        style={{
          backgroundColor: "rgba(20, 30, 80, 0.7)",
        }}
      >
        <CardHeader id="card-header-edit-product">
          <CardTitle className="text-3xl text-center" id="4">
            Editar Produto
          </CardTitle>
        </CardHeader>
        <CardContent id="card-content-edit-product">
          <div className="flex flex-col gap-4">
            <label htmlFor="input-edit-product-name" className="text-white/90">
              Nome:
            </label>
            <Input
              name="name"
              id="5"
              value={formData.name}
              onChange={handleChange}
              className="text-black bg-white rounded-md"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}

            <label
              htmlFor="input-edit-product-description"
              className="text-white/90"
            >
              Descrição:
            </label>
            <Input
              name="description"
              id="6"
              value={formData.description}
              onChange={handleChange}
              className="text-black bg-white rounded-md"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}

            <label htmlFor="input-edit-product-price" className="text-white/90">
              Preço:
            </label>
            <Input
              type="number"
              name="price"
              id="7"
              value={formData.price}
              onChange={handleChange}
              className="text-black bg-white rounded-md"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}

            <label htmlFor="input-edit-product-stock" className="text-white/90">
              Estoque:
            </label>
            <Input
              type="number"
              name="stock"
              id="8"
              value={formData.stock}
              onChange={handleChange}
              className="text-black bg-white rounded-md"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock}</p>
            )}

            <label
              htmlFor="select-edit-product-category"
              className="text-white/90"
            >
              Categoria:
            </label>
            {categories.length === 0 ? (
              <p className="text-red-400" id="9">
                Nenhuma categoria cadastrada!
              </p>
            ) : (
              <select
                name="ID_category"
                id="10"
                value={formData.ID_category}
                onChange={handleChange}
                className="text-black bg-white rounded-md px-4 py-2"
              >
                <option value="" id="option-select-category-default">
                  Selecione
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat.ID_category}
                    value={cat.ID_category}
                    id={`option-edit-category-${cat.ID_category}`}
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
              onClick={handleSave}
              id="11"
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
  );
}
