"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

const pad = (n: number) => String(n).padStart(2, "0");
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const todayStart = () => {
  const t = new Date();
  return new Date(t.getFullYear(), t.getMonth(), t.getDate());
};

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  /** Data mínima selecionável (yyyy-mm-dd). Por padrão, hoje. */
  min?: string;
  placeholder?: string;
  /** Abre o calendário acima ou abaixo do campo no desktop. */
  placement?: "top" | "bottom";
  labelClass: string;
  buttonClass: string;
};

export default function DateField({
  label,
  value,
  onChange,
  min,
  placeholder = "dd/mm/aaaa",
  placement = "top",
  labelClass,
  buttonClass,
}: Props) {
  const [open, setOpen] = useState(false);

  const selected = value ? fromISO(value) : undefined;
  const minDate = min ? fromISO(min) : todayStart();
  const display = value ? value.split("-").reverse().join("/") : "";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative block min-w-0">
      <span className={labelClass}>{label}</span>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={`${buttonClass} flex items-center justify-between gap-2 text-left`}
      >
        <span className={display ? "" : "opacity-60"}>{display || placeholder}</span>
        <CalendarDays className="h-4 w-4 shrink-0 text-areia" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-tinta/60 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none"
            />
            <motion.div
              role="dialog"
              aria-label={`Escolher ${label.toLowerCase()}`}
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.97 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={`fixed inset-x-4 bottom-6 z-[80] mx-auto w-auto max-w-sm rounded-3xl bg-cal p-4 normal-case tracking-normal text-tinta shadow-2xl shadow-tinta/40 ring-1 ring-tinta/10 sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-0 sm:mx-0 sm:w-[21rem] ${
                placement === "top" ? "sm:bottom-full sm:mb-3" : "sm:top-full sm:mt-3"
              }`}
            >
              <DayPicker
                mode="single"
                locale={ptBR}
                weekStartsOn={0}
                showOutsideDays
                selected={selected}
                defaultMonth={selected ?? minDate}
                disabled={{ before: minDate }}
                onSelect={(d) => {
                  if (d) {
                    onChange(toISO(d));
                    setOpen(false);
                  }
                }}
                components={{
                  Chevron: ({ orientation, className }) =>
                    orientation === "left" ? (
                      <ChevronLeft className={className} />
                    ) : (
                      <ChevronRight className={className} />
                    ),
                }}
                classNames={{
                  root: "w-full",
                  months: "relative",
                  month: "w-full",
                  nav: "absolute right-0 top-0 z-10 flex items-center gap-1",
                  button_previous:
                    "flex h-9 w-9 items-center justify-center rounded-full bg-areia text-tinta transition hover:bg-terra hover:text-cal disabled:opacity-30",
                  button_next:
                    "flex h-9 w-9 items-center justify-center rounded-full bg-areia text-tinta transition hover:bg-terra hover:text-cal disabled:opacity-30",
                  chevron: "h-4 w-4",
                  month_caption: "flex h-9 items-center",
                  caption_label: "font-display text-xl capitalize text-tinta",
                  month_grid: "mt-3 w-full border-collapse",
                  weekdays: "",
                  weekday: "h-8 text-center text-[11px] font-bold uppercase tracking-wider text-terra",
                  week: "",
                  day: "p-0 text-center align-middle",
                  day_button:
                    "mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition hover:bg-areia",
                  selected:
                    "[&>button]:bg-terra [&>button]:text-cal [&>button]:shadow-md [&>button:hover]:bg-terra",
                  today: "[&>button]:ring-2 [&>button]:ring-terra/50",
                  outside: "opacity-35",
                  disabled: "opacity-25 [&>button]:cursor-not-allowed [&>button:hover]:bg-transparent",
                  hidden: "invisible",
                }}
              />

              <div className="mt-3 flex items-center justify-between border-t border-tinta/10 pt-3 text-sm font-bold">
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setOpen(false);
                  }}
                  className="rounded-full px-3 py-1.5 text-tinta/60 transition hover:bg-areia hover:text-tinta"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const t = todayStart();
                    onChange(toISO(t < minDate ? minDate : t));
                    setOpen(false);
                  }}
                  className="rounded-full bg-terra px-4 py-1.5 text-cal transition hover:bg-madeira"
                >
                  Hoje
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
