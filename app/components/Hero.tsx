"use client";

import { useEffect, useState } from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Hero() {

  /* IMAGENES */
  const images = [
    "/hero.jpeg",
    "/hero2.jpeg",
    "/hero3.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  /* CAMBIO AUTOMATICO */
  useEffect(() => {

    const interval = setInterval(() => {

      setCurrent((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );

    }, 4000);

    return () => clearInterval(interval);

  }, []);

  return (
        <section
        id="inicio"
        className="relative w-full h-screen overflow-hidden bg-black"
        >

      {/* HERO IMAGE */}
      <div className="absolute inset-0">

        <div className="relative w-full h-full overflow-hidden">

          {/* IMAGENES */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Construcción"
              className={`
                absolute inset-0
                w-full h-full object-cover
                transition-opacity duration-1000
                ${current === index
                  ? "opacity-100"
                  : "opacity-0"
                }
              `}
            />
          ))}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/45"></div>

        </div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-20 h-full flex flex-col justify-between">

        {/* TEXTO */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[7%] text-white">

          <h1 className="text-5xl md:text-7xl font-bold leading-tight drop-shadow-2xl">
            Materiales <br />
            para construcción
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-gray-200 max-w-[700px]">
            Calidad, resistencia y servicio profesional
            para todos tus proyectos.
          </p>

          {/* BOTONES */}
          <div className="flex flex-wrap gap-5 mt-10">

            <a
              href="#productos"
              className="
                border-2 border-white
                text-white
                px-8 py-4
                rounded-full
                text-lg
                hover:bg-white
                hover:text-black
                transition duration-300
              "
            >
              Ver productos
            </a>

            <a
              href="#contacto"
              className="
                border-2 border-white
                text-white
                px-8 py-4
                rounded-full
                text-lg
                hover:bg-white
                hover:text-black
                transition duration-300
              "
            >
              Contacto
            </a>

          </div>
        </div>

        {/* FOOTER */}
        <div className="relative z-30 bg-[#ececec] min-h-[78px] flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 text-[18px] md:text-[20px] gap-4">

          <p className="text-white-700 font-medium">
            construramaduromexicano@gmail.com
          </p>

          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">

            <p className="text-white-700 font-medium">
              418 - 182 - 6245
            </p>

            {/* ICONOS */}
            <div className="flex gap-4">

              <a
                href="#"
                className="w-14 h-14 rounded-full border-[3px] border-black flex items-center justify-center hover:scale-110 transition duration-300"
              >
                <FaWhatsapp size={24} />
              </a>

              <a
                href="#"
                className="w-14 h-14 rounded-full border-[3px] border-black flex items-center justify-center hover:scale-110 transition duration-300"
              >
                <FaInstagram size={24} />
              </a>

              <a
                href="#"
                className="w-14 h-14 rounded-md border-[3px] border-black flex items-center justify-center hover:scale-110 transition duration-300"
              >
                <FaFacebookF size={22} />
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}