"use client";

import { useState } from "react";
import { getSupabase } from "@/app/lib/supabase";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

const supabase = getSupabase();

export default function NewProductModal({
  open,
  onClose,
  onCreated,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    codigo: "",
    precio: "",
    stock: "",
  });

  if (!open) return null;

  const handleSubmit = async () => {

    if (!form.nombre || !form.codigo) return;

    setLoading(true);

    await supabase.from("productos").insert({
      nombre: form.nombre,
      codigo: form.codigo,
      precio: Number(form.precio),
      stock: Number(form.stock),
    });

    setLoading(false);

    onCreated();
    onClose();

    setForm({
      nombre: "",
      codigo: "",
      precio: "",
      stock: "",
    });
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        bg-black/40
        flex items-center justify-center
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          w-full
          max-w-lg
          p-6
          space-y-5
        "
      >

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Nuevo producto
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Nombre */}
        <input
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) =>
            setForm({ ...form, nombre: e.target.value })
          }
          className="w-full border rounded-xl p-3"
        />

        {/* Código */}
        <input
          placeholder="Código / SKU"
          value={form.codigo}
          onChange={(e) =>
            setForm({ ...form, codigo: e.target.value })
          }
          className="w-full border rounded-xl p-3"
        />

        {/* Precio */}
        <input
          placeholder="Precio"
          type="number"
          value={form.precio}
          onChange={(e) =>
            setForm({ ...form, precio: e.target.value })
          }
          className="w-full border rounded-xl p-3"
        />

        {/* Stock */}
        <input
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: e.target.value })
          }
          className="w-full border rounded-xl p-3"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-xl border
            "
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              bg-sky-600
              text-white
              px-5
              py-2
              rounded-xl
            "
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

        </div>

      </div>

    </div>
  );
}