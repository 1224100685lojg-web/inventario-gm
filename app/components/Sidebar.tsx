"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Boxes,
  Wrench,
  FileText,
  FolderKanban,
  Truck,
  Settings,
} from "lucide-react";

const items = [
  {
    name: "Dashboard",
    href: "/erp",
    icon: LayoutDashboard,
  },
  {
    name: "Inventario",
    href: "/erp/inventario",
    icon: Boxes,
  },
  {
    name: "Renta",
    href: "/erp/renta",
    icon: Truck,
  },
  {
    name: "Proyectos",
    href: "/erp/proyectos",
    icon: FolderKanban,
  },
  {
    name: "Cotizaciones",
    href: "/erp/cotizaciones",
    icon: FileText,
  },
  {
    name: "Herramientas",
    href: "/erp/herramientas",
    icon: Wrench,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        w-72
        bg-[#0B1120]
        text-white
        flex
        flex-col
        border-r
        border-white/10
      "
    >

      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-white/10">

        <div>
          <h1 className="font-bold text-xl tracking-wide">
            CLIMA ERP
          </h1>

          <p className="text-xs text-gray-400 mt-1">
            Enterprise System
          </p>
        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 p-5 space-y-2">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                text-sm
                text-gray-300
                hover:bg-white/10
                hover:text-white
                transition
              "
            >

              <Icon size={18} />

              {item.name}

            </Link>
          );
        })}

      </nav>

      {/* Footer */}
      <div className="p-5 border-t border-white/10">

        <button
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-sm
            text-gray-300
            hover:bg-white/10
            transition
          "
        >

          <Settings size={18} />

          Configuración

        </button>

      </div>

    </aside>
  );
}