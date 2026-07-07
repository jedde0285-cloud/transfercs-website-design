"use client"

import { Send, Users } from "lucide-react"
import { useLanguage } from "./language-provider" // <-- Подключаем хук локализации

export function SiteFooter() {
  const { t } = useLanguage() // <-- Достаем переводы footer из контекста

  return (
    <footer className="relative border-t border-border/60">
      {/* thin neon accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left — legal notice */}
          <p className="text-xs leading-relaxed text-muted-foreground lg:col-span-2 lg:max-w-3xl">
            {t.footer.legal}
          </p>

          {/* Right — contacts + active users с выравниванием по сетке */}
          <div className="flex flex-col gap-3">
            
            {/* Строка 1: Контакты */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 text-sm text-muted-foreground">
              <div className="flex w-48 items-center gap-2">
                <Send className="size-4 text-primary/70" />
                <span>{t.footer.devContacts}</span>
              </div>
              <div>
                <a
                  href="https://t.me/jedde1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram разработчика"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <Send className="size-3.5" />
                  @jedde1
                </a>
              </div>
            </div>

            {/* Строка 2: Пользователи */}
            <div className="grid grid-cols-[auto_1fr] items-center gap-x-2 text-sm text-muted-foreground">
              <div className="flex w-48 items-center gap-2">
                <Users className="size-4 text-primary" />
                <span>{t.footer.activeUsers}</span>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-foreground">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  1 342
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* bottom brand strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Transfer<span className="text-primary">CS</span>
          </span>
        </div>
      </div>
    </footer>
  )
}