import Image from "next/image"
import { ArrowRight, Calculator, Sparkles, Activity, TrendingUp } from "lucide-react"
import { TopTeams } from "@/components/top-teams"

export function Hero() {
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
            Узнай реальную
            <br />
            <span className="text-primary text-glow">цену игрока</span>
          </h1>

          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            Мы рассчитываем трансферную стоимость киберспортсменов на основе
            статистики, возраста и рынка. Узнай, сколько стоит твой любимый игрок.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#calc"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110 box-glow"
            >
              <Calculator className="size-4" />
              Начать расчёт
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#players"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-colors hover:bg-secondary"
            >
              Все игроки
            </a>
          </div>

          {/* stats row */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6">
            {[
              { value: "150+", label: "Игроков" },
              { value: "30+", label: "Команд" },
              { value: "ТЕХНОЛОГИЯ", label: "Уникальная модель расчёта" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-foreground">
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
                alt="Профессиональный игрок flamez в форме Team Vitality"
                width={900}
                height={900}
                priority
                className="relative z-[1] h-auto w-full scale-110 object-contain [filter:drop-shadow(0_0_14px_hsl(var(--primary)/0.9))_drop-shadow(0_0_36px_hsl(var(--primary)/0.6))]"
              />
              {/* bottom fade into background */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-1 z-[2] h-24 bg-gradient-to-t from-background to-transparent" />
            </div>

            {/* Прорыв сезона — теперь строго под игроком и центрирован */}
            <div className="relative z-10 -mt-2 mb-3 flex justify-center">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black shadow-lg shadow-primary/20">
                <TrendingUp className="size-3 text-black" />
                Прорыв сезона
              </div>
            </div>

            {/* nickname + price info UNDER the player */}
            <div className="relative z-10 mt-0 flex items-center justify-between gap-3 rounded-xl border border-primary/40 bg-background/75 px-5 py-3 backdrop-blur-md box-glow">
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
    </section>
  )
}