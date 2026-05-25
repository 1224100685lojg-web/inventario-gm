"use client";

import Image from "next/image";
import {
  Bolt,
  Lightbulb,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export default function ElectricidadPage() {
  return (
    <div className="bg-[#efefef] min-h-screen">

      {/* HERO */}
      <section className="relative w-full h-[320px] overflow-hidden">
        <Image
          src="/electricidad/banner.jpg"
          alt="Electricidad"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="
              text-white
              text-5xl
              md:text-7xl
              font-black
              tracking-wide
              drop-shadow-2xl
            "
          >
            Electricidad
          </h1>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* TITULO */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div
            className="
              inline-flex
              items-center
              gap-3
              bg-yellow-100
              text-yellow-800
              px-6
              py-3
              rounded-full
              font-bold
              mb-6
            "
          >
            <Bolt size={22} />
            Instalaciones Eléctricas
          </div>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-black
              text-[#2d2d2d]
              mb-6
            "
          >
            Diseño e instalación profesional
          </h2>

          <p
            className="
              text-xl
              text-gray-600
              leading-relaxed
            "
          >
            Diseñamos, instalamos y damos mantenimiento
            a sistemas eléctricos residenciales,
            comerciales e industriales con seguridad,
            eficiencia y tecnología moderna.
          </p>
        </div>

        {/* SECCIÓN CENTRAL */}
        <div
          className="
            grid
            md:grid-cols-3
            gap-10
            items-center
            mb-24
          "
        >

          {/* TEXTO IZQUIERDA */}
          <div
            className="
              bg-white
              rounded-[35px]
              p-10
              shadow-xl
              text-center
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-full
                bg-yellow-100
                flex
                items-center
                justify-center
                mx-auto
                mb-6
              "
            >
              <Lightbulb
                size={30}
                className="text-yellow-600"
              />
            </div>

            <h3
              className="
                text-3xl
                font-black
                text-[#2d2d2d]
                mb-5
              "
            >
              Diseño de Sistemas
            </h3>

            <p
              className="
                text-gray-600
                text-lg
                leading-relaxed
              "
            >
              Analizamos la demanda energética y el
              tipo de inmueble para crear sistemas
              eficientes, seguros y preparados para
              crecimiento futuro.
            </p>
          </div>

          {/* IMAGEN CENTRAL */}
          <div
            className="
              relative
              h-[520px]
              rounded-[40px]
              overflow-hidden
              shadow-2xl
            "
          >
            <Image
              src="/electricidad/rayo.jpeg"
              alt="Electricidad"
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>

          {/* TEXTO DERECHA */}
          <div
            className="
              bg-white
              rounded-[35px]
              p-10
              shadow-xl
              text-center
            "
          >
            <div
              className="
                w-16
                h-16
                rounded-full
                bg-green-100
                flex
                items-center
                justify-center
                mx-auto
                mb-6
              "
            >
              <ShieldCheck
                size={30}
                className="text-green-600"
              />
            </div>

            <h3
              className="
                text-3xl
                font-black
                text-[#2d2d2d]
                mb-5
              "
            >
              Instalación Segura
            </h3>

            <p
              className="
                text-gray-600
                text-lg
                leading-relaxed
              "
            >
              Cada conexión, canalización y tablero
              se instala con precisión para reducir
              riesgos, fallas y sobrecargas.
            </p>
          </div>
        </div>

        {/* IMAGEN GRANDE */}
        <div
          className="
            relative
            w-full
            h-[500px]
            rounded-[45px]
            overflow-hidden
            shadow-2xl
            mb-20
          "
        >
          <Image
            src="/electricidad/foco.jpg"
            alt="Instalaciones eléctricas"
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />

          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
              text-center
              px-6
            "
          >
            <div
              className="
                bg-white/20
                backdrop-blur-md
                border
                border-white/20
                rounded-[35px]
                p-10
                max-w-3xl
              "
            >
              <h3
                className="
                  text-white
                  text-4xl
                  md:text-5xl
                  font-black
                  mb-6
                "
              >
                Soluciones eléctricas completas
              </h3>

              <p
                className="
                  text-white/90
                  text-xl
                  leading-relaxed
                "
              >
                Trabajamos en proyectos residenciales,
                comerciales e industriales ofreciendo
                calidad, seguridad y eficiencia
                energética.
              </p>
            </div>
          </div>
        </div>

        {/* SERVICIOS */}
        <div className="grid md:grid-cols-3 gap-8">

          <div
            className="
              bg-white
              rounded-[35px]
              p-10
              shadow-xl
            "
          >
            <Wrench
              size={38}
              className="text-yellow-600 mb-5"
            />

            <h3
              className="
                text-2xl
                font-black
                text-[#2d2d2d]
                mb-4
              "
            >
              Mantenimiento
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Diagnóstico, reparación y mantenimiento
              preventivo de instalaciones eléctricas.
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-[35px]
              p-10
              shadow-xl
            "
          >
            <Bolt
              size={38}
              className="text-yellow-600 mb-5"
            />

            <h3
              className="
                text-2xl
                font-black
                text-[#2d2d2d]
                mb-4
              "
            >
              Media y Baja Tensión
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Instalación y distribución eléctrica
              para proyectos residenciales,
              comerciales e industriales.
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-[35px]
              p-10
              shadow-xl
            "
          >
            <ShieldCheck
              size={38}
              className="text-yellow-600 mb-5"
            />

            <h3
              className="
                text-2xl
                font-black
                text-[#2d2d2d]
                mb-4
              "
            >
              Seguridad Eléctrica
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Protección, normativas y sistemas
              diseñados para máxima seguridad.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}