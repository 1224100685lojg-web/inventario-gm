"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Pencil,
  Check,
  Minus,
  Ruler,
} from "lucide-react";

import { getSupabase } from "@/app/lib/supabase";

const supabase = getSupabase();

type PrecioAcero = {
  medida: string;
  precioPieza: number;
  precioMayoreo: number;
  precioCarretilla: number;
  rango: string;
  notas: string;
  editando?: boolean;
};

type Producto = {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  precios: PrecioAcero[];
};

type ProductoDB = {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
};
type AceroPrecioDB = {
  id: number;

  producto_id: number;

  medida: string;

  menudeo: number;

  mayoreo: number;

  carretilla: number;

  rango: string;

  notas: string;
};
export default function AcerosPage() {
    const [productos, setProductos] =
        useState<Producto[]>([]);

  const [productoActivo, setProductoActivo] =
    useState<Producto | null>(null);
    useEffect(() => {

const fetchProductos = async () => {

  const { data: productosDB, error: productosError } =
    await supabase
      .from("productos")
      .select("*")
      .eq("tipo", "aceros");

  const { data: preciosDB, error: preciosError } =
    await supabase
      .from("producto_tarifas")
      .select("*");

  console.log(productosDB);
  console.log(preciosDB);

  if (
    productosError ||
    preciosError ||
    !productosDB ||
    !preciosDB
  ) {
    console.error(productosError);
    console.error(preciosError);
    return;
  }

  const productosTyped =
    productosDB as ProductoDB[];

  const preciosTyped =
    preciosDB as AceroPrecioDB[];

  const productosFormateados: Producto[] =
    productosTyped.map((p) => {

const precios =
  preciosTyped
    .filter(
      (precio) =>
        precio.producto_id === p.id
    )
    .map((precio) => ({
      medida: precio.medida,

      precioPieza: Number(
        precio.menudeo || 0
      ),

      precioMayoreo: Number(
        precio.mayoreo || 0
      ),

      precioCarretilla: Number(
        precio.carretilla || 0
      ),

      rango: precio.rango || "",

      notas: precio.notas || "",

      editando: false,
    }));

      return {
        id: p.id,
        nombre: p.nombre,
        imagen: p.imagen,
        descripcion: p.descripcion || "",
        precios,
      };
    });

  setProductos(productosFormateados);
};

  fetchProductos();

}, []);


  const abrirModal = (producto: Producto) =>
    setProductoActivo(producto);

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

  const editarPrecio = (
    index: number,
    campo: keyof PrecioAcero,
    valor: string | number
  ) => {
    if (!productoActivo) return;

    const nuevos = [...productoActivo.precios];

const camposNumericos = [
  "precioPieza",
  "precioMayoreo",
  "precioCarretilla",
];

nuevos[index] = {
  ...nuevos[index],
  [campo]: camposNumericos.includes(campo)
    ? Number(valor)
    : valor,
};;

    actualizarProducto({
      ...productoActivo,
      precios: nuevos,
    });
  };

const toggleEditar = async (
  index: number
) => {

  if (!productoActivo) return;

  const nuevos = [
    ...productoActivo.precios,
  ];

  if (nuevos[index].editando) {

    await guardarCambios(index);
  }

  nuevos[index] = {
    ...nuevos[index],

    editando:
      !nuevos[index].editando,
  };

  actualizarProducto({
    ...productoActivo,
    precios: nuevos,
  });
};

const guardarCambios = async (
  index: number
) => {

  if (!productoActivo) return;

  const precio =
    productoActivo.precios[index];

  await supabase
    .from("producto_tarifas")
    .update({
      medida: precio.medida,

      menudeo:
        precio.precioPieza,

      mayoreo:
        precio.precioMayoreo,

      carretilla:
        precio.precioCarretilla,

      rango:
        precio.rango,

      notas:
        precio.notas,
    })
    .eq(
      "producto_id",
      productoActivo.id
    )
    .eq("medida", precio.medida);
};

const eliminarPrecio = async (
  index: number
) => {

  if (!productoActivo) return;

  const precio =
    productoActivo.precios[index];

  await supabase
    .from("producto_tarifas")
    .delete()
    .eq(
      "producto_id",
      productoActivo.id
    )
    .eq("medida", precio.medida);

  actualizarProducto({
    ...productoActivo,

    precios:
      productoActivo.precios.filter(
        (_, i) => i !== index
      ),
  });
};

const agregarPrecio = async () => {

  if (!productoActivo) return;

  const nuevo = {
    producto_id: productoActivo.id,

    medida: "Nueva medida",

    menudeo: 0,

    mayoreo: 0,

    carretilla: 0,

    rango: "5-10 km",

    notas: "Editar información",
  };

  const { data, error } =
    await supabase
      .from("producto_tarifas")
      .insert(nuevo)
      .select()
      .single();

  if (error || !data) {
    console.error(error);
    return;
  }

  const nuevoPrecio: PrecioAcero = {
    medida: data.medida,

    precioPieza: Number(
      data.menudeo
    ),

    precioMayoreo: Number(
      data.mayoreo
    ),

    precioCarretilla: Number(
      data.carretilla
    ),

    rango: data.rango,

    notas: data.notas,

    editando: true,
  };

  actualizarProducto({
    ...productoActivo,

    precios: [
      ...productoActivo.precios,
      nuevoPrecio,
    ],
  });
};

  return (
    <div className="bg-[#efefef] min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden">

        <Image
          src="/Aceros/banner-aceros.jpg"
          alt="Aceros"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <h1
            className="
              text-white
              text-4xl
              md:text-6xl
              font-black
              tracking-wide
              drop-shadow-xl
            "
          >
            Aceros
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-8
          "
        >
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="
                group
                bg-white
                rounded-[28px]
                p-4
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-1
                w-full
                max-w-[260px]
              "
            >

              <div
                className="
                  relative
                  w-full
                  h-[170px]
                  rounded-[22px]
                  overflow-hidden
                "
              >
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  fill
                  className="
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-500
                  "
                />
              </div>

              <h2
                className="
                  mt-4
                  text-lg
                  md:text-xl
                  font-semibold
                  text-center
                  text-[#3f2d21]
                  min-h-[55px]
                  flex
                  items-center
                  justify-center
                "
              >
                {producto.nombre}
              </h2>

              <button
                onClick={() =>
                  abrirModal(producto)
                }
                className="
                  mt-4
                  w-full
                  bg-[#d7bea7]
                  hover:bg-[#c7a789]
                  text-[#3f2d21]
                  font-semibold
                  py-3
                  rounded-full
                  transition-all
                  duration-300
                  shadow-md
                  hover:shadow-xl
                "
              >
                Ver precios
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {productoActivo && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">

          <div
            className="
              bg-[#f5ede6]
              w-full
              max-w-7xl
              rounded-[35px]
              p-8
              md:p-14
              relative
              mx-auto
              my-10
            "
          >

            {/* BOTON REGRESAR */}
            <button
              onClick={cerrarModal}
              className="
                bg-[#d7bea7]
                hover:bg-[#c9aa8d]
                text-[#4b3425]
                px-6
                py-4
                rounded-2xl
                font-semibold
                shadow-lg
                transition
                mb-10
              "
            >
              Regresar
            </button>

            {/* CONTENIDO */}
            <div className="grid md:grid-cols-2 gap-12 items-start">

              {/* IMAGEN */}
              <div
                className="
                  relative
                  w-full
                  h-[350px]
                  md:h-[450px]
                  rounded-[30px]
                  overflow-hidden
                  shadow-2xl
                "
              >
                <Image
                  src={productoActivo.imagen}
                  alt={productoActivo.nombre}
                  fill
                  className="object-cover"
                />
              </div>

              {/* INFO */}
              <div>

                <h2
                  className="
                    text-4xl
                    md:text-5xl
                    font-black
                    mb-4
                    text-[#5c3d2b]
                  "
                >
                  {productoActivo.nombre}
                </h2>

                <p
                  className="
                    text-lg
                    text-[#6d5747]
                    mb-10
                  "
                >
                  {productoActivo.descripcion}
                </p>

                {/* PRECIOS */}
                <div className="space-y-6">

                  {productoActivo.precios.map(
                    (precio, index) => (
                      <div
                        key={index}
                        className="
                          bg-white
                          rounded-[28px]
                          p-6
                          border
                          border-[#e7d8ca]
                          shadow-md
                        "
                      >

                        {/* ELIMINAR */}
                        {precio.editando && (
                          <button
                            onClick={() =>
                              eliminarPrecio(
                                index
                              )
                            }
                            className="
                              mb-5
                              bg-red-500
                              hover:bg-red-600
                              text-white
                              w-10
                              h-10
                              rounded-full
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <Minus size={18} />
                          </button>
                        )}

                        {/* MEDIDA */}
                        <div className="mb-6">

                          <div
                            className="
                              flex
                              items-center
                              gap-2
                              mb-3
                            "
                          >
                            <Ruler
                              size={22}
                              className="text-[#9f6f47]"
                            />

                            <span
                              className="
                                text-2xl
                                font-bold
                                text-[#4b3425]
                              "
                            >
                              Medida
                            </span>
                          </div>

                          <input
                            disabled={
                              !precio.editando
                            }
                            value={precio.medida}
                            onChange={(e) =>
                              editarPrecio(
                                index,
                                "medida",
                                e.target.value
                              )
                            }
                            className="
                              w-full
                              bg-transparent
                              border-b-2
                              border-[#d6c1ae]
                              py-2
                              text-2xl
                              font-semibold
                              outline-none
                              text-[#4b3425]
                            "
                          />
                        </div>

{/* PRECIOS */}
<div
  className="
    bg-[#f8f5f1]
    rounded-[28px]
    p-8
    mb-6
  "
>
  <div
    className="
      grid
      grid-cols-2
      gap-8
      items-center
    "
  >

                {/* PIEZA */}
                <div className="text-center">

                <div className="text-gray-500 mb-2">
                    Pieza
                </div>

                <div
                    className="
                    flex
                    items-center
                    justify-center
                    "
                >
                    <span
                    className="
                        text-3xl
                        font-black
                        text-[#9f6f47]
                        mr-1
                    "
                    >
                    $
                    </span>

                    <input
                    disabled={!precio.editando}
                    type="number"
                    value={precio.precioPieza}
                    onChange={(e) =>
                        editarPrecio(
                        index,
                        "precioPieza",
                        Number(e.target.value)
                        )
                    }
                    className="
                        bg-transparent
                        text-center
                        text-4xl
                        font-black
                        w-full
                        outline-none
                        text-[#2d2d2d]
                    "
                    />
                </div>
                </div>
        </div>
    </div>

                        {/* NOTAS */}
                        <textarea
                          disabled={
                            !precio.editando
                          }
                          value={precio.notas}
                          onChange={(e) =>
                            editarPrecio(
                              index,
                              "notas",
                              e.target.value
                            )
                          }
                          className="
                            w-full
                            bg-[#faf7f4]
                            border
                            border-[#e7d8ca]
                            rounded-[24px]
                            p-5
                            min-h-[130px]
                            resize-none
                            outline-none
                            text-[#4b3425]
                            mb-6
                          "
                        />

                        {/* BOTONES */}
                        <div className="flex flex-wrap gap-4">

                          <button
                            onClick={() =>
                              toggleEditar(
                                index
                              )
                            }
                            className={`
                              px-6
                              py-4
                              rounded-2xl
                              text-white
                              flex
                              items-center
                              gap-3
                              shadow-lg
                              transition
                              ${
                                precio.editando
                                  ? "bg-green-600"
                                  : "bg-blue-600"
                              }
                            `}
                          >
                            {precio.editando ? (
                              <>
                                <Check size={22} />
                                Guardar
                              </>
                            ) : (
                              <>
                                <Pencil size={22} />
                                Editar
                              </>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              eliminarPrecio(
                                index
                              )
                            }
                            className="
                              bg-black
                              text-white
                              px-6
                              py-4
                              rounded-2xl
                              flex
                              items-center
                              gap-3
                              shadow-lg
                            "
                          >
                            <Trash2 size={22} />
                            Eliminar
                          </button>

                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* AGREGAR */}
                <button
                  onClick={agregarPrecio}
                  className="
                    mt-8
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-6
                    py-4
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                    shadow-lg
                  "
                >
                  <Plus size={22} />
                  Agregar medida
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}