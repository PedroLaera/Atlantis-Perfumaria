import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { motion } from "framer-motion";

export default function CardEditCategory() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({ name: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Usuário não autenticado.");
        return;
      }

      try {
        const response = await api.get(`/category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFormData({ name: response.data.name });
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
        setError("Erro ao carregar categoria.");
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ name: e.target.value });
    setError(""); // limpa erro ao digitar
  };

  const updateCategory = async () => {
    if (!formData.name || formData.name.trim() === "") {
      setError("Digite um nome de categoria válido!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Usuário não autenticado.");
      return;
    }

    try {
      await api.put(
        `/category/${id}`,
        { name: formData.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/addproduct");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error || "Erro ao atualizar a categoria";
      setError(errorMessage);
      console.error("Erro ao tentar atualizar categoria:", errorMessage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="edit-category-motion-container"
    >
      <Card
        className="w-full max-w-md px-10 py-8 border border-white/30 text-white shadow-xl rounded-xl backdrop-blur-sm font-thin"
        id="edit-category-card"
        style={{
          backgroundColor: "rgba(20, 30, 80, 0.7)", // Azul escuro transparente
        }}
      >
        <CardHeader id="card-header-edit-category">
          <CardTitle
            className="text-3xl font-thin text-center mb-6 text-white"
            id="1"
          >
            Editar Categoria
          </CardTitle>
        </CardHeader>
        <CardContent id="card-content-edit-category">
          <div className="flex flex-col gap-4">
            <label htmlFor="category-name" className="text-white/90 font-thin">
              Nome da categoria:
            </label>
            <Input
              type="text"
              name="name"
              id="category-name"
              placeholder="Digite o nome"
              value={formData.name}
              onChange={handleChange}
              className="text-black px-4 py-2 rounded-md"
              style={{ height: "38px" }}
              required
            />
            {error && (
              <p className="text-red-500 text-sm mt-1" id="error-edit-category">
                {error}
              </p>
            )}

            <Button
              onClick={updateCategory}
              id="2"
              className="mt-4 w-full py-3 text-lg font-semibold rounded-md text-white border-white/50! transition-all duration-200"
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
              Salvar Alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
