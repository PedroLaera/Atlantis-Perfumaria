import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Top part: logo + social icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <img src="../assets/logo.png" alt="Logo" className="h-8" />
            <span className="font-semibold text-xl">Atlantis</span>
          </div>
          <div className="flex space-x-6 text-xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-500 transition-colors"
            >
              <BsFacebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-500 transition-colors"
            >
              <BsInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-blue-400 transition-colors"
            >
              <BsTwitter />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-gray-400 transition-colors"
            >
              <BsGithub />
            </a>
            <a
              href="#"
              aria-label="Dribbble"
              className="hover:text-yellow-400 transition-colors"
            >
              <BsDribbble />
            </a>
          </div>
        </div>

        {/* Links sections */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm text-gray-300">
          <div>
            <h3 className="mb-4 font-semibold text-white!">Sobre</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white! hover:underline">
                  Nossa Loja
                </a>
              </li>
              <li>
                <a href="#" className="text-white! hover:underline">
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white!">Siga-nos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white! hover:underline">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="text-white! hover:underline">
                  Discord
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white!">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white! hover:underline">
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-white! hover:underline">
                  Termos & Condições
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        {/* Bottom copyright */}
        <div className="text-center text-gray-500 text-sm">
          © 2025{" "}
          <a href="#" className="text-gray-500! hover:underline ">
            Atlantis™
          </a>
          . Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
