import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

      navigate("/");
    } catch (err: unknown) {
      let message = "Erro ao fazer login.";
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        message = err.response.data.error;
      }
      setError(message);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-8 max-w-md w-full text-white font-montserrat rounded-2xl shadow-lg border border-white border-opacity-30"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.8)", // slate-900 com transparência
        backdropFilter: "blur(8px)",
      }}
    >
      <h2 className="text-2xl font-light mb-6 text-center text-slate-100">
        Bem-vindo de volta
      </h2>

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

      {error && (
        <p className="text-red-400 mb-4 text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-700 via-purple-800 to-purple-600 text-white font-semibold py-2 rounded hover:opacity-90 transition-all duration-500"
      >
        Entrar
      </button>

      <p className="mt-6 text-center text-sm text-slate-300">
        Ainda não tem conta?{" "}
        <span
          className="text-green-400 hover:underline cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Criar conta
        </span>
      </p>
    </motion.form>
  );
}

export default CardLogin;
