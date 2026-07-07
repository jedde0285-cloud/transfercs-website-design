"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsFeed } from "@/components/news-feed"

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0c0c0c] relative overflow-hidden">
      {/* Мягкая фоновая сетка и свечение, как на главной странице */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -right-40 top-0 size-[520px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-[360px] rounded-full bg-accent/5 blur-[120px]" />

      {/* Верх сайта */}
      <SiteHeader />

      {/* Контентная часть ленты */}
      <main className="flex-1 relative">
        <NewsFeed />
      </main>

      {/* Низ сайта */}
      <SiteFooter />
    </div>
  )
}