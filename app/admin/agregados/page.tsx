"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Check,
  MapPin,
  Minus,
  Trash2,
} from "lucide-react";
import { supabase } from "@/app/lib/supabase";

/* ---------------- TYPES ---------------- */

type TarifaDistancia = {
  rango: string;
  menudeo: number;
  mayoreo: number;
  carretilla?: number;
  incluyeCarretilla?: boolean;
};

type Precio = {
  medidas: string;
  notas: string;
  editando?: boolean;
  tarifas: TarifaDistancia[];
};

type Producto = {
  id: number;
  nombre: string;
  imagen: string;
  precios: Precio[];
};

type ProductoDB = {
  id: number;
  nombre: string;
  imagen: string;
};

type TarifaDB = {
  id: number;
  producto_id: number;
  rango: string;
  menudeo: number;
  mayoreo: number;
  carretilla: number | null;
  incluye_carretilla: boolean;
};

export default function AgregadosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productoActivo, setProductoActivo] = useState<Producto | null>(null);

  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    const fetchData = async () => {
      const { data: productosDB } = await supabase
        .from("productos")
        .select("*")
        .eq("tipo", "agregados");

      const { data: tarifasDB } = await supabase
        .from("producto_tarifas")
        .select("*");

      if (!productosDB || !tarifasDB) return;

      const productosTyped = productosDB as ProductoDB[];
      const tarifasTyped = tarifasDB as TarifaDB[];

      const formateados: Producto[] = productosTyped.map((p) => {
        const tarifas = tarifasTyped
          .filter((t) => t.producto_id === p.id)
          .map((t) => ({
            rango: t.rango,
            menudeo: Number(t.menudeo || 0),
            mayoreo: Number(t.mayoreo || 0),
            carretilla: Number(t.carretilla || 0),
            incluyeCarretilla: t.incluye_carretilla ?? false,
          }));

        return {
          id: p.id,
          nombre: p.nombre,
          imagen: p.imagen,
          precios: [
            {
              medidas: "",
              notas: "",
              editando: false,
              tarifas,
            },
          ],
        };
      });

      setProductos(formateados);
    };

    fetchData();
  }, []);

  /* ---------------- MODAL STATE ---------------- */

  const abrirModal = (p: Producto) => setProductoActivo(p);
  const cerrarModal = () => setProductoActivo(null);

  const actualizarProducto = (actualizado: Producto) => {
    setProductoActivo(actualizado);
    setProductos((prev) =>
      prev.map((p) => (p.id === actualizado.id ? actualizado : p))
    );
  };

  const toggleEditar = (index: number) => {
    if (!productoActivo) return;

    const nuevos = [...productoActivo.precios];
    nuevos[index].editando = !nuevos[index].editando;

    actualizarProducto({
      ...productoActivo,
      precios: nuevos,
    });
  };

  const editarTarifa = (
    index: number,
    tIndex: number,
    campo: keyof TarifaDistancia,
    valor: string | number
  ) => {
    if (!productoActivo) return;

    const nuevos = [...productoActivo.precios];
    const tarifas = [...nuevos[index].tarifas];

    tarifas[tIndex] = {
      ...tarifas[tIndex],
      [campo]: valor,
    };

    nuevos[index].tarifas = tarifas;

    actualizarProducto({
      ...productoActivo,
      precios: nuevos,
    });
  };

  const agregarTarifa = (index: number) => {
    if (!productoActivo) return;

    const nuevos = [...productoActivo.precios];

    nuevos[index].tarifas.push({
      rango: "Nueva distancia",
      menudeo: 0,
      mayoreo: 0,
      incluyeCarretilla: false,
    });

    actualizarProducto({
      ...productoActivo,
      precios: nuevos,
    });
  };

  const eliminarTarifa = (index: number, tIndex: number) => {
    if (!productoActivo) return;

    const nuevos = [...productoActivo.precios];

    nuevos[index].tarifas = nuevos[index].tarifas.filter(
      (_, i) => i !== tIndex
    );

    actualizarProducto({
      ...productoActivo,
      precios: nuevos,
    });
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-[#f5f1eb] min-h-screen">

      {/* HERO (igual que tu diseño bonito) */}
      <div className="relative w-full h-[260px] md:h-[320px] overflow-hidden">
        <Image
          src="/agregados/banner-agregados.webp"
          alt="Agregados"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
          <h1 className="text-white text-5xl font-black">
            Agregados
          </h1>
        </div>
      </div>

      {/* GRID BONITO */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
            <div className="relative w-full h-[170px] rounded-2xl overflow-hidden">
              <Image
                src={p.imagen}
                alt={p.nombre}
                fill
                className="
                  object-cover
                  group-hover:scale-110
                  transition-transform
                  duration-500
                  "
              />
            </div>

            <h2 className="text-center font-semibold mt-3 text-[#3f2d21]">
              {p.nombre}
            </h2>

            <button
              onClick={() => abrirModal(p)}
              className="mt-4 w-full bg-[#d7bea7] hover:bg-[#c7a789] py-3 rounded-full font-semibold"
            >
              Ver precios
            </button>
          </div>
        ))}
      </div>

    {/* Modal*/}
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
          <div className="relative w-24 h-24 rounded-[24px] overflow-hidden shadow-lg">
            <Image
              src={productoActivo.imagen}
              alt={productoActivo.nombre}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-black text-[#4b3425] tracking-tight">
              {productoActivo.nombre}
            </h2>

            <p className="text-[#7a6a5d] mt-1">
              Tarifas configurables por distancia
            </p>
          </div>
        </div>

          <button
          onClick={cerrarModal}
          className="
            bg-[#e7d8ca]
            hover:bg-[#d9c3af]
            px-5
            py-3
            rounded-2xl
            font-semibold
            transition
          "
        >
          Cerrar
        </button>
      </div>

           {/* CONTENT */}
      <div className="p-8">

        {productoActivo.precios.map((precio, index) => (

          <div key={index}>

            {/* TOP ACTIONS */}
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">

              {/* MEDIDAS */}
              <div className="flex-1">

                <input
                  value={precio.medidas}
                  disabled={!precio.editando}
                  placeholder="Ej: 1m³ / 1 tonelada"
                  className="
                    text-3xl
                    font-black
                    bg-transparent
                    outline-none
                    border-b-2
                    border-[#d8c6b6]
                    py-2
                    w-full
                    text-[#3f2d21]
                  "
                />
              </div>

                            {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3">

                {precio.editando && (
                  <button
                    onClick={() => agregarTarifa(index)}
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
                  onClick={() => toggleEditar(index)}
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
                      precio.editando
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-[#d7bea7] hover:bg-[#c7a789] text-[#3f2d21]"
                    }
                  `}
                >
                  {precio.editando ? (
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
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-7">

              {precio.tarifas.map((t, tIndex) => (

                <div
                  key={tIndex}
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
                  {precio.editando && (
                    <button
                      onClick={() =>
                        eliminarTarifa(index, tIndex)
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
                      <Trash2 size={16} />
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

                  {/* RANGO */}
                  <input
                    value={t.rango}
                    disabled={!precio.editando}
                    onChange={(e) =>
                      editarTarifa(
                        index,
                        tIndex,
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

                  {/* PRECIOS */}
                  <div className="space-y-4">

                    {/* MENUDEO */}
                    <div className="bg-[#f7f3ef] rounded-2xl p-4">

                      <div className="text-xs text-gray-500 mb-1">
                        Menudeo m³
                      </div>

                      <div className="flex items-center gap-2">

                        <span className="text-xl font-bold text-[#9f6f47]">
                          $
                        </span>

                        <input
                          type="number"
                          value={t.menudeo}
                          disabled={!precio.editando}
                          onChange={(e) =>
                            editarTarifa(
                              index,
                              tIndex,
                              "menudeo",
                              Number(e.target.value)
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

                                        {/* MAYOREO */}
                    <div className="bg-[#f7f3ef] rounded-2xl p-4">

                      <div className="text-xs text-gray-500 mb-1">
                        Mayoreo m³
                      </div>

                      <div className="flex items-center gap-2">

                        <span className="text-xl font-bold text-[#9f6f47]">
                          $
                        </span>

                        <input
                          type="number"
                          value={t.mayoreo}
                          disabled={!precio.editando}
                          onChange={(e) =>
                            editarTarifa(
                              index,
                              tIndex,
                              "mayoreo",
                              Number(e.target.value)
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
                                        {/* CARRETILLA */}
                    {t.incluyeCarretilla && (
                      <div className="bg-[#f7f3ef] rounded-2xl p-4">

                        <div className="text-xs text-gray-500 mb-1">
                          Carretilla
                        </div>

                        <div className="flex items-center gap-2">

                          <span className="text-xl font-bold text-[#9f6f47]">
                            $
                          </span>

                          <input
                            type="number"
                            value={t.carretilla}
                            disabled={!precio.editando}
                            onChange={(e) =>
                              editarTarifa(
                                index,
                                tIndex,
                                "carretilla",
                                Number(e.target.value)
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
                    )}
                  </div>

                  
                  {/* BADGE */}
                  <div
                    className="
                      mt-6
                      bg-gradient-to-r
                      from-[#b8875c]
                      to-[#9f6f47]
                      text-white
                      rounded-2xl
                      p-4
                    "
                  >
                    <div className="text-sm opacity-80">
                      Tarifa activa
                    </div>

                    <div className="text-2xl font-black mt-1">
                      {t.rango}
                    </div>
                  </div>

                                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)}
</div> 
  )
}