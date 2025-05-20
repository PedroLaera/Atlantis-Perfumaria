import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";

export default function RegisterCard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    ID_category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      ID_category: Number(formData.ID_category),
    };

    console.log("Enviando payload:", payload);

    try {
      const response = await api.post("/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Produto cadastrado com sucesso!", response.data);
      navigate("/addproduct");
    } catch (error) {
      const errorMessage =
        (error instanceof Error &&
          (error as { response?: { data?: { error?: string } } })?.response
            ?.data?.error) ||
        "Erro ao cadastrar o produto";
      alert(errorMessage);
      console.error("Preencha com informações válidas:", errorMessage);
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
          <Input
            type="number"
            name="ID_category"
            placeholder="ID da Categoria"
            value={formData.ID_category}
            onChange={handleChange}
            required
          />
          <Button
            onClick={CreateProducts}
            className="w-full bg-white text-white hover:bg-gray-200 "
          >
            Cadastrar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
