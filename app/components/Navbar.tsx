"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, X, Search, ChevronRight } from "lucide-react";


type MenuItem = {
  name: string;
  link?: string;
  slug?: string;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

const openMenu = (menu: string) => {
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }

  setActiveMenu(menu);
};

const closeMenu = () => {
  timeoutRef.current = setTimeout(() => {
    setActiveMenu(null);
  }, 200);
};

  /* CATEGORÍAS */

  const menuItems: {
    materiales: MenuItem[];
    rentaMaquinaria: MenuItem[];
    lineaBlanca: MenuItem[];
    electricidad: MenuItem[];
    concretera: MenuItem[];

  } = {
    rentaMaquinaria: [
      {
        name: "Todas las máquinas",
        link: "/admin/maquinaria",
      },
      {
        name: "Excavadoras",
        link: "/admin/maquinaria?cat=Excavadoras",
      },
      {
        name: "Compactación",
        link: "/admin/maquinaria?cat=Compactacion",
      },
      {
        name: "Carga y Elevación",
        link: "/admin/maquinaria?cat=Carga",
      },
      {
        name: "Nivelación",
        link: "/admin/maquinaria?cat=Nivelacion",
      },
      {
        name: "Transporte",
        link: "/admin/maquinaria?cat=Transporte",
      },
      {
        name: "Tractores",
        link: "/admin/maquinaria?cat=Tractores",
      },
    ],

    materiales: [
      {
        name: "Aceros",
        link: "/admin/aceros",
      },
      {
        name: "Polvos",
        link: "/admin/polvos",
      },
      {
        name: "Block",
        link: "/admin/block",
      },
      {
        name: "Agregados",
        link: "/admin/agregados",
      },
    ],

lineaBlanca: [
  {
    name: "Ver todos los productos",
    slug: "todos",
  },

  {
    name: "Ventiladores",
    slug: "ventiladores",
  },

  {
    name: "Congeladores",
    slug: "congeladores",
  },

  {
    name: "Estufas",
    slug: "estufas",
  },

  {
    name: "Refrigeradores",
    slug: "refrigeradores",
  },

  {
    name: "Lavadoras",
    slug: "lavadoras",
  },

  {
    name: "Refacciones",
    slug: "refacciones",
  },

  {
    name: "Microondas",
    slug: "microondas",
  },

  {
    name: "Minisplits",
    slug: "minisplits",
  },

  {
    name: "Aires Acondicionados",
    slug: "aires-acondicionados",
  },

  {
    name: "Televisiones",
    slug: "televisiones",
  },

  {
    name: "Bocinas",
    slug: "bocinas",
  },

  {
    name: "Audífonos",
    slug: "audifonos",
  },

  {
    name: "Licuadoras",
    slug: "licuadoras",
  },

  {
    name: "Cafeteras",
    slug: "cafeteras",
  },

  {
    name: "Hornos",
    slug: "hornos",
  },

  {
    name: "Parrillas",
    slug: "parrillas",
  },

  {
    name: "Extractores",
    slug: "extractores",
  },
],
electricidad: [
  {
    name: "Ver todo",
    link: "/admin/electricidad",
  },
],
concretera: [
  {
    name: "Servicios",
    link: "/admin/concretera",
  },
],

  };

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/70
        backdrop-blur-xl
        border-b border-white/20
        shadow-[0_8px_30px_rgba(0,0,0,0.06)]
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-between gap-8">
          {/* NAV */}
          <nav className="flex items-center gap-3">
            <Link
              href="#inicio"
              className="
                px-5 py-3 rounded-2xl
                text-gray-800 font-medium
                hover:bg-black
                hover:text-white
                transition-all duration-300
              "
            >
              Inicio
            </Link>

            <Link
              href="#nosotros"
              className="
                px-5 py-3 rounded-2xl
                text-gray-800 font-medium
                hover:bg-black
                hover:text-white
                transition-all duration-300
              "
            >
              Nosotros
            </Link>

            {/* MATERIALES */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("materiales")}
              onMouseLeave={closeMenu}
            >
              <button
                className="
                  px-5 py-3 rounded-2xl
                  text-gray-800 font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Materiales
              </button>

              {activeMenu === "materiales" && (
                <div
                  className="
                    absolute top-[78px] left-1/2
                    -translate-x-1/2
                    w-[500px]
                    bg-white/95
                    backdrop-blur-xl
                    rounded-3xl
                    shadow-[0_15px_60px_rgba(0,0,0,0.12)]
                    border border-gray-100
                    p-6
                    animate-in fade-in zoom-in-95 duration-200
                  "
                >
                  <div className="mb-5">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Materiales
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Explora categorías disponibles
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {menuItems.materiales.map((item) => (
                      <Link
                        key={item.name}
                        href={item.link!}
                        className="
                          group
                          p-4 rounded-2xl
                          bg-gray-50
                          hover:bg-orange-50
                          border border-transparent
                          hover:border-orange-100
                          transition-all duration-300
                        "
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>

                          <ChevronRight
                            size={18}
                            className="
                              text-gray-400
                              group-hover:text-orange-500
                              transition-all
                            "
                          />
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          Ver productos
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MAQUINARIA */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("rentaMaquinaria")}
              onMouseLeave={closeMenu}
            >
              <button
                className="
                  px-5 py-3 rounded-2xl
                  text-gray-800 font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Renta de Maquinaria
              </button>

              {activeMenu === "rentaMaquinaria" && (
                <div
                  className="
                    absolute top-[78px] left-1/2
                    -translate-x-1/2
                    w-[650px]
                    bg-white/95
                    backdrop-blur-xl
                    rounded-3xl
                    shadow-[0_15px_60px_rgba(0,0,0,0.12)]
                    border border-gray-100
                    p-6
                    animate-in fade-in zoom-in-95 duration-200
                  "
                >
                  <div className="mb-5">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Maquinaria
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Equipo para construcción y transporte
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {menuItems.rentaMaquinaria.map((item) => (
                      <Link
                        key={item.name}
                        href={item.link!}
                        className="
                          group
                          p-4 rounded-2xl
                          bg-gray-50
                          hover:bg-orange-50
                          border border-transparent
                          hover:border-orange-100
                          transition-all duration-300
                        "
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>

                          <ChevronRight
                            size={18}
                            className="
                              text-gray-400
                              group-hover:text-orange-500
                              transition-all
                            "
                          />
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          Ver maquinaria
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* LINEA BLANCA */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("lineablanca")}
              onMouseLeave={closeMenu}
            >
              <button
                className="
                  px-5 py-3 rounded-2xl
                  text-gray-800 font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Línea Blanca
              </button>

              {activeMenu === "lineablanca" && (
                <div
                  className="
                    absolute top-[78px] left-1/2
                    -translate-x-1/2
                    w-[700px]
                    bg-white/95
                    backdrop-blur-xl
                    rounded-3xl
                    shadow-[0_15px_60px_rgba(0,0,0,0.12)]
                    border border-gray-100
                    p-6
                    animate-in fade-in zoom-in-95 duration-200
                  "
                >
                  <div className="mb-5">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Línea Blanca
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Productos para hogar y oficina
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-2">
                    {menuItems.lineaBlanca.map((item) => (
                      <Link
                        key={item.name}
                        href={`/admin/productos/${item.slug}`}
                        className="
                          group
                          p-4 rounded-2xl
                          bg-gray-50
                          hover:bg-orange-50
                          border border-transparent
                          hover:border-orange-100
                          transition-all duration-300
                        "
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>

                          <ChevronRight
                            size={18}
                            className="
                              text-gray-400
                              group-hover:text-orange-500
                              transition-all
                            "
                          />
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          Ver productos
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* ELECTRICIDAD */}
<div
  className="relative"
  onMouseEnter={() => openMenu("electricidad")}
  onMouseLeave={closeMenu}
>
  <button
    className="
      px-5 py-3 rounded-2xl
      text-gray-800 font-medium
      hover:bg-black
      hover:text-white
      transition-all duration-300
    "
  >
    Electricidad
  </button>

  {activeMenu === "electricidad" && (
    <div
      className="
        absolute top-[78px] left-1/2
        -translate-x-1/2
        w-[550px]
        bg-white/95
        backdrop-blur-xl
        rounded-3xl
        shadow-[0_15px_60px_rgba(0,0,0,0.12)]
        border border-gray-100
        p-6
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-gray-900">
          Electricidad
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Servicios y proyectos eléctricos
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {menuItems.electricidad.map((item) => (
          <Link
            key={item.name}
            href={item.link!}
            className="
              group
              p-4 rounded-2xl
              bg-gray-50
              hover:bg-orange-50
              border border-transparent
              hover:border-orange-100
              transition-all duration-300
            "
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">
                {item.name}
              </p>

              <ChevronRight
                size={18}
                className="
                  text-gray-400
                  group-hover:text-orange-500
                  transition-all
                "
              />
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Ver información
            </p>
          </Link>
        ))}
      </div>
    </div>
  )}
</div>

{/* CONCRETERA */}
<div
  className="relative"
  onMouseEnter={() => openMenu("concretera")}
  onMouseLeave={closeMenu}
>
  <button
    className="
      px-5 py-3 rounded-2xl
      text-gray-800 font-medium
      hover:bg-black
      hover:text-white
      transition-all duration-300
    "
  >
    Concretera
  </button>

  {activeMenu === "concretera" && (
    <div
      className="
        absolute top-[78px] left-1/2
        -translate-x-1/2
        w-[450px]
        bg-white/95
        backdrop-blur-xl
        rounded-3xl
        shadow-[0_15px_60px_rgba(0,0,0,0.12)]
        border border-gray-100
        p-6
        animate-in fade-in zoom-in-95 duration-200
      "
    >
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-gray-900">
          Concretera
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Servicios de concreto y construcción
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {menuItems.concretera.map((item) => (
          <Link
            key={item.name}
            href={item.link!}
            className="
              group
              p-4 rounded-2xl
              bg-gray-50
              hover:bg-orange-50
              border border-transparent
              hover:border-orange-100
              transition-all duration-300
            "
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800">
                {item.name}
              </p>

              <ChevronRight
                size={18}
                className="
                  text-gray-400
                  group-hover:text-orange-500
                  transition-all
                "
              />
            </div>

            <p className="text-sm text-gray-500 mt-1">
              Ver servicios
            </p>
          </Link>
        ))}
      </div>
    </div>
  )}
</div>
          </nav>

          {/* BUSCADOR */}
          <div
            className="
              bg-white/80
              backdrop-blur-xl
              w-[420px]
              h-[58px]
              rounded-2xl
              border border-gray-200
              shadow-lg
              flex items-center
              px-5
              focus-within:ring-2
              focus-within:ring-orange-400
              transition-all
            "
          >
            <Search size={22} className="text-gray-400" />

            <input
              type="text"
              placeholder="Buscar maquinaria, materiales..."
              className="
                bg-transparent
                outline-none
                ml-4
                w-full
                text-gray-800
                placeholder:text-gray-400
              "
            />
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center justify-between">
          <button
            onClick={() => setOpen(!open)}
            className="
              bg-black
              text-white
              p-3
              rounded-2xl
              shadow-lg
            "
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div
            className="
              md:hidden
              mt-5
              bg-white/95
              backdrop-blur-xl
              rounded-3xl
              p-5
              shadow-[0_15px_60px_rgba(0,0,0,0.12)]
              border border-gray-100
              animate-in fade-in slide-in-from-top-2 duration-200
            "
          >
            {/* SEARCH */}
            <div
              className="
                bg-gray-100
                rounded-2xl
                flex items-center
                px-5
                h-[56px]
                mb-6
              "
            >
              <Search size={22} className="text-gray-400" />

              <input
                type="text"
                placeholder="Buscar..."
                className="
                  bg-transparent
                  outline-none
                  ml-3
                  w-full
                  text-gray-800
                "
              />
            </div>

            {/* NAV */}
            <nav className="flex flex-col gap-3">
              <a
                href="#inicio"
                className="
                  px-5 py-4 rounded-2xl
                  bg-gray-50
                  text-gray-800
                  font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Inicio
              </a>

              <a
                href="#nosotros"
                className="
                  px-5 py-4 rounded-2xl
                  bg-gray-50
                  text-gray-800
                  font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Nosotros
              </a>

              <a
                href="#productos"
                className="
                  px-5 py-4 rounded-2xl
                  bg-gray-50
                  text-gray-800
                  font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Materiales
              </a>

              <a
                href="#maquinaria"
                className="
                  px-5 py-4 rounded-2xl
                  bg-gray-50
                  text-gray-800
                  font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Renta de Maquinaria
              </a>

              <a
                href="#lineablanca"
                className="
                  px-5 py-4 rounded-2xl
                  bg-gray-50
                  text-gray-800
                  font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Línea Blanca
              </a>

                <a
                href="#electricidad"
                className="
                  px-5 py-4 rounded-2xl
                  bg-gray-50
                  text-gray-800
                  font-medium
                  hover:bg-black
                  hover:text-white
                  transition-all duration-300
                "
              >
                Electricidad
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}