// components/custom/CardEditCategory.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";

export default function CardEditCategory() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado.");
          return;
        }

        const response = await api.get(`/category/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData(response.data);
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        alert("Erro ao carregar categoria.");
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateCategory = async () => {
    if (!formData.name || !formData.description) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      const response = await api.put(`/category/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Categoria atualizada com sucesso!", response.data);
      navigate("/addproduct");
    } catch (error) {
      const errorMessage =
        (error instanceof Error &&
          (error as { response?: { data?: { error?: string } } })?.response
            ?.data?.error) ||
        "Erro ao atualizar a categoria";
      alert(errorMessage);
      console.error("Erro ao tentar atualizar categoria:", errorMessage);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg font-thin bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-900 p-4">
      <CardHeader>
        <CardTitle className="text-3xl font-thin text-blue-600 text-center">
          Editar Categoria
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
            onClick={updateCategory}
            className="w-full bg-white text-black hover:bg-gray-200"
          >
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
