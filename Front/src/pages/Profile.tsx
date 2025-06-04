import ProfileCard from "../components/custom/CardProfile";
import CardAndress from "../components/custom/CardAndress";

export default function ProfilePage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-zinc-400 via-zinc-600 to-zinc-900 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg bg-transparent!">
        <h2 className="text-2xl font-bold text-center mb-4"></h2>
        <ProfileCard />
        <CardAndress />
      </div>
    </div>
  );
}
