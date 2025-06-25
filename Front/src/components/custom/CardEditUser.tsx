import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { toast } from "sonner";

export default function CardEditUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ name: string }>({ name: "" });
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; password?: string }>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id_user");

        if (!token || !id_user) {
          navigate("/login");
          return;
        }

        const response = await api.get(`/users/${id_user}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = response.data.user || response.data;
        setFormData({ name: userData.name || "" });
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value);
      setErrors((prev) => ({ ...prev, password: undefined }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const updateUser = async () => {
    const validationErrors: { name?: string; password?: string } = {};

    if (!formData.name.trim() || formData.name.trim().length < 3) {
      validationErrors.name = "O nome deve ter pelo menos 3 caracteres.";
    }

    const specialCharRegex = /[^a-zA-Z0-9]/;
    if (password.trim()) {
      if (password.length < 6 || !specialCharRegex.test(password)) {
        validationErrors.password =
          "A senha deve ter no mínimo 6 caracteres, e pelo menos 1 caractere especial.";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Preencha os campos obrigatórios corretamente.");
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem("token");
      const id_user = localStorage.getItem("id_user");

      if (!token || !id_user) {
        navigate("/login");
        return;
      }

      const payload: { name: string; password?: string } = {
        name: formData.name.trim(),
      };

      if (password.trim()) {
        payload.password = password;
      }

      await api.put(`/users/${id_user}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Perfil atualizado com sucesso!");

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      if (error.response?.data?.error) {
        setErrors({ name: error.response.data.error });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card
      className="p-8 max-w-md w-full text-white font-montserrat rounded-2xl shadow-lg border border-white border-opacity-30"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-3xl font-thin text-white text-center">
          Editar Perfil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Campo Nome */}
          <label className="text-white">Nome:</label>
          <div className="relative">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-white!"
            />
          </div>

          {/* Campo Senha */}
          <label className="text-white">Senha:</label>
          <div className="relative">
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="text-white!"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          {/* Botão */}
          <Button
            id="1"
            onClick={updateUser}
            disabled={isSubmitting}
            className={`bg-blue-600! hover:bg-blue-700 text-white border border-white! px-5 py-1.5 rounded-full transition-all duration-500 ease-in-out transform active:scale-95 shadow-md hover:shadow-[0_0_12px_rgba(59,130,246,0.7)] ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
