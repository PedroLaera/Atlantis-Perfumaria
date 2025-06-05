import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Address {
  ID_address: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  id_user: number;
}

export default function CardAndress() {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveringTrash, setHoveringTrash] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddress = async () => {
      const id_user = localStorage.getItem("id_user");
      const token = localStorage.getItem("token");

      if (!id_user || !token) {
        console.error("Usuário não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allAddresses: Address[] = response.data;
        const userAddress = allAddresses.find(
          (addr) => Number(addr.id_user) === Number(id_user)
        );

        setAddress(userAddress || null);
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, []);

  const handleDeleteAddress = async () => {
    if (!address) return;

    const token = localStorage.getItem("token");
    try {
      await api.delete(`/address/${address.ID_address}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddress(null);
      alert("Endereço excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir endereço:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Carregando endereço...</p>
    );
  }

  return (
    <Card className="mt-5 mx-auto p-0 shadow-lg font-thin relative">
      {address && (
        <div
          className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer"
          onMouseEnter={() => setHoveringTrash(true)}
          onMouseLeave={() => setHoveringTrash(false)}
          onClick={handleDeleteAddress}
        >
          <AnimatePresence>
            {hoveringTrash && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: -5 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-red-600 text-sm"
              >
                Apagar endereço
              </motion.span>
            )}
          </AnimatePresence>
          <Trash2 className="text-red-600 hover:text-red-800 transition duration-200" />
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-2xl text-blue-600 text-center">
          Endereço
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-lg text-zinc-700">
        {address ? (
          <>
            <p>
              <strong>Identificador:</strong> {address.ID_address}
            </p>
            <p>
              <strong>Número:</strong> {address.number}
            </p>
            <p>
              <strong>Complemento:</strong> {address.complement}
            </p>
            <p>
              <strong>Bairro:</strong> {address.neighborhood}
            </p>
            <p>
              <strong>Cidade:</strong> {address.city}
            </p>
            <p>
              <strong>Estado:</strong> {address.state}
            </p>
            <p>
              <strong>CEP:</strong> {address.zipCode}
            </p>
            <div className="text-center mt-4">
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => navigate("/AddAndress")}
              >
                Editar Endereço
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="mb-4">Você ainda não cadastrou um endereço.</p>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => navigate("/AddAndress")}
            >
              Cadastrar Endereço
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
