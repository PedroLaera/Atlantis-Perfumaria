import { Button } from "../ui/button";

interface ProductSimpleCardProps {
  name: string;
  price: number;
  onMoreClick?: () => void;
}

export function ProductSimpleCard({
  name,
  price,
  onMoreClick,
}: ProductSimpleCardProps) {
  return (
    <div className="bg-gray-800 border border-white/20 rounded-lg p-4 text-white shadow-md w-full max-w-xs">
      <h2 className="text-xl font-semibold truncate">{name}</h2>
      <p className="text-lg text-gray-300 mt-2">R$ {price.toFixed(2)}</p>
      <Button
        onClick={onMoreClick}
        className="mt-4 bg-white text-gray-900 hover:bg-gray-300 transition-colors"
      >
        Mais
      </Button>
    </div>
  );
}
