"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NewsFeed } from "@/components/news-feed"

export default function NewsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0c0c0c] relative overflow-hidden">
      {/* Мягкая фоновая сетка и свечение */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div className="pointer-events-none absolute -right-40 top-0 size-[520px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="pointer-events-none absolute -left-32 bottom-0 size-[360px] rounded-full bg-accent/5 blur-[120px]" />

      {/* ВЕРХ — оборачиваем шапку в сплошной черный блок */}
      <div className="bg-[#0a0a0a] relative z-50">
        <SiteHeader />
      </div>

      {/* ЦЕНТР — серая лента новостей */}
      <main className="flex-1 relative">
        <NewsFeed />
      </main>

      {/* НИЗ — оборачиваем подвал в сплошной черный блок */}
      <div className="bg-[#0a0a0a] relative z-10">
        <SiteFooter />
      </div>
    </div>
  )
}