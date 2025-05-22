import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <motion.form
      onSubmit={handleSubmit}
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-8 max-w-md w-full text-white font-montserrat rounded-2xl shadow-lg border border-white border-opacity-30"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.8)", // slate-900 com opacidade
        backdropFilter: "blur(8px)",
      }}
    >
      <h2 className="text-2xl font-light mb-6 text-center text-slate-100">
        Crie sua conta
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        className="bg-slate-800 border border-slate-600 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-4 py-2 w-full mb-4"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        className="bg-slate-800 border border-slate-600 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded px-4 py-2 w-full mb-4"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        className="bg-slate-800 border border-slate-600 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-700 rounded px-4 py-2 w-full mb-4"
        required
      />

      <input
        type="text"
        name="CPF"
        placeholder="CPF"
        value={formData.CPF}
        onChange={handleChange}
        className="bg-slate-800 border border-slate-600 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-700 rounded px-4 py-2 w-full mb-4"
        required
      />

      {error && (
        <p className="text-red-400 mb-4 text-sm text-center">{error}</p>
      )}
      {success && (
        <p className="text-green-400 mb-4 text-sm text-center">{success}</p>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-700 via-purple-800 to-purple-600 text-white font-semibold py-2 rounded hover:opacity-90 transition-all duration-500"
      >
        Criar Conta
      </button>

      <p className="mt-6 text-center text-sm text-slate-300">
        Já tem conta?{" "}
        <span
          className="text-green-400 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Faça login
        </span>
      </p>
    </motion.form>
  );
}

export default CardRegister;
