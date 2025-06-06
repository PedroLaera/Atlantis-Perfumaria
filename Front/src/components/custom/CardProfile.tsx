import { useEffect, useState } from "react";
import { api } from "../../services/api";

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

        const response = await api.get(
          `http://localhost:3000/users/${id_user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data.user || response.data;

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

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja apagar sua conta? Esta ação é irreversível."
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      const id_user = localStorage.getItem("id_user");

      if (!token || !id_user) {
        alert("Usuário não autenticado.");
        return;
      }

      await api.delete(`http://localhost:3000/users/${id_user}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.clear();
      alert("Conta apagada com sucesso.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Erro ao apagar conta:", error);
      alert("Erro ao apagar conta. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-8 animate-pulse">Carregando perfil...</p>
    );
  }

  if (error === "Usuário não autenticado.") {
    return (
      <div
        className="p-8 max-w-md w-full text-white font-montserrat! rounded-2xl shadow-lg! border border-white border-opacity-30"
        style={{
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-100 mb-2">
            Você não está logado
          </h2>
          <p className="text-gray-300 mb-4">
            Para acessar seu perfil, faça login primeiro.
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-1.5 rounded-full transition-all duration-500 ease-in-out transform active:scale-95"
          >
            Ir para o Login
          </button>
        </div>
      </div>
    );
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
    <div
      className="p-6 max-w-md mx-auto rounded-2xl border border-white shadow-xl animate-fade-in text-white"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex flex-col items-center">
        <img
          src={
            user.profilePicture ||
            "https://randomuser.me/api/portraits/men/75.jpg"
          }
          alt="Foto de Perfil"
          className="w-28 h-28 rounded-full mb-4 object-cover shadow-md ring-2 ring-blue-300"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-gray-300">{user.email}</p>
        <p className="text-gray-400 mt-1">CPF: {user.CPF}</p>
      </div>

      <div className="flex justify-center mt-6 space-x-4 flex-wrap gap-2">
        <button
          onClick={() => (window.location.href = "/edituser")}
          className="bg-blue-900! hover:bg-blue-700! text-white border border-white px-5 py-1.5 rounded-full transition-all duration-500 ease-in-out transform active:scale-95 shadow-md hover:shadow-[0_0_12px_rgba(59,130,246,0.7)]"
        >
          Editar
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-900! hover:bg-red-700! text-white border border-white px-5 py-1.5 rounded-full transition-all duration-500 ease-in-out transform active:scale-95 shadow-md hover:shadow-[0_0_12px_rgba(239,68,68,0.7)]"
        >
          Sair
        </button>

        <button
          onClick={handleDeleteAccount}
          className="bg-gray-700! hover:bg-gray-600! text-white border border-white px-5 py-1.5 rounded-full transition-all duration-500 ease-in-out transform active:scale-95 shadow-md hover:shadow-[0_0_12px_rgba(100,116,139,0.7)]"
        >
          Apagar Conta
        </button>
      </div>
    </div>
  );
}

export default CardProfile;
