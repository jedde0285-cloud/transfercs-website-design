"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Lang = "ru" | "en"

type Dict = {
  nav: { calc: string; teams: string; players: string; about: string }
  hero: {
    badge: string
    titleTop: string
    titleAccent: string
    desc: string
    ctaStart: string
    ctaPlayers: string
    stats: { players: string; teams: string; model: string }
    mostExpensive: string
    role: string
  }
  topTeams: { title: string; now: string }
  footer: {
    legal: string
    devContacts: string
    activeUsers: string
    tagline: string
  }
}

const dictionaries: Record<Lang, Dict> = {
  ru: {
    nav: { calc: "Новости", teams: "Клубы", players: "Игроки", about: "О проекте" },
    hero: {
      badge: "Аналитика киберспорта · CS",
      titleTop: "Узнай реальную",
      titleAccent: "цену игрока",
      desc: "Мы рассчитываем трансферную стоимость киберспортсменов на основе статистики, возраста и рыночных трендов. Оцени любого игрока за секунды.",
      ctaStart: "Начать расчёт",
      ctaPlayers: "Все игроки",
      stats: { players: "Игроков", teams: "Команд", model: "Уникальная модель расчёта" },
      mostExpensive: "Самый дорогой игрок",
      role: "Team Spirit · Rifler",
    },
    topTeams: { title: "Топ-5 команд", now: "Сейчас" },
    footer: {
      legal: "© 2026 TransferCS. Все права защищены. Все данные являются аналитической оценкой и не являются официальной информацией. Логотипы и изображения принадлежат их правообладателям.",
      devContacts: "Контакты разработчика:",
      activeUsers: "Активные пользователи:",
      tagline: "Аналитика трансферного рынка киберспорта",
    },
  },
  en: {
    nav: { calc: "News", teams: "Teams", players: "Players", about: "About" },
    hero: {
      badge: "Esports analytics · CS",
      titleTop: "Discover the real",
      titleAccent: "player price",
      desc: "TransferCS estimates the transfer value of esports players based on statistics, age and market trends. Value any player in seconds.",
      ctaStart: "Start valuation",
      ctaPlayers: "All players",
      stats: { players: "Players", teams: "Teams", model: "Unique valuation model" },
      mostExpensive: "Most expensive player",
      role: "Team Spirit · Rifler",
    },
    topTeams: { title: "Top-5 teams", now: "Now" },
    footer: {
      legal: "© 2026 TransferCS. All rights reserved. All data is an analytical estimate and is not official information. Logos and images belong to their respective owners.",
      devContacts: "Developer contacts:",
      activeUsers: "Active users:",
      tagline: "Esports transfer market analytics",
    },
  },
}

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dict
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru")

  // Читаем сохраненный язык из памяти браузера при первой загрузке
  useEffect(() => {
    const savedLang = localStorage.getItem("transfercs_lang") as Lang
    if (savedLang && (savedLang === "ru" || savedLang === "en")) {
      setLangState(savedLang)
    }
  }, [])

  // Кастомная функция смены языка, которая сразу пишет его в localStorage
  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem("transfercs_lang", newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
