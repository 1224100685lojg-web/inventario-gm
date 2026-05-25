"use client";

import { useState } from "react";

import { supabase } from "@/app/lib/supabase";

import StockBadge from "./StockBadge";

type Producto = {
  id: number;
  nombre: string;
  codigo: string;
  stock: number;
  precio: number;
};

type Props = {
  producto: Producto;
};

export default function ProductRow({
  producto,
}: Props) {

  const [editing, setEditing] = useState(false);

  const [price, setPrice] = useState(
    producto.precio
  );

  const updatePrice = async () => {

    await supabase
      .from("productos")
      .update({
        precio: price,
      })
      .eq("id", producto.id);

    setEditing(false);
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">

      {/* Nombre */}
      <td className="p-4 font-medium">
        {producto.nombre}
      </td>

      {/* SKU */}
      <td>
        {producto.codigo}
      </td>

      {/* Stock */}
      <td>
        {producto.stock}
      </td>

      {/* Precio editable */}
      <td>

        {editing ? (
          <input
            autoFocus
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(Number(e.target.value))
            }
            onBlur={updatePrice}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updatePrice();
              }
            }}
            className="
              border
              rounded
              px-2
              py-1
              w-24
            "
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="
              hover:bg-gray-100
              px-2
              py-1
              rounded
            "
          >
            ${price}
          </button>
        )}

      </td>

      {/* Estado */}
      <td>
        <StockBadge stock={producto.stock} />
      </td>

      {/* Actions */}
      <td>
        <button className="text-sky-600">
          Editar
        </button>
      </td>

    </tr>
  );
}