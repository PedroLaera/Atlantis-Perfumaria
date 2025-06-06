import CardEditUser from "../components/custom/CardEditUser";

export default function EditUser() {
  return (
    <div
      className="mg-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-900 p-4"
      style={{
        backgroundImage: `
          radial-gradient(at 20% 30%,rgb(83, 128, 252) 0%, transparent 40%),
          radial-gradient(at 80% 20%,rgb(6, 229, 207) 0%, transparent 50%),
          radial-gradient(at 50% 100%,rgb(1, 2, 2) 0%, transparent 70%),
          radial-gradient(at 70% 70%, #1e40af 0%, transparent 40%),
          linear-gradient(135deg,rgb(6, 19, 50) 0%, #0c0c1c 100%)
        `,
        backgroundColor: "#0f172a", // fallback escuro
        backgroundBlendMode: "screen",
      }}
    >
      <CardEditUser />
    </div>
  );
}
