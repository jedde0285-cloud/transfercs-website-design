"use client"

import { useState } from "react"
import { Menu, X, Crosshair, Calculator, Shield, User, Info } from "lucide-react"

const navItems = [
  { label: "Оценка", href: "#calc", icon: Calculator },
  { label: "Команды", href: "#teams", icon: Shield },
  { label: "Игроки", href: "#players", icon: User },
  { label: "О проекте", href: "#about", icon: Info },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Nav sections */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
            >
              <item.icon className="size-4 text-primary/70 transition-colors group-hover:text-primary" />
              {item.label}
              <span className="absolute inset-x-3 -bottom-px h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          aria-label="Открыть меню"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Brand */}
        <a href="#" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground box-glow">
            <Crosshair className="size-5" />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight">
            Transfer<span className="text-primary text-glow">CS</span>
          </span>
        </a>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border/60 bg-background px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium uppercase tracking-wide text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <item.icon className="size-4 text-primary/70" />
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
