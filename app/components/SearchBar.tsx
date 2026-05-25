type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Buscar productos..."
      className="
        w-full
        px-4
        py-3
        border
        rounded-xl
        bg-white
        text-sm
        outline-none
        focus:ring-2
        focus:ring-sky-500
      "
    />
  );
}