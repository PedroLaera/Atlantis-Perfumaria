import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-black text-white relative"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Fundo com brilho azul, roxo e preto */}
      <div className="absolute inset-0 z-0" />
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(0, 122, 255, 0.3), transparent 60%), " +
            "radial-gradient(circle at 80% 70%, rgba(100, 50, 255, 0.2), transparent 60%), " +
            "radial-gradient(circle at 50% 50%, rgba(10, 90, 200, 0.15), transparent 60%)",
          filter: "blur(70px)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Conteúdo principal */}
      <div className="relative z-10 w-full max-w-full h-full bg-black/50 backdrop-blur-sm border border-blue-800 rounded-2xl shadow-xl overflow-hidden flex">
        {/* Imagem do lado esquerdo */}
        <div className="w-1/2 h-full">
          <img
            src="https://i.pravatar.cc/400?img=12"
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texto e botão do lado direito */}
        <div className="w-1/2 flex flex-col justify-center items-start px-12 h-full">
          <motion.h1
            className="text-4xl font-light text-blue-200 mb-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Bem-vindo(a) à Atlantis!
          </motion.h1>
          <motion.p
            className="text-blue-300 text-lg mb-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Aqui você encontra fragrâncias únicas e experiências incríveis.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-base shadow-lg transition duration-300"
              onClick={() => navigate("/login")}
            >
              Acessar Página
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
