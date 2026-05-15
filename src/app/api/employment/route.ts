import { NextResponse } from "next/server";

import { getEmploymentPercent } from "@/lib/employment-store";

export const runtime = "nodejs";

export async function GET() {
  try {
    const percent = await getEmploymentPercent();

    return NextResponse.json({
      ok: true,
      percent,
    });
  } catch (error) {
    console.error("[employment-api] failed to load employment percent", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Employment percent is temporarily unavailable.",
      },
      { status: 500 },
    );
  }
}
