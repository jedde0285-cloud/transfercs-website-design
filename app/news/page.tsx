"use client"

import { NewsFeed } from "@/components/news-feed"

export default function NewsPage() {
  return (
    <main className="flex-1 bg-background">
      {/* Здесь рендерится ТОЛЬКО лента новостей. Главный блок Hero сюда не импортируется */}
      <NewsFeed />
    </main>
  )
}