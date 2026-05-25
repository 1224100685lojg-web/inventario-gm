import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    console.log("ID:", id);

    const body = await req.json();

    console.log("BODY:", body);

    const { data, error } = await supabase
      .from("maquinaria")
        .update({
        precio_dia: body.precio_dia
            ? Number(body.precio_dia)
            : null,

        precio_semana: body.precio_semana
            ? Number(body.precio_semana)
            : null,

        precio_quincena: body.precio_quincena
            ? Number(body.precio_quincena)
            : null,

        precio_mes: body.precio_mes
            ? Number(body.precio_mes)
            : null,

        precio_arrastre: body.precio_arrastre
            ? Number(body.precio_arrastre)
            : null,
        })
      .eq("id", id)
      .select();

    if (error) {
      console.log("SUPABASE ERROR:", error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log("SUCCESS:", data);

    return NextResponse.json(data);

  } catch (err) {
    console.log("CATCH ERROR:", err);

    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}