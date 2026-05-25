"use client";

import { getSupabase } from "@/app/lib/supabase";
import Image from "next/image";
import { use, useEffect, useMemo, useState } from "react";
import {
  Check,
  Pencil,
  Trash2,
  Plus,
  X,
  Star,
  Package,
  Zap,
} from "lucide-react";

const supabase = getSupabase();   

type Caracteristica = {
  id: number;
  caracteristica: string;
};

type Producto = {
  id: number;

  nombre: string;

  imagen: string;

  descripcion: string;

  categoria_slug: string;

subcategoria?: string;

subcategoria_slug?: string;

  marca: string;

  precio: number | null;

  precioAnterior?: number | null;

  existencia: number | null;

  modelo?: string;

  color?: string;

  voltaje?: string;

  destacado?: boolean;

  caracteristicas: Caracteristica[];

  editando?: boolean;
};

export default function LineaBlancaPage({
  params,
}: {
  params: Promise<{
    categoria: string;
  }>;
}) {

  const resolvedParams = use(params);

  const categoria = resolvedParams.categoria;

  const slug = categoria;

  // STATES
const [productos, setProductos] = useState<Producto[]>([]);

const [productoActivo, setProductoActivo] =
  useState<Producto | null>(null);



useEffect(() => {
  const cargarProductos = async () => {

let query = supabase
  .from("productos")
  .select(`
    *,
    producto_caracteristicas (
      id,
      caracteristica
    )
  `)
  .eq("categoria_slug", "linea-blanca");

if (slug !== "todos") {
  query = query.eq(
    "subcategoria_slug",
    slug
  );
}

const { data, error } = await query.order(
  "creado_en",
  {
    ascending: false,
  }
);

    if (error) {
      console.error(error);
      return;
    }

    const formateados =
      data?.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        imagen: p.imagen,
        descripcion: p.descripcion,
        categoria_slug: p.categoria_slug,
subcategoria: p.subcategoria,
subcategoria_slug: p.subcategoria_slug,
        marca: p.marca,
        precio: p.precio,
        precioAnterior: p.precio_anterior,
        existencia: p.existencia,
        modelo: p.modelo,
        color: p.color,
        voltaje: p.voltaje,
        destacado: p.destacado,
        caracteristicas:
          p.producto_caracteristicas || [],
        editando: false,
      })) || [];

    setProductos(formateados);
  };

  cargarProductos();
}, [slug]);


  const productosFiltrados = useMemo(() => {
    return productos;
  }, [productos]);

  const abrirModal = (producto: Producto) => {
    setProductoActivo(producto);
  };

  const cerrarModal = () => {
    setProductoActivo(null);
  };

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

const editarCampo = (
  campo: keyof Producto,
  valor: string | number | boolean | null
) => {
    if (!productoActivo) return;

    actualizarProducto({
      ...productoActivo,
      [campo]: valor,
    });
  };

  const editarCaracteristica = (
    index: number,
    valor: string
  ) => {
    if (!productoActivo) return;

    const nuevas = [
      ...productoActivo.caracteristicas,
    ];

    nuevas[index] = {
    ...nuevas[index],
    caracteristica: valor,
  };

    actualizarProducto({
      ...productoActivo,
      caracteristicas: nuevas,
    });
  };

const agregarCaracteristica = () => {
  if (!productoActivo) return;

  actualizarProducto({
    ...productoActivo,
    caracteristicas: [
      ...productoActivo.caracteristicas,
      {
        id: Date.now(),
        caracteristica: "Nueva característica",
      },
    ],
  });
};

  const eliminarCaracteristica = (
    index: number
  ) => {
    if (!productoActivo) return;

    actualizarProducto({
      ...productoActivo,
      caracteristicas:
        productoActivo.caracteristicas.filter(
          (_, i) => i !== index
        ),
    });
  };

const toggleEditar = async () => {
  if (!productoActivo) return;

  // SI ESTABA EDITANDO -> GUARDAR
  if (productoActivo.editando) {
    const { error } = await supabase
      .from("productos")
      .update({
        nombre: productoActivo.nombre,
        descripcion: productoActivo.descripcion,
        marca: productoActivo.marca,
        precio: productoActivo.precio,
        precio_anterior:
          productoActivo.precioAnterior,
        existencia: productoActivo.existencia,
        modelo: productoActivo.modelo,
        color: productoActivo.color,
        voltaje: productoActivo.voltaje,
        destacado: productoActivo.destacado,
      })
      .eq("id", productoActivo.id);

    if (error) {
      console.error(error);
      return;
    }
  }
  await supabase
  .from("producto_caracteristicas")
  .delete()
  .eq("producto_id", productoActivo.id);

await supabase
  .from("producto_caracteristicas")
  .insert(
    productoActivo.caracteristicas.map(
      (c) => ({
        producto_id:
          productoActivo.id,
        caracteristica:
          c.caracteristica,
      })
    )
  );

  actualizarProducto({
    ...productoActivo,
    editando: !productoActivo.editando,
  });
};

  const eliminarProducto = async () => {
if (!productoActivo) return;

const { error } = await supabase
  .from("productos")
  .delete()
  .eq("id", productoActivo.id);

if (error) {
  console.error(error);
  return;
}

setProductos((prev) =>
  prev.filter(
    (p) => p.id !== productoActivo.id
  )
);

cerrarModal();
};

  return (
    <div className="bg-[#efefef] min-h-screen">

      {/* HERO */}
      <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden">

        <Image
          src="/lineablanca/banner-lineablanca.jpg"
          alt="Línea Blanca"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/45" />

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
              uppercase
              drop-shadow-2xl
            "
          >
            {slug === "todos"
  ? "Todos los productos"
  : slug.replace("-", " ")}
          </h1>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        {productos.length === 0 && (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-500">
      Cargando Productos...
    </h2>
  </div>
)}
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
          {productosFiltrados.map((producto) => (

            <div
              key={producto.id}
              className="
                group
                bg-white
                rounded-[30px]
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >

              {/* IMAGEN */}
              <div
                className="
                  relative
                  w-full
                  h-[240px]
                  overflow-hidden
                "
              >

                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="
                    object-cover
                    group-hover:scale-110
                    transition-transform
                    duration-500
                  "
                />

                {/* BADGE */}
                {producto.destacado && (

                  <div
                    className="
                      absolute
                      top-4
                      left-4
                      bg-yellow-400
                      text-black
                      px-4
                      py-2
                      rounded-full
                      font-bold
                      text-sm
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <Star size={16} />
                    Oferta
                  </div>

                )}
              </div>

              {/* INFO */}
              <div className="p-5">

                <div className="text-sm text-gray-500 mb-1">
                  {producto.marca}
                </div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-[#3f2d21]
                    min-h-[60px]
                  "
                >
                  {producto.nombre}
                </h2>

                {/* PRECIOS */}
                <div className="mt-4">

                  {producto.precioAnterior && (

                    <div
                      className="
                        text-gray-400
                        line-through
                        text-lg
                      "
                    >
                      $
                      {producto.precioAnterior.toLocaleString()}
                    </div>

                  )}

                  <div
                    className="
                      text-4xl
                      font-black
                      text-[#9f6f47]
                    "
                  >
                    $
                    {(producto.precio || 0)
  .toLocaleString()}
                  </div>
                </div>

                {/* EXISTENCIA */}
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-4
                    text-green-700
                    font-semibold
                  "
                >
                  <Package size={18} />

                  {producto.existencia} disponibles
                </div>

                {/* BOTON */}
                <button
                  onClick={() =>
                    abrirModal(producto)
                  }
                  className="
                    mt-5
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
                  Ver producto
                </button>

              </div>
            </div>

          ))}
        </div>
      </div>

      {/* MODAL */}
      {productoActivo && (

        <div
          className="
            fixed
            inset-0
            bg-black/60
            z-50
            overflow-y-auto
            p-4
          "
        >

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

            {/* CERRAR */}
            <button
              onClick={cerrarModal}
              className="
                absolute
                top-6
                right-6
                bg-white
                w-14
                h-14
                rounded-full
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <X size={28} />
            </button>

            <div className="grid md:grid-cols-2 gap-14">

              {/* IMAGEN */}
              <div
                className="
                  relative
                  w-full
                  h-[420px]
                  md:h-[620px]
                  rounded-[35px]
                  overflow-hidden
                  shadow-2xl
                "
              >

                <Image
                  src={productoActivo.imagen}
                  alt={productoActivo.nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />

              </div>

              {/* INFO */}
              <div>

                {/* MARCA */}
                <div className="text-xl text-gray-500 mb-3">
                  {productoActivo.marca}
                </div>

                {/* TITULO */}
                <input
                  disabled={!productoActivo.editando}
                  value={productoActivo.nombre}
                  onChange={(e) =>
                    editarCampo(
                      "nombre",
                      e.target.value
                    )
                  }
                  className="
                    bg-transparent
                    text-5xl
                    font-black
                    w-full
                    outline-none
                    text-[#5c3d2b]
                    mb-6
                  "
                />

                {/* PRECIOS */}
                <div className="mb-8">

                  {productoActivo.precioAnterior && (

                    <div
                      className="
                        text-2xl
                        text-gray-400
                        line-through
                      "
                    >
                      $
                      {(productoActivo.precio || 0)
  .toLocaleString()}
                    </div>

                  )}

                  <div
                    className="
                      flex
                      items-center
                    "
                  >

                    <span
                      className="
                        text-5xl
                        font-black
                        text-[#9f6f47]
                        mr-2
                      "
                    >
                      $
                    </span>

                    <input
                      disabled={!productoActivo.editando}
                      type="number"
                      value={
                      productoActivo.precio ?? ""
                    }
                      onChange={(e) =>
                        editarCampo(
                          "precio",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="
                        bg-transparent
                        text-6xl
                        font-black
                        outline-none
                        text-[#2d2d2d]
                        w-full
                      "
                    />

                  </div>
                </div>

                {/* INFO TECNICA */}
                <div
                  className="
                    bg-white
                    rounded-[28px]
                    p-8
                    shadow-md
                    mb-8
                    space-y-5
                  "
                >

                  {/* MODELO */}
                  <div>

                    <div className="text-gray-500 mb-1">
                      Modelo
                    </div>

                    <input
                      disabled={!productoActivo.editando}
                      value={
                        productoActivo.modelo || ""
                      }
                      onChange={(e) =>
                        editarCampo(
                          "modelo",
                          e.target.value
                        )
                      }
                      className="
                        bg-transparent
                        text-2xl
                        font-bold
                        outline-none
                        text-[#4b3425]
                        w-full
                      "
                    />

                  </div>

                  {/* COLOR */}
                  <div>

                    <div className="text-gray-500 mb-1">
                      Color
                    </div>

                    <input
                      disabled={!productoActivo.editando}
                      value={
                        productoActivo.color || ""
                      }
                      onChange={(e) =>
                        editarCampo(
                          "color",
                          e.target.value
                        )
                      }
                      className="
                        bg-transparent
                        text-2xl
                        font-bold
                        outline-none
                        text-[#4b3425]
                        w-full
                      "
                    />

                  </div>

                  {/* VOLTAJE */}
                  <div>

                    <div className="text-gray-500 mb-1">
                      Voltaje
                    </div>

                    <input
                      disabled={!productoActivo.editando}
                      value={
                        productoActivo.voltaje || ""
                      }
                      onChange={(e) =>
                        editarCampo(
                          "voltaje",
                          e.target.value
                        )
                      }
                      className="
                        bg-transparent
                        text-2xl
                        font-bold
                        outline-none
                        text-[#4b3425]
                        w-full
                      "
                    />

                  </div>

                  {/* EXISTENCIA */}
                  <div>

                    <div className="text-gray-500 mb-1">
                      Existencia
                    </div>

                    <input
                      disabled={!productoActivo.editando}
                      type="number"
                      value={
                        productoActivo.existencia ?? ""
                      }
                      onChange={(e) =>
                        editarCampo(
                          "existencia",
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="
                        bg-transparent
                        text-2xl
                        font-bold
                        outline-none
                        text-[#4b3425]
                        w-full
                      "
                    />

                  </div>

                </div>

                {/* CARACTERISTICAS */}
                <div className="mb-8">

                  <div
                    className="
                      text-3xl
                      font-black
                      text-[#4b3425]
                      mb-5
                    "
                  >
                    Características
                  </div>

                  <div className="space-y-4">

                    {productoActivo.caracteristicas.map(
                      (c, index) => (

                        <div
                          key={c.id}
                          className="
                            flex
                            items-center
                            gap-3
                            bg-white
                            rounded-2xl
                            p-4
                            shadow-sm
                          "
                        >

                          <Zap
                            size={20}
                            className="text-[#9f6f47]"
                          />

                          <input
                            disabled={
                              !productoActivo.editando
                            }
                            value={c.caracteristica}
                            onChange={(e) =>
                              editarCaracteristica(
                                index,
                                e.target.value
                              )
                            }
                            className="
                              bg-transparent
                              outline-none
                              text-lg
                              w-full
                              text-[#4b3425]
                            "
                          />

                          {productoActivo.editando && (

                            <button
                              onClick={() =>
                                eliminarCaracteristica(
                                  index
                                )
                              }
                              className="
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
                              <Trash2 size={18} />
                            </button>

                          )}

                        </div>

                      )
                    )}
                  </div>

                  {/* AGREGAR */}
                  {productoActivo.editando && (

                    <button
                      onClick={
                        agregarCaracteristica
                      }
                      className="
                        mt-5
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
                      Agregar característica
                    </button>

                  )}
                </div>

                {/* DESCRIPCION */}
                <textarea
                  disabled={!productoActivo.editando}
                  value={
                    productoActivo.descripcion
                  }
                  onChange={(e) =>
                    editarCampo(
                      "descripcion",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    bg-white
                    border
                    border-[#e7d8ca]
                    rounded-[28px]
                    p-6
                    min-h-[170px]
                    resize-none
                    outline-none
                    text-[#4b3425]
                    mb-8
                  "
                />

                {/* BOTONES */}
                <div className="flex flex-wrap gap-4">

                  <button
                    onClick={toggleEditar}
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
                        productoActivo.editando
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }
                    `}
                  >

                    {productoActivo.editando ? (
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
                    onClick={eliminarProducto}
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
            </div>
          </div>
        </div>

      )}
    </div>
  );
}