"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Calendar, Heart, MessageSquare, X } from "lucide-react"

type NewsPost = {
  id: number
  date: string
  titleRu: string
  titleEn: string
  textRu: string
  textEn: string
  image?: string
  tagRu: string
  tagEn: string
  baseLikes: number
}

const mockNews: NewsPost[] = [
  {
    id: 1,
    date: "07.07.2026",
    titleRu: "🇹🇷 xfl0ud переходит в FUT",
    titleEn: "🇹🇷 xfl0ud transfers to FUT",
    textRu: "Исходя из нашей модели, трансфер обошелся FUT в <span class='text-primary font-bold'>342 555$</span>.",
    textEn: "Based on our model, the transfer cost FUT <span class='text-primary font-bold'>$342,555</span>.",
    image: "/images/xfl0udjoinfut.jpg",
    tagRu: "ТРАНСФЕРЫ",
    tagEn: "TRANSFERS",
    baseLikes: 0,
  },
  {
    id: 2,
    date: "05.07.2026",
    titleRu: "🇪🇺 HEROIC официально представили 🇸🇪 Brollan",
    titleEn: "🇪🇺 HEROIC officially revealed 🇸🇪 Brollan",
    textRu: "Ценник за игрока, по нашим данным, составил <span class='text-primary font-bold'>454 976$</span>. Неясно, какую роль займет игрок в новой команде.\n\n🇪🇺 HEROIC:\n\n— 🇸🇪 nilo\n— 🇸🇪 susp\n— 🇪🇸 MartinezSa\n— 🇩🇰 Chr1zN\n— 🇸🇪 Brollan\n\n— 🇫🇮 doto (тренер)",
    textEn: "The player's price tag, according to our data, was <span class='text-primary font-bold'>$454,976</span>. It is unclear what role the player will take in the new team.\n\n🇪🇺 HEROIC:\n\n— 🇸🇪 nilo\n— 🇸🇪 susp\n— 🇪🇸 MartinezSa\n— 🇩🇰 Chr1zN\n— 🇸🇪 Brollan\n\n— 🇫🇮 doto (coach)",
    image: "/images/brollanjoinheroic.jpg",
    tagRu: "ТРАНСФЕРЫ",
    tagEn: "TRANSFERS",
    baseLikes: 0,
  },
]

export function NewsFeed() {
  const { lang } = useLanguage()
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [activeImage, setActiveImage] = useState<string | null>(null)

  useEffect(() => {
    const savedLikes = localStorage.getItem("transfercs_news_likes")
    if (savedLikes) setLikedPosts(JSON.parse(savedLikes))
  }, [])

  const toggleLike = (postId: number) => {
    let updatedLikes = likedPosts.includes(postId)
      ? likedPosts.filter((id) => id !== postId)
      : [...likedPosts, postId]
    setLikedPosts(updatedLikes)
    localStorage.setItem("transfercs_news_likes", JSON.stringify(updatedLikes))
  }

  return (
    <div className="relative mx-auto max-w-xl px-4 py-10 sm:px-6 lg:py-14 z-10">
      {/* Шапка ленты */}
      <div className="mb-6 border-b border-border/60 bg-[#121212]/90 p-4 rounded-xl border border-primary/20 shadow-[0_0_20px_rgba(255,90,0,0.03)]">
        <h1 className="font-display text-xl font-bold uppercase tracking-tight text-foreground sm:text-2xl">
          {lang === "ru" ? "Лента новостей" : "News Feed"}
        </h1>
      </div>

      {/* Список постов */}
      <div className="flex flex-col gap-5">
        {mockNews.map((post) => {
          const isLiked = likedPosts.includes(post.id)
          const totalLikes = post.baseLikes + (isLiked ? 1 : 0)

          return (
            <article 
              key={post.id} 
              className="flex flex-col rounded-xl border border-border/80 bg-[#111111]/90 p-6 transition-all hover:border-primary/20 shadow-lg"
            >
              {/* Шапка карточки (Автор + Пиксельный фиолетовый тег) */}
              <div className="flex items-center justify-between gap-x-2 mb-4 border-b border-border/40 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-bold text-foreground">Jedde</span>
                  
                  {/* Фиолетовая неяркая пиксельная плашка */}
                  <span className="rounded bg-purple-950/40 border border-purple-500/30 px-2 py-0.5 font-mono text-[9px] font-extrabold uppercase tracking-widest text-purple-400/90 shadow-[0_0_10px_rgba(168,85,247,0.05)]">
                    {lang === "ru" ? post.tagRu : post.tagEn}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground/60">
                  <Calendar className="size-3" />
                  {post.date}
                </div>
              </div>

              {/* Контентная часть (Текст и заголовок) */}
              <div className="space-y-3">
                {/* Заголовок: Чисто белый, крупнее, semi-bold */}
                <h2 className="text-xl font-semibold text-[#FFFFFF] leading-snug tracking-wide">
                  {lang === "ru" ? post.titleRu : post.titleEn}
                </h2>
                
                {/* Основной текст: светло-серый #B0B0B0, свободный межстрочный интервал 1.5 */}
                <p 
                  className="text-sm leading-[1.5] text-[#B0B0B0] whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: lang === "ru" ? post.textRu : post.textEn }}
                />
              </div>

              {/* Фото поста с увеличением по клику */}
              {post.image && (
                <div 
                  onClick={() => setActiveImage(post.image || null)}
                  className="mt-4 overflow-hidden rounded-lg border border-border/40 bg-black/40 cursor-zoom-in"
                >
                  <img 
                    src={post.image} 
                    alt="News media" 
                    className="h-auto max-h-72 w-full object-cover transition-transform hover:scale-[1.01]" 
                  />
                </div>
              )}

              {/* Панель действий снизу (категория справа удалена) */}
              <div className="mt-5 flex items-center gap-6 border-t border-border/40 pt-3 text-muted-foreground/70 select-none">
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  className={`group flex items-center gap-1.5 text-xs font-semibold tracking-wider transition-colors ${
                    isLiked ? "text-destructive" : "hover:text-destructive"
                  }`}
                >
                  <Heart className={`size-4 transition-transform group-active:scale-125 ${isLiked ? "fill-destructive text-destructive" : ""}`} />
                  <span className="font-mono text-xs">{totalLikes}</span>
                </button>

                <div className="flex items-center gap-1.5 text-xs font-semibold cursor-not-allowed">
                  <MessageSquare className="size-4" />
                  <span className="font-mono text-xs">0</span>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Полноэкранный просмотр фото */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={() => setActiveImage(null)}
        >
          <button 
            type="button"
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-neutral-900/50"
            onClick={() => setActiveImage(null)}
          >
            <X className="size-6" />
          </button>
          <img 
            src={activeImage} 
            alt="Full size preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  )
}