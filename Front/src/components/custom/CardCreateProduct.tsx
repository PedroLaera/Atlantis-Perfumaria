import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";

interface Category {
  ID_category: number;
  name: string;
}

export default function RegisterCard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    ID_category: "", // guardará o ID da categoria selecionada
  });

  const [categories, setCategories] = useState<Category[]>([]);

  // Buscar categorias do backend ao montar o componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Erro ao carregar categorias", error);
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

  const CreateProducts = async () => {
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
      ID_category: Number(formData.ID_category), // enviar só o ID numérico
    };

    try {
      const response = await api.post("/products", payload, {
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
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg font-thin">
      <CardHeader>
        <CardTitle className="text-3xl font-thin text-blue-600 text-center">
          Criar Produto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <label>Digite o nome do produto:</label>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Como pode descrevê-lo:</label>
          <Input
            type="text"
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <label>Digite o preço:</label>
          <Input
            type="number"
            name="price"
            placeholder="Preço"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <label>Quantidade no estoque:</label>
          <Input
            type="number"
            name="stock"
            placeholder="Quantidade em estoque"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          <label>Escolha a categoria:</label>
          <select
            name="ID_category"
            value={formData.ID_category}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1"
          >
            <option value="" disabled>
              Selecione a categoria
            </option>
            {categories.map((cat) => (
              <option key={cat.ID_category} value={cat.ID_category}>
                {cat.ID_category} - {cat.name}
              </option>
            ))}
          </select>

          <Button
            onClick={CreateProducts}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Cadastrar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
