import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CardLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      const { token, id_user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("id_user", id_user);

      navigate("/"); // Redireciona para a homepage
    } catch (err: unknown) {
      let message = "Erro ao fazer login aqui.";
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
      <h2 className="text-xl mb-4 font-bold">Login</h2>

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

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Entrar
      </button>
    </form>
  );
}

export default CardLogin;
