import React, { useState, useEffect } from 'react'
import { useApp } from '../context'
import VoiceButton from '../components/VoiceButton'

/* ════════════════════════════════════════
   Step 1 — App Introduction
   ════════════════════════════════════════ */
function AppIntro({ onNext }) {
  const { speak } = useApp()

  useEffect(() => {
    speak('Welcome to FinSight. Your AI banking copilot, built for everyone.')
  }, [])

  return (
    <div className="screen" style={{ background: 'linear-gradient(160deg, #0f1535 0%, #1e2b6e 40%, #4361EE 100%)' }}>
      <div style={{ padding: '20px 28px 36px', display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeInUp 0.5s ease both' }}>
          <div style={{
            width: 40, height: 40,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
              <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
              <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85"/>
            </svg>
          </div>
          <span style={{ color: 'white', fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>
            FinSight
          </span>
        </div>

        {/* Illustration */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
          <div style={{ position: 'relative', animation: 'float 4s ease-in-out infinite' }}>
            {/* Outer rings */}
            <div style={{
              position: 'absolute', inset: -32,
              border: '1.5px solid rgba(255,255,255,0.12)',
              borderRadius: '50%',
              animation: 'pulse 3.5s ease-in-out infinite',
            }} aria-hidden="true" />
            <div style={{
              position: 'absolute', inset: -56,
              border: '1.5px solid rgba(255,255,255,0.06)',
              borderRadius: '50%',
              animation: 'pulse 3.5s ease-in-out infinite 1.2s',
            }} aria-hidden="true" />

            {/* Main orb */}
            <div style={{
              width: 150, height: 150,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="white"/>
                <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6"/>
                <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8"/>
              </svg>
            </div>

            {/* Floating pills */}
            {[
              { text: '💬 Voice', top: -24, right: -60, delay: '0.8s' },
              { text: '🔒 Secure', bottom: 10, left: -68, delay: '1.2s' },
              { text: '✓ Guided', bottom: -20, right: -58, delay: '1.6s' },
            ].map(pill => (
              <div key={pill.text} style={{
                position: 'absolute',
                top: pill.top, right: pill.right, bottom: pill.bottom, left: pill.left,
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 20,
                padding: '6px 12px',
                fontSize: 12,
                fontWeight: 600,
                color: 'white',
                whiteSpace: 'nowrap',
                animation: `fadeInUp 0.5s ease ${pill.delay} both`,
              }} aria-hidden="true">
                {pill.text}
              </div>
            ))}
          </div>
        </div>

        {/* Copy */}
        <div style={{ animation: 'fadeInUp 0.6s ease 0.2s both' }}>
          <h1 style={{
            fontSize: 34, fontWeight: 800, color: 'white',
            letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 14,
          }}>
            AI banking,<br />built for everyone.
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 32 }}>
            Complete banking tasks through guided, voice-first interactions — no complex menus required.
          </p>

          <button
            className="btn btn-primary"
            style={{
              background: 'white',
              color: 'var(--blue)',
              fontWeight: 700,
              fontSize: 17,
              marginBottom: 16,
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
            onClick={onNext}
            aria-label="Get started with FinSight"
          >
            Get Started
          </button>

          <button
            className="btn btn-ghost"
            style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}
            onClick={() => {}}
            aria-label="Already have an account — log in"
          >
            Already have an account? <span style={{ color: 'white', fontWeight: 600 }}>Log In</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Step 2 — Tutorial Decision
   ════════════════════════════════════════ */
function TutorialDecision({ onYes, onNo }) {
  const { speak } = useApp()

  useEffect(() => {
    speak('Would you like a quick tutorial to see how FinSight works?')
  }, [])

  return (
    <div className="screen" style={{ background: 'linear-gradient(160deg, #0f1535 0%, #1e2b6e 40%, #4361EE 100%)' }}>
      <div style={{ padding: '32px 24px 36px', display: 'flex', flexDirection: 'column', height: '100%' }}>

        <div style={{ animation: 'fadeInUp 0.4s ease both' }}>
          <div style={{
            width: 56, height: 56, background: 'rgba(255,255,255,0.15)',
            borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24, fontSize: 26,
          }} aria-hidden="true">🎯</div>

          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-0.01em', marginBottom: 10 }}>
            Want a quick tutorial?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 36 }}>
            See how FinSight guides you through a banking task in about 30 seconds.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, animation: 'fadeInUp 0.4s ease 0.15s both' }}>
          <button
            className="btn"
            style={{
              background: 'white', color: 'var(--blue)',
              fontWeight: 700, fontSize: 16, gap: 10,
            }}
            onClick={onYes}
            aria-label="Yes, show me the tutorial"
          >
            <span style={{ fontSize: 20 }} aria-hidden="true">✨</span>
            Yes, show me how it works
          </button>

          <button
            className="btn"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600,
              border: '1.5px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
            }}
            onClick={onNo}
            aria-label="Skip tutorial and continue"
          >
            Skip for now
          </button>
        </div>

        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px 0',
        }}>
          {[
            { emoji: '🎙️', text: 'Speak your intent' },
            { emoji: '👣', text: 'Follow guided steps' },
            { emoji: '✅', text: 'Confirm & done' },
          ].map((item, i) => (
            <React.Fragment key={item.text}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                animation: `fadeInUp 0.4s ease ${0.3 + i * 0.1}s both`,
              }}>
                <div style={{
                  width: 52, height: 52, background: 'rgba(255,255,255,0.12)',
                  borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, border: '1px solid rgba(255,255,255,0.15)',
                }} aria-hidden="true">{item.emoji}</div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500, textAlign: 'center' }}>
                  {item.text}
                </span>
              </div>
              {i < 2 && (
                <div style={{
                  flex: 1, height: 1, background: 'rgba(255,255,255,0.15)',
                  margin: '0 8px', marginBottom: 20,
                }} aria-hidden="true" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Step 3 — Tutorial Demo (Simulated Chat)
   ════════════════════════════════════════ */
function TutorialDemo({ onNext }) {
  const { speak } = useApp()
  const [messages, setMessages] = useState([])
  const [phase, setPhase] = useState(0)

  const chatScript = [
    { role: 'user',   text: 'Check my balance',                          delay: 500 },
    { role: 'system', text: 'Checking your accounts…',                    delay: 1400 },
    { role: 'system', text: '✓ Checking ••4291: $3,847.52',               delay: 2600 },
    { role: 'system', text: '✓ Savings ••8834: $12,450.00',               delay: 3400 },
    { role: 'system', text: 'That\'s your current balance. Anything else?', delay: 4200 },
  ]

  useEffect(() => {
    speak('Let me show you how it works. Watch a quick balance check.')
    chatScript.forEach((msg, i) => {
      setTimeout(() => setMessages(prev => [...prev, msg]), msg.delay)
    })
  }, [])

  useEffect(() => {
    if (messages.length === chatScript.length) {
      const last = chatScript[chatScript.length - 1]
      setTimeout(() => setPhase(1), last.delay + 800)
    }
  }, [messages])

  return (
    <div className="screen" style={{ background: 'linear-gradient(160deg, #0f1535 0%, #2d3a7a 100%)' }}>
      <div style={{ padding: '24px 24px 32px', display: 'flex', flexDirection: 'column', height: '100%' }}>

        <div style={{ marginBottom: 24, animation: 'fadeInUp 0.4s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: '6px 14px',
            marginBottom: 16,
          }}>
            <div style={{ width: 8, height: 8, background: '#10B981', borderRadius: '50%' }} aria-hidden="true" />
            <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 600 }}>Live Demo</span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 8 }}>
            "Check my balance"
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
            Watch FinSight guide you step by step
          </p>
        </div>

        {/* Chat bubbles */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                animation: 'fadeInUp 0.3s ease both',
              }}
            >
              {msg.role === 'system' && (
                <div style={{
                  width: 30, height: 30, background: 'rgba(67,97,238,0.8)',
                  borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginRight: 8, flexShrink: 0, fontSize: 14,
                }} aria-hidden="true">✦</div>
              )}
              <div style={{
                maxWidth: '75%',
                padding: '10px 14px',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                background: msg.role === 'user'
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255,255,255,0.12)',
                color: msg.role === 'user' ? 'var(--gray-900)' : 'white',
                fontSize: 15,
                fontWeight: msg.role === 'user' ? 600 : 400,
                backdropFilter: 'blur(10px)',
                border: msg.role === 'system' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {messages.length > 0 && messages.length < chatScript.length && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 30, height: 30, background: 'rgba(67,97,238,0.8)',
                borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14,
              }} aria-hidden="true">✦</div>
              <div style={{
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.12)',
                borderRadius: '4px 18px 18px 18px',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', gap: 6, alignItems: 'center',
              }} aria-label="FinSight is typing">
                {[0,1,2].map(j => (
                  <div key={j} style={{
                    width: 7, height: 7, background: 'rgba(255,255,255,0.5)',
                    borderRadius: '50%',
                    animation: `pulse 0.9s ease-in-out infinite ${j * 0.2}s`,
                  }} aria-hidden="true" />
                ))}
              </div>
            </div>
          )}
        </div>

        {phase === 1 && (
          <div style={{ marginTop: 24, animation: 'fadeInUp 0.4s ease both' }}>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginBottom: 16 }}>
              That's all it takes — simple, guided, and fast.
            </p>
            <button
              className="btn"
              style={{ background: 'white', color: 'var(--blue)', fontWeight: 700 }}
              onClick={onNext}
              aria-label="Continue to accessibility settings"
            >
              Continue →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Step 4 — Accessibility Setup
   ════════════════════════════════════════ */
function AccessibilitySetup({ onNext }) {
  const { accessibility, updateAccessibility, speak } = useApp()

  useEffect(() => {
    speak('Customize your accessibility settings. You can change these at any time.')
  }, [])

  const toggle = (key) => {
    updateAccessibility({ [key]: !accessibility[key] })
  }

  return (
    <div className="screen" style={{ background: 'linear-gradient(160deg, #0f1535 0%, #1e2b6e 40%, #4361EE 100%)' }}>
      <div style={{ padding: '32px 24px 36px', display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Header */}
        <div style={{ marginBottom: 28, animation: 'fadeInUp 0.4s ease both' }}>
          <div style={{
            width: 56, height: 56, background: 'rgba(255,255,255,0.15)',
            borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 20, fontSize: 26,
          }} aria-hidden="true">♿</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: 'white', marginBottom: 8 }}>
            Customize your experience
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
            Adjust settings for your needs. These can be changed anytime in Settings.
          </p>
        </div>

        {/* Settings Card */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 20,
          padding: '4px 20px',
          marginBottom: 20,
          animation: 'fadeInUp 0.4s ease 0.1s both',
        }}>
          {[
            {
              key:   'audioGuidance',
              title: 'Audio Guidance',
              desc:  'Hear spoken instructions and confirmations',
              emoji: '🔊',
            },
            {
              key:   'hapticFeedback',
              title: 'Haptic Feedback',
              desc:  'Feel vibrations for confirmations and errors',
              emoji: '📳',
            },
          ].map(item => (
            <div key={item.key} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 0',
              borderBottom: item.key === 'audioGuidance' ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22 }} aria-hidden="true">{item.emoji}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{item.desc}</div>
                </div>
              </div>
              <button
                className={`toggle${accessibility[item.key] ? ' toggle--on' : ''}`}
                onClick={() => toggle(item.key)}
                role="switch"
                aria-checked={accessibility[item.key]}
                aria-label={`${item.title}: ${accessibility[item.key] ? 'on' : 'off'}`}
              >
                <div className="toggle-thumb" />
              </button>
            </div>
          ))}
        </div>

        {/* Voice Speed */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 20,
          padding: '18px 20px',
          animation: 'fadeInUp 0.4s ease 0.2s both',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 20 }} aria-hidden="true">🎙️</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: 'white' }}>Voice Speed</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }} role="radiogroup" aria-label="Voice speed">
            {['slow', 'normal', 'fast'].map(speed => (
              <button
                key={speed}
                role="radio"
                aria-checked={accessibility.voiceSpeed === speed}
                onClick={() => updateAccessibility({ voiceSpeed: speed })}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: 12,
                  border: '1.5px solid',
                  borderColor: accessibility.voiceSpeed === speed ? 'white' : 'rgba(255,255,255,0.2)',
                  background: accessibility.voiceSpeed === speed ? 'white' : 'transparent',
                  color: accessibility.voiceSpeed === speed ? 'var(--blue)' : 'rgba(255,255,255,0.65)',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s',
                }}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>

        <div style={{ animation: 'fadeInUp 0.4s ease 0.3s both' }}>
          <button
            className="btn"
            style={{ background: 'white', color: 'var(--blue)', fontWeight: 700, marginBottom: 12 }}
            onClick={onNext}
            aria-label="Continue to create your account"
          >
            Continue
          </button>
          <button
            className="btn btn-ghost"
            style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}
            onClick={onNext}
            aria-label="Use system accessibility settings"
          >
            Use system settings
          </button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Onboarding Orchestrator
   ════════════════════════════════════════ */
export default function Onboarding() {
  const { navigate } = useApp()
  const [step, setStep] = useState('intro')

  if (step === 'intro')              return <AppIntro          onNext={() => setStep('tutorial-decision')} />
  if (step === 'tutorial-decision')  return <TutorialDecision  onYes={() => setStep('tutorial-demo')} onNo={() => setStep('accessibility')} />
  if (step === 'tutorial-demo')      return <TutorialDemo      onNext={() => setStep('accessibility')} />
  if (step === 'accessibility')      return <AccessibilitySetup onNext={() => navigate('auth/signup')} />
  return null
}
