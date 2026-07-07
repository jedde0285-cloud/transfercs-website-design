"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { Calendar, Heart, MessageSquare } from "lucide-react"

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
    titleRu: "xfl0ud переходит в FUT",
    titleEn: "xfl0ud transfers to FUT",
    textRu: "Исходя из нашей модели, трансфер обошелся FUT в 342 555$.",
    textEn: "Based on our model, the transfer cost FUT $342,555.",
    image: "/images/xfl0udjoinfut.jpg",
    tagRu: "Трансферы",
    tagEn: "Transfers",
    baseLikes: 0,
  },
  {
    id: 2,
    date: "05.07.2026",
    titleRu: "HEROIC официально представили Brollan",
    titleEn: "HEROIC officially revealed Brollan",
    textRu: "Ценник за игрока, по нашим данным, составил 454 976$. Неясно, какую роль займет игрок в новой команде.\n\nHEROIC:\n\n— nilo\n— susp\n— MartinezSa\n— Chr1zN\n— Brollan\n\n— doto (тренер)",
    textEn: "The player's price tag, according to our data, was $454,976. It is unclear what role the player will take in the new team.\n\nHEROIC:\n\n— nilo\n— susp\n— MartinezSa\n— Chr1zN\n— Brollan\n\n— doto (coach)",
    image: "/images/brollanjoinheroic.jpg",
    tagRu: "Трансферы",
    tagEn: "Transfers",
    baseLikes: 0,
  },
]

export function NewsFeed() {
  const { lang } = useLanguage()
  const [likedPosts, setLikedPosts] = useState<number[]>([])

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
      <div className="mb-6 border-b border-border/60 bg-[#121212]/90 p-4 rounded-xl border border-primary/20 shadow-[0_0_20px_rgba(255,90,0,0.03)]">
        <h1 className="font-display text-xl font-bold uppercase tracking-tight text-foreground sm:text-2xl">
          {lang === "ru" ? "Лента новостей" : "News Feed"}
        </h1>
      </div>

      <div className="flex flex-col gap-5">
        {mockNews.map((post) => {
          const isLiked = likedPosts.includes(post.id)
          const totalLikes = post.baseLikes + (isLiked ? 1 : 0)

          return (
            <article 
              key={post.id} 
              className="flex flex-col rounded-xl border border-border/80 bg-[#111111]/90 p-5 transition-all hover:border-primary/20 shadow-lg"
            >
              <div className="flex items-center justify-between gap-x-2 mb-3 border-b border-border/40 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-sm font-bold text-foreground">Jedde</span>
                  <span className="text-[11px] text-muted-foreground/60">· {lang === "ru" ? "автор" : "author"}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground/60">
                  <Calendar className="size-3" />
                  {post.date}
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-base font-bold text-foreground leading-snug">
                  {lang === "ru" ? post.titleRu : post.titleEn}
                </h2>
                <p className="text-sm leading-relaxed text-muted-foreground/90 whitespace-pre-line">
                  {lang === "ru" ? post.textRu : post.textEn}
                </p>
              </div>

              {post.image && (
                <div className="mt-4 overflow-hidden rounded-lg border border-border/40 bg-black/40">
                  <img 
                    src={post.image} 
                    alt="News media" 
                    className="h-auto max-h-72 w-full object-cover" 
                  />
                </div>
              )}

              <div className="mt-4 flex items-center gap-6 border-t border-border/40 pt-3 text-muted-foreground/70 select-none">
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

                <span className="ml-auto rounded bg-secondary/40 px-2 py-0.5尊 text-[10px] font-bold uppercase tracking-wider text-muted-foreground border border-border/30">
                  {lang === "ru" ? post.tagRu : post.tagEn}
                </span>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}