import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UserData {
  name: string;
  email: string;
  CPF: string;
  profilePicture?: string;
}

export default function ProfileCard() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    CPF: "",
    profilePicture: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [hoveringTrash, setHoveringTrash] = useState(false);

  const navigate = useNavigate();
  const id_user = localStorage.getItem("id_user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      if (!id_user || !token) {
        console.error("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/users/${id_user}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id_user, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id_user");
    navigate("/login");
  };

  const handleSave = async () => {
    try {
      await api.put(`/users/${id_user}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditMode(false);
      setSuccessMessage("Perfil atualizado com sucesso!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`/users/${id_user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao excluir conta:", error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Carregando...</p>;
  }

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-lg font-thin mt-10 relative">
      <div
        className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setHoveringTrash(true)}
        onMouseLeave={() => setHoveringTrash(false)}
        onClick={handleDeleteAccount}
      >
        <AnimatePresence>
          {hoveringTrash && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: -5 }}
              exit={{ opacity: 0, x: 10 }}
              className="text-red-600 text-sm"
            >
              Apagar conta
            </motion.span>
          )}
        </AnimatePresence>
        <Trash2 className="text-red-600 hover:text-red-800 transition duration-200" />
      </div>

      <CardHeader className="flex flex-col items-center gap-4">
        <CardTitle className="text-3xl font-thin text-blue-600 text-center">
          Meu Perfil
        </CardTitle>
        <div className="flex flex-col items-center">
          <img
            src={userData.profilePicture || "https://via.placeholder.com/100"}
            alt="Perfil"
            className="w-24 h-24 rounded-full object-cover"
          />
          {editMode && (
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2"
            />
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4 text-lg text-zinc-700">
        {editMode ? (
          <>
            <Input
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              placeholder="Nome"
            />
            <Input
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Email"
            />
            <Input
              value={userData.CPF}
              onChange={(e) =>
                setUserData({ ...userData, CPF: e.target.value })
              }
              placeholder="CPF"
            />
          </>
        ) : (
          <>
            <p>
              <strong>Nome:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>CPF:</strong> {userData.CPF}
            </p>
          </>
        )}

        <div className="mt-6 flex justify-between gap-4">
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white w-1/2"
          >
            Sair
          </Button>
          <Button
            onClick={() => {
              if (editMode) handleSave();
              else setEditMode(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white w-1/2"
          >
            {editMode ? "Salvar" : "Editar"}
          </Button>
        </div>

        {successMessage && (
          <p className="text-green-600 text-center mt-4">{successMessage}</p>
        )}
      </CardContent>
    </Card>
  );
}
