import { Send, Users } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60">
      {/* thin neon accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left — legal notice */}
          <p className="text-xs leading-relaxed text-muted-foreground lg:col-span-2 lg:max-w-3xl">
            © 2026 TransferCS. Все права защищены. Все данные являются аналитической
            оценкой и не являются официальной информацией. Логотипы и изображения
            принадлежат их правообладателям.
          </p>

          {/* Right — contacts + active users */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Контакты разработчика:</span>
              <a
                href="https://t.me/jedde1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram разработчика"
                className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 font-medium text-primary transition-colors hover:bg-primary/20"
              >
                <Send className="size-4" />
                @jedde1
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="size-4 text-primary" />
              <span>Активные пользователи:</span>
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

        {/* bottom brand strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row">
          <span className="font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Transfer<span className="text-primary">CS</span>
          </span>
          {/* <-- Строка "Аналитика трансферного рынка киберспорта" УДАЛЕНА --> */}
        </div>
      </div>
    </footer>
  )
}