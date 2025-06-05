import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";

interface UserType {
  id_user: string;
  name: string;
  email: string;
  CPF: string;
}

export default function CardEditUser() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ name: string }>({
    name: "",
  });

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id_user");

        if (!token || !id_user) {
          alert("Usuário não autenticado.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `http://localhost:3000/users/${id_user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data.user || response.data;
        setFormData({
          name: userData.name || "",
        });
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        alert("Erro ao carregar dados do usuário.");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      setPassword(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const updateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const id_user = localStorage.getItem("id_user");

      if (!token || !id_user) {
        alert("Usuário não autenticado.");
        navigate("/login");
        return;
      }

      const payload: { name: string; password?: string } = {
        name: formData.name,
      };
      if (password.trim() !== "") {
        payload.password = password;
      }

      await axios.put(`http://localhost:3000/users/${id_user}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Dados atualizados com sucesso!");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar usuário:aaa", error);
      alert("Preencha todos os campos corretamente.");
    }
  };

  return (
    <Card
      className="p-8 max-w-md w-full text-white font-montserrat rounded-2xl shadow-lg border border-white border-opacity-30"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.8)", // slate-900 com transparência
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
          <label className="text-white">Nome:</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label className="text-white">Senha: (Preencha para alterar)</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Deixe em branco para manter a senha"
          />
          <Button
            onClick={updateUser}
            className="bg-blue-600! hover:bg-blue-700 text-white border border-white! px-5 py-1.5 rounded-full transition-all duration-500 ease-in-out transform active:scale-95 shadow-md hover:shadow-[0_0_12px_rgba(59,130,246,0.7)]"
          >
            Salvar Alterações
          </Button>
          {message && (
            <p className="text-green-400 text-center mt-2 font-medium">
              {message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
