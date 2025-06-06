import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/img2.jpg";
import img2 from "../assets/img5.jpg";
import img3 from "../assets/img7.jpg";

const slides = [
  {
    image: img1,
    title: "Fragrâncias Exclusivas",
    subtitle: "Descubra o perfume que combina com você",
    cta: "Explorar Coleção",
  },
  {
    image: img2,
    title: "Promoções da Semana",
    subtitle: "Ofertas irresistíveis só até domingo",
    cta: "Ver Ofertas",
  },
  {
    image: img3,
    title: "Lançamentos Premium",
    subtitle: "Conheça os novos aromas de 2025",
    cta: "Lançamentos",
  },
];

const extendedSlides = [...slides, ...slides];

export default function HeroSlider() {
  const navigate = useNavigate();

  const slideCount = extendedSlides.length; // total slides duplicados
  const slideWidthPercent = 100 / slideCount; // largura de cada slide

  return (
    <div className="w-full overflow-hidden relative rounded-xl h-80 md:h-[450px] bg-gradient-to-r from-zinc-900 via-blue-950 to-zinc-800">
      <motion.div
        className="flex h-full"
        animate={{ x: ["0%", `-${100 / 2}%`] }} // vai de 0 até -50% (metade da largura total)
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }} // aumenta a duração para suavizar a transição
        style={{ width: `${(slideCount * 100) / slides.length}%` }}
      >
        {extendedSlides.map((slide, i) => (
          <div
            key={i}
            className="relative h-full flex-shrink-0"
            style={{ width: `${slideWidthPercent}%` }} // largura igual pra todos, somando 100%
          >
            <img
              src={slide.image}
              alt={`Slide ${i}`}
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/50 z-10 rounded-lg" />

            {/* Texto animado, posicionado perto da base, dentro da imagem */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute z-20 left-1/2 bottom-10 -translate-x-1/2 px-6 w-full max-w-[280px] text-center"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base text-blue-200 mt-1 drop-shadow-md">
                {slide.subtitle}
              </p>
              <button
                onClick={() => navigate("/")}
                type="button"
                className="mt-4 w-44 bg-gradient-to-r from-blue-700 via-purple-800 to-purple-600 text-white font-semibold py-2 rounded hover:opacity-90 transition-all duration-500 mx-auto"
              >
                {slide.cta}
              </button>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
