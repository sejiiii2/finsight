import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../context'
import { formatCurrency, getGreeting, MOCK_TRANSACTIONS } from '../data'
import VoiceButton from '../components/VoiceButton'

/* ── Task definitions ───────────────────── */
const TASKS = [
  { id: 'send-money',    label: 'Send Money',    emoji: '💸', bg: '#EEF2FF', color: '#4361EE', description: 'Transfer to anyone' },
  { id: 'check-balance', label: 'Check Balance', emoji: '💳', bg: '#F0FDF4', color: '#059669', description: 'View account balances' },
  { id: 'deposit-check', label: 'Deposit Check', emoji: '📸', bg: '#FFF7ED', color: '#EA580C', description: 'Snap and deposit' },
  { id: 'pay-bill',      label: 'Pay a Bill',    emoji: '🧾', bg: '#FDF4FF', color: '#9333EA', description: 'Pay upcoming bills' },
]

/* ── Voice intent mapping ───────────────── */
function detectIntent(text) {
  const t = text.toLowerCase()
  if (t.includes('send') || t.includes('transfer') || t.includes('pay') && !t.includes('bill'))
    return 'send-money'
  if (t.includes('balance') || t.includes('how much') || t.includes('check'))
    return 'check-balance'
  if (t.includes('deposit') || t.includes('check'))
    return 'deposit-check'
  if (t.includes('bill'))
    return 'pay-bill'
  return null
}

/* ── Transaction list item ───────────────── */
function TxItem({ tx }) {
  const isPositive = tx.amount > 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0',
      borderBottom: '1px solid var(--gray-100)' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 14,
        background: isPositive ? 'var(--green-light)' : '#FEF3C7',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, flexShrink: 0,
      }} aria-hidden="true">
        {tx.type === 'received' ? '⬇️' : tx.type === 'bill' ? '🧾' : '⬆️'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--gray-900)' }}>{tx.name}</div>
        <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>{tx.date} · {tx.time}</div>
      </div>
      <span style={{
        fontSize: 16, fontWeight: 700,
        color: isPositive ? 'var(--green)' : 'var(--gray-900)',
      }}>
        {isPositive ? '+' : ''}{formatCurrency(tx.amount)}
      </span>
    </div>
  )
}

/* ════════════════════════════════════════
   Home Screen
   ════════════════════════════════════════ */
export default function Home() {
  const { user, defaultAccount, navigate, speak, haptic } = useApp()
  const [voiceHint, setVoiceHint] = useState(null)
  const firstName = user?.firstName || 'there'
  const greeting  = getGreeting()
  const hintRef   = useRef(null)

  useEffect(() => {
    speak(`${greeting}, ${firstName}. What would you like to do today?`)
  }, [])

  const handleVoiceResult = (transcript) => {
    const intent = detectIntent(transcript)
    if (intent) {
      haptic([10, 50, 10])
      setVoiceHint({ transcript, intent, found: true })
      clearTimeout(hintRef.current)
      hintRef.current = setTimeout(() => {
        setVoiceHint(null)
        navigate(intent)
      }, 900)
    } else {
      setVoiceHint({ transcript, found: false })
      clearTimeout(hintRef.current)
      hintRef.current = setTimeout(() => setVoiceHint(null), 2500)
    }
  }

  const handleTask = (taskId) => {
    haptic([8])
    navigate(taskId)
  }

  return (
    <div className="screen" style={{ background: 'var(--gray-50)' }}>

      {/* ── Gradient Header ── */}
      <div className="gradient-header" style={{ paddingTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 4 }}>{greeting} 👋</p>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>
              {firstName}
            </h1>
          </div>
          <button
            style={{
              width: 42, height: 42, background: 'rgba(255,255,255,0.15)',
              borderRadius: 14, border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(10px)', color: 'white',
            }}
            aria-label="Open settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="12" cy="8" r="2"/>
              <circle cx="12" cy="16" r="2"/>
              <circle cx="20" cy="12" r="2"/>
              <circle cx="4" cy="12" r="2"/>
            </svg>
          </button>
        </div>

        {/* Balance Card inside header */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: 18,
          padding: '18px 20px',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600,
                letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>
                {defaultAccount.type} ••{defaultAccount.last4}
              </p>
              <p style={{ fontSize: 32, fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                {formatCurrency(defaultAccount.balance)}
              </p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>
                Available: {formatCurrency(defaultAccount.available)}
              </p>
            </div>
            <div style={{
              width: 48, height: 48, background: 'rgba(255,255,255,0.15)',
              borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22,
            }} aria-hidden="true">🏦</div>
          </div>
        </div>
      </div>

      {/* ── Voice Input Area ── */}
      <div style={{
        margin: '20px 24px 16px',
        background: 'white',
        borderRadius: 20,
        padding: '20px',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--gray-700)', textAlign: 'center' }}>
          What would you like to do?
        </p>

        <VoiceButton
          size={72}
          hint="Tap to speak"
          onResult={handleVoiceResult}
          onActivate={() => setVoiceHint({ transcript: null, simulating: true })}
        />

        {/* Voice feedback */}
        {voiceHint && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
            animation: 'fadeIn 0.2s ease both',
          }}>
            {voiceHint.transcript && (
              <div style={{
                background: 'var(--gray-50)', borderRadius: 12,
                padding: '8px 14px', fontSize: 14, color: 'var(--gray-700)', fontStyle: 'italic',
              }}>
                "{voiceHint.transcript}"
              </div>
            )}
            {voiceHint.found && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--green-light)', borderRadius: 10, padding: '6px 12px',
              }}>
                <div style={{ width: 8, height: 8, background: 'var(--green)', borderRadius: '50%' }} aria-hidden="true" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)' }}>
                  Opening {TASKS.find(t => t.id === voiceHint.intent)?.label}…
                </span>
              </div>
            )}
            {voiceHint.found === false && (
              <p style={{ fontSize: 13, color: 'var(--red)', textAlign: 'center' }}>
                Sorry, I didn't catch that. Try again or tap a task below.
              </p>
            )}
          </div>
        )}
      </div>

      {/* ── Quick Tips ── */}
      <div style={{ padding: '0 24px 4px' }}>
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
          scrollbarWidth: 'none',
        }}>
          {['"Send $20 to Sarah"', '"Check balance"', '"Pay electric bill"'].map(tip => (
            <button
              key={tip}
              onClick={() => handleVoiceResult(tip.replace(/['"]/g, ''))}
              style={{
                background: 'var(--blue-light)', color: 'var(--blue)',
                border: 'none', borderRadius: 20, padding: '7px 14px',
                fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
                cursor: 'pointer', flexShrink: 0,
              }}
              aria-label={`Try saying ${tip}`}
            >
              {tip}
            </button>
          ))}
        </div>
      </div>

      {/* ── Task Grid ── */}
      <div style={{ padding: '20px 24px 0' }}>
        <p className="section-label">Quick Actions</p>
        <div className="task-grid">
          {TASKS.map((task, i) => (
            <button
              key={task.id}
              className="task-card"
              onClick={() => handleTask(task.id)}
              style={{ animationDelay: `${i * 0.06}s` }}
              aria-label={`${task.label} — ${task.description}`}
            >
              <div className="task-icon" style={{ background: task.bg }}>
                <span aria-hidden="true">{task.emoji}</span>
              </div>
              <div>
                <div className="task-label">{task.label}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{task.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div style={{ padding: '24px 24px 8px' }}>
        <p className="section-label">Recent Activity</p>
        <div style={{ background: 'white', borderRadius: 16, padding: '0 16px', boxShadow: 'var(--shadow-sm)' }}>
          {MOCK_TRANSACTIONS.map(tx => (
            <TxItem key={tx.id} tx={tx} />
          ))}
        </div>
      </div>

      {/* AI suggestion */}
      <div style={{ padding: '16px 24px 32px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--blue-light) 0%, #F5F0FF 100%)',
          borderRadius: 16, padding: '16px',
          border: '1px solid rgba(67,97,238,0.1)',
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, background: 'var(--blue)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16,
          }} aria-hidden="true">✦</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', marginBottom: 4 }}>
              AI Suggestion
            </p>
            <p style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.5 }}>
              Your electric bill of <strong>$87.43</strong> is due March 15. Want to pay it now?
            </p>
            <button
              onClick={() => navigate('pay-bill')}
              style={{
                background: 'var(--blue)', color: 'white',
                border: 'none', borderRadius: 10, padding: '8px 14px',
                fontSize: 13, fontWeight: 600, marginTop: 10, cursor: 'pointer',
              }}
              aria-label="Pay electric bill now"
            >
              Pay bill →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
