import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { id } = await params;

    const body = await req.json();

    const { data, error } = await supabase
      .from("maquinaria")
      .update({
        precio_dia: body.precio_dia ? Number(body.precio_dia) : null,
        precio_semana: body.precio_semana ? Number(body.precio_semana) : null,
        precio_quincena: body.precio_quincena ? Number(body.precio_quincena) : null,
        precio_mes: body.precio_mes ? Number(body.precio_mes) : null,
        precio_arrastre: body.precio_arrastre ? Number(body.precio_arrastre) : null,
      })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}