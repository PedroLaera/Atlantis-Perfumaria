import { useEffect, useState, useRef } from "react";
import { ProductCard } from "../components/custom/CardProduct";
import HeroSlider from "../components/custom/HeroSlider";
import Footer from "../components/custom/Footer";
import { api } from "../services/api";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id_product: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  ID_category?: number;
  category_name?: string;
}

interface User {
  id_user: number;
  name: string;
  avatarUrl?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const productsPerPage = 6;
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, userRes] = await Promise.all([
          api.get("/products"),
          getUser(),
        ]);

        setProducts(productRes.data);
        setUser(userRes);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    fetchData();
  }, []);

  const getUser = async (): Promise<User | null> => {
    const idUser = localStorage.getItem("id_user");
    if (!idUser) return null;

    try {
      const response = await api.get(`/users/${idUser}`);
      return {
        id_user: response.data.id_user,
        name: response.data.name,
        avatarUrl:
          response.data.avatarUrl || "https://i.pravatar.cc/40?u=" + idUser,
      };
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return null;
    }
  };

  const playHoverSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center text-white relative overflow-hidden"
      style={{ fontFamily: "'Roboto', sans-serif" }}
    >
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 bg-black flex items-center justify-center z-[9999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-400 border-solid" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fundo animado */}
      <div className="absolute inset-0 bg-black z-0" />

      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(0, 122, 255, 0.25), transparent 60%), " +
            "radial-gradient(circle at 80% 30%, rgba(0, 150, 255, 0.2), transparent 60%), " +
            "radial-gradient(circle at 50% 80%, rgba(10, 90, 200, 0.2), transparent 60%)",
          filter: "blur(70px)",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
      />

      <audio ref={audioRef} src="/sounds/hover.mp3" preload="auto" />

      {/* Header */}
      <div className="w-full bg-gradient-to-r from-blue-900 via-purple-900 to-black text-xs sm:text-sm text-white flex justify-between px-6 py-2 items-center select-none z-20">
        <span>🔥 Frete grátis para compras acima de R$200!</span>
        <div className="flex gap-5 items-center">
          {!user && (
            <>
              <a
                href="/login"
                className="hover:underline hover:text-blue-400 transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="hover:underline hover:text-blue-400 transition"
              >
                Cadastrar
              </a>
            </>
          )}
        </div>
      </div>

      {/* Saudação */}
      {user && (
        <div className="w-full max-w-7xl px-6 py-4 flex items-center gap-4 bg-black/60 backdrop-blur-sm rounded-b-lg border-b border-blue-700 text-white z-20">
          <img
            src={user.avatarUrl}
            alt="Avatar do usuário"
            className="w-12 h-12 rounded-full border-2 border-blue-500"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Olá, {user.name}!</span>
            <span className="text-sm text-blue-300">
              Que tal conferir as novidades de hoje?
            </span>
          </div>
        </div>
      )}

      <div className="z-20 w-full max-w-7xl px-6 py-12">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-10 select-none"
        >
          <h1
            style={{ fontWeight: 100 }}
            className="text-5xl text-blue-200 drop-shadow-md"
          >
            Welcome to Atlantis
          </h1>
          <p className="text-blue-300 mt-2">Perfume vibes like never before</p>
        </motion.div>

        {/* Slider */}
        <HeroSlider />

        {/* Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {currentProducts.map((product, index) => (
            <motion.div
              key={product.id_product}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={playHoverSound}
              className="w-full rounded-xl p-4 shadow-lg hover:shadow-[0_0_15px_5px_rgba(0,122,255,0.7),0_0_30px_10px_rgba(0,122,255,0.4)] transition-shadow duration-300"
            >
              <ProductCard
                id_product={product.id_product}
                name={product.name}
                price={product.price}
              />
            </motion.div>
          ))}
        </div>

        {/* Paginação */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-2 mt-10 flex-wrap justify-center"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant="ghost"
              onClick={() => setCurrentPage(i + 1)}
              onMouseEnter={playHoverSound}
              className={`transition-all duration-300 hover:scale-110 bg-gradient-to-r from-blue-700 via-purple-800 to-purple-600 text-white px-4 py-2 rounded-full shadow-md ${
                currentPage === i + 1 ? "opacity-100" : "opacity-60"
              }`}
            >
              {i + 1}
            </Button>
          ))}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
