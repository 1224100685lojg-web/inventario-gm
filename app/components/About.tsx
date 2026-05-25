export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Texto */}
        <div>
          <p className="text-sky-600 font-medium">Quiénes somos</p>

          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">
            Especialistas
          </h2>

          <p className="text-gray-600 mt-6 leading-relaxed">
            Somos una empresa dedicada a la venta
          </p>

          <p className="text-gray-600 mt-4 leading-relaxed">
            Nuestro objetivo es garantizar
          </p>
        </div>

        {/* Tarjeta visual */}
        <div className="bg-gradient-to-br from-sky-50 to-white border border-gray-200 rounded-2xl p-10 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900">
            Compromiso
          </h3>

          <ul className="mt-6 space-y-4 text-gray-600">
            <li>✔ Instalaciones profesionales</li>
            <li>✔ Equipos de alta eficiencia</li>
            <li>✔ Mantenimiento confiable</li>
            <li>✔ Atención personalizada</li>
          </ul>
        </div>

      </div>
    </section>
  );
}