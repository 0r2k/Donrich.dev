import { Resend } from "resend";
import type { EmailAdapter, SendEmailOptions } from "payload";

function toAddressList(value: unknown): string[] {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => toAddressList(item));
  }

  if (typeof value === "object" && value && "address" in value) {
    const maybeAddress = (value as { address?: unknown }).address;
    return typeof maybeAddress === "string" ? [maybeAddress] : [];
  }

  return [];
}

function toSingleFrom(value: unknown): string | undefined {
  const addresses = toAddressList(value);
  return addresses[0];
}

function toBody(value: unknown): string | undefined {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  return undefined;
}

function withDefaultFromAddress(address: string): string {
  const defaultFromName = process.env.CONTACT_FROM_NAME ?? "Donrich Portfolio";
  return `${defaultFromName} <${address}>`;
}

export const resendEmailAdapter: EmailAdapter = ({ payload }) => ({
  name: "resend",
  defaultFromAddress: process.env.CONTACT_FROM_EMAIL ?? "portfolio@localhost.dev",
  defaultFromName: process.env.CONTACT_FROM_NAME ?? "Donrich Portfolio",
  sendEmail: async (message: SendEmailOptions) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      payload.logger.warn("RESEND_API_KEY no configurado. Email omitido.");
      return;
    }

    const resend = new Resend(apiKey);
    const to = toAddressList(message.to);
    if (to.length === 0) {
      payload.logger.warn("Email omitido porque no hay destinatario.");
      return;
    }

    const defaultFromAddress = process.env.CONTACT_FROM_EMAIL ?? "portfolio@localhost.dev";
    const from = toSingleFrom(message.from) ?? withDefaultFromAddress(defaultFromAddress);
    const subject = typeof message.subject === "string" ? message.subject : "Notificacion";
    const html = toBody(message.html);
    const text = toBody(message.text);

    if (!html && !text) {
      payload.logger.warn("Email omitido porque no tiene contenido.");
      return;
    }

    const htmlBody = html ?? text ?? "";
    const cc = toAddressList(message.cc);
    const bcc = toAddressList(message.bcc);
    const replyTo = toAddressList((message as { replyTo?: unknown }).replyTo);

    await resend.emails.send({
      from,
      to: to.length === 1 ? to[0] : to,
      subject,
      html: htmlBody,
      text,
      cc: cc.length > 0 ? cc : undefined,
      bcc: bcc.length > 0 ? bcc : undefined,
      replyTo: replyTo.length > 0 ? (replyTo.length === 1 ? replyTo[0] : replyTo) : undefined
    });
  }
});
