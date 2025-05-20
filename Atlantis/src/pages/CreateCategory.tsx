import CardCreateCategory from "../components/custom/CardCreateCategory";

export default function CreateCategory() {
  return (
    <div className="w-full text-white! min-h-screen p-6  bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-900 p-4">
      <div className="flex flex-col items-center justify-center h-full">
        <CardCreateCategory />
      </div>
    </div>
  );
}
