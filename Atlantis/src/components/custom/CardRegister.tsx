import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CardRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    CPF: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:3000/users", formData);
      setSuccess("Usuário criado com sucesso!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: unknown) {
      let message = "Erro ao criar o usuário.";
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = err.response.data.error;
      }
      setError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto bg-white shadow rounded"
    >
      <h2 className="text-xl mb-4 font-bold">Registrar</h2>

      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="text"
        name="CPF"
        placeholder="CPF"
        value={formData.CPF}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
        required
      />

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Criar Conta
      </button>

      {/* Link para login */}
      <p className="mt-4 text-center text-sm">
        Já tem uma conta?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Faça login
        </span>
      </p>
    </form>
  );
}

export default CardRegister;
