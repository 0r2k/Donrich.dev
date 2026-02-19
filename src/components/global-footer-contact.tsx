"use client";

import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";

import { trackPlausibleEvent } from "@/lib/analytics/plausible";
import { siteConfig } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  company: ""
};

export function GlobalFooterContact() {
  const pathname = usePathname();
  const [formState, setFormState] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formState,
          sourcePath: pathname
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? "No se pudo enviar el formulario");
      }

      setStatus("success");
      trackPlausibleEvent("Lead Form Submitted", {
        path: pathname
      });
      setFormState(initialState);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Ocurrio un error");
    }
  };

  return (
    <footer id="contacto" className="global-footer">
      <div className="container footer-grid">
        <section>
          <p className="eyebrow">Contacto</p>
          <h2>Hablemos de tu proximo proyecto</h2>
          <p>
            Si tienes una idea, un redisenio o un sistema por escalar, te respondo con una propuesta concreta.
          </p>
          <p className="footer-email">
            Email directo: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <ul className="social-links">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <form className="contact-form" onSubmit={onSubmit}>
            <label>
              Nombre
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                required
              />
            </label>
            <label>
              Mensaje
              <textarea
                name="message"
                rows={4}
                value={formState.message}
                onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                required
              />
            </label>

            <label className="hp-field" aria-hidden="true">
              Empresa
              <input
                tabIndex={-1}
                autoComplete="off"
                type="text"
                name="company"
                value={formState.company}
                onChange={(event) => setFormState((prev) => ({ ...prev, company: event.target.value }))}
              />
            </label>

            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Enviar mensaje"}
            </button>
            {status === "success" ? <p className="form-success">Mensaje enviado. Te respondo pronto.</p> : null}
            {status === "error" ? <p className="form-error">{errorMessage}</p> : null}
          </form>
        </section>
      </div>
    </footer>
  );
}
