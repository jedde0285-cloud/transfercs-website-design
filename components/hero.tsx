"use client"

import Image from "next/image"
import { ArrowRight, Calculator, Activity, TrendingUp } from "lucide-react"
import { TopTeams } from "./top-teams"
import { useLanguage } from "./language-provider"

export function Hero() {
  const { lang, t } = useLanguage()

  const statsItems = [
    { value: "150+", label: t.hero.stats.players },
    { value: "30+", label: t.hero.stats.teams },
    { 
      value: lang === "ru" ? "ТЕХНОЛОГИЯ" : "TECHNOLOGY",
      label: t.hero.stats.model 
    },
  ]
  
  return (
    <section className="relative overflow-hidden">
      {/* subtle grid + glow background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute -right-40 top-0 size-[520px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-[360px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:py-20 lg:px-8">
        {/* LEFT — top teams table */}
        <div className="order-2 lg:order-1 lg:col-span-3 lg:pt-10">
          <TopTeams />
        </div>

        {/* CENTER — advertising copy */}
        <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-5">

          <h1 className="text-balance font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            {t.hero.titleTop}
            <br />
            <span className="text-primary text-glow">{t.hero.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            {t.hero.desc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#calc"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 box-glow"
            >
              <Calculator className="size-4" />
              {t.hero.ctaStart}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#players"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
            >
              {t.hero.ctaPlayers}
            </a>
          </div>

          {/* stats row */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6">
            {statsItems.map((s) => (
              <div key={s.label}>
                <div className="font-display text-lg xs:text-xl sm:text-2xl font-bold text-foreground truncate break-words">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — player */}
        <div className="order-3 flex flex-col justify-end lg:col-span-4">
          <div className="relative mx-auto w-full max-w-lg">
            {/* orange neon glow radiating from player */}
            <div className="pointer-events-none absolute inset-0 -bottom-6 rounded-full bg-primary/25 blur-[90px]" />

            {/* player image with neon outline emanating from the silhouette */}
            <div className="relative">
              <Image
                src="/images/LUQi5dX9boyO0uDadUGht5.webp"
                alt={lang === "ru" ? "Профессиональный игрок flamez в форме Team Vitality" : "Professional player flamez in Team Vitality uniform"}
                width={900}
                height={900}
                priority
                className="relative z-[1] h-auto w-full scale-110 object-contain [filter:drop-shadow(0_0_14px_hsl(var(--primary)/0.9))_drop-shadow(0_0_36px_hsl(var(--primary)/0.6))]"
              />
              {/* bottom fade into background */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-1 z-[2] h-24 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* КАРТОЧКА ИГРОКА */}
            <div className="group/card relative z-10 -mt-6 rounded-xl border border-primary/40 bg-background/75 p-5 backdrop-blur-md box-glow transition-all duration-300">
              
              {/* ПЛАШКА С ДИНАМИКОЙ (Ширина немного увеличена до 265px) */}
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-[265px] -translate-x-1/2 rounded-lg border border-primary/40 bg-background/95 p-3 opacity-0 translate-y-2 scale-95 shadow-2xl transition-all duration-300 ease-out group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:scale-100 group-hover/card:opacity-100 backdrop-blur-md z-30 box-glow">
                
                {/* Заголовок */}
                <div className="mb-2 text-center">
                  <div className="font-display text-xs font-black uppercase tracking-widest text-primary text-glow">
                    {lang === "ru" ? "ДИНАМИКА" : "DYNAMICS"}
                  </div>
                </div>

                {/* Контейнер графика с фоновой сеткой */}
                <div className="relative h-24 w-full border-b border-l border-muted-foreground/30 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px]">
                  
                  {/* Шкала рейтинга слева внутри сетки */}
                  <div className="absolute left-1 inset-y-0 flex flex-col justify-between text-[7px] font-mono text-muted-foreground/70 text-left w-5 select-none z-10 pt-0.5">
                    <span>1.40+</span>
                    <span>1.30</span>
                    <span>1.20</span>
                    <span>1.10</span>
                    <span>1.00</span>
                    <span>0.90</span>
                  </div>

                  {/* SVG-График биржи */}
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="orange-chart-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Мягкая градиентная заливка под графиком */}
                    <path
                      d="M 5,62 L 24,56 L 43,70 L 62,52 L 81,34 L 95,46 L 95,100 L 5,100 Z"
                      fill="url(#orange-chart-glow)"
                    />

                    {/* Яркая, но не пересвеченная оранжевая линия тренда */}
                    <path
                      d="M 5,62 L 24,56 L 43,70 L 62,52 L 81,34 L 95,46"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: "drop-shadow(0px 1px 2px rgba(255,122,0,0.5))" }}
                    />
                  </svg>
                </div>

                {/* Временная шкала со всеми месяцами */}
                <div className="mt-1.5 flex justify-between text-[6px] font-mono tracking-tighter text-muted-foreground/60 uppercase px-0.5">
                  <span>Янв 25</span>
                  <span>Апр 25</span>
                  <span>Июл 25</span>
                  <span>Окт 25</span>
                  <span>Янв 26</span>
                  <span>Июн 26</span>
                </div>
              </div>

              {/* Прорыв сезона */}
              <div className="mb-4 flex justify-center">
                <div className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-lg shadow-primary/20">
                  <TrendingUp className="size-3 text-black" />
                  {lang === "ru" ? "Прорыв сезона" : "Breakthrough of the season"}
                </div>
              </div>

              {/* Основной контент карточки */}
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                    <span className="font-display text-2xl font-bold uppercase tracking-wide">
                      flameZ
                    </span>
                  </div>
                  <div className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                    Team Vitality · Rifler
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display text-2xl font-bold text-primary text-glow">
                    $1.9M
                  </div>
                  <div className="flex items-center justify-end gap-1 text-xs text-primary">
                    <Activity className="size-3" />
                    +12.4%
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}