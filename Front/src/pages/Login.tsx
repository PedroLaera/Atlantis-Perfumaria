import CardLogin from "../components/custom/CardLogin";

export default function LoginPage() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `
          radial-gradient(at 20% 30%, #1e3a8a 0%, transparent 40%),
          radial-gradient(at 80% 20%, #4c1d95 0%, transparent 50%),
          radial-gradient(at 50% 100%, #10b981 0%, transparent 70%),
          radial-gradient(at 70% 70%, #1e40af 0%, transparent 40%),
          linear-gradient(135deg, #0f172a 0%, #0c0c1c 100%)
        `,
        backgroundColor: "#0f172a", // fallback escuro
        backgroundBlendMode: "screen",
      }}
    >
      {" "}
      <CardLogin />
    </div>
  );
}
