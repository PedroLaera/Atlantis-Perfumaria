import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";

export default function SupportPage() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    setMessage("");
  };

  return (
    <motion.div
      className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Suporte ao Cliente
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Encontre ajuda ou envie sua dúvida abaixo. Estamos aqui para ajudar!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Seu email" type="email" required />
        <Textarea
          placeholder="Descreva sua dúvida ou problema..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Enviar Mensagem
        </Button>
      </form>
    </motion.div>
  );
}
