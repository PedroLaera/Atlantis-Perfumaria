import { Link } from "react-router-dom";
import { User, KeyRound } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="bg-zinc-900 text-white p-4 flex justify-end gap-6 shadow-md">
      <Link to="/profile" title="Perfil" id="1">
        <User className="w-6 h-6 hover:text-blue-400 transition-colors" />
      </Link>
      <Link to="/addproduct" title="Adicionar Produto" id="2">
        <KeyRound className="w-6 h-6 hover:text-green-400 transition-colors" />
      </Link>
    </nav>
  );
}
