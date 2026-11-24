"use client";

import { HOTEL } from "@/lib/config";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cal px-6 text-center text-tinta" role="alert">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-terra">{HOTEL.name}</p>
      <h1 className="font-display text-4xl md:text-5xl">Algo inesperado aconteceu</h1>
      <p className="mt-4 max-w-md text-tinta/75">
        Não foi possível carregar esta seção agora. Você pode tentar novamente ou falar direto conosco pelo WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-terra px-7 py-3.5 text-sm font-medium text-cal transition hover:bg-madeira"
        >
          Tentar novamente
        </button>
        <a
          href={`https://wa.me/${HOTEL.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-tinta/20 px-7 py-3.5 text-sm font-medium text-tinta transition hover:border-terra hover:text-terra"
        >
          Reservar pelo WhatsApp
        </a>
      </div>
    </main>
  );
}
