"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Calendar, Heart, Share2, MessageSquare, ShieldCheck } from "lucide-react"

type NewsPost = {
  id: number
  date: string
  authorRu: string
  authorEn: string
  handle: string
  avatar: string
  titleRu: string
  titleEn: string
  textRu: string
  textEn: string
  image?: string // Опциональное поле для фото
  tagRu: string
  tagEn: string
  baseLikes: number
}

// Твоя база постов, куда ты будешь вручную дописывать новые через код
const mockNews: NewsPost[] = [
  {
    id: 1,
    date: "07.07.2026",
    authorRu: "Инсайдер TransferCS",
    authorEn: "TransferCS Insider",
    handle: "@cs_insider",
    avatar: "/images/icon.png", // Твоя иконка сайта из папки public
    titleRu: "🔥 СЛУХИ: s1mple в Cloud9?",
    titleEn: "🔥 RUMORS: s1mple to Cloud9?",
    textRu: "По инсайдерской информации, сумма возможного трансфера оценивается в $1.2M. Переговоры находятся на финальной стадии. Cloud9 ищут мощное усиление перед осенним сезоном.",
    textEn: "According to insider information, the potential transfer value is estimated at $1.2M. Negotiations are in final stages. Cloud9 are looking for a heavy upgrade before the autumn season.",
    image: "/images/pro-player.png", // Пример фото из твоей папки public
    tagRu: "Трансферы",
    tagEn: "Transfers",
    baseLikes: 142,
  },
  {
    id: 2,
    date: "05.07.2026",
    authorRu: "Аналитический бот",
    authorEn: "Analytics Bot",
    handle: "@cs_trends",
    avatar: "/images/icon.png",
    titleRu: "📈 flameZ взлетает в цене!",
    titleEn: "📈 flameZ value surges!",
    textRu: "Наша математическая модель обновила ценники игроков после турнира. flameZ подорожал на 12.4% и теперь его чистая трансферная стоимость составляет $1.9M.",
    textEn: "Our mathematical model updated player price tags after the tournament. flameZ value surged by 12.4% and now his net transfer value stands at $1.9M.",
    tagRu: "Аналитика",
    tagEn: "Analytics",
    baseLikes: 89,
  },
]

export function NewsFeed() {
  const { lang } = useLanguage()
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  // При загрузке страницы проверяем, какие посты пользователь уже лайкал ранее
  useEffect(() => {
    const savedLikes = localStorage.getItem("transfercs_news_likes")
    if (savedLikes) {
      setLikedPosts(JSON.parse(savedLikes))
    }
  }, [])

  // Функция обработки клика по лайку
  const toggleLike = (postId: number) => {
    let updatedLikes: number[]
    if (likedPosts.includes(postId)) {
      updatedLikes = likedPosts.filter((id) => id !== postId)
    } else {
      updatedLikes = [...likedPosts, postId]
    }
    setLikedPosts(updatedLikes)
    localStorage.setItem("transfercs_news_likes", JSON.stringify(updatedLikes))
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      {/* Шапка ленты */}
      <div className="mb-6 border-b border-border/60 bg-card/80 p-4 rounded-xl backdrop-blur-md border border-primary/20 shadow-[0_0_15px_rgba(255,90,0,0.05)]">
        <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground sm:text-3xl">
          {lang === "ru" ? "Лента новостей" : "News Feed"}
        </h1>
      </div>

      {/* Список постов а-ля Твиттер */}
      <div className="flex flex-col gap-4">
        {mockNews.map((post) => {
          const isLiked = likedPosts.includes(post.id)
          const totalLikes = post.baseLikes + (isLiked ? 1 : 0)

          return (
            <article 
              key={post.id} 
              className="flex gap-3 rounded-xl border border-border/80 bg-card/90 p-4 transition-all hover:border-primary/30 shadow-sm"
            >
              {/* Левый блок: Аватарка (сделали чуть ярче за счет рамки) */}
              <div className="shrink-0">
                <div className="size-10 overflow-hidden rounded-full border border-primary/40 bg-secondary/80 p-1 shadow-[0_0_8px_rgba(255,90,0,0.1)]">
                  <img src={post.avatar} alt="Avatar" className="h-full w-full object-contain" />
                </div>
              </div>

              {/* Правый блок: Контент поста */}
              <div className="flex-1 min-w-0">
                {/* Автор, хэндл и дата */}
                <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-display text-sm font-bold text-foreground truncate">
                      {lang === "ru" ? post.authorRu : post.authorEn}
                    </span>
                    <ShieldCheck className="size-4 text-primary shrink-0" />
                    <span className="text-xs text-muted-foreground truncate">{post.handle}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                    <Calendar className="size-3" />
                    {post.date}
                  </div>
                </div>

                {/* Заголовок и Текст */}
                <div className="mt-2">
                  <h2 className="text-base font-bold text-foreground leading-snug">
                    {lang === "ru" ? post.titleRu : post.titleEn}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground/90 whitespace-pre-line">
                    {lang === "ru" ? post.textRu : post.textEn}
                  </p>
                </div>

                {/* Фото поста (если оно передано в объекте) */}
                {post.image && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-border/60 bg-black/40">
                    <img 
                      src={post.image} 
                      alt="News media" 
                      className="h-auto max-h-80 w-full object-cover transition-transform duration-300 hover:scale-[1.02]" 
                    />
                  </div>
                )}

                {/* Нижняя панель действий (Лайки, каменты, репосты) */}
                <div className="mt-4 flex items-center gap-6 border-t border-border/40 pt-3 text-muted-foreground select-none">
                  {/* Кнопка ЛАЙКА */}
                  <button
                    type="button"
                    onClick={() => toggleLike(post.id)}
                    className={`group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                      isLiked ? "text-destructive" : "hover:text-destructive"
                    }`}
                  >
                    <Heart 
                      className={`size-4 transition-transform group-active:scale-125 ${
                        isLiked ? "fill-destructive text-destructive" : ""
                      }`} 
                    />
                    <span className="font-mono text-sm">{totalLikes}</span>
                  </button>

                  {/* Заглушка Комментариев */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold hover:text-primary transition-colors cursor-not-allowed">
                    <MessageSquare className="size-4" />
                    <span className="font-mono text-sm">0</span>
                  </div>

                  {/* Тег категории справа */}
                  <span className="ml-auto rounded bg-secondary/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border/30">
                    {lang === "ru" ? post.tagRu : post.tagEn}
                  </span>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}