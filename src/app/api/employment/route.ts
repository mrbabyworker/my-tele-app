import { NextResponse } from "next/server";

import { getEmploymentPercent } from "@/lib/employment-store";

export const runtime = "nodejs";

export async function GET() {
  const percent = await getEmploymentPercent();

  return NextResponse.json({
    ok: true,
    percent,
  });
}
