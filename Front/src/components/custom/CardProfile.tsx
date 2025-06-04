import { useEffect, useState } from "react";
import axios from "axios";

interface UserType {
  id_user: string;
  name: string;
  email: string;
  CPF: string;
  profilePicture?: string;
}

function CardProfile() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id_user");

        if (!token || !id_user) {
          setError("Usuário não autenticado.");
          setLoading(false);
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

        console.log("Resposta do backend:", response.data);

        const userData = response.data.user || response.data;

        // Verifica se os dados possuem os campos esperados
        if (
          userData &&
          userData.name &&
          userData.email &&
          userData.CPF &&
          userData.id_user
        ) {
          setUser(userData);
        } else {
          setError("Dados do usuário inválidos.");
        }
      } catch (err) {
        setError("Em manutenção.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Carregando perfil...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">{error}</p>;
  }

  if (!user) {
    return (
      <p className="text-center mt-8 text-gray-500">Usuário não encontrado.</p>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <img
        src={user.profilePicture ? user.profilePicture : "/default-avatar.png"}
        alt="Foto de Perfil"
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-xl font-bold text-center">{user.name}</h2>
      <p className="text-center text-gray-600">{user.email}</p>
      <p className="text-center text-gray-500 mt-2">CPF: {user.CPF}</p>

      <div className="flex justify-center mt-4 space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Editar
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default CardProfile;
