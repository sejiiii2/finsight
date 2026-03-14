import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../context'
import { MOCK_CONTACTS, formatCurrency } from '../data'
import VoiceButton from '../components/VoiceButton'

/* ── Shared Nav Header ──────────────────── */
function NavHeader({ title, subtitle, step, totalSteps, onBack, dark = false }) {
  const bg = dark
    ? 'linear-gradient(145deg, #1e2b6e 0%, #4361EE 100%)'
    : 'white'
  const textColor      = dark ? 'white' : 'var(--gray-900)'
  const subColor       = dark ? 'rgba(255,255,255,0.6)' : 'var(--gray-500)'
  const borderColor    = dark ? 'none' : '1px solid var(--gray-100)'

  return (
    <div style={{ background: bg, padding: '16px 20px 20px', borderBottom: borderColor, flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: step ? 16 : 0 }}>
        <button
          className={`back-btn${dark ? '' : ' back-btn--dark'}`}
          onClick={onBack}
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: textColor }}>{title}</h2>
          {subtitle && <p style={{ fontSize: 13, color: subColor, marginTop: 2 }}>{subtitle}</p>}
        </div>
      </div>
      {step && (
        <div>
          <div style={{ display: 'flex', gap: 5 }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 3,
                background: i < step
                  ? dark ? 'rgba(255,255,255,0.9)' : 'var(--blue)'
                  : dark ? 'rgba(255,255,255,0.2)' : 'var(--gray-200)',
                transition: 'background 0.3s',
              }} aria-hidden="true" />
            ))}
          </div>
          <p style={{ fontSize: 11, color: subColor, marginTop: 5 }}>Step {step} of {totalSteps}</p>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 1 — Start
   ════════════════════════════════════════ */
function StepStart({ onNext, onBack }) {
  const { speak } = useApp()
  useEffect(() => {
    speak("Let's send money. I'll guide you through each step.")
  }, [])

  return (
    <div className="screen" style={{ background: 'linear-gradient(160deg, #1e2b6e 0%, #4361EE 100%)' }}>
      <NavHeader dark title="Send Money" onBack={onBack} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 28px 36px', height: '100%' }}>

        {/* Illustration */}
        <div style={{ position: 'relative', marginBottom: 36, animation: 'float 4s ease-in-out infinite' }}>
          <div style={{
            width: 130, height: 130,
            background: 'rgba(255,255,255,0.12)', borderRadius: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 58,
            backdropFilter: 'blur(10px)', border: '1.5px solid rgba(255,255,255,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }} aria-hidden="true">💸</div>

          {[
            { text: '✓ Safe',   top: -14, right: -54 },
            { text: '⚡ Fast',  bottom: -8, left: -52 },
          ].map(pill => (
            <div key={pill.text} style={{
              position: 'absolute', ...pill,
              background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 20,
              padding: '5px 12px', fontSize: 12, fontWeight: 600, color: 'white',
              whiteSpace: 'nowrap', animation: 'fadeInUp 0.5s ease 0.5s both',
            }} aria-hidden="true">{pill.text}</div>
          ))}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', textAlign: 'center', marginBottom: 14, letterSpacing: '-0.01em' }}>
          Let's send money
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', textAlign: 'center', lineHeight: 1.6, marginBottom: 48 }}>
          I'll guide you through each step. You can review everything before anything is sent.
        </p>

        {/* Steps preview */}
        <div style={{
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
          borderRadius: 16, padding: '16px 20px', width: '100%', marginBottom: 32,
          border: '1px solid rgba(255,255,255,0.15)',
        }}>
          {[
            '1. Choose a recipient',
            '2. Enter an amount',
            '3. Review & confirm',
          ].map((step, i) => (
            <div key={step} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: i < 2 ? '10px 0' : '10px 0 0',
              borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{
                width: 26, height: 26, background: 'rgba(255,255,255,0.2)', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: 'white', flexShrink: 0,
              }} aria-hidden="true">{i + 1}</div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{step.slice(3)}</span>
            </div>
          ))}
        </div>

        <button
          className="btn"
          style={{ background: 'white', color: 'var(--blue)', fontWeight: 700, fontSize: 17 }}
          onClick={onNext}
          aria-label="Start the send money process"
        >
          Start Sending
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 2 — Recipient
   ════════════════════════════════════════ */
function StepRecipient({ onSelect, onBack }) {
  const { speak } = useApp()
  const [search, setSearch] = useState('')

  useEffect(() => {
    speak('Who do you want to send money to? Search or tap a contact, or say a name.')
  }, [])

  const filtered = MOCK_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )
  const recents = filtered.filter(c => c.recent)
  const others  = filtered.filter(c => !c.recent)

  return (
    <div className="screen" style={{ background: 'var(--gray-50)', display: 'flex', flexDirection: 'column' }}>
      <NavHeader
        dark title="Send Money" subtitle="Choose recipient"
        step={1} totalSteps={7} onBack={onBack}
      />

      <div style={{ padding: '16px 20px 8px', background: 'white', boxShadow: '0 1px 0 var(--gray-100)' }}>
        <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 12 }}>
          Who do you want to send to?
        </p>
        <div style={{ position: 'relative' }}>
          <input
            className="input"
            placeholder="Search contacts…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search contacts"
            style={{ paddingLeft: 40 }}
          />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{
            position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)',
          }} aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="var(--gray-400)" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 8px' }}>
        {recents.length > 0 && (
          <>
            <p className="section-label" style={{ paddingLeft: 12 }}>Recent</p>
            {recents.map(c => (
              <ContactRow key={c.id} contact={c} onSelect={onSelect} />
            ))}
          </>
        )}
        {others.length > 0 && (
          <>
            <p className="section-label" style={{ paddingLeft: 12, marginTop: recents.length > 0 ? 16 : 0 }}>All Contacts</p>
            {others.map(c => (
              <ContactRow key={c.id} contact={c} onSelect={onSelect} />
            ))}
          </>
        )}
        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--gray-400)', padding: '32px 0', fontSize: 15 }}>
            No contacts found
          </p>
        )}
      </div>

      <div style={{ padding: '12px 20px 20px', background: 'white', borderTop: '1px solid var(--gray-100)' }}>
        <VoiceButton
          size={52}
          hint="Say a name"
          onResult={(t) => {
            const match = MOCK_CONTACTS.find(c =>
              c.name.toLowerCase().includes(t.toLowerCase().split(' ')[0])
            )
            if (match) onSelect(match)
          }}
        />
      </div>
    </div>
  )
}

function ContactRow({ contact, onSelect }) {
  return (
    <button
      className="contact-item"
      onClick={() => onSelect(contact)}
      aria-label={`Send to ${contact.name}`}
    >
      <div className="contact-avatar" style={{ background: contact.color }}>
        {contact.initials}
      </div>
      <div style={{ flex: 1 }}>
        <div className="contact-name">{contact.name}</div>
        <div className="contact-sub">{contact.recent ? 'Recent' : 'Contact'}</div>
      </div>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 18l6-6-6-6" stroke="var(--gray-300)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
}

/* ════════════════════════════════════════
   STEP 3 — Amount
   ════════════════════════════════════════ */
function StepAmount({ recipient, onNext, onBack }) {
  const { speak, defaultAccount } = useApp()
  const [amount, setAmount] = useState('')

  useEffect(() => {
    speak(`Sending to ${recipient.name}. How much do you want to send?`)
  }, [])

  const displayAmount = amount ? parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0 }) : '0'

  const pressKey = (key) => {
    if (key === '⌫') {
      setAmount(a => a.slice(0, -1))
    } else if (key === '.') {
      if (!amount.includes('.')) setAmount(a => a + '.')
    } else {
      if (amount.length >= 8) return
      if (amount.includes('.') && amount.split('.')[1]?.length >= 2) return
      setAmount(a => a + key)
    }
  }

  const numericAmount = parseFloat(amount) || 0
  const valid = numericAmount > 0 && numericAmount <= defaultAccount.available

  const keys = ['1','2','3','4','5','6','7','8','9','.','0','⌫']

  return (
    <div className="screen" style={{ background: 'var(--gray-50)', display: 'flex', flexDirection: 'column' }}>
      <NavHeader
        dark title="Send Money"
        subtitle={`To ${recipient.name}`}
        step={2} totalSteps={7} onBack={onBack}
      />

      <div style={{ padding: '24px 24px 16px', background: 'white', borderBottom: '1px solid var(--gray-100)' }}>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', marginBottom: 6 }}>How much?</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 40, fontWeight: 800, color: numericAmount > 0 ? 'var(--gray-900)' : 'var(--gray-300)' }}>
            $
          </span>
          <span style={{ fontSize: 52, fontWeight: 800, color: numericAmount > 0 ? 'var(--gray-900)' : 'var(--gray-300)', letterSpacing: '-0.02em' }}>
            {displayAmount}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--gray-400)', marginTop: 6 }}>
          Available: {formatCurrency(defaultAccount.available)}
        </p>
        {numericAmount > defaultAccount.available && (
          <p style={{ fontSize: 13, color: 'var(--red)', marginTop: 4, fontWeight: 600 }}>
            Amount exceeds available balance
          </p>
        )}
      </div>

      {/* Quick amounts */}
      <div style={{ padding: '12px 20px', background: 'white', display: 'flex', gap: 8, borderBottom: '1px solid var(--gray-100)' }}>
        {[10, 25, 50, 100].map(v => (
          <button
            key={v}
            onClick={() => setAmount(String(v))}
            style={{
              flex: 1, padding: '8px 0', borderRadius: 10,
              background: numericAmount === v ? 'var(--blue)' : 'var(--gray-100)',
              color: numericAmount === v ? 'white' : 'var(--gray-700)',
              border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
              transition: 'all 0.15s',
            }}
            aria-label={`Set amount to ${formatCurrency(v)}`}
          >
            ${v}
          </button>
        ))}
      </div>

      {/* Numpad */}
      <div style={{ padding: '16px 20px', flex: 1 }}>
        <div className="numpad">
          {keys.map(k => (
            <button
              key={k}
              className={`numpad-key${k === '' ? ' numpad-key--empty' : ''}`}
              onClick={() => pressKey(k)}
              aria-label={k === '⌫' ? 'Delete last digit' : k}
            >
              {k === '⌫' ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 6H8l-7 6 7 6h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="18" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="12" y1="9" x2="18" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : k}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 20px 20px', background: 'white', borderTop: '1px solid var(--gray-100)' }}>
        <button
          className="btn btn-primary"
          onClick={() => valid && onNext(numericAmount)}
          disabled={!valid}
          style={{ opacity: valid ? 1 : 0.5 }}
          aria-label={`Continue with ${formatCurrency(numericAmount)}`}
        >
          Continue {valid ? `→ ${formatCurrency(numericAmount)}` : ''}
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 4 — Additional Details
   ════════════════════════════════════════ */
function StepDetails({ recipient, amount, onNext, onBack }) {
  const { speak, accounts, defaultAccount, setDefaultAccount } = useApp()
  const [memo, setMemo] = useState('')
  const [selectedAcc, setSelectedAcc] = useState(defaultAccount)

  useEffect(() => {
    speak('Optional: add a note and choose which account to send from.')
  }, [])

  return (
    <div className="screen" style={{ background: 'var(--gray-50)' }}>
      <NavHeader
        dark title="Send Money" subtitle="Additional details (optional)"
        step={3} totalSteps={7} onBack={onBack}
      />
      <div style={{ padding: '24px' }}>

        <div style={{ background: 'white', borderRadius: 16, padding: '12px 16px', marginBottom: 16, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 14,
            borderBottom: '1px solid var(--gray-100)' }}>
            <div className="contact-avatar" style={{ background: recipient.color, width: 42, height: 42, fontSize: 13 }}>
              {recipient.initials}
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{recipient.name}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--blue)', marginTop: 2 }}>
                {formatCurrency(amount)}
              </div>
            </div>
          </div>
          <div style={{ paddingTop: 14 }}>
            <label className="input-label" htmlFor="memo" style={{ marginBottom: 6, display: 'block' }}>
              Add a note
            </label>
            <input
              id="memo"
              className="input"
              placeholder="Coffee, dinner, etc…"
              value={memo}
              onChange={e => setMemo(e.target.value)}
              maxLength={60}
            />
          </div>
        </div>

        <p className="section-label">From Account</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {accounts.map(acc => (
            <button
              key={acc.id}
              className={`account-option${selectedAcc.id === acc.id ? ' account-option--selected' : ''}`}
              onClick={() => setSelectedAcc(acc)}
              role="radio"
              aria-checked={selectedAcc.id === acc.id}
              aria-label={`${acc.type} ending ${acc.last4}, ${formatCurrency(acc.balance)}`}
            >
              <div className="account-dot" style={{ background: selectedAcc.id === acc.id ? 'var(--blue)' : 'var(--blue-light)' }}>
                <span style={{ fontSize: 18 }} aria-hidden="true">{acc.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{acc.type} ••{acc.last4}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 2 }}>
                  {formatCurrency(acc.available)} available
                </div>
              </div>
              {selectedAcc.id === acc.id && (
                <div style={{
                  width: 22, height: 22, background: 'var(--blue)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }} aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-secondary"
            onClick={() => onNext({ memo: '', account: selectedAcc })}
            style={{ flex: 1 }}
            aria-label="Skip note and continue"
          >
            Skip
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onNext({ memo, account: selectedAcc })}
            style={{ flex: 2 }}
            aria-label="Continue to review"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 5 — Review
   ════════════════════════════════════════ */
function StepReview({ recipient, amount, memo, account, onConfirm, onChange, onBack }) {
  const { speak } = useApp()

  useEffect(() => {
    speak(`Review your transfer. You are sending ${formatCurrency(amount)} to ${recipient.name} from your ${account.type} account.`)
  }, [])

  return (
    <div className="screen" style={{ background: 'var(--gray-50)' }}>
      <NavHeader
        title="Review Transfer"
        step={4} totalSteps={7} onBack={onBack}
      />

      <div style={{ padding: '24px' }}>
        {/* Big summary */}
        <div style={{
          background: 'linear-gradient(145deg, #1e2b6e 0%, #4361EE 100%)',
          borderRadius: 20, padding: '28px 24px', marginBottom: 20,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }} role="region" aria-label="Transaction summary">
          <div className="contact-avatar" style={{
            background: recipient.color, width: 64, height: 64,
            fontSize: 20, marginBottom: 16, border: '3px solid rgba(255,255,255,0.3)',
          }}>
            {recipient.initials}
          </div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 8 }}>Sending to</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 4 }}>{recipient.name}</p>
          <p style={{ fontSize: 42, fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>
            {formatCurrency(amount)}
          </p>
        </div>

        {/* Details card */}
        <div style={{ background: 'white', borderRadius: 16, padding: '4px 20px', boxShadow: 'var(--shadow-sm)', marginBottom: 20 }}>
          {[
            { label: 'From account',  value: `${account.type} ••${account.last4}` },
            { label: 'To',            value: recipient.name },
            { label: 'Amount',        value: formatCurrency(amount) },
            ...(memo ? [{ label: 'Note', value: memo }] : []),
          ].map(row => (
            <div className="tx-row" key={row.label}>
              <span className="tx-label">{row.label}</span>
              <span className="tx-value">{row.value}</span>
            </div>
          ))}
        </div>

        <button
          style={{
            width: '100%', background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--blue)', fontSize: 14, fontWeight: 600, padding: '10px 0',
            marginBottom: 16,
          }}
          onClick={onChange}
          aria-label="Change transaction details"
        >
          ✏️ Change details
        </button>

        <button
          className="btn btn-primary"
          onClick={onConfirm}
          style={{ fontSize: 17 }}
          aria-label={`Confirm sending ${formatCurrency(amount)} to ${recipient.name}`}
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 6 — Change Details (edit modal)
   ════════════════════════════════════════ */
function StepChange({ recipient, amount, memo, onDone, onBack }) {
  const [newMemo, setNewMemo] = useState(memo)

  return (
    <div className="screen" style={{ background: 'var(--gray-50)' }}>
      <NavHeader title="Change Details" step={5} totalSteps={7} onBack={onBack} />
      <div style={{ padding: '24px' }}>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', marginBottom: 20 }}>
          Sending <strong style={{ color: 'var(--gray-900)' }}>{formatCurrency(amount)}</strong> to{' '}
          <strong style={{ color: 'var(--gray-900)' }}>{recipient.name}</strong>.
          Change the note below or tap back to modify other details.
        </p>

        <div className="input-group" style={{ marginBottom: 24 }}>
          <label className="input-label" htmlFor="edit-memo">Note</label>
          <input
            id="edit-memo"
            className="input"
            value={newMemo}
            onChange={e => setNewMemo(e.target.value)}
            placeholder="Add a note…"
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={() => onDone({ memo: newMemo })}
          aria-label="Save changes and return to review"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 7 — Final Confirmation
   ════════════════════════════════════════ */
function StepConfirm({ recipient, amount, onConfirm, onCancel }) {
  const { speak } = useApp()

  useEffect(() => {
    speak(`Are you sure you want to send ${formatCurrency(amount)} to ${recipient.name}?`)
  }, [])

  return (
    <div className="screen" style={{
      background: 'linear-gradient(160deg, #0f1535 0%, #1e2b6e 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px' }}>

        <div className="contact-avatar" style={{
          background: recipient.color, width: 80, height: 80,
          fontSize: 24, marginBottom: 20, border: '4px solid rgba(255,255,255,0.2)',
          animation: 'scaleIn 0.4s var(--ease-spring) both',
        }}>
          {recipient.initials}
        </div>

        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Send</p>
        <p style={{ fontSize: 48, fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: 8 }}>
          {formatCurrency(amount)}
        </p>
        <p style={{ fontSize: 20, fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: 40 }}>
          to {recipient.name}?
        </p>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            className="btn"
            style={{ background: 'white', color: 'var(--blue)', fontWeight: 700, fontSize: 17 }}
            onClick={onConfirm}
            aria-label={`Yes, send ${formatCurrency(amount)} to ${recipient.name}`}
          >
            ✓ Yes, send it
          </button>
          <button
            className="btn"
            style={{
              background: 'rgba(239,68,68,0.15)', color: '#FF6B7A',
              border: '1.5px solid rgba(239,68,68,0.25)', fontWeight: 600,
            }}
            onClick={onCancel}
            aria-label="Cancel this transaction"
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 8 — Authentication
   ════════════════════════════════════════ */
function StepAuth({ onSuccess, onBack }) {
  const { speak } = useApp()
  const [authType, setAuthType] = useState('biometric') // biometric | pin
  const [pin, setPin] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanDone, setScanDone] = useState(false)

  useEffect(() => {
    speak('Authenticate to confirm your transaction.')
    // Auto-simulate face scan start
    setTimeout(() => setScanning(true), 400)
    setTimeout(() => { setScanDone(true); setTimeout(onSuccess, 600) }, 2200)
  }, [])

  if (authType === 'biometric') {
    return (
      <div className="screen" style={{ background: 'var(--gray-50)' }}>
        <NavHeader title="Authenticate" step={6} totalSteps={7} onBack={onBack} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 28px' }}>

          {/* Face scan ring */}
          <div style={{ position: 'relative', marginBottom: 32 }}>
            <svg width="160" height="160" viewBox="0 0 160 160" aria-label={scanDone ? 'Face ID authenticated' : 'Scanning face'}>
              <circle cx="80" cy="80" r="68" fill="none" stroke="var(--gray-100)" strokeWidth="8"/>
              {scanning && !scanDone && (
                <circle
                  cx="80" cy="80" r="68" fill="none"
                  stroke="var(--blue)" strokeWidth="8"
                  strokeLinecap="round" strokeDasharray="427"
                  style={{ animation: 'countdown 1.8s linear forwards', transformOrigin: '80px 80px', transform: 'rotate(-90deg)' }}
                />
              )}
              {scanDone && (
                <circle cx="80" cy="80" r="68" fill="none" stroke="var(--green)" strokeWidth="8"/>
              )}
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 52,
              animation: scanning && !scanDone ? 'pulse 1s ease-in-out infinite' : 'none',
            }} aria-hidden="true">
              {scanDone ? '✅' : '👤'}
            </div>
          </div>

          <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
            {scanDone ? 'Authenticated!' : scanning ? 'Scanning…' : 'Face ID'}
          </h3>
          <p style={{ fontSize: 15, color: 'var(--gray-500)', textAlign: 'center', lineHeight: 1.6 }}>
            {scanDone ? 'Identity confirmed. Processing your transfer.'
              : 'Hold your device in front of your face.'}
          </p>

          {!scanning && (
            <button
              className="btn btn-ghost"
              style={{ marginTop: 24 }}
              onClick={() => setAuthType('pin')}
            >
              Use PIN instead
            </button>
          )}
        </div>
      </div>
    )
  }

  // PIN fallback
  const pressPin = (k) => {
    if (k === '⌫') { setPin(p => p.slice(0, -1)); return }
    if (pin.length >= 6) return
    const np = pin + k
    setPin(np)
    if (np.length === 6) setTimeout(onSuccess, 400)
  }

  return (
    <div className="screen" style={{ background: 'var(--gray-50)' }}>
      <NavHeader title="Enter PIN" step={6} totalSteps={7} onBack={onBack} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 20px' }}>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', marginBottom: 28 }}>
          Enter your 6-digit PIN
        </p>

        <div className="pin-dots" style={{ marginBottom: 36 }} role="group" aria-label="PIN entry">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`pin-dot${i < pin.length ? ' pin-dot--filled' : ''}`}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="numpad" style={{ width: '100%' }}>
          {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((k, i) => (
            <button
              key={i}
              className={`numpad-key${k === '' ? ' numpad-key--empty' : ''}`}
              onClick={() => k && pressPin(k)}
              aria-label={k === '⌫' ? 'Delete' : k || undefined}
              tabIndex={k === '' ? -1 : 0}
            >
              {k === '⌫' ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 6H8l-7 6 7 6h13a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.8"/>
                  <line x1="18" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="12" y1="9" x2="18" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ) : k}
            </button>
          ))}
        </div>

        <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={() => setAuthType('biometric')}>
          Use Face ID instead
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   STEP 9 — Cancellation Buffer → Success
   ════════════════════════════════════════ */
function StepCancelBuffer({ recipient, amount, onCancel, onComplete }) {
  const { speak, haptic } = useApp()
  const [countdown, setCountdown] = useState(5)
  const [done, setDone] = useState(false)

  useEffect(() => {
    speak(`You have 5 seconds to cancel. Sending ${formatCurrency(amount)} to ${recipient.name}.`)
    haptic([30, 100, 30])
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setDone(true)
          haptic([50])
          speak(`Sent! ${formatCurrency(amount)} has been sent to ${recipient.name}.`)
          setTimeout(onComplete, 1800)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (done) {
    return (
      <div className="screen" style={{
        background: 'linear-gradient(145deg, #064e3b 0%, #059669 60%, #10B981 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 28px', gap: 20 }}>
          <div style={{
            width: 100, height: 100, background: 'rgba(255,255,255,0.2)', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'scaleInBounce 0.5s var(--ease-spring) both',
          }} role="img" aria-label="Transaction successful">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
              <path
                className="check-svg"
                d="M4 12l5 5 11-11"
                stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', textAlign: 'center' }}>
            Sent!
          </h2>
          <p style={{ fontSize: 40, fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>
            {formatCurrency(amount)}
          </p>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)' }}>to {recipient.name}</p>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 8 }}>
            Redirecting to home…
          </p>
        </div>
      </div>
    )
  }

  const dashLength = 2 * Math.PI * 46  // r=46
  const progress   = (countdown / 5)

  return (
    <div className="screen" style={{ background: 'var(--gray-50)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '20px', background: 'white', borderBottom: '1px solid var(--gray-100)' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>Sending…</h2>
        <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 4 }}>You can cancel in the next few seconds</p>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 28px', gap: 20 }}>

        {/* Countdown ring */}
        <div style={{ position: 'relative' }} aria-live="polite" aria-atomic="true">
          <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="46" fill="none" stroke="var(--gray-100)" strokeWidth="8"/>
            <circle
              cx="60" cy="60" r="46" fill="none"
              stroke="var(--amber)" strokeWidth="8" strokeLinecap="round"
              strokeDasharray={dashLength}
              strokeDashoffset={dashLength * (1 - progress)}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dashoffset 0.9s linear' }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--gray-900)' }}>{countdown}</span>
            <span style={{ fontSize: 11, color: 'var(--gray-400)', fontWeight: 500 }}>sec</span>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--gray-900)' }}>
            Sending {formatCurrency(amount)}
          </p>
          <p style={{ fontSize: 15, color: 'var(--gray-500)', marginTop: 4 }}>
            to {recipient.name}
          </p>
        </div>

        <button
          className="btn btn-danger"
          style={{ width: '100%', fontSize: 16, fontWeight: 700 }}
          onClick={onCancel}
          aria-label={`Cancel this transaction, ${countdown} seconds remaining`}
        >
          Cancel Transaction
        </button>

        <p style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center' }}>
          Transaction will automatically process in {countdown} second{countdown !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   Send Money Orchestrator
   ════════════════════════════════════════ */
export default function SendMoney() {
  const { navigate } = useApp()
  const [step, setStep] = useState('start')
  const [data, setData]  = useState({
    recipient: null,
    amount:    0,
    memo:      '',
    account:   null,
  })

  const goHome = () => navigate('home')

  if (step === 'start')
    return <StepStart onNext={() => setStep('recipient')} onBack={goHome} />

  if (step === 'recipient')
    return (
      <StepRecipient
        onSelect={r  => { setData(p => ({ ...p, recipient: r })); setStep('amount') }}
        onBack={() => setStep('start')}
      />
    )

  if (step === 'amount')
    return (
      <StepAmount
        recipient={data.recipient}
        onNext={amt => { setData(p => ({ ...p, amount: amt })); setStep('details') }}
        onBack={() => setStep('recipient')}
      />
    )

  if (step === 'details')
    return (
      <StepDetails
        recipient={data.recipient}
        amount={data.amount}
        onNext={({ memo, account }) => { setData(p => ({ ...p, memo, account })); setStep('review') }}
        onBack={() => setStep('amount')}
      />
    )

  if (step === 'review')
    return (
      <StepReview
        recipient={data.recipient}
        amount={data.amount}
        memo={data.memo}
        account={data.account}
        onConfirm={() => setStep('confirm')}
        onChange={() => setStep('change')}
        onBack={() => setStep('details')}
      />
    )

  if (step === 'change')
    return (
      <StepChange
        recipient={data.recipient}
        amount={data.amount}
        memo={data.memo}
        onDone={({ memo }) => { setData(p => ({ ...p, memo })); setStep('review') }}
        onBack={() => setStep('review')}
      />
    )

  if (step === 'confirm')
    return (
      <StepConfirm
        recipient={data.recipient}
        amount={data.amount}
        onConfirm={() => setStep('auth')}
        onCancel={goHome}
      />
    )

  if (step === 'auth')
    return (
      <StepAuth
        onSuccess={() => setStep('cancel-buffer')}
        onBack={() => setStep('confirm')}
      />
    )

  if (step === 'cancel-buffer')
    return (
      <StepCancelBuffer
        recipient={data.recipient}
        amount={data.amount}
        onCancel={goHome}
        onComplete={goHome}
      />
    )

  return null
}
