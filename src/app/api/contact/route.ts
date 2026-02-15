import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

import { sendLeadNotification } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { isRateLimited } from "@/lib/rate-limit";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  message: z.string().trim().min(10).max(2500),
  sourcePath: z.string().trim().optional(),
  company: z.string().optional()
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos invalidos" }, { status: 400 });
  }

  const data = parsed.data;

  if (data.company && data.company.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const forwarded = (await headers()).get("x-forwarded-for") ?? "anonymous";
  const ip = forwarded.split(",")[0]?.trim() || "anonymous";

  if (isRateLimited(`contact:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta mas tarde." }, { status: 429 });
  }

  try {
    const payloadClient = await getPayloadClient();
    await payloadClient.create({
      collection: "leads",
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
        sourcePath: data.sourcePath
      }
    });
  } catch (error) {
    console.error("No fue posible guardar lead en Payload", error);
  }

  try {
    await sendLeadNotification({
      name: data.name,
      email: data.email,
      message: data.message,
      sourcePath: data.sourcePath
    });
  } catch (error) {
    console.error("No fue posible enviar email", error);
  }

  return NextResponse.json({ ok: true });
}
