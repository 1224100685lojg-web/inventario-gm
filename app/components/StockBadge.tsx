type Props = {
  stock: number;
};

export default function StockBadge({ stock }: Props) {

  if (stock <= 0) {
    return (
      <span className="text-red-600 font-medium">
        🔴 Agotado
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="text-yellow-600 font-medium">
        🟡 Bajo
      </span>
    );
  }

  return (
    <span className="text-green-600 font-medium">
      🟢 Disponible
    </span>
  );
}