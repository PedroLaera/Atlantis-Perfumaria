import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { toast } from "sonner";

export default function CardRegisterAndress() {
  const [formData, setFormData] = useState({
    ID_address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [addressId, setAddressId] = useState<number | null>(null);

  const navigate = useNavigate();

  const id_user = localStorage.getItem("id_user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddress = async () => {
      if (!id_user || !token) return;

      try {
        const response = await api.get("/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allAddresses = response.data;
        const userAddress = allAddresses.find(
          (addr: any) => addr.id_user === Number(id_user)
        );

        if (userAddress) {
          setFormData({
            ID_address: userAddress.ID_address || "",
            number: userAddress.number || "",
            complement: userAddress.complement || "",
            neighborhood: userAddress.neighborhood || "",
            city: userAddress.city || "",
            state: userAddress.state || "",
            zipCode: userAddress.zipCode || "",
          });
          setAddressId(userAddress.ID_address);
          setIsEditing(true);
        } else {
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Erro ao carregar endereço:", error);
        toast.error("Erro ao carregar endereço.");
      }
    };

    fetchAddress();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id_user || !token) {
      toast.error("Usuário não autenticado.");
      return;
    }

    try {
      if (isEditing && addressId !== null) {
        await api.put(
          `/address/${addressId}`,
          { ...formData, id_user },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Endereço atualizado com sucesso!");
      } else {
        await api.post(
          "/address",
          { ...formData, id_user },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Endereço criado com sucesso!");
      }

      navigate("/profile");
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      toast.error("Erro ao salvar endereço.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10 p-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-light text-blue-600 text-center">
          {isEditing ? "Editar Endereço" : "Cadastrar Endereço"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Identificador do Endereço (ex: Casa, Trabalho)"
            name="ID_address"
            value={formData.ID_address}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Número"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
          <Input
            placeholder="Complemento"
            name="complement"
            value={formData.complement}
            onChange={handleChange}
          />
          <Input
            placeholder="Bairro"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
          />
          <Input
            placeholder="Cidade"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            placeholder="Estado"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <Input
            placeholder="CEP"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
          />
          <div className="text-center mt-4">
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {isEditing ? "Salvar Alterações" : "Salvar Endereço"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
