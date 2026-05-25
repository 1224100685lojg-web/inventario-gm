"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  MapPin,
  Pencil,
  Check,
  X,
} from "lucide-react";

import { getSupabase} from "@/app/lib/supabase";

const supabase = getSupabase();

/* ---------------- TYPES ---------------- */

type Tarifa = {
  rango: string;
  extra: number;
};

type Precio = {
  base: number;
  tarifas: Tarifa[];
  editando?: boolean;
};

type Producto = {
  id: number;
  nombre: string;
  imagen: string;
  precios: Precio;
};

type ProductoDB = {
  id: number;
  nombre: string;
  imagen: string;
  precio_base: number | null;
};

type TarifaDB = {
  id: number;
  producto_id: number;
  rango: string;
  extra: number;
};

/* ---------------- PAGE ---------------- */

export default function PolvosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoActivo, setProductoActivo] =
    useState<Producto | null>(null);
    const [pickup, setPickup] =
  useState(false);

  /* ---------------- LOAD ---------------- */

  useEffect(() => {
    const fetchProductos = async () => {
      const { data: productosDB } = await supabase
        .from("productos")
        .select("*")
        .eq("tipo", "polvos");

      const { data: tarifasDB } = await supabase
        .from("producto_tarifas")
        .select("*");

      if (!productosDB || !tarifasDB) return;

      const productosTyped =
        (productosDB ?? []) as ProductoDB[];

      const tarifasTyped =
        (tarifasDB ?? []) as TarifaDB[];

      const formateados: Producto[] =
        productosTyped.map((p) => {
          const tarifas = tarifasTyped
            .filter(
              (t) => t.producto_id === p.id
            )
            .map((t) => ({
              rango: t.rango,
              extra: Number(t.extra || 0),
            }));

          return {
            id: p.id,
            nombre: p.nombre,
            imagen: p.imagen,
            precios: {
              base: Number(
                p.precio_base || 0
              ),
              tarifas,
              editando: false,
            },
          };
        });

      setProductos(formateados);
    };

    fetchProductos();
  }, []);

  /* ---------------- HELPERS ---------------- */

  const abrirModal = (p: Producto) =>
    setProductoActivo(p);

  const cerrarModal = () =>
    setProductoActivo(null);

  const actualizarProducto = (
    actualizado: Producto
  ) => {
    setProductoActivo(actualizado);

    setProductos((prev) =>
      prev.map((p) =>
        p.id === actualizado.id
          ? actualizado
          : p
      )
    );
  };

  const toggleEditar = () => {
    if (!productoActivo) return;

    actualizarProducto({
      ...productoActivo,
      precios: {
        ...productoActivo.precios,
        editando:
          !productoActivo.precios.editando,
      },
    });
  };

  const editarBase = (valor: number) => {
    if (!productoActivo) return;

    actualizarProducto({
      ...productoActivo,
      precios: {
        ...productoActivo.precios,
        base: valor,
      },
    });
  };

  const editarTarifa = (
    index: number,
    campo: keyof Tarifa,
    valor: string | number
  ) => {
    if (!productoActivo) return;

    const nuevas = [
      ...productoActivo.precios.tarifas,
    ];

    nuevas[index] = {
      ...nuevas[index],
      [campo]:
        campo === "rango"
          ? String(valor)
          : Number(valor),
    };

    actualizarProducto({
      ...productoActivo,
      precios: {
        ...productoActivo.precios,
        tarifas: nuevas,
      },
    });
  };

  const agregarTarifa = () => {
    if (!productoActivo) return;

    actualizarProducto({
      ...productoActivo,
      precios: {
        ...productoActivo.precios,
        tarifas: [
          ...productoActivo.precios.tarifas,
          {
            rango: "Nueva distancia",
            extra: 0,
          },
        ],
      },
    });
  };

  const eliminarTarifa = (
    index: number
  ) => {
    if (!productoActivo) return;

    actualizarProducto({
      ...productoActivo,
      precios: {
        ...productoActivo.precios,
        tarifas:
          productoActivo.precios.tarifas.filter(
            (_, i) => i !== index
          ),
      },
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-[#f5f1eb] min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden">

        <Image
          src="/polvos/banner.jpg"
          alt="Polvos"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

          <h1 className="text-white text-5xl font-black">
            Polvos
          </h1>
        </div>
      </div>

      {/* GRID */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-14
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-8
        "
      >
        {productos.map((p) => (
          <div
            key={p.id}
            className="
              group
              bg-white/90
              backdrop-blur
              border
              border-[#eadfd3]
              rounded-[30px]
              p-4
              shadow-md
              hover:shadow-2xl
              hover:-translate-y-1
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            {/* IMAGE */}
            <div
              className="
                relative
                w-full
                h-[170px]
                rounded-2xl
                overflow-hidden
              "
            >
              <Image
                src={p.imagen}
                alt={p.nombre}
                fill
                className="
                  object-contain
                  group-hover:scale-110
                  transition-transform
                  duration-500
                "
              />
            </div>

            {/* TITLE */}
            <h2
              className="
                text-center
                font-semibold
                mt-4
                text-[#3f2d21]
                min-h-[50px]
                flex
                items-center
                justify-center
              "
            >
              {p.nombre}
            </h2>

            {/* BUTTON */}
            <button
              onClick={() => abrirModal(p)}
              className="
                mt-4
                w-full
                bg-[#d7bea7]
                hover:bg-[#c7a789]
                py-3
                rounded-full
                font-semibold
                transition-all
                duration-300
                shadow-md
                hover:shadow-xl
                text-[#3f2d21]
              "
            >
              Ver precios
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {productoActivo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">

          <div
            className="
              max-w-7xl
              mx-auto
              my-10
              bg-[#f8f4ef]
              rounded-[40px]
              overflow-hidden
              shadow-2xl
            "
          >

            {/* HEADER */}
            <div
              className="
                flex
                items-center
                justify-between
                px-8
                py-6
                border-b
                border-[#eadfd3]
                bg-white/70
                backdrop-blur
              "
            >
              <div className="flex items-center gap-5">

                {/* IMAGE */}
                <div
                  className="
                    relative
                    w-24
                    h-24
                    rounded-[24px]
                    overflow-hidden
                    shadow-lg
                  "
                >
                  <Image
                    src={productoActivo.imagen}
                    alt={productoActivo.nombre}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2
                    className="
                      text-4xl
                      font-black
                      text-[#4b3425]
                      tracking-tight
                    "
                  >
                    {productoActivo.nombre}
                  </h2>

                  <p className="text-[#7a6a5d] mt-1">
                    Tarifas configurables por
                    distancia
                  </p>
                </div>
              </div>

              <button
                onClick={cerrarModal}
                className="
                  bg-[#e7d8ca]
                  hover:bg-[#d9c3af]
                  p-3
                  rounded-2xl
                  transition
                "
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-8">

              {/* TOP ACTIONS */}
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  mb-8
                  gap-4
                "
              >

                {/* BASE PRICE */}
                <div className="flex-1">

                  <div
                    className="
                      bg-white
                      rounded-[28px]
                      p-6
                      shadow-md
                      max-w-[420px]
                    "
                  >
                    <div className="text-sm text-gray-500 mb-2">
                      Precio base
                    </div>

                    <div className="flex items-center gap-2">

                      <span
                        className="
                          text-2xl
                          font-bold
                          text-[#9f6f47]
                        "
                      >
                        $
                      </span>

                      <input
                        type="number"
                        disabled={
                          !productoActivo.precios
                            .editando
                        }
                        value={
                          productoActivo.precios
                            .base
                        }
                        onChange={(e) =>
                          editarBase(
                            Number(
                              e.target.value
                            )
                          )
                        }
                        className="
                          bg-transparent
                          outline-none
                          text-5xl
                          font-black
                          text-[#2d2d2d]
                          w-full
                        "
                      />
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">

                  {productoActivo.precios
                    .editando && (
                    <button
                      onClick={agregarTarifa}
                      className="
                        flex
                        items-center
                        gap-2
                        bg-[#b8875c]
                        hover:bg-[#9f6f47]
                        text-white
                        px-5
                        py-3
                        rounded-2xl
                        font-semibold
                        shadow-lg
                        transition
                      "
                    >
                      <Plus size={18} />
                      Agregar
                    </button>
                  )}

                  <button
                    onClick={toggleEditar}
                    className={`
                      flex
                      items-center
                      gap-2
                      px-5
                      py-3
                      rounded-2xl
                      font-semibold
                      shadow-lg
                      transition
                      ${
                        productoActivo
                          .precios.editando
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-[#d7bea7] hover:bg-[#c7a789] text-[#3f2d21]"
                      }
                    `}
                  >
                    {productoActivo.precios
                      .editando ? (
                      <>
                        <Check size={18} />
                        Guardar
                      </>
                    ) : (
                      <>
                        <Pencil size={18} />
                        Editar
                      </>
                    )}
                  </button>
                </div>
              </div>

              
              {/* GRID */}
              <div
                className="
                  grid
                  sm:grid-cols-2
                  xl:grid-cols-3
                  gap-7
                "
              >

                {productoActivo.precios.tarifas.map(
                  (t, i) => {
                    const total =
                    productoActivo.precios.base +
                    (pickup ? 0 : t.extra);

                    return (
                      <div
                        key={i}
                        className="
                          bg-white/90
                          backdrop-blur
                          border
                          border-[#eadfd3]
                          rounded-[30px]
                          p-6
                          shadow-md
                          hover:shadow-2xl
                          hover:-translate-y-1
                          transition-all
                          duration-300
                          relative
                        "
                      >

                        {/* DELETE */}
                        {productoActivo
                          .precios
                          .editando && (
                          <button
                            onClick={() =>
                              eliminarTarifa(
                                i
                              )
                            }
                            className="
                              absolute
                              top-4
                              right-4
                              w-9
                              h-9
                              rounded-full
                              bg-red-50
                              hover:bg-red-100
                              flex
                              items-center
                              justify-center
                              text-red-500
                              transition
                            "
                          >
                            <Trash2
                              size={16}
                            />
                          </button>
                        )}

                        {/* ICON */}
                        <div
                          className="
                            w-14
                            h-14
                            rounded-full
                            bg-[#f5ede6]
                            flex
                            items-center
                            justify-center
                            mb-5
                          "
                        >
                          <MapPin className="text-[#9f6f47]" />
                        </div>

                        {/* RANGE */}
                        <input
                          value={t.rango}
                          disabled={
                            !productoActivo
                              .precios
                              .editando
                          }
                          onChange={(e) =>
                            editarTarifa(
                              i,
                              "rango",
                              e.target.value
                            )
                          }
                          className="
                            text-xl
                            font-bold
                            text-[#3f2d21]
                            w-full
                            outline-none
                            bg-transparent
                            mb-6
                          "
                        />

                        {/* EXTRA */}
                        <div
                          className="
                            bg-[#f7f3ef]
                            rounded-2xl
                            p-4
                            mb-5
                          "
                        >
                          <div className="text-xs text-gray-500 mb-1">
                            Extra por distancia
                          </div>

                          <div className="flex items-center gap-2">

                            <span
                              className="
                                text-xl
                                font-bold
                                text-[#9f6f47]
                              "
                            >
                              $
                            </span>

                            <input
                              type="number"
                              value={t.extra}
                              disabled={
                                !productoActivo
                                  .precios
                                  .editando
                              }
                              onChange={(e) =>
                                editarTarifa(
                                  i,
                                  "extra",
                                  Number(
                                    e.target
                                      .value
                                  )
                                )
                              }
                              className="
                                bg-transparent
                                outline-none
                                text-3xl
                                font-black
                                w-full
                              "
                            />
                          </div>
                        </div>

                        {/* TOTAL */}
                        <div
                          className="
                            bg-gradient-to-r
                            from-[#b8875c]
                            to-[#9f6f47]
                            text-white
                            rounded-2xl
                            p-5
                          "
                        >
                          <div className="text-sm opacity-80">
                            Precio total
                          </div>

                          <div className="text-4xl font-black mt-1">
                            $
                            {total.toLocaleString()}
                          </div>
                        </div>

                        {/* CALCULADORA TONELADAS */}
<div
  className="
    mt-5
    bg-[#f8f5f1]
    rounded-[24px]
    p-5
    border
    border-[#eadfd4]
  "
>

  <div className="text-sm text-gray-500 mb-3">
    Toneladas
  </div>

  <input
    type="number"
    min={1}
    defaultValue={1}
    className="
      w-full
      bg-white
      border
      border-[#e5d8cb]
      rounded-2xl
      p-4
      text-2xl
      font-black
      outline-none
      text-[#4b3425]
      mb-5
    "
    onChange={(e) => {

      const toneladas =
        Number(e.target.value) || 0;

      const subtotal =
        productoActivo.precios.base *
        toneladas;

      const totalViaje =
        subtotal + t.extra;

      const subtotalElement =
        document.getElementById(
          `subtotal-${i}`
        );

      const totalElement =
        document.getElementById(
          `total-ton-${i}`
        );

      if (subtotalElement) {
        subtotalElement.innerText =
          `$${subtotal.toLocaleString()}`;
      }

      if (totalElement) {
        totalElement.innerText =
          `$${totalViaje.toLocaleString()}`;
      }
    }}
  />

  {/* SUBTOTAL */}
  <div
    className="
      bg-white
      rounded-2xl
      p-4
      border
      border-[#eadfd4]
      mb-4
    "
  >

    <div className="text-sm text-gray-500">
      Material
    </div>

    <div
      id={`subtotal-${i}`}
      className="
        text-3xl
        font-black
        text-[#4b3425]
      "
    >
      $
      {productoActivo.precios.base.toLocaleString()}
    </div>

  </div>

  {/* TOTAL FINAL */}
  <div
    className="
      bg-gradient-to-r
      from-[#2d2d2d]
      to-black
      text-white
      rounded-2xl
      p-5
    "
  >

    <div className="text-sm opacity-80">
      Total con flete
    </div>

    <div
      id={`total-ton-${i}`}
      className="text-4xl font-black mt-1"
    >
      $
      {total.toLocaleString()}
    </div>

  </div>

</div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}