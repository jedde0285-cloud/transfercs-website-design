"use client"

import { useState } from "react"
import Link from "next/link" // <-- Импортируем быстрые ссылки Next.js
import { useLanguage } from "./language-provider"
import { Menu, X, Crosshair, Shield, User, Info, Newspaper } from "lucide-react"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, t } = useLanguage()

  const navItems = [
    { label: t.nav.news, href: "/news", icon: Newspaper }, 
    { label: t.nav.teams, href: "#teams", icon: Shield },
    { label: t.nav.players, href: "#players", icon: User },
    { label: t.nav.about, href: "#about", icon: Info },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        
        {/* Nav sections (Desktop) */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            /* Заменили 'a' на 'Link' */
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:text-primary"
            >
              <item.icon className="size-4 text-primary transition-colors group-hover:scale-105" />
              {item.label}
              <span className="absolute inset-x-4 -bottom-px h-0.5 scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label="Открыть меню"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Правая часть: Переключатель языка + Бренд */}
        <div className="flex items-center gap-4">
          
          {/* Переключатель языка (RU / EN) */}
          <button
            type="button"
            onClick={() => setLang(lang === "ru" ? "en" : "ru")}
            className="inline-flex items-center justify-center rounded-md border border-border/40 bg-secondary/30 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
          >
            {lang}
          </button>

          {/* Brand/Logo — тоже перевели на Link */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground box-glow">
              <Crosshair className="size-5" />
            </span>
            <span className="font-display text-2xl font-bold tracking-tight">
              Transfer<span className="text-primary text-glow">CS</span>
            </span>
          </Link>

        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border/60 bg-background px-4 py-3 md:hidden">
          {navItems.map((item) => (
            /* Заменили 'a' на 'Link' */
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-secondary hover:text-primary"
            >
              <item.icon className="size-4 text-primary" />
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
