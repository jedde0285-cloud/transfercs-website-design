"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Activity, TrendingUp } from "lucide-react"
import { TopTeams } from "./top-teams"
import { useLanguage } from "./language-provider"
import { playersData } from "@/lib/players-data"
import { calculatePrice } from "@/lib/pricing-model-players"

// Интерфейс для интеграции с твоим будущим файлом данных
interface PlayerData {
  id: string
  nickname: string
  fullName: string
  teamLogo: string
  teamName: string
  price: number // Цена числом (например, 1900000)
}

export function Hero() {
  const { lang, t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  // Твой будущий массив данных из файла. Оставляю пустым, чтобы не плодить фейков.
  // 1. Берем игроков из базы и рассчитываем цену для каждого через твою модель
const playersWithPrices = playersData.map(player => ({
  ...player,
  price: calculatePrice(player)
}))

// 2. Фильтруем игроков по тому, что ввел пользователь в поиск
const filteredPlayers = searchTerm.trim() === "" 
  ? [] 
  : playersWithPrices.filter(p => p.name.toLowerCase().startsWith(searchTerm.toLowerCase())) 

  // Вывод цены полностью до доллара без сокращений ($1,900,000)
  const formatFullPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(price)
  }

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

          {/* ПОИСКОВАЯ ЗОНА */}
          <div className="relative mt-8 flex items-center gap-4 z-40">
            
            {/* Оболочка инпута */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className={`size-4 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground/60'}`} />
              </span>
              <input
                type="text"
                placeholder={lang === "ru" ? "Поиск киберспортсмена..." : "Search pro player..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                className="w-full rounded-lg border border-border bg-background/60 pl-10 pr-4 py-3 text-sm font-medium tracking-wide text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:border-primary/80 focus:ring-1 focus:ring-primary/20 box-glow"
              />

              {/* РАСШИРЕННЫЙ ВЫПАДАЮЩИЙ СПИСОК РЕЗУЛЬТАТОВ */}
              {isFocused && searchTerm.trim() !== "" && (
                <div className="absolute top-full left-0 mt-2 w-[145%] rounded-xl border border-primary/30 bg-card p-2 shadow-2xl z-50 box-glow animate-in fade-in slide-in-from-top-1 duration-200">
                  
                  {filteredPlayers.length > 0 ? (
                    <div className="py-2 max-h-[280px] overflow-y-auto custom-scrollbar">
                      {filteredPlayers.map((player) => (
                        <div
                          key={player.name}
                          className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/[0.04] transition-colors cursor-pointer group"
                        >
                          {/* Левая часть: Лого + Имя */}
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center p-1 border border-white/10 group-hover:border-white/20 transition-colors">
                              <img
                                src={player.teamLogo}
                                alt={player.team_name}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            {/* Информация игрока */}
                            <div>
                              <div className="font-display text-sm font-bold text-foreground tracking-wide leading-none">
                                {player.name}
                              </div>
                              <div className="text-[9px] text-muted-foreground uppercase tracking-wider mt-0.5 flex items-center gap-1.5">
                                <span>{player.role} · {player.team_name}</span>
                                {player.is_bench && (
                                  <span className="px-1 py-0.5 bg-destructive/20 border border-destructive/40 text-destructive text-[8px] font-bold rounded uppercase tracking-wider normal-case">
                                    Bench
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Правая часть: Цена */}
                          <div className="text-right">
                            <div className="font-display text-xs font-medium text-muted-foreground leading-none">
                              Est. Value
                            </div>
                            <div className="font-display text-sm font-bold text-primary tracking-wide mt-0.5">
                              ${player.price.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (

                    /* Пустой результат */
                    <div className="py-6 text-center text-xs text-muted-foreground uppercase tracking-wider">
                      {lang === "ru" ? "Игрок не найден" : "Player not found"}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Кнопка ВСЕ ИГРОКИ */}
            <a
              href="#players"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/40 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foreground transition-all hover:bg-secondary hover:border-primary/40"
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
              
              {/* ПЛАШКА С ДИНАМИКОЙ */}
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-3 w-[265px] -translate-x-1/2 rounded-lg border border-primary/40 bg-background/95 p-3 opacity-0 translate-y-2 scale-95 shadow-2xl transition-all duration-300 ease-out group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:scale-100 group-hover/card:opacity-100 backdrop-blur-md z-30 box-glow">
                
                {/* Заголовок */}
                <div className="mb-2 text-center">
                  <div className="font-display text-xs font-black uppercase tracking-widest text-primary text-glow">
                    {lang === "ru" ? "ДИНАМИКА" : "DYNAMICS"}
                  </div>
                </div>

                {/* Контейнер графика с фоновой сеткой */}
                <div className="relative h-24 w-full border-b border-l border-muted-foreground/30 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:12px_12px]">
                  
                  {/* Шкала рейтинга слева */}
                  <div className="absolute left-1 inset-y-0 flex flex-col justify-between text-[7px] font-mono text-muted-foreground/70 text-left w-5 select-none z-20 pt-0.5">
                    <span>1.40+</span>
                    <span>1.30</span>
                    <span>1.20</span>
                    <span>1.10</span>
                    <span>1.00</span>
                    <span>0.90</span>
                  </div>

                  {/* SVG-График биржи (адаптивный по сетке) */}
                  <svg className="absolute inset-0 z-10 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="orange-glow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff7a00" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#ff7a00" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Заливка под линией тренда */}
                    <path
                      d="M 12,62 L 29,56 L 46,70 L 63,52 L 81,34 L 100,46 L 100,100 L 12,100 Z"
                      fill="url(#orange-glow)"
                    />

                    {/* Точная оранжевая линия графика по точкам */}
                    <path
                      d="M 12,62 L 29,56 L 46,70 L 63,52 L 81,34 L 100,46"
                      fill="none"
                      stroke="#ff7a00"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Временная шкала внизу, выровненная по сетке */}
                <div className="mt-1.5 flex justify-between text-[6px] font-mono tracking-tighter text-muted-foreground/60 uppercase pl-7 pr-0.5">
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