import { Resend } from "resend";

import type { LeadPayload } from "@/lib/types";

export async function sendLeadNotification(payload: LeadPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return;
  }

  const resend = new Resend(apiKey);
  const from = process.env.CONTACT_FROM_EMAIL ?? "portfolio@localhost.dev";

  await resend.emails.send({
    from,
    to,
    subject: `Nuevo lead: ${payload.name}`,
    text: [
      `Nombre: ${payload.name}`,
      `Email: ${payload.email}`,
      `Origen: ${payload.sourcePath ?? "desconocido"}`,
      "",
      payload.message
    ].join("\n")
  });
}
