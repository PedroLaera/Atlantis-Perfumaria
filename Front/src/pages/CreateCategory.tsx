import CardCreateCategory from "../components/custom/CardCreateCategory";

export default function CreateCategory() {
  return (
    <div className="w-full text-white! min-h-screen p-6 p-4">
      <div
        className="flex flex-col items-center justify-center h-full"
        style={{
          backgroundImage: `
          radial-gradient(at 20% 30%, #1e3a8a 0%, transparent 40%),
          radial-gradient(at 80% 20%, #4c1d95 0%, transparent 50%),
          radial-gradient(at 50% 100%,rgb(16, 103, 185) 0%, transparent 70%),
          radial-gradient(at 70% 70%, #1e40af 0%, transparent 40%),
          linear-gradient(135deg, #0f172a 0%, #0c0c1c 100%)
        `,
          backgroundColor: "#0f172a",
          backgroundBlendMode: "screen",
        }}
      >
        <CardCreateCategory />
      </div>
    </div>
  );
}
