import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import { MOCK_USER, MOCK_ACCOUNTS } from './data'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [screen, setScreen]           = useState('onboarding')
  const [user, setUser]               = useState(null)
  const [accounts]                    = useState(MOCK_ACCOUNTS)
  const [defaultAccount, setDefaultAccount] = useState(MOCK_ACCOUNTS[0])
  const [accessibility, setAccessibility] = useState({
    audioGuidance:   true,
    hapticFeedback:  true,
    voiceSpeed:      'normal', // 'slow' | 'normal' | 'fast'
  })
  const [transaction, setTransaction] = useState({})
  const synthRef = useRef(null)

  // Speak text aloud if audio guidance is on
  const speak = useCallback((text) => {
    if (!accessibility.audioGuidance) return
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(text)
    utt.rate = accessibility.voiceSpeed === 'slow' ? 0.75
             : accessibility.voiceSpeed === 'fast' ? 1.4
             : 1.0
    window.speechSynthesis.speak(utt)
    synthRef.current = utt
  }, [accessibility.audioGuidance, accessibility.voiceSpeed])

  // Haptic feedback
  const haptic = useCallback((pattern = [10]) => {
    if (!accessibility.hapticFeedback) return
    if (navigator.vibrate) navigator.vibrate(pattern)
  }, [accessibility.hapticFeedback])

  const navigate = useCallback((target) => {
    setScreen(target)
  }, [])

  const signUp = useCallback((userData) => {
    setUser({ ...MOCK_USER, ...userData })
  }, [])

  const updateAccessibility = useCallback((prefs) => {
    setAccessibility(prev => ({ ...prev, ...prefs }))
  }, [])

  const updateTransaction = useCallback((data) => {
    setTransaction(prev => ({ ...prev, ...data }))
  }, [])

  const clearTransaction = useCallback(() => {
    setTransaction({})
  }, [])

  return (
    <AppContext.Provider value={{
      screen,
      navigate,
      user,
      signUp,
      accounts,
      defaultAccount,
      setDefaultAccount,
      accessibility,
      updateAccessibility,
      transaction,
      updateTransaction,
      clearTransaction,
      speak,
      haptic,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
