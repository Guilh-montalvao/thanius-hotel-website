"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  Clock,
  Coffee,
  Snowflake,
  Car,
  Wifi,
  MapPin,
  Star,
  Phone,
  ArrowUpRight,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import Smooth from "./Smooth";
import DateField from "./DateField";
import { HOTEL } from "@/lib/config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  ["O Hotel", "#hotel"],
  ["Sr. Agostinho", "#fundador"],
  ["Café da Manhã", "#cafe"],
  ["Acomodações", "#comodidades"],
  ["Pátio 360°", "#estrutura"],
  ["Depoimentos", "#depoimentos"],
  ["Reservas", "#reservas"],
] as const;

const HERO_SCENES = [
  {
    src: "/cafe da manha tudo reunido na imagem.png",
    tag: "Café da manhã incluso",
    headline: "Chegue a qualquer hora. Acorde com mesa farta.",
  },
  {
    src: "/fachada.png",
    tag: "Av. Confúcio, 215 · Centro",
    headline: "Portaria 24h no coração de Montalvânia.",
  },
  {
    src: "/Buffet de café da manhã iluminado-4.png",
    tag: "Preparado às 3h30 da manhã",
    headline: "Pátio fechado, quarto fresco e café mineiro.",
  },
] as const;

const BREAKFAST_SLIDES = [
  {
    num: "01",
    title: "Salão Completo",
    sub: "Mesa posta logo cedo · Incluso em todas as diárias",
    src: "/cafe da manha tudo reunido na imagem.png",
    pos: "object-center",
  },
  {
    num: "02",
    title: "Pães, Bolos & Quitandas",
    sub: "Pão de queijo mineiro, roscas, biscoitos e forno do dia",
    src: "/Buffet de café da manhã iluminado-4.png",
    pos: "object-[center_45%]",
  },
  {
    num: "03",
    title: "6 Sucos & Café Quente",
    sub: "Sucos naturais frescos e café passado na hora nas térmicas",
    src: "/Balcão de bebidas em luz suave-2.png",
    pos: "object-center",
  },
  {
    num: "04",
    title: "Frutas da Estação",
    sub: "Mamão, melancia, banana, maçã e laranja cortados na manhã",
    src: "/Mesa de frutas sob armários de vidro-3.png",
    pos: "object-[center_65%]",
  },
  {
    num: "05",
    title: "Zelo & Limpeza",
    sub: "Louças protegidas em cristaleira fechada e luz natural",
    src: "/Mesa de frutas com luz suave-1.png",
    pos: "object-[center_56%]",
  },
] as const;

const AMENITY_ROWS = [
  {
    icon: Clock,
    title: "Recepção & Portaria 24 Horas",
    tag: "Chegue a qualquer hora do dia ou da madrugada",
    bg: "/fachada.png",
  },
  {
    icon: Snowflake,
    title: "Ar-Condicionado, TV & Frigobar",
    tag: "Camas confortáveis, roupa de cama limpa e quarto geladinho",
    bg: "/patio-panoramico.png",
  },
  {
    icon: Coffee,
    title: "Café da Manhã do Sr. Agostinho",
    tag: "Preparado às 3h30 da manhã · Incluso na diária",
    bg: "/cafe da manha tudo reunido na imagem.png",
  },
  {
    icon: Car,
    title: "Pátio Fechado & Quartos Térreos",
    tag: "Estacione com segurança a poucos passos da sua porta, sem escadas",
    bg: "/patio-panoramico.png",
  },
  {
    icon: Wifi,
    title: "Wi-Fi Rápido no Centro",
    tag: "Av. Confúcio, 215 · Perto de bancos, restaurantes e comércio",
    bg: "/montalvania-aerea.jpg",
  },
] as const;

const REAL_REVIEWS = [
  {
    name: "Geraldo Santos",
    role: "Local Guide · 39 avaliações · Férias em Família",
    source: "Google Maps",
    date: "5,0 ★ no Google",
    avatar: "/avatars/geraldo.png",
    headline: "Sr. Agostinho, pessoa culta e educada que nos atendeu muito bem.",
    quote:
      "O hotel é simples porém muito limpo e adequado pra mim e família. O café da manhã é farto e com muitas opções. Voltarei com certeza na próxima vez que estiver no norte de Minas.",
    bg: "/cafe da manha tudo reunido na imagem.png",
  },
  {
    name: "Ladislau L",
    role: "Viajou em casal · Setembro de 2025",
    source: "Tripadvisor",
    date: "5,0 ●●●●● no Tripadvisor",
    avatar: "/avatars/ladislau.png",
    headline: "Atendimento diferenciado pela simpatia. O café da manhã é maravilhoso.",
    quote:
      "Ótimo lugar, com atendimento excelente. Colaboradores simpáticos e comunicativos. Pra quem gosta de conhecer o Brasil e não quer se estressar com o atendimento, esse é o local ideal.",
    bg: "/Balcão de bebidas em luz suave-2.png",
  },
  {
    name: "Adriano H",
    role: "Presidente Prudente, SP · Viajou a trabalho",
    source: "Tripadvisor",
    date: "Nota máxima em Custo, Quartos e Atendimento",
    avatar: "/avatars/adriano.png",
    headline: "O proprietário Sr. Agostinho é uma ótima pessoa, recomendo a todos.",
    quote:
      "Excelente hotel, segurança, estacionamento, ótimo quarto com ar-condicionado, TV e frigobar, sem falar do ótimo café da manhã, melhor preço e localização.",
    bg: "/patio-panoramico.png",
  },
  {
    name: "imagoUFRJ",
    role: "Negócios | Amigos · 6 avaliações",
    source: "Google Maps",
    date: "5,0 ★ no Google",
    avatar: "/avatars/imagoufrj.png",
    headline: "Sr. Agostinho é uma pessoa excepcional! Seu hotel é o melhor de Montalvânia.",
    quote:
      "Hospitalidade autêntica no coração da cidade. Referência absoluta para quem vem a Montalvânia a trabalho ou com amigos.",
    bg: "/fachada.png",
  },
  {
    name: "millah O",
    role: "Estadia de 3 dias · Janeiro de 2023",
    source: "Tripadvisor",
    date: "5,0 ●●●●● no Tripadvisor",
    avatar: "/avatars/millah.png",
    headline: "Quartos limpos, camas super confortáveis e o melhor café da manhã.",
    quote:
      "Passei três dias no hotel. O melhor sem dúvidas! Fomos super bem recebidos. Quando for passear nessa cidade maravilhosa novamente, com certeza retornarei.",
    bg: "/Buffet de café da manhã iluminado-4.png",
  },
  {
    name: "Guilherme Reis",
    role: "Férias | Família · 10 fotos no Google",
    source: "Google Maps",
    date: "5,0 ★ · Hóspede recorrente",
    avatar: "/avatars/guilherme.png",
    headline: "Melhor hotel em Montalvânia, já me hospedei 3 vezes nele, café da manhã ótimo.",
    quote:
      "Quem conhece volta sempre: conforto garantido, pátio seguro e mesa farta todas as manhãs.",
    bg: "/Mesa de frutas sob armários de vidro-3.png",
  },
  {
    name: "Rodolpho Ferreira de Aquino",
    role: "11 avaliações no Google",
    source: "Google Maps",
    date: "5,0 ★ no Google",
    avatar: "/avatars/rodolpho.png",
    headline: "Passando por Montalvânia não deixo de me hospedar no Thanyu’s Hotel.",
    quote:
      "Excelente atendimento, o proprietário é prestativo e muito acolhedor, os funcionários nota 10.",
    bg: "/fachada.png",
  },
  {
    name: "LIPE Teixeira",
    role: "Local Guide · 20 avaliações",
    source: "Google Maps",
    date: "5,0 ★ no Google",
    avatar: null,
    initials: "LT",
    headline: "Melhor da cidade sem dúvidas.",
    quote:
      "Localização central na Av. Confúcio, atendimento 24 horas e tradição que todo mundo em Montalvânia conhece e confia.",
    bg: "/montalvania-aerea.jpg",
  },
] as const;

function GoogleLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.53-1.14 2.83-2.4 3.69v3.06h3.88c2.27-2.09 3.54-5.17 3.54-8.99z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.06c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.16C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.23c-.24-.72-.38-1.49-.38-2.23s.14-1.51.38-2.23V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.16z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.16c.95-2.85 3.6-4.96 6.72-4.96z"
      />
    </svg>
  );
}

function TripadvisorLogo({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#34E0A1" />
      <path
        fill="#000000"
        d="M19.2 9.48l1.33-1.45h-2.95A8.98 8.98 0 0012 6.4c-2.08 0-4.01.6-5.58 1.63H3.47L4.8 9.48a4.54 4.54 0 00-1.45 3.32c0 2.52 2.05 4.56 4.57 4.56 1.56 0 2.94-.78 3.76-1.97l.32.51.32-.51a4.55 4.55 0 003.76 1.97c2.52 0 4.57-2.04 4.57-4.56 0-1.3-.56-2.49-1.45-3.32zM7.92 15.82a3.02 3.02 0 110-6.04 3.02 3.02 0 010 6.04zm4.08-3.1a4.55 4.55 0 00-3.17-4.27 7.45 7.45 0 016.34 0A4.55 4.55 0 0012 12.72zm4.08 3.1a3.02 3.02 0 110-6.04 3.02 3.02 0 010 6.04z"
      />
      <circle cx="7.92" cy="12.8" r="1.55" fill="#000000" />
      <circle cx="16.08" cy="12.8" r="1.55" fill="#000000" />
    </svg>
  );
}

function Rotating24hSeal({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const tween = gsap.to(svgRef.current, {
      rotation: 360,
      duration: 18,
      repeat: -1,
      ease: "none",
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className={`relative flex h-24 w-24 items-center justify-center select-none ${className}`}>
      <svg ref={svgRef} viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path
            id="circlePath24h"
            d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
          />
        </defs>
        <text className="fill-areia font-sans text-[10.2px] font-bold uppercase tracking-[0.22em]">
          <textPath href="#circlePath24h">RECEPÇÃO 24 HORAS • MONTALVÂNIA • </textPath>
        </text>
      </svg>
      <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-terra font-display text-sm text-cal shadow-lg">
        24h
      </div>
    </div>
  );
}

function Header() {
  const { scrollY } = useScroll();
  const [hide, setHide] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    if (!menuOpen) setHide(y > (scrollY.getPrevious() ?? 0) && y > 240);
  });

  return (
    <motion.header
      animate={{ y: hide ? "-130%" : 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-cal/95 px-4 py-2.5 shadow-lg shadow-tinta/10 backdrop-blur-md sm:px-6 sm:py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#top" className="font-display text-lg text-tinta sm:text-xl">
            Thanyu’s <span className="text-terra">Hotel</span>
          </a>
          <span className="inline-flex items-center gap-1 rounded-full bg-terra/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-terra sm:text-[11px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terra" />
            24h
          </span>
        </div>

        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="font-medium text-tinta/75 transition hover:text-terra">
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#reservas"
            className="rounded-full bg-terra px-4 py-2 text-xs font-semibold text-cal transition hover:bg-madeira sm:px-5 sm:text-sm"
          >
            Reservar
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-areia text-tinta transition hover:bg-terra hover:text-cal lg:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mx-auto mt-2 flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2.5 rounded-3xl bg-cal/95 px-5 py-4 text-xs font-bold uppercase tracking-wider text-tinta shadow-xl backdrop-blur-md lg:hidden"
          >
            {NAV.map(([l, h]) => (
              <a
                key={h}
                href={h}
                onClick={() => setMenuOpen(false)}
                className="py-1 transition hover:text-terra"
              >
                {l}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [sceneIdx, setSceneIdx] = useState(0);
  const [f, setF] = useState({ nome: "", entrada: "", saida: "", hospedes: "2" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => {
      setSceneIdx((prev) => (prev + 1) % HERO_SCENES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const fmt = (d: string) => (d ? d.split("-").reverse().join("/") : "a combinar");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Gostaria de reservar no Thanyu’s Hotel. Nome: ${f.nome || "Hóspede"}. Entrada: ${fmt(f.entrada)}. Saída: ${fmt(f.saida)}. Hóspedes: ${f.hospedes}.`;
    window.open(`https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const scene = HERO_SCENES[sceneIdx];
  const heroInput =
    "mt-1 w-full min-w-0 border-b border-cal/50 bg-transparent pb-2 text-sm font-medium text-cal placeholder-cal/60 outline-none transition focus:border-terra";

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-tinta">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.src}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={scene.src}
              alt={scene.headline}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Gradiente calibrado para preservar as cores solares das fotos e garantir leitura */}
      <div className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-tinta/55 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-end px-5 pt-24 pb-8 sm:px-6 sm:pt-28 md:pb-14">
        <motion.div style={{ opacity: fade }} className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-cal sm:gap-2.5 sm:text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-terra px-3 py-1 shadow sm:px-3.5 sm:py-1.5">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                Portaria 24h
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-tinta/60 px-3 py-1 backdrop-blur-md sm:px-3.5 sm:py-1.5">
                <Coffee className="h-3.5 w-3.5 shrink-0 text-areia" />
                {scene.tag}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-tinta/60 px-3 py-1 backdrop-blur-md sm:px-3.5 sm:py-1.5">
                <GoogleLogo className="h-3.5 w-3.5" />
                4,3 Google · 5,0 Atendimento
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.h1
                key={scene.headline}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="max-w-4xl font-display text-3xl leading-[1.06] text-cal drop-shadow-md sm:text-5xl md:text-7xl"
              >
                {scene.headline}
              </motion.h1>
            </AnimatePresence>
          </div>

          <Rotating24hSeal className="hidden md:flex shrink-0" />
        </motion.div>

        {/* Formulário Direto na Hero com selo de Tarifa Direta */}
        <form
          onSubmit={submit}
          className="mt-6 grid grid-cols-2 gap-4 border-t border-cal/25 pt-5 sm:mt-8 sm:gap-5 sm:pt-6 lg:grid-cols-5 lg:items-end"
        >
          <label className="col-span-2 block text-[11px] font-semibold uppercase tracking-widest text-areia sm:col-span-1">
            Seu nome
            <input
              required
              placeholder="Digite seu nome"
              className={heroInput}
              value={f.nome}
              onChange={(e) => setF({ ...f, nome: e.target.value })}
            />
          </label>

          <DateField
            label="Entrada"
            labelClass="block text-[11px] font-semibold uppercase tracking-widest text-areia"
            buttonClass={heroInput}
            value={f.entrada}
            placement="top"
            onChange={(v) => setF({ ...f, entrada: v, saida: f.saida && v && f.saida < v ? "" : f.saida })}
          />

          <DateField
            label="Saída"
            labelClass="block text-[11px] font-semibold uppercase tracking-widest text-areia"
            buttonClass={heroInput}
            value={f.saida}
            min={f.entrada || undefined}
            placement="top"
            onChange={(v) => setF({ ...f, saida: v })}
          />

          <label className="col-span-2 block text-[11px] font-semibold uppercase tracking-widest text-areia sm:col-span-1">
            Hóspedes
            <select
              className={`${heroInput} [&>option]:bg-tinta [&>option]:text-cal`}
              value={f.hospedes}
              onChange={(e) => setF({ ...f, hospedes: e.target.value })}
            >
              {[1, 2, 3, 4, 5, "6 ou mais"].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "hóspede" : "hóspedes"}
                </option>
              ))}
            </select>
          </label>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="col-span-2 w-full rounded-full bg-terra px-6 py-3.5 text-sm font-semibold text-cal shadow-lg transition hover:bg-cal hover:text-terra lg:col-span-1"
          >
            Reservar sem taxas →
          </motion.button>
        </form>
      </div>
    </section>
  );
}

function Strip() {
  const items = [
    "Recepção 24 Horas",
    "Café do Sr. Agostinho Incluso",
    "Ar-Condicionado, TV & Frigobar",
    "Camas Confortáveis",
    "Wi-Fi Rápido",
    "Pátio Interno Fechado",
    "Quartos 100% Térreos",
  ];
  return (
    <div className="azulejo overflow-hidden py-4 text-cal">
      <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-2xl">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <i className="h-2 w-2 rotate-45 bg-terra" />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Seção Clara (#F6EFE4) — Tipografia Cinética com SplitType + GSAP ScrollTrigger
 */
function KineticManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = new SplitType(textRef.current, { types: "words" });
    const ctx = gsap.context(() => {
      gsap.fromTo(
        split.words,
        { opacity: 0.15, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            end: "center 48%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  const stats = [
    { icon: Clock, num: "24h", label: "Portaria sempre aberta", isGoogle: false },
    { icon: Coffee, num: "03:30", label: "Preparo diário do café", isGoogle: false },
    { icon: Sparkles, num: "1982", label: "Tradição na Av. Confúcio", isGoogle: false },
    { icon: Star, num: "4,3★", label: "92 avaliações no Google", isGoogle: true },
  ];

  return (
    <section id="hotel" ref={sectionRef} className="bg-cal">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-36">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-terra">
          <MapPin className="h-4 w-4" />
          <span>Av. Confúcio, 215 · Centro de Montalvânia</span>
        </div>

        <h2
          ref={textRef}
          className="mt-6 font-display text-3xl leading-[1.16] text-tinta sm:text-5xl md:text-6xl"
        >
          Portaria 24 horas, carro seguro em frente ao quarto térreo e mesa mineira posta todas as manhãs.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-6 border-t border-tinta/15 pt-10 sm:mt-16 sm:gap-8 sm:pt-12 md:grid-cols-4">
          {stats.map(({ icon: Icon, num, label, isGoogle }) => (
            <div key={label} className="group">
              {isGoogle ? (
                <GoogleLogo className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <Icon className="h-5 w-5 text-terra transition-transform duration-300 group-hover:scale-110" />
              )}
              <p className="mt-2 font-display text-4xl text-tinta sm:mt-3 sm:text-5xl md:text-6xl">{num}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-tinta/65 sm:text-xs">
                {isGoogle && <GoogleLogo className="h-3.5 w-3.5" />}
                <span>{label}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Seção do Fundador (Sr. Agostinho) — Cores quentes terracota/madeira SEM filtro P&B (mix-blend-luminosity removido)
 */
function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgTimeRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = headlineRef.current ? new SplitType(headlineRef.current, { types: "words" }) : null;

    const ctx = gsap.context(() => {
      if (bgTimeRef.current) {
        gsap.fromTo(
          bgTimeRef.current,
          { xPercent: -8 },
          {
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            },
          }
        );
      }

      if (split?.words) {
        gsap.fromTo(
          split.words,
          { opacity: 0.18, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 72%",
              end: "center 50%",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, []);

  return (
    <section
      id="fundador"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-terra via-madeira to-tinta pt-20 text-cal md:pt-28"
    >
      {/* Foto real da mesa de café com suas cores originais quentes (sem filtro P&B) */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <Image
          src="/cafe da manha tudo reunido na imagem.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tinta via-madeira/75 to-terra/85" />

      {/* Marca d'água tipográfica gigante "03:30" em movimento parallax atrás do Sr. Agostinho */}
      <div
        ref={bgTimeRef}
        aria-hidden
        className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-center font-display text-[34vw] leading-none text-cal/[0.08]"
      >
        03:30AM
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-end gap-8 px-6 lg:grid-cols-12 lg:gap-10">
        <div className="pb-2 lg:col-span-7 lg:pb-28">
          <div className="inline-flex items-center gap-2 rounded-full bg-cal px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-terra shadow-lg sm:px-4 sm:text-xs sm:tracking-widest">
            <Coffee className="h-3.5 w-3.5 shrink-0" />
            <span>Sr. Agostinho · Todos os dias às 3h30</span>
          </div>

          <h2
            ref={headlineRef}
            className="mt-5 font-display text-3xl leading-[1.1] text-cal sm:mt-6 sm:text-5xl md:text-6xl"
          >
            Aqui é o próprio Sr. Agostinho quem acorda às 3h30 da madrugada para preparar o seu café.
          </h2>

          <p className="mt-5 max-w-xl font-display text-lg leading-relaxed text-areia sm:mt-6 sm:text-xl md:text-2xl">
            Fundador do hotel desde 1982: pão novo, bolo saindo do forno e café passado na hora por quem recebe você
            pelo nome.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-cal/20 pt-6 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-8 sm:pt-8">
            <div>
              <p className="font-display text-2xl text-areia sm:text-3xl">03h30</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-cal/80 sm:text-xs sm:tracking-widest">
                Forno aceso
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-cal sm:text-3xl">5,0 ★</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-cal/80 sm:text-xs sm:tracking-widest">
                Atendimento
              </p>
            </div>
            <div>
              <p className="font-display text-2xl text-areia sm:text-3xl">100%</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-cal/80 sm:text-xs sm:tracking-widest">
                Feito na casa
              </p>
            </div>
          </div>
        </div>

        {/* Retrato do Sr. Agostinho ampliado da cintura para cima (pernas ocultas abaixo do corte) */}
        <div
          ref={portraitRef}
          className="relative mx-auto h-[420px] w-full max-w-[440px] overflow-hidden sm:h-[520px] sm:max-w-[520px] lg:col-span-5 lg:h-[640px] lg:max-w-none"
        >
          <div className="pointer-events-none absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-areia/30 blur-3xl" />
          <div className="absolute inset-x-0 top-0 -bottom-[72%] sm:-bottom-[75%] lg:-bottom-[78%]">
            <Image
              src="/fundador.png"
              alt="Sr. Agostinho, fundador e proprietário do Thanyu's Hotel"
              fill
              sizes="(max-width: 1024px) 520px, 680px"
              className="object-contain object-top drop-shadow-[0_25px_40px_rgba(0,0,0,0.7)]"
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 bg-gradient-to-t from-tinta via-tinta/70 to-transparent" />
    </section>
  );
}

/**
 * Filme Horizontal das 5 Fotos Reais do Café da Manhã
 * Com enquadramento adaptativo inteligente (preserva 100% da mesa no celular e nas fotos verticais no desktop sobre fundo ambiente colorido!)
 */
function BreakfastHorizontalReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const totalSlides = BREAKFAST_SLIDES.length;
      gsap.to(trackRef.current, {
        xPercent: -((totalSlides - 1) * 100) / totalSlides,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cafe" ref={sectionRef} className="relative h-[100svh] w-full overflow-hidden bg-areia text-cal">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 z-20 h-28 bg-gradient-to-b from-tinta via-tinta/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-1 z-20 h-24 bg-gradient-to-t from-areia via-areia/70 to-transparent"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 mx-auto flex max-w-6xl items-center justify-between px-6 pt-20 md:pt-24">
        <div className="inline-flex items-center gap-2 rounded-full bg-terra px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cal shadow-lg">
          <Coffee className="h-3.5 w-3.5" />
          <span>Café da Manhã Incluso</span>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex h-full"
        style={{ width: `${BREAKFAST_SLIDES.length * 100}vw` }}
      >
        {BREAKFAST_SLIDES.map((slide) => (
          <div key={slide.num} className="relative h-full w-screen flex-shrink-0 overflow-hidden bg-tinta">
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              sizes="100vw"
              className={`object-cover ${slide.pos}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-tinta/75 via-transparent to-tinta/25" />

            <div className="absolute inset-x-0 bottom-0 z-30 mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 pb-20 md:flex-row md:items-end md:pb-24">
              <div>
                <h3 className="font-display text-4xl text-cal drop-shadow-md sm:text-6xl">
                  {slide.title}
                </h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-widest text-areia drop-shadow">
                  {slide.sub}
                </p>
              </div>

              <a
                href="#reservas"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-cal px-6 py-3 text-xs font-bold uppercase tracking-wider text-tinta shadow-xl transition hover:bg-terra hover:text-cal"
              >
                <span>Garantir minha diária</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Seção Solar Clara (#EADFCB - bg-areia) — Estrutura & Acomodações com ScrollTrigger automático no Mobile + Hover no Desktop
 */
function InteractiveAmenitiesStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeHover, setActiveHover] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(".amenity-row-item");
      rows.forEach((row, idx) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveHover(idx),
          onEnterBack: () => setActiveHover(idx),
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="comodidades"
      ref={sectionRef}
      className="relative -mt-1 min-h-[88svh] overflow-hidden bg-areia py-24 text-tinta md:py-32"
    >
      {/* Foto de fundo suave sobre o tom areia mineiro para manter o site claro, colorido e acolhedor */}
      {AMENITY_ROWS.map((row, idx) => (
        <motion.div
          key={row.title}
          initial={false}
          animate={{
            opacity: activeHover === idx ? 0.22 : 0,
            scale: activeHover === idx ? 1.02 : 1.08,
          }}
          transition={{ duration: 0.7, ease: EASE }}
          className="pointer-events-none absolute inset-0"
        >
          <Image src={row.bg} alt={row.title} fill sizes="100vw" className="object-cover" />
        </motion.div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-areia via-areia/75 to-areia" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-terra">
            Quartos & Estrutura Completa
          </p>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-madeira">
            <ShieldCheck className="h-4 w-4 text-terra" />
            Limpeza diária e tarifa direta sem taxas
          </span>
        </div>

        <div className="mt-10 divide-y divide-tinta/15 border-y border-tinta/15">
          {AMENITY_ROWS.map((row, idx) => {
            const Icon = row.icon;
            const isCurrent = activeHover === idx;
            return (
              <div
                key={row.title}
                onMouseEnter={() => setActiveHover(idx)}
                onClick={() => setActiveHover(idx)}
                className="amenity-row-item group flex cursor-pointer flex-col justify-between gap-2.5 py-6 transition-all md:flex-row md:items-center md:py-9"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors sm:h-12 sm:w-12 ${
                      isCurrent ? "bg-terra text-cal shadow-md" : "bg-tinta/10 text-madeira"
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <h3
                    className={`font-display text-2xl transition-transform duration-300 sm:text-4xl md:text-5xl ${
                      isCurrent ? "sm:translate-x-2 text-terra" : "text-tinta/80 group-hover:text-tinta"
                    }`}
                  >
                    {row.title}
                  </h3>
                </div>

                <span
                  className={`pl-14 text-[11px] font-bold uppercase tracking-[0.16em] transition-colors sm:text-xs md:pl-0 md:text-right ${
                    isCurrent ? "text-madeira" : "text-tinta/55"
                  }`}
                >
                  {row.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Pátio 360° Edge-to-Edge — Altura calibrada para nitidez máxima da fotografia panorâmica
 */
function CourtyardFullBleed() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        trackRef.current,
        { xPercent: 0 },
        {
          xPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="estrutura"
      ref={sectionRef}
      className="relative h-[460px] sm:h-[520px] md:h-[600px] w-full overflow-hidden bg-tinta"
    >
      <div ref={trackRef} className="absolute inset-y-0 left-0 w-[180vw] min-w-[1350px]">
        <Image
          src="/patio-panoramico.png"
          alt="Panorâmica 360 graus do pátio interno calçado em pedra e quartos térreos do Thanyu's Hotel"
          fill
          sizes="180vw"
          className="object-cover object-center"
        />
      </div>

      {/* Gradiente leve apenas na base e topo para manter o céu azul e as árvores vibrantes */}
      <div className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-transparent to-tinta/35" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-1 z-10 h-24 bg-gradient-to-t from-madeira via-madeira/65 to-transparent"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between px-6 py-12 text-cal md:py-16">
        <span className="w-fit rounded-full bg-tinta/65 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-areia backdrop-blur-md">
          Pátio Interno 360° · Estacionamento Fechado
        </span>

        <div>
          <h2 className="max-w-3xl font-display text-3xl leading-[1.06] drop-shadow-md sm:text-5xl md:text-6xl">
            Quartos térreos abertos para o pátio arborizado.
          </h2>

          <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
            {[
              [Car, "Carro em frente ao quarto"],
              [Clock, "Portaria 24h"],
              [Snowflake, "Silêncio e ar-condicionado"],
            ].map(([IconComp, label]) => {
              const I = IconComp as typeof Car;
              return (
                <span
                  key={label as string}
                  className="inline-flex items-center gap-2 rounded-full bg-tinta/75 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cal backdrop-blur-md"
                >
                  <I className="h-3.5 w-3.5 text-terra" />
                  {label as string}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Palco Cinematográfico de Depoimentos Reais (Posicionado estrategicamente antes da Reserva para fechar a venda!)
 */
function TestimonialsStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeReview, setActiveReview] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % REAL_REVIEWS.length);
    }, 5200);
    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".review-stage-enter",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const r = REAL_REVIEWS[activeReview];

  return (
    <section
      id="depoimentos"
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative flex min-h-[90svh] flex-col justify-between overflow-hidden bg-madeira py-20 text-cal md:py-28"
    >
      {/* Background Fotográfico mais vivo e colorido (opacity 0.35 sobre madeira quente) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={r.bg}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 0.35, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="pointer-events-none absolute inset-0"
        >
          <Image src={r.bg} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-madeira/95 via-tinta/70 to-tinta/95" />

      <div
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 right-6 font-display text-[36vw] leading-none text-terra/15"
      >
        ”
      </div>

      <div className="review-stage-enter relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-6 pt-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-terra px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cal sm:px-4 sm:text-xs sm:tracking-widest">
            <GoogleLogo className="h-3.5 w-3.5 rounded-full bg-cal p-0.5" />
            <TripadvisorLogo className="h-3.5 w-3.5" />
            <span>Vozes Reais · Google & Tripadvisor</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-cal/85 sm:gap-4 sm:text-xs">
          <a
            href={HOTEL.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-areia"
          >
            <GoogleLogo className="h-3.5 w-3.5" />
            <span>Google Maps (4,3★)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <span className="text-cal/30">·</span>
          <a
            href={HOTEL.tripadvisorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-areia"
          >
            <TripadvisorLogo className="h-3.5 w-3.5" />
            <span>Tripadvisor (5,0)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="review-stage-enter relative z-10 mx-auto my-auto flex min-h-[340px] w-full max-w-6xl flex-col justify-center px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1 text-terra">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-terra text-terra" />
                ))}
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-areia sm:text-xs">
                {r.source.includes("Google") && <GoogleLogo className="h-3.5 w-3.5" />}
                {r.source.includes("Tripadvisor") && <TripadvisorLogo className="h-3.5 w-3.5" />}
                <span>
                  {r.source} · {r.date}
                </span>
              </span>
            </div>

            <blockquote className="mt-4 max-w-5xl font-display text-2xl leading-[1.15] text-cal sm:mt-5 sm:text-4xl md:text-6xl">
              “{r.headline}”
            </blockquote>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cal/85 sm:mt-6 sm:text-base md:text-xl">
              {r.quote}
            </p>

            <div className="mt-6 flex items-center gap-3.5 sm:mt-8 sm:gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-terra sm:h-14 sm:w-14">
                {r.avatar ? (
                  <Image src={r.avatar} alt={r.name} fill sizes="56px" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-terra font-display text-base text-cal sm:text-lg">
                    {r.initials}
                  </div>
                )}
              </div>
              <div>
                <p className="font-display text-lg text-cal sm:text-xl">{r.name}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-areia/85 sm:text-xs sm:tracking-widest">
                  {r.role}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="review-stage-enter relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-3 border-t border-cal/15 pt-5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:pt-6">
          <div className="no-scrollbar -mx-6 flex items-center gap-2.5 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0">
            {REAL_REVIEWS.map((item, idx) => {
              const isSelected = activeReview === idx;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveReview(idx)}
                  className={`group relative flex shrink-0 items-center gap-2 rounded-full py-1.5 pr-3.5 pl-1.5 transition-all ${
                    isSelected
                      ? "bg-cal text-tinta shadow-xl scale-105"
                      : "bg-cal/10 text-cal/75 hover:bg-cal/20 hover:text-cal"
                  }`}
                >
                  <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-terra sm:h-8 sm:w-8">
                    {item.avatar ? (
                      <Image src={item.avatar} alt={item.name} fill sizes="32px" className="object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center text-xs font-bold text-cal">
                        {item.initials}
                      </span>
                    )}
                  </span>
                  <span className="text-xs font-bold tracking-wide">{item.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-cal/60">
            Toque em um hóspede para ler
          </span>
        </div>
      </div>
    </section>
  );
}

/**
 * Montalvânia Vista Aérea Fullscreen Reveal — Com Copy Comercial de Localização e Fusão Suave para o Azul de Reservas
 */
function CityReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const clip = useMotionTemplate`inset(${inset}% ${inset}% round ${radius}px)`;
  const { scrollYProgress: s2 } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(s2, [0, 1], ["-8%", "8%"]);

  return (
    <section id="cidade" className="bg-azul">
      <div ref={ref} className="relative flex min-h-[580px] items-end overflow-hidden py-24 md:h-[85svh]">
        <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden">
          <motion.div style={{ y }} className="absolute -inset-[10%]">
            <Image
              src="/montalvania-aerea.jpg"
              alt="Vista aérea de Montalvânia ao entardecer"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          {/* Gradiente inferior que já funde com o azul (#2F3F73) da seção de Reservas */}
          <div className="absolute inset-0 bg-gradient-to-t from-azul via-tinta/35 to-transparent" />
        </motion.div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-between gap-8 px-6 pt-20 pb-6 text-cal md:flex-row md:items-end md:pb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-areia drop-shadow">
              Localização Central · Montalvânia - MG
            </p>
            <h2 className="mt-2 max-w-2xl font-display text-4xl leading-[1.06] drop-shadow-md sm:text-6xl">
              Avenida Confúcio, 215.
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-cal/90 drop-shadow md:text-lg">
              A poucos passos de bancos, restaurantes, farmácias e comércios do Centro, com saída rápida para a
              rodovia.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
            <a
              href={HOTEL.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cal px-5 py-3 text-tinta shadow-lg transition hover:bg-terra hover:text-cal"
            >
              <GoogleLogo className="h-4 w-4" />
              <span>4,3 Google Maps</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href={HOTEL.tripadvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-tinta/75 px-5 py-3 text-cal backdrop-blur-md transition hover:bg-cal hover:text-tinta"
            >
              <TripadvisorLogo className="h-4 w-4" />
              <span>4,4 Tripadvisor (5,0 Atendimento)</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const [f, setF] = useState({ nome: "", entrada: "", saida: "", hospedes: "1" });
  const fmt = (d: string) => (d ? d.split("-").reverse().join("/") : "a combinar");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Gostaria de reservar no Thanyu’s Hotel. Nome: ${f.nome}. Entrada: ${fmt(f.entrada)}. Saída: ${fmt(f.saida)}. Hóspedes: ${f.hospedes}.`;
    window.open(`https://wa.me/${HOTEL.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const lineInput =
    "mt-2 w-full min-w-0 border-b border-cal/35 bg-transparent pb-3 text-base sm:text-lg text-cal placeholder-cal/40 outline-none transition focus:border-terra";

  return (
    <section id="reservas" className="bg-azul text-cal">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-terra px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-cal">
                <Clock className="h-3.5 w-3.5" />
                Recepção 24 Horas
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cal/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-areia">
                Sem taxas de aplicativos
              </span>
            </div>

            <h2 className="mt-5 font-display text-4xl leading-[1.04] sm:text-5xl md:text-7xl">
              Reserve direto pelo WhatsApp.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-cal/85">
              Fale direto com o balcão do hotel a qualquer hora do dia ou da noite. Melhor tarifa garantida, com café da
              manhã e estacionamento inclusos.
            </p>
          </div>

          <div className="mt-10 space-y-3 text-sm uppercase tracking-widest text-areia">
            <p className="flex items-center gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-terra" />
              <span>
                {HOTEL.street} · {HOTEL.city} · CEP {HOTEL.cep}
              </span>
            </p>
            <p className="flex flex-wrap items-center gap-4 font-semibold text-cal">
              <a href={`tel:${HOTEL.phoneHref}`} className="inline-flex items-center gap-2 transition hover:text-areia">
                <Phone className="h-4 w-4 shrink-0 text-terra" />
                {HOTEL.phone}
              </a>
              <span>·</span>
              <a href={`tel:${HOTEL.landlineHref}`} className="transition hover:text-areia">
                {HOTEL.landline}
              </a>
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-7 self-center">
          <label className="block text-xs font-semibold uppercase tracking-widest text-areia">
            Seu nome ou empresa
            <input
              required
              placeholder="Digite seu nome"
              className={lineInput}
              value={f.nome}
              onChange={(e) => setF({ ...f, nome: e.target.value })}
            />
          </label>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <DateField
              label="Entrada"
              labelClass="block text-xs font-semibold uppercase tracking-widest text-areia"
              buttonClass={lineInput}
              value={f.entrada}
              placement="top"
              onChange={(v) => setF({ ...f, entrada: v, saida: f.saida && v && f.saida < v ? "" : f.saida })}
            />
            <DateField
              label="Saída"
              labelClass="block text-xs font-semibold uppercase tracking-widest text-areia"
              buttonClass={lineInput}
              value={f.saida}
              min={f.entrada || undefined}
              placement="top"
              onChange={(v) => setF({ ...f, saida: v })}
            />
          </div>

          <label className="block text-xs font-semibold uppercase tracking-widest text-areia">
            Hóspedes
            <select
              className={`${lineInput} [&>option]:bg-tinta [&>option]:text-cal`}
              value={f.hospedes}
              onChange={(e) => setF({ ...f, hospedes: e.target.value })}
            >
              {[1, 2, 3, 4, 5, "6 ou mais"].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "hóspede" : "hóspedes"}
                </option>
              ))}
            </select>
          </label>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full rounded-full bg-terra py-4 text-base font-semibold text-cal shadow-xl transition hover:bg-cal hover:text-terra"
          >
            Garantir vaga no WhatsApp →
          </motion.button>
        </form>
      </div>

      {/* Mapa 100% Colorido e Sangrado */}
      <div className="h-[400px] w-full">
        <iframe
          title="Mapa do Thanyu’s Hotel"
          loading="lazy"
          className="h-full w-full border-0"
          src={`https://www.google.com/maps?q=${encodeURIComponent(HOTEL.mapQuery)}&output=embed`}
        />
      </div>
    </section>
  );
}

export default function Site() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return (
    <main className="overflow-x-hidden">
      <Smooth />
      <motion.div style={{ scaleX: bar }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-terra" />
      <Header />
      <Hero />
      <Strip />
      <KineticManifesto />
      <FounderStory />
      <BreakfastHorizontalReel />
      <InteractiveAmenitiesStage />
      <CourtyardFullBleed />
      <TestimonialsStage />
      <CityReveal />
      <Booking />
      <footer className="bg-tinta px-6 py-10 text-center text-sm text-cal/60">
        © {new Date().getFullYear()} {HOTEL.name} · Recepção 24h · {HOTEL.street}, {HOTEL.city} · {HOTEL.phone}
      </footer>
    </main>
  );
}
