import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";

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

export default function EditAddressCard() {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(true);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Address
  ) => {
    if (address) {
      setAddress({ ...address, [field]: e.target.value });
    }
  };

  const handleSave = async () => {
    if (!address) return;

    const token = localStorage.getItem("token");

    try {
      await api.put(`/address/${address.ID_address}`, address, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Endereço atualizado com sucesso.");
      navigate("/profile"); // ou qualquer rota que desejar
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Carregando endereço...</p>
    );
  }

  if (!address) {
    return (
      <div className="text-center mt-10">
        <p>Você ainda não cadastrou um endereço.</p>
        <Button
          className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => navigate("/AddAndress")}
        >
          Cadastrar Endereço
        </Button>
      </div>
    );
  }

  return (
    <Card className="mt-5 mx-auto shadow-lg p-6 max-w-xl font-thin">
      <CardHeader>
        <CardTitle className="text-2xl text-blue-600 text-center">
          Editar Endereço
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          value={address.number}
          onChange={(e) => handleChange(e, "number")}
          placeholder="Número"
        />
        <Input
          value={address.complement}
          onChange={(e) => handleChange(e, "complement")}
          placeholder="Complemento"
        />
        <Input
          value={address.neighborhood}
          onChange={(e) => handleChange(e, "neighborhood")}
          placeholder="Bairro"
        />
        <Input
          value={address.city}
          onChange={(e) => handleChange(e, "city")}
          placeholder="Cidade"
        />
        <Input
          value={address.state}
          onChange={(e) => handleChange(e, "state")}
          placeholder="Estado"
        />
        <Input
          value={address.zipCode}
          onChange={(e) => handleChange(e, "zipCode")}
          placeholder="CEP"
        />

        <div className="flex justify-between gap-4 mt-6">
          <Button
            className="w-full bg-gray-300 text-black hover:bg-gray-400"
            onClick={() => navigate("/profile")}
          >
            Cancelar
          </Button>
          <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Salvar Alterações
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
