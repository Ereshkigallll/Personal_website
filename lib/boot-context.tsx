'use client'

import { createContext, useContext, useState } from 'react'

interface BootContextValue {
  bootDone: boolean
  setBootDone: (v: boolean) => void
}

const BootContext = createContext<BootContextValue>({
  bootDone: false,
  setBootDone: () => {},
})

export function BootProvider({ children }: { children: React.ReactNode }) {
  const [bootDone, setBootDone] = useState(false)
  return (
    <BootContext.Provider value={{ bootDone, setBootDone }}>
      {children}
    </BootContext.Provider>
  )
}

export const useBootDone = () => useContext(BootContext)
