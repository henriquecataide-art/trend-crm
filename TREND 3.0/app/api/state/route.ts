import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRest } from "@/lib/supabase-server";

export async function GET() {
  if (!supabaseConfigured) return NextResponse.json({ configured: false, data: null });
  const response = await supabaseRest("crm_state?id=eq.main&select=payload&limit=1");
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: 502 });
  const rows = await response.json() as { payload: unknown }[];
  return NextResponse.json({ configured: true, data: rows[0]?.payload ?? null });
}

export async function PUT(request: Request) {
  if (!supabaseConfigured) return NextResponse.json({ configured: false });
  const data = await request.json();
  const response = await supabaseRest("crm_state?on_conflict=id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ id: "main", payload: data, updated_at: new Date().toISOString() }),
  });
  if (!response.ok) return NextResponse.json({ error: await response.text() }, { status: 502 });
  return NextResponse.json({ ok: true, configured: true });
}
