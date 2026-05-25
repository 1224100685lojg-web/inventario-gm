import ProductRow from "./ProductRow";

type Producto = {
  id: number;
  nombre: string;
  codigo: string;
  stock: number;
  precio: number;
};

type Props = {
  productos: Producto[];
};

export default function ProductTable({
  productos,
}: Props) {
  return (
    <div className="bg-white border rounded-2xl overflow-hidden">

      <table className="w-full text-sm">

        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="p-4">Producto</th>
            <th>SKU</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <ProductRow
              key={producto.id}
              producto={producto}
            />
          ))}
        </tbody>

      </table>

    </div>
  );
}