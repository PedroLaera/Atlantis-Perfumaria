import { Menu, Home, User, Key, Github, LifeBuoy } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimationTriggered(true);
  }, []);

  const handleNavigation = (path: string) => {
    setAnimationTriggered(false);
    setTimeout(() => {
      navigate(path);
      setAnimationTriggered(true);
    }, 300);
  };

  const navItems = [
    {
      to: "/",
      label: "Home",
      icon: <Home className="w-5 h-5 " />,
    },
    { to: "/login", label: "Login", icon: <User className="w-5 h-5" /> },
    {
      to: "/addproduct",
      label: "+ Product",
      icon: <Key className="w-5 h-5" />,
    },
    { to: "/teste", label: "Developer", icon: <Key className="w-5 h-5" /> },
  ];

  return (
    <nav className=" w-full bg-zinc-900 shadow-md p-4 flex items-center justify-between text-white">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu
            className="w-6 h-6 cursor-pointer md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          />
          <h1
            className={`text-xl font-bold transition-all duration-500 ${
              animationTriggered ? "animate-slide-left" : "opacity-0"
            }`}
          >
            <Link to="/">
              <img src={logo} alt="logo" className="w-50 h-8" />
            </Link>
          </h1>
        </div>

        <ul className="hidden md:flex gap-4 ">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`transition-opacity duration-500 ${
                animationTriggered ? "animate-slide-left" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => handleNavigation(item.to)}
                className="bg-transparent! text-white flex items-center gap-1 transition duration-300 hover:text-white! hover: focus:ring-0 focus:outline-none!border-none!"
              >
                {item.icon} <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div
          className={`hidden md:block transition-all duration-500 ${
            animationTriggered ? "animate-slide-left" : "opacity-0"
          }`}
          style={{ animationDelay: "400ms" }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="bg-transparent! text-white hover: focus:ring-0 focus:outline-none! border-none!"
                title="User Profile"
              >
                <User className="w-6 h-6" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-800 border-none text-white shadow-lg">
              <DropdownMenuItem
                className="hover:bg-zinc-700 cursor-pointer"
                onClick={() => handleNavigation("/profile")}
              >
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-zinc-700 cursor-pointer"
                onClick={() => handleNavigation("/support")}
              >
                <LifeBuoy className="w-4 h-4 mr-2" />
                Suporte
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-zinc-700 cursor-pointer"
                onClick={() =>
                  window.open("https://github.com/seu-repo", "_blank")
                }
              >
                <Github className="w-4 h-4 mr-2" />
                <link
                  rel="stylesheet"
                  href="https://github.com/PedroLaera/Project5/tree/Pedro"
                />
                GitHub
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-transparent! shadow-md md:hidden">
          <ul className="flex flex-col gap-4 p-4 w-full">
            {navItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    handleNavigation(item.to);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-1 text-white hover:text-gray-300 transition"
                >
                  {item.icon} {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNavigation("/profile")}
                className="flex items-center gap-1 text-white hover:text-gray-300 transition"
              >
                <User className="w-5 h-5" /> Perfil
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
