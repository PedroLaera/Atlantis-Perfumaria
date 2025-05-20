import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Instagram, Facebook, Github, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-transparent0 text-white pt-12 w-full">
      <div className="max-w-[1440px] mx-auto w-full flex flex-col md:flex-row items-center justify-between px-6 gap-10">
        <div className="flex items-center gap-6">
          <a
            href="https://wa.me/123456789"
            target="_blank"
            rel="noopener noreferrer"
          >
            <PhoneCall className="w-6 h-6 text-white hover:text-green-400 transition-colors duration-300" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-6 h-6 text-white hover:text-pink-400 transition-colors duration-300" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-6 h-6 text-white hover:text-blue-400 transition-colors duration-300" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-6 h-6 text-white hover:text-gray-400 transition-colors duration-300" />
          </a>
        </div>

        {/* Separador vertical */}
        <Separator
          orientation="vertical"
          className="hidden md:block h-20 bg-gray-600"
        />

        {/* Logo */}
        <div className="flex justify-center items-center">
          <img src="/assets/logo.png" alt="Logo" className="h-16" />
        </div>

        {/* Navegação */}
        <div className="flex flex-col md:items-end gap-2">
          <Link to="/">
            <Button
              variant="link"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Home
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="link"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Login
            </Button>
          </Link>
          <Link to="/suporte">
            <Button
              variant="link"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Suporte
            </Button>
          </Link>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="w-full bg-zinc-800 py-4 mt-10">
        <p className="text-center text-sm text-gray-400">
          © 2025 Atlantis. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
