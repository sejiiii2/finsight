import React, { useState, useEffect } from 'react'
import { useApp } from '../context'
import { MOCK_ACCOUNTS, MOCK_BANKS, formatCurrency } from '../data'

/* ── Shared Header ───────────────────────────────── */
function AuthHeader({ onBack, step, total, title, subtitle, light = true }) {
  return (
    <div style={{
      background: light
        ? 'linear-gradient(145deg, #1e2b6e 0%, #4361EE 100%)'
        : 'var(--gray-50)',
      padding: '20px 24px 28px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        {onBack && (
          <button
            className="back-btn"
            onClick={onBack}
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div style={{ flex: 1 }}>
          {step && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: total }).map((_, i) => (
                  <div key={i} style={{
                    flex: 1, height: 4, borderRadius: 4,
                    background: i < step
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.2)',
                    transition: 'background 0.3s',
                  }} aria-hidden="true" />
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>
                Step {step} of {total}
              </p>
            </div>
          )}
          <h2 style={{ fontSize: 22, fontWeight: 800, color: light ? 'white' : 'var(--gray-900)', lineHeight: 1.25 }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 14, color: light ? 'rgba(255,255,255,0.65)' : 'var(--gray-500)', marginTop: 6 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Step 1 — Account Creation
   ════════════════════════════════════════ */
function SignUpAccount({ onNext }) {
  const { speak } = useApp()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [showPw, setShowPw] = useState(false)

  useEffect(() => {
    speak('Create your FinSight account. Enter your name, email, and choose a password.')
  }, [])

  const valid = form.firstName && form.lastName && form.email && form.password.length >= 6

  return (
    <div className="screen">
      <AuthHeader step={1} total={4} title="Create your account" subtitle="Join FinSight to get started" />

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div className="input-group" style={{ flex: 1 }}>
            <label className="input-label" htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              className="input"
              placeholder="Alex"
              value={form.firstName}
              onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
              autoComplete="given-name"
            />
          </div>
          <div className="input-group" style={{ flex: 1 }}>
            <label className="input-label" htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              className="input"
              placeholder="Johnson"
              value={form.lastName}
              onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="input-group" style={{ marginBottom: 16 }}>
          <label className="input-label" htmlFor="email">Email Address</label>
          <input
            id="email"
            className="input"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            autoComplete="email"
          />
        </div>

        <div className="input-group" style={{ marginBottom: 28 }}>
          <label className="input-label" htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              className="input"
              type={showPw ? 'text' : 'password'}
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              autoComplete="new-password"
              style={{ paddingRight: 48 }}
            />
            <button
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--gray-400)', fontSize: 13, fontWeight: 600,
              }}
              onClick={() => setShowPw(v => !v)}
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              {showPw ? 'Hide' : 'Show'}
            </button>
          </div>
          {form.password && form.password.length < 6 && (
            <p style={{ fontSize: 12, color: 'var(--red)', marginTop: 4 }}>
              Password must be at least 6 characters
            </p>
          )}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => valid && onNext(form)}
          disabled={!valid}
          style={{ opacity: valid ? 1 : 0.5 }}
          aria-label="Continue to security setup"
        >
          Continue
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)', marginTop: 20, lineHeight: 1.6 }}>
          By continuing, you agree to our{' '}
          <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color: 'var(--blue)', fontWeight: 600 }}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Step 2 — Security Setup
   ════════════════════════════════════════ */
function SecuritySetup({ onNext, onBack }) {
  const { speak } = useApp()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    speak('Choose how you want to protect your account. You can use Face ID or a PIN code.')
  }, [])

  const options = [
    {
      id: 'biometric',
      icon: '👤',
      title: 'Face ID / Touch ID',
      desc: 'Use your device biometrics for fast, secure authentication',
      badge: 'Recommended',
    },
    {
      id: 'pin',
      icon: '🔢',
      title: 'PIN Code',
      desc: 'Set a 6-digit PIN to authenticate your transactions',
      badge: null,
    },
  ]

  return (
    <div className="screen">
      <AuthHeader
        onBack={onBack}
        step={2} total={4}
        title="Set up security"
        subtitle="Protect your account and confirm transactions"
      />

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 16,
                padding: 18, borderRadius: 16,
                border: `2px solid ${selected === opt.id ? 'var(--blue)' : 'var(--gray-200)'}`,
                background: selected === opt.id ? 'var(--blue-light)' : 'white',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                outline: 'none',
              }}
              role="radio"
              aria-checked={selected === opt.id}
              aria-label={opt.title}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: selected === opt.id ? 'white' : 'var(--gray-100)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }} aria-hidden="true">{opt.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>{opt.title}</span>
                  {opt.badge && (
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: 'var(--blue)',
                      background: 'var(--blue-light)', padding: '2px 8px', borderRadius: 6,
                    }}>{opt.badge}</span>
                  )}
                </div>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.5 }}>{opt.desc}</p>
              </div>
              {selected === opt.id && (
                <div style={{
                  width: 22, height: 22, background: 'var(--blue)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }} aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary"
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
          style={{ opacity: selected ? 1 : 0.5 }}
          aria-label="Continue to bank connection"
        >
          Continue
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Step 3 — Bank Connection (Plaid mock)
   ════════════════════════════════════════ */
function BankConnection({ onNext, onBack }) {
  const { speak } = useApp()
  const [connecting, setConnecting] = useState(false)
  const [selected, setSelected] = useState(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    speak('Connect your bank account. Select your bank to securely link it.')
  }, [])

  const connect = (bank) => {
    setSelected(bank)
    setConnecting(true)
    speak(`Connecting to ${bank.name}`)
    setTimeout(() => {
      setConnecting(false)
      setConnected(true)
    }, 1800)
  }

  if (connected) {
    return (
      <div className="screen">
        <AuthHeader onBack={onBack} step={3} total={4} title="Bank connected!" subtitle="Your bank is securely linked" />
        <div style={{ padding: '40px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            width: 90, height: 90, background: 'var(--green-light)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
            animation: 'scaleInBounce 0.5s var(--ease-spring) both',
          }} aria-label="Bank connected successfully">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none">
              <path className="check-svg" d="M4 12l5 5 11-11" stroke="var(--green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
            {selected?.name} Connected
          </h3>
          <p style={{ fontSize: 15, color: 'var(--gray-500)', textAlign: 'center', marginBottom: 36, lineHeight: 1.6 }}>
            Your accounts are now linked and ready to use with FinSight.
          </p>
          <button className="btn btn-primary" onClick={onNext} style={{ width: '100%' }}
            aria-label="Continue to select default account">
            Continue
          </button>
        </div>
      </div>
    )
  }

  if (connecting) {
    return (
      <div className="screen">
        <AuthHeader onBack={onBack} step={3} total={4} title="Connecting…" subtitle={`Securely linking ${selected?.name}`} />
        <div style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <div style={{
            width: 80, height: 80, background: selected ? '#EEF6FF' : 'var(--gray-100)',
            borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, animation: 'pulse 1s ease-in-out infinite',
          }} aria-hidden="true">{selected?.emoji}</div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 8 }}>
              Connecting to {selected?.name}
            </p>
            <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>
              Establishing a secure connection…
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 10, height: 10, background: 'var(--blue)', borderRadius: '50%',
                animation: `pulse 0.9s ease-in-out infinite ${i * 0.2}s`,
              }} aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen">
      <AuthHeader
        onBack={onBack}
        step={3} total={4}
        title="Connect your bank"
        subtitle="Powered by Plaid — bank-grade security"
      />

      <div style={{ padding: '20px 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--gray-50)', borderRadius: 12, padding: '12px 14px', marginBottom: 20,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="var(--gray-400)" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 15, color: 'var(--gray-500)' }}>Search for your bank…</span>
        </div>

        <p className="section-label">Popular Banks</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {MOCK_BANKS.map(bank => (
            <button
              key={bank.id}
              className="bank-option"
              onClick={() => connect(bank)}
              aria-label={`Connect ${bank.name}`}
            >
              <div className="bank-logo" style={{ background: bank.bg }}>
                {bank.emoji}
              </div>
              <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--gray-900)', flex: 1 }}>
                {bank.name}
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Step 4 — Default Account Selection
   ════════════════════════════════════════ */
function DefaultAccountSelect({ onNext, onBack }) {
  const { defaultAccount, setDefaultAccount, accounts, speak } = useApp()

  useEffect(() => {
    speak('Select your primary account. This will be your default for transactions.')
  }, [])

  return (
    <div className="screen">
      <AuthHeader
        onBack={onBack}
        step={4} total={4}
        title="Select your primary account"
        subtitle="Choose the default account for transactions"
      />

      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {accounts.map(acc => {
            const isSelected = defaultAccount.id === acc.id
            return (
              <button
                key={acc.id}
                className={`account-option${isSelected ? ' account-option--selected' : ''}`}
                onClick={() => setDefaultAccount(acc)}
                role="radio"
                aria-checked={isSelected}
                aria-label={`${acc.type} account ending in ${acc.last4}, balance ${formatCurrency(acc.balance)}`}
              >
                <div className="account-dot" style={{ background: isSelected ? 'var(--blue)' : 'var(--blue-light)' }}>
                  <span style={{ fontSize: 20 }} aria-hidden="true">{acc.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>
                      {acc.type}
                    </span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: isSelected ? 'var(--blue)' : 'var(--gray-900)' }}>
                      {formatCurrency(acc.balance)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{acc.bank} ••{acc.last4}</span>
                    <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>
                      Available: {formatCurrency(acc.available)}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div style={{
                    width: 24, height: 24, background: 'var(--blue)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }} aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <button
          className="btn btn-primary"
          onClick={onNext}
          aria-label="Finish setup and go to your home screen"
        >
          Finish Setup
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)', marginTop: 14 }}>
          You can change this anytime in Settings
        </p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Auth Orchestrator (handles Login too)
   ════════════════════════════════════════ */
export default function Auth() {
  const { screen, navigate, signUp } = useApp()
  const [step, setStep] = useState('account')
  const [userData, setUserData] = useState({})

  if (screen === 'auth/login') {
    return <LoginScreen />
  }

  // signup flow
  if (step === 'account') {
    return (
      <SignUpAccount
        onNext={(data) => { setUserData(data); setStep('security') }}
      />
    )
  }
  if (step === 'security') {
    return (
      <SecuritySetup
        onNext={(method) => { setUserData(p => ({ ...p, authMethod: method })); setStep('bank') }}
        onBack={() => setStep('account')}
      />
    )
  }
  if (step === 'bank') {
    return (
      <BankConnection
        onNext={() => setStep('default-account')}
        onBack={() => setStep('security')}
      />
    )
  }
  if (step === 'default-account') {
    return (
      <DefaultAccountSelect
        onNext={() => { signUp(userData); navigate('home') }}
        onBack={() => setStep('bank')}
      />
    )
  }

  return null
}

/* ════════════════════════════════════════
   Login Screen
   ════════════════════════════════════════ */
function LoginScreen() {
  const { navigate, signUp, speak } = useApp()
  const [form, setForm]     = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    speak('Welcome back. Enter your email and password to sign in.')
  }, [])

  const login = () => {
    setLoading(true)
    setTimeout(() => {
      signUp({ email: form.email })
      navigate('home')
    }, 1200)
  }

  return (
    <div className="screen" style={{ background: 'linear-gradient(160deg, #0f1535 0%, #1e2b6e 40%, #4361EE 100%)' }}>
      <div style={{ padding: '24px 24px 36px', display: 'flex', flexDirection: 'column', height: '100%' }}>

        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', marginBottom: 8 }}>Welcome back</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Sign in to your FinSight account</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.15)', borderRadius: 20,
          padding: '24px', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          <div className="input-group">
            <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              htmlFor="login-email">Email</label>
            <input
              id="login-email"
              className="input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            />
          </div>
          <div className="input-group">
            <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
              htmlFor="login-pw">Password</label>
            <input
              id="login-pw"
              className="input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            />
          </div>
        </div>

        <button
          className="btn"
          style={{ background: 'white', color: 'var(--blue)', fontWeight: 700, marginBottom: 16 }}
          onClick={login}
          disabled={loading}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <button
          className="btn"
          style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(255,255,255,0.2)' }}
          onClick={() => navigate('auth/signup')}
        >
          Create an account
        </button>

        <p style={{ textAlign: 'center', fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 24 }}>
          Forgot your password?{' '}
          <span style={{ color: 'white', fontWeight: 600 }}>Reset it</span>
        </p>
      </div>
    </div>
  )
}
