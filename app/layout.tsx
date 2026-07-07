import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Oswald, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/components/language-provider' // <-- ДОБАВИЛИ ИМПОРТ
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-oswald',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono-geist',
})

export const metadata: Metadata = {
  title: 'TransferCS — Расчёт и аналитика трансферной цены игроков',
  description:
    'TransferCS — платформа для расчёта и анализа трансферной стоимости киберспортсменов CS. Актуальные оценки команд и игроков.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`dark bg-background ${inter.variable} ${oswald.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        {/* ОБЕРНУЛИ ВСЁ ПРИЛОЖЕНИЕ В ПРОВАЙДЕР ЯЗЫКА */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}