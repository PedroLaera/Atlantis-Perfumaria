import React, { useState } from "react";
import { api } from "../../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cpf as cpfValidator } from "cpf-cnpj-validator";

function maskCPF(value: string) {
  // Remove tudo que não é número
  let v = value.replace(/\D/g, "");
  // Limita a 11 números (CPF tem 11 dígitos)
  v = v.slice(0, 11);

  // Aplica a máscara passo a passo
  if (v.length > 9) {
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (v.length > 6) {
    v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (v.length > 3) {
    v = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  }

  return v;
}

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
    const { name, value } = e.target;

    if (name === "CPF") {
      const masked = maskCPF(value);
      setFormData((prev) => ({ ...prev, CPF: masked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const rawCPF = formData.CPF.replace(/\D/g, "");

    if (!cpfValidator.isValid(rawCPF)) {
      setError("CPF inválido.");
      return;
    }

    try {
      await api.post("/users", {
        ...formData,
        CPF: rawCPF,
      });

      setSuccess("Usuário criado com sucesso!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: unknown) {
      let message = "Erro ao criar o usuário.";
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.error?.includes("CPF")) {
          message = "Este CPF já está cadastrado.";
        } else if (err.response?.data?.error?.includes("email")) {
          message = "Este e-mail já está cadastrado.";
        } else if (err.response?.data?.error) {
          message = err.response.data.error;
        }
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
        backgroundColor: "rgba(15, 23, 42, 0.8)",
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
        maxLength={14}
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
        Você já tem conta?{" "}
        <span
          className="text-blue-500 hover:underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Faça login
        </span>
      </p>
    </motion.form>
  );
}

export default CardRegister;
