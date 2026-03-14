import React from 'react'
import { AppProvider, useApp } from './context'
import Onboarding from './screens/Onboarding'
import Auth       from './screens/Auth'
import Home       from './screens/Home'
import SendMoney  from './screens/SendMoney'
import SimTask    from './screens/SimTask'

/* ── Status Bar ─────────────────────────── */
function StatusBar({ light = false }) {
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className={`status-bar${light ? ' status-bar--light' : ''}`} aria-hidden="true">
      <span>{time}</span>
      <div className="status-icons">
        {/* Signal */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0"  y="8"  width="3" height="4" rx="1" opacity="0.4"/>
          <rect x="5"  y="5"  width="3" height="7" rx="1" opacity="0.6"/>
          <rect x="10" y="2"  width="3" height="10" rx="1" opacity="0.8"/>
          <rect x="15" y="0"  width="3" height="12" rx="1"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="currentColor"/>
          <path d="M3.5 6.5a6.5 6.5 0 0 1 9 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
          <path d="M1 4a10 10 0 0 1 14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3"/>
        </svg>
        {/* Battery */}
        <svg width="26" height="12" viewBox="0 0 26 12" fill="currentColor">
          <rect x="0" y="1" width="22" height="10" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <rect x="2" y="3" width="16" height="6" rx="1.5"/>
          <path d="M23 4.5v3a1.5 1.5 0 0 0 0-3z"/>
        </svg>
      </div>
    </div>
  )
}

/* ── Home Indicator ─────────────────────── */
function HomeIndicator({ light = false }) {
  return (
    <div className={`home-indicator${light ? ' home-indicator--light' : ''}`} aria-hidden="true">
      <div className="home-indicator-bar" />
    </div>
  )
}

/* ── Screen Router ──────────────────────── */
function Router() {
  const { screen } = useApp()

  // Determine status bar / home indicator style
  const lightChrome = ['onboarding', 'send-money'].includes(screen)
    || screen.startsWith('auth')

  // Pick which screen to render
  let content
  if (screen === 'onboarding') {
    content = <Onboarding key="onboarding" />
  } else if (screen === 'auth/signup' || screen === 'auth/login') {
    content = <Auth key={screen} />
  } else if (screen === 'home') {
    content = <Home key="home" />
  } else if (screen === 'send-money') {
    content = <SendMoney key="send-money" />
  } else if (screen === 'check-balance' || screen === 'deposit-check' || screen === 'pay-bill') {
    content = <SimTask key={screen} task={screen} />
  } else {
    content = <Home key="home-fallback" />
  }

  return (
    <>
      <StatusBar light={lightChrome} />
      <div className="dynamic-island" aria-hidden="true" />
      {content}
      <HomeIndicator light={lightChrome} />
    </>
  )
}

/* ── App Shell ──────────────────────────── */
export default function App() {
  return (
    <AppProvider>
      <div className="phone-frame" role="main">
        <Router />
      </div>
    </AppProvider>
  )
}
