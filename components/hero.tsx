import Image from "next/image"
import { ArrowRight, Calculator, Sparkles, Activity } from "lucide-react"
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
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="size-3.5" />
            Аналитика киберспорта · CS
          </span>

          <h1 className="text-balance font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Узнай реальную
            <br />
            <span className="text-primary text-glow">цену игрока</span>
          </h1>

          <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
            TransferCS рассчитывает трансферную стоимость киберспортсменов на основе
            статистики, формы и рыночных трендов. Оцени любого игрока за секунды.
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
              { value: "1 200+", label: "Игроков" },
              { value: "180+", label: "Команд" },
              { value: "24/7", label: "Обновление" },
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

        {/* RIGHT — player with "Расчёт" badge */}
        <div className="order-3 lg:col-span-4">
          <div className="relative mx-auto max-w-md">
            {/* orange neon glow behind player */}
            <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-primary/25 blur-2xl" />
            <div className="pointer-events-none absolute -inset-1 rounded-[1.75rem] bg-gradient-to-b from-primary/40 to-primary/10 blur-md" />

            {/* neon frame */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/70 bg-gradient-to-b from-primary/10 to-transparent shadow-[0_0_40px_-4px_hsl(var(--primary)/0.7),inset_0_0_30px_-8px_hsl(var(--primary)/0.5)]">
              <Image
                src="/images/donk.webp"
                alt="Профессиональный игрок donk в форме BetBoom"
                width={800}
                height={800}
                priority
                className="h-auto w-full object-cover"
              />
              {/* bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />

              {/* "most expensive" tag */}
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-primary/60 bg-background/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary backdrop-blur-md">
                <Sparkles className="size-3" />
                Самый дорогой игрок
              </div>

              {/* player info + price at the bottom */}
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-primary/40 bg-background/75 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                      <span className="font-display text-2xl font-bold uppercase tracking-wide">
                        donk
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                      Team Spirit · Rifler
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

            {/* "Расчёт" floating badge over player */}
            <div className="absolute -right-3 top-6 rotate-3 rounded-xl border border-primary/50 bg-background/90 px-4 py-3 backdrop-blur-md box-glow sm:-right-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Calculator className="size-3.5" />
                Расчёт
              </div>
              <div className="mt-1 font-display text-2xl font-bold text-foreground">
                $1.9M
              </div>
              <div className="flex items-center gap-1 text-xs text-primary">
                <Activity className="size-3" />
                +12.4% за месяц
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
