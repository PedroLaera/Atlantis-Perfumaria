// CardCreateCategory.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";

export default function CardCreateCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const CreateCategory = async () => {
    if (!formData.name || !formData.description) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado. Faça login para cadastrar categorias.");
      return;
    }

    try {
      const response = await api.post("/category", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Categoria cadastrada com sucesso!", response.data);
      navigate("/addproduct");
    } catch (error) {
      const errorMessage =
        (error instanceof Error &&
          (error as { response?: { data?: { error?: string } } })?.response
            ?.data?.error) ||
        "Erro ao cadastrar a categoria";
      alert(errorMessage);
      console.error("Erro ao tentar cadastrar categoria:", errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg font-thin">
      <CardHeader>
        <CardTitle className="text-3xl font-thin text-blue-600 text-center">
          Criar Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <label>Nome da categoria:</label>
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Descrição da categoria:</label>
          <Input
            type="text"
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Button
            onClick={CreateCategory}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Cadastrar Categoria
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
