import CardTeste from "../components/custom/CardTeste"; // Ensure the file exists in the components folder or adjust the path
export default function HomePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-gray-800">
        Bem-vindo aos Teste do site
      </h1>
      <p className="text-gray-600 mt-2">
        Lugar criado apenas para estilização dos componentes antes de serem
        enviados aos seus respecctivos lugares
      </p>
      <p className="text-red-600 mt-2">Desenvolver abaixo da linha</p>
      <p className="text-black-600 mt-2">
        __________________________________________________________________________________________________________________________________________________________________________________________
      </p>
      <CardTeste />
    </div>
  );
}
