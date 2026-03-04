'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type Lang = 'en' | 'zh'

interface LanguageCtx {
  lang:    Lang
  setLang: (l: Lang) => void
  /** Inline translation helper: t('English', '中文') */
  t: (en: string, zh: string) => string
}

const LanguageContext = createContext<LanguageCtx>({
  lang:    'en',
  setLang: () => {},
  t:       (en) => en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  /* Restore persisted preference on first mount */
  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved === 'en' || saved === 'zh') setLangState(saved)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = (en: string, zh: string) => (lang === 'zh' ? zh : en)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
