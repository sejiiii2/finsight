import React, { useState, useEffect } from 'react'
import { useApp } from '../context'
import { MOCK_ACCOUNTS, MOCK_BILLS, formatCurrency } from '../data'

/* ════════════════════════════════════════
   Check Balance
   ════════════════════════════════════════ */
function CheckBalance({ onBack }) {
  const { speak, accounts } = useApp()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    speak('Checking your account balances.')
    setTimeout(() => setLoaded(true), 1200)
  }, [])

  return (
    <div className="screen" style={{ background: 'var(--gray-50)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(145deg, #064e6e 0%, #0ea5e9 100%)',
        padding: '16px 20px 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <button
            className="back-btn"
            onClick={onBack}
            aria-label="Go back to home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Account Balances</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
              {loaded ? 'Updated just now' : 'Fetching…'}
            </p>
          </div>
        </div>

        {/* Total */}
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Total Balance</p>
          {loaded ? (
            <p style={{ fontSize: 40, fontWeight: 900, color: 'white', letterSpacing: '-0.02em',
              animation: 'fadeInUp 0.4s ease both' }}>
              {formatCurrency(accounts.reduce((s, a) => s + a.balance, 0))}
            </p>
          ) : (
            <div style={{ width: 160, height: 44, borderRadius: 8, margin: '0 auto' }} className="shimmer" />
          )}
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        {accounts.map((acc, i) => (
          <div
            key={acc.id}
            style={{
              background: 'white', borderRadius: 18, padding: '20px',
              marginBottom: 14, boxShadow: 'var(--shadow-sm)',
              animation: loaded ? `fadeInUp 0.4s ease ${i * 0.1}s both` : 'none',
            }}
            role="region"
            aria-label={`${acc.type} account ending ${acc.last4}`}
          >
            {loaded ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: 14,
                    background: acc.type === 'Checking' ? '#EEF2FF' : '#F0FDF4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
                  }} aria-hidden="true">{acc.icon}</div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{acc.type}</div>
                    <div style={{ fontSize: 13, color: 'var(--gray-500)' }}>{acc.bank} ••{acc.last4}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Balance</p>
                    <p style={{ fontSize: 26, fontWeight: 800, color: 'var(--gray-900)' }}>
                      {formatCurrency(acc.balance)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Available</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)' }}>
                      {formatCurrency(acc.available)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ width: '60%', height: 20, borderRadius: 6 }} className="shimmer" />
                <div style={{ width: '40%', height: 32, borderRadius: 6 }} className="shimmer" />
              </div>
            )}
          </div>
        ))}

        {loaded && (
          <button
            className="btn btn-primary"
            onClick={onBack}
            style={{ marginTop: 8 }}
            aria-label="Return to home screen"
          >
            Done
          </button>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Deposit Check
   ════════════════════════════════════════ */
function DepositCheck({ onBack }) {
  const { speak, defaultAccount } = useApp()
  const [phase, setPhase] = useState('instructions') // instructions | camera | processing | review | success

  useEffect(() => {
    speak('Deposit a check. Take a photo of the front and back of your check.')
  }, [])

  const captureCheck = () => {
    setPhase('processing')
    speak('Processing your check. Please wait.')
    setTimeout(() => setPhase('review'), 2000)
  }

  if (phase === 'instructions') {
    return (
      <div className="screen" style={{ background: 'var(--gray-50)' }}>
        <div style={{
          background: 'linear-gradient(145deg, #7c3aed 0%, #a855f7 100%)',
          padding: '16px 20px 28px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="back-btn" onClick={onBack} aria-label="Go back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Deposit Check</h2>
          </div>
        </div>

        <div style={{ padding: '28px 20px' }}>
          {[
            { icon: '1️⃣', title: 'Sign the back', desc: 'Endorse your check with your signature' },
            { icon: '2️⃣', title: 'Find good lighting', desc: 'Make sure the check is clearly visible' },
            { icon: '3️⃣', title: 'Take a photo', desc: 'We\'ll capture front and back automatically' },
          ].map((step, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, marginBottom: 20,
              animation: `fadeInUp 0.4s ease ${i * 0.1}s both`,
            }}>
              <span style={{ fontSize: 24, flexShrink: 0 }} aria-hidden="true">{step.icon}</span>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{step.title}</p>
                <p style={{ fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            </div>
          ))}

          <div style={{
            background: 'var(--blue-light)', borderRadius: 14, padding: '14px 16px',
            marginBottom: 24, border: '1px solid rgba(67,97,238,0.1)',
          }}>
            <p style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>
              Depositing to: {defaultAccount.type} ••{defaultAccount.last4}
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setPhase('camera')}
            aria-label="Open camera to capture check"
          >
            📸 Open Camera
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'camera') {
    return (
      <div className="screen" style={{ background: '#000', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            className="back-btn"
            onClick={() => setPhase('instructions')}
            aria-label="Go back"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p style={{ color: 'white', fontSize: 16, fontWeight: 600 }}>Front of check</p>
        </div>

        {/* Simulated camera viewfinder */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            width: '85%', aspectRatio: '1.7 / 1',
            border: '2px solid rgba(255,255,255,0.6)',
            borderRadius: 12, position: 'relative',
            background: 'rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }} aria-label="Check alignment guide">
            {/* Corner guides */}
            {[
              { top: -2, left: -2, borderTop: '3px solid white', borderLeft: '3px solid white' },
              { top: -2, right: -2, borderTop: '3px solid white', borderRight: '3px solid white' },
              { bottom: -2, left: -2, borderBottom: '3px solid white', borderLeft: '3px solid white' },
              { bottom: -2, right: -2, borderBottom: '3px solid white', borderRight: '3px solid white' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: 22, height: 22, borderRadius: 2, ...s }} aria-hidden="true" />
            ))}
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, textAlign: 'center' }}>
              Position check within frame
            </p>
          </div>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <button
            onClick={captureCheck}
            style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'white', border: '4px solid rgba(255,255,255,0.3)',
              cursor: 'pointer', transition: 'transform 0.15s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            aria-label="Capture photo of check"
          >
            <div style={{ width: 56, height: 56, background: 'white', borderRadius: '50%',
              border: '3px solid var(--gray-200)' }} aria-hidden="true" />
          </button>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Tap to capture</p>
        </div>
      </div>
    )
  }

  if (phase === 'processing') {
    return (
      <div className="screen" style={{ background: 'var(--gray-50)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px' }}>
        <div style={{ fontSize: 60, marginBottom: 24, animation: 'pulse 1s ease-in-out infinite' }} aria-hidden="true">📸</div>
        <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Processing check…</h3>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', textAlign: 'center', lineHeight: 1.6 }}>
          Reading check details and verifying the amount.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 28 }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: 10, height: 10, background: 'var(--blue)', borderRadius: '50%',
              animation: `pulse 0.9s ease-in-out infinite ${i * 0.2}s`,
            }} aria-hidden="true" />
          ))}
        </div>
      </div>
    )
  }

  if (phase === 'review') {
    return (
      <div className="screen" style={{ background: 'var(--gray-50)' }}>
        <div style={{ background: 'linear-gradient(145deg, #7c3aed 0%, #a855f7 100%)', padding: '16px 20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <button className="back-btn" onClick={() => setPhase('camera')} aria-label="Retake photo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Confirm Deposit</h2>
          </div>
        </div>

        <div style={{ padding: '24px 20px' }}>
          <div style={{
            background: 'white', borderRadius: 18, padding: '20px',
            boxShadow: 'var(--shadow-sm)', marginBottom: 20, animation: 'fadeInUp 0.4s ease both',
          }}>
            <p className="section-label" style={{ marginBottom: 16 }}>Check Details</p>
            {[
              { label: 'Check amount', value: '$250.00' },
              { label: 'Pay to',       value: defaultAccount.type + ' ••' + defaultAccount.last4 },
              { label: 'Available',    value: 'Tomorrow by 6 PM' },
            ].map(row => (
              <div className="tx-row" key={row.label}>
                <span className="tx-label">{row.label}</span>
                <span className="tx-value">{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{
            background: 'var(--amber-light)', borderRadius: 14, padding: '14px 16px',
            display: 'flex', gap: 10, marginBottom: 24,
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }} aria-hidden="true">⚠️</span>
            <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.5 }}>
              Write "For Mobile Deposit Only" on the back of the check and keep it for 14 days.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setPhase('success')}
            aria-label="Confirm and deposit check for $250.00"
          >
            Deposit $250.00
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => setPhase('camera')}
            style={{ marginTop: 10 }}
          >
            Retake Photo
          </button>
        </div>
      </div>
    )
  }

  // success
  return (
    <div className="screen" style={{
      background: 'linear-gradient(145deg, #064e3b 0%, #059669 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ padding: '40px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 100, height: 100, background: 'rgba(255,255,255,0.2)', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'scaleInBounce 0.5s var(--ease-spring) both',
        }} role="img" aria-label="Deposit successful">
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            <path className="check-svg" d="M4 12l5 5 11-11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>Deposit Submitted!</h2>
        <p style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>$250.00</p>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', textAlign: 'center', lineHeight: 1.6 }}>
          Your check will be available by<br /><strong style={{ color: 'white' }}>tomorrow at 6 PM</strong>
        </p>
        <button
          className="btn"
          style={{ background: 'white', color: 'var(--green)', fontWeight: 700, marginTop: 16, width: '100%' }}
          onClick={onBack}
          aria-label="Return to home screen"
        >
          Done
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Pay a Bill
   ════════════════════════════════════════ */
function PayBill({ onBack }) {
  const { speak, defaultAccount } = useApp()
  const [selected, setSelected] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    speak('Select a bill to pay.')
  }, [])

  const pay = () => {
    setConfirming(false)
    speak(`Paying ${selected.name} for ${formatCurrency(selected.amount)}`)
    setTimeout(() => setDone(true), 1500)
  }

  if (done) {
    return (
      <div className="screen" style={{
        background: 'linear-gradient(145deg, #064e3b 0%, #10B981 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ padding: '40px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 100, height: 100, background: 'rgba(255,255,255,0.2)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'scaleInBounce 0.5s var(--ease-spring) both',
          }} role="img" aria-label="Bill paid successfully">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              <path className="check-svg" d="M4 12l5 5 11-11" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: 'white' }}>Bill Paid!</h2>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 36, fontWeight: 900, color: 'white' }}>{formatCurrency(selected.amount)}</p>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>to {selected.name}</p>
          </div>
          <button
            className="btn"
            style={{ background: 'white', color: 'var(--green)', fontWeight: 700, marginTop: 12, width: '100%' }}
            onClick={onBack}
            aria-label="Return to home"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  if (confirming) {
    return (
      <div className="screen" style={{
        background: 'linear-gradient(160deg, #0f1535 0%, #4361EE 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ padding: '40px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 56, animation: 'float 3s ease-in-out infinite' }} aria-hidden="true">
            {selected.icon}
          </span>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)' }}>Pay</p>
          <p style={{ fontSize: 42, fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>
            {formatCurrency(selected.amount)}
          </p>
          <p style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{selected.name}</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
            from {defaultAccount.type} ••{defaultAccount.last4}
          </p>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
            <button
              className="btn"
              style={{ background: 'white', color: 'var(--blue)', fontWeight: 700 }}
              onClick={pay}
              aria-label={`Confirm payment of ${formatCurrency(selected.amount)}`}
            >
              ✓ Confirm Payment
            </button>
            <button
              className="btn"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.2)' }}
              onClick={() => setConfirming(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="screen" style={{ background: 'var(--gray-50)' }}>
      <div style={{
        background: 'linear-gradient(145deg, #4c1d95 0%, #7c3aed 100%)',
        padding: '16px 20px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="back-btn" onClick={onBack} aria-label="Go back to home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Pay a Bill</h2>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <p className="section-label">Upcoming Bills</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MOCK_BILLS.map((bill, i) => (
            <button
              key={bill.id}
              onClick={() => { setSelected(bill); setConfirming(true) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'white', borderRadius: 16, padding: '16px 18px',
                border: '2px solid var(--gray-100)', cursor: 'pointer',
                transition: 'all 0.15s', textAlign: 'left',
                animation: `fadeInUp 0.4s ease ${i * 0.08}s both`,
                outline: 'none',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--gray-100)'; e.currentTarget.style.transform = 'none' }}
              aria-label={`Pay ${bill.name}, ${formatCurrency(bill.amount)}, due ${bill.due}`}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14, background: '#F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, flexShrink: 0,
              }} aria-hidden="true">{bill.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>{bill.name}</p>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>Due {bill.due}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--gray-900)' }}>
                  {formatCurrency(bill.amount)}
                </p>
                <p style={{ fontSize: 12, color: 'var(--blue)', marginTop: 2, fontWeight: 600 }}>Pay →</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   SimTask Router
   ════════════════════════════════════════ */
export default function SimTask({ task }) {
  const { navigate } = useApp()
  const back = () => navigate('home')

  if (task === 'check-balance') return <CheckBalance onBack={back} />
  if (task === 'deposit-check') return <DepositCheck onBack={back} />
  if (task === 'pay-bill')      return <PayBill      onBack={back} />
  return null
}
