"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

/* ─── TIPOS ─────────────────────────────────────────────── */
interface Precios {
  precio_dia: string;
  precio_semana: string;
  precio_quincena: string;
  precio_mes: string;
  precio_arrastre?: string;
}

interface Maquina {
  id: number;
  nombre: string;
  imagen: string;
  fichaPdf: string;
  nota?: string;

  precio_dia: string | number;
  precio_semana: string | number;
  precio_quincena: string | number;
  precio_mes: string | number;
  precio_arrastre?: string | number;
}
/* ─── COMPONENTE ─────────────────────────────────────────── */
export default function MaquinariaPage() {
  const [modalMaquina, setModalMaquina] = useState<Maquina | null>(null);

  const [modoEdicion, setModoEdicion] = useState(false);

const [preciosEditados, setPreciosEditados] = useState<{
  precio_dia: string;
  precio_semana: string;
  precio_quincena: string;
  precio_mes: string;
  precio_arrastre: string;
}>({
  precio_dia: "",
  precio_semana: "",
  precio_quincena: "",
  precio_mes: "",
  precio_arrastre: "",
});

const [maquinaria, setMaquinaria] = useState<Maquina[]>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/maquinaria");
      const data = await res.json();

      setMaquinaria(data);
    } catch (error) {
      console.error("Error cargando maquinaria:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
if (loading) {
  return (
    <div className="flex items-center justify-center h-screen">
      Cargando maquinaria...
    </div>
  );
}

  /* Abrir PDF en nueva pestaña */
  const abrirFicha = (pdf: string) => {
    window.open(pdf, "_blank");
  };

  /* Abrir modal de precios */
const abrirPrecios = (maquina: Maquina) => {
  setModalMaquina(maquina);

setPreciosEditados({
precio_dia: maquina.precio_dia?.toString() || "",
precio_semana: maquina.precio_semana?.toString() || "",
precio_quincena: maquina.precio_quincena?.toString() || "",
precio_mes: maquina.precio_mes?.toString() || "",
precio_arrastre: maquina.precio_arrastre?.toString() || "",
});

  setModoEdicion(false);
};

  const cerrarModal = () => setModalMaquina(null);


const guardarCambios = async () => {
  if (!modalMaquina) return;

  await fetch(`/api/maquinaria/${modalMaquina.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    precio_dia: preciosEditados.precio_dia,
    precio_semana: preciosEditados.precio_semana,
    precio_quincena: preciosEditados.precio_quincena,
    precio_mes: preciosEditados.precio_mes,
    precio_arrastre: preciosEditados.precio_arrastre,
    }),
  });

  const res = await fetch("/api/maquinaria");
  const data = await res.json();

  setMaquinaria(data);
  setModoEdicion(false);
  setModalMaquina(null);
};
  return (
    <div className="bg-[#efefef] min-h-screen">

      {/* ── HERO ── */}
      <div className="relative w-full h-[220px] md:h-[300px] overflow-hidden">
        <Image
          src="/maquinaria/banner.jpg"
          alt="Renta de maquinaria"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-black tracking-wide drop-shadow-xl text-center">
            Renta de Maquinaria
          </h1>
        </div>
      </div>

      {/* ── GRID DE TARJETAS ── */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {maquinaria.map((item) => (
            <div
              key={item.id}
              className="
                group bg-white rounded-[28px] p-4 shadow-md
                hover:shadow-2xl transition-all duration-300
                hover:-translate-y-1 w-full max-w-[240px]
                flex flex-col
              "
            >
              {/* IMAGEN */}
              <div className="relative w-full h-[170px] rounded-[22px] overflow-hidden">
                <Image
                  src={item.imagen}
                  alt={item.nombre}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* NOMBRE */}
              <h2 className="mt-4 text-lg md:text-xl font-semibold text-center text-[#3f2d21] min-h-[70px] flex items-center justify-center">
                {item.nombre}
              </h2>

              {/* BOTONES */}
              <div className="mt-4 flex flex-col gap-2">
                {/* Ver Precios */}
                <button
                  onClick={() => abrirPrecios(item)}
                  className="
                    w-full bg-[#3f2d21] hover:bg-[#5a3e2b]
                    text-white font-semibold py-3 rounded-full
                    transition-all duration-300 shadow-md hover:shadow-xl
                    text-sm
                  "
                >
                  Ver Precios
                </button>

                {/* Ficha Técnica */}
                <button
                  onClick={() => abrirFicha(item.fichaPdf)}
                  className="
                    w-full bg-[#d7bea7] hover:bg-[#c7a789]
                    text-[#3f2d21] font-semibold py-3 rounded-full
                    transition-all duration-300 shadow-md hover:shadow-xl
                    text-sm
                  "
                >
                  Ficha Técnica
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL PREMIUM ── */}
{modalMaquina && (
  <>
    {/* FONDO */}
    <div
      className="
        fixed inset-0 bg-black/60 backdrop-blur-sm
        z-40
      "
      onClick={cerrarModal}
    />

    {/* CONTENEDOR */}
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-4
      "
    >
      <div
        className="
          relative bg-white
          w-full max-w-5xl
          rounded-[35px]
          overflow-hidden
          shadow-2xl
          animate-fade-up
          grid md:grid-cols-2
        "
      >

        {/* BOTÓN CERRAR */}
        <button
          onClick={cerrarModal}
          className="
            absolute top-5 right-5 z-50
            w-11 h-11 rounded-full
            bg-white/90 hover:bg-white
            shadow-lg
            flex items-center justify-center
            text-xl font-bold
            text-[#3f2d21]
            transition-all
          "
        >
          ✕
        </button>

        {/* LADO IZQUIERDO */}
        <div className="relative min-h-[350px] md:min-h-full bg-[#f7f7f7]">

          <Image
            src={modalMaquina.imagen}
            alt={modalMaquina.nombre}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* TITULO SOBRE IMAGEN */}
          <div className="absolute bottom-0 left-0 p-8">
            <h2
              className="
                text-white
                text-3xl
                md:text-4xl
                font-black
                leading-tight
                drop-shadow-lg
              "
            >
              {modalMaquina.nombre}
            </h2>
          </div>
        </div>

        {/* LADO DERECHO */}
        <div className="p-8 md:p-10 overflow-y-auto">

          {/* HEADER */}
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[4px] text-gray-400">
              Renta de maquinaria
            </p>

            <h3 className="text-3xl font-black text-[#3f2d21] mt-1">
              Lista de precios
            </h3>

            <div className="w-16 h-1 bg-[#d7bea7] rounded-full mt-3" />
          </div>

          {/* PRECIOS */}
          <div className="space-y-4">

{[
  { label: "Día", campo: "precio_dia", valor: preciosEditados.precio_dia },
  { label: "Semana", campo: "precio_semana", valor: preciosEditados.precio_semana },
  { label: "Quincena", campo: "precio_quincena", valor: preciosEditados.precio_quincena },
  { label: "Mes", campo: "precio_mes", valor: preciosEditados.precio_mes },
  { label: "Arrastre", campo: "precio_arrastre", valor: preciosEditados.precio_arrastre },
]
.map((item) => (
  <div
    key={item.label}
    className="
      flex items-center justify-between
      bg-[#f8f8f8]
      border border-[#ececec]
      rounded-2xl
      px-5 py-4
      hover:shadow-md
      transition-all
      gap-4
    "
  >
    <span className="font-semibold text-[#3f2d21] min-w-[100px]">
      {item.label}
    </span>

    {modoEdicion ? (
      <input
        type="text"
        value={item.valor}
            onChange={(e) =>
            setPreciosEditados((prev) => ({
                ...prev,
                [item.campo]: e.target.value,
            }))
            }
        className="
          flex-1
          bg-white
          border border-[#d7bea7]
          rounded-xl
          px-4 py-2
          text-right
          font-bold
          text-[#3f2d21]
          outline-none
          focus:ring-2
          focus:ring-[#d7bea7]
        "
      />
    ) : (
      <span
        className="
          text-xl font-black
          text-[#3f2d21]
        "
      >
        {item.valor || "—"}
      </span>
    )}
  </div>
))}

          </div>

          {/* NOTA */}
          {modalMaquina.nota && (
            <div
              className="
                mt-6 bg-[#fff7ef]
                border border-[#f0dcc5]
                rounded-2xl
                p-4
              "
            >
              <p className="text-sm text-[#6d4c36] leading-relaxed">
                {modalMaquina.nota}
              </p>
            </div>
          )}

          {/* BOTONES */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">

            {/* PDF */}
            <button
              onClick={() => abrirFicha(modalMaquina.fichaPdf)}
              className="
                flex-1 bg-[#d7bea7]
                hover:bg-[#caa789]
                text-[#3f2d21]
                font-bold
                py-4 rounded-2xl
                transition-all duration-300
                shadow-md hover:shadow-xl
              "
            >
              Ver Ficha Técnica
            </button>

{modoEdicion ? (
  <>
    {/* GUARDAR */}
    <button
      onClick={guardarCambios}
      className="
        flex-1 bg-green-600
        hover:bg-green-700
        text-white
        font-bold
        py-4 rounded-2xl
        transition-all duration-300
        shadow-md hover:shadow-xl
      "
    >
      Guardar Cambios
    </button>

    {/* CANCELAR */}
    <button
      onClick={() => setModoEdicion(false)}
      className="
        flex-1 bg-gray-200
        hover:bg-gray-300
        text-[#3f2d21]
        font-bold
        py-4 rounded-2xl
        transition-all duration-300
      "
    >
      Cancelar
    </button>
  </>
) : (
  <button
    onClick={() => setModoEdicion(true)}
    className="
      flex-1 bg-[#3f2d21]
      hover:bg-[#5a3e2b]
      text-white
      font-bold
      py-4 rounded-2xl
      transition-all duration-300
      shadow-md hover:shadow-xl
    "
  >
    Editar Precios
  </button>
)}

          </div>

        </div>
      </div>
    </div>

    {/* ANIMACIONES */}
    <style>{`
      @keyframes fadeUp {
        from {
          opacity: 0;
          transform: translateY(30px) scale(0.97);
        }
        to {
          opacity: 1;
          transform: translateY(0px) scale(1);
        }
      }

      .animate-fade-up {
        animation: fadeUp 0.28s ease-out;
      }
    `}</style>
  </>
)}
    </div>
  );
}
