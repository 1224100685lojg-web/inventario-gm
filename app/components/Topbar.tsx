import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header
      className="
        h-20
        bg-white
        border-b
        px-8
        flex
        items-center
        justify-between
      "
    >

      {/* Search */}
      <div
        className="
          flex
          items-center
          gap-3
          bg-gray-100
          rounded-xl
          px-4
          py-3
          w-[420px]
        "
      >

        <Search size={18} className="text-gray-400" />

        <input
          placeholder="Buscar productos, clientes..."
          className="
            bg-transparent
            outline-none
            text-sm
            w-full
          "
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button
          className="
            relative
            p-3
            rounded-xl
            hover:bg-gray-100
          "
        >

          <Bell size={20} />

          <span
            className="
              absolute
              top-2
              right-2
              h-2
              w-2
              bg-red-500
              rounded-full
            "
          />

        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <div
            className="
              h-11
              w-11
              rounded-full
              bg-sky-600
            "
          />

          <div>
            <p className="text-sm font-medium">
              Owen
            </p>

            <p className="text-xs text-gray-500">
              Administrador
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}