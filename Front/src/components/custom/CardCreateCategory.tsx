import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { motion } from "framer-motion";

export default function CardCreateCategory() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const CreateCategory = async () => {
    if (!formData.name) {
      alert("Preencha o nome da categoria!");
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
    <div
      className="w-full min-h-screen flex items-center justify-center p-4"
      id="create-category-page-container"
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
        id="create-category-motion-container"
      >
        <Card
          className="w-full max-w-md px-10 py-8 border border-white/30 text-white shadow-xl rounded-xl backdrop-blur-sm font-thin"
          id="create-category-card"
          style={{
            backgroundColor: "rgba(20, 30, 80, 0.7)", // Azul escuro transparente
          }}
        >
          <CardHeader id="card-header-create-category">
            <CardTitle
              className="text-3xl font-thin text-center mb-6 text-white"
              id="card-title-new-category"
            >
              Nova Categoria
            </CardTitle>
          </CardHeader>
          <CardContent id="card-content-create-category">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="input-category-name"
                className="text-white/90 font-thin"
              >
                Nome da categoria:
              </label>
              <Input
                type="text"
                name="name"
                id="input-category-name"
                placeholder="Digite o nome"
                value={formData.name}
                onChange={handleChange}
                className="text-black px-4 py-2 rounded-md"
                style={{ height: "38px" }}
                required
              />

              <Button
                onClick={CreateCategory}
                id="button-create-category"
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
                Cadastrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
