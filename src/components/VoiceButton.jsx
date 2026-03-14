import React, { useState, useCallback, useRef } from 'react'

function MicIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor" />
      <path
        d="M5 10v1a7 7 0 0 0 14 0v-1"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      />
      <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9"  y1="22" x2="15" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      aria-hidden="true"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * VoiceButton — accessible mic button with ripple animations.
 *
 * Props:
 *   size       – pixel size of the button (default 64)
 *   hint       – label shown below button when idle
 *   onResult   – (transcript: string) => void — called when voice recognized
 *   onActivate – () => void — called when button pressed (fallback / simulation)
 */
export default function VoiceButton({
  size = 64,
  hint = 'Tap to speak',
  onResult,
  onActivate,
}) {
  const [state, setState] = useState('idle') // idle | listening | processing
  const recRef = useRef(null)

  const startListening = useCallback(() => {
    if (state === 'listening') {
      recRef.current?.stop()
      setState('idle')
      return
    }
    if (state === 'processing') return

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition

    if (SR) {
      const rec = new SR()
      rec.continuous      = false
      rec.interimResults  = false
      rec.lang            = 'en-US'
      rec.onstart         = () => setState('listening')
      rec.onend           = () => { if (state !== 'processing') setState('idle') }
      rec.onerror         = () => setState('idle')
      rec.onresult        = (e) => {
        const transcript = e.results[0][0].transcript
        setState('processing')
        setTimeout(() => {
          setState('idle')
          onResult?.(transcript)
        }, 600)
      }
      recRef.current = rec
      rec.start()
    } else {
      // Fallback: simulate listening for 2s
      setState('listening')
      onActivate?.()
      setTimeout(() => setState('idle'), 2000)
    }
  }, [state, onResult, onActivate])

  const ariaLabel =
    state === 'idle'        ? hint
    : state === 'listening' ? 'Listening — tap to stop'
    :                         'Processing your voice…'

  return (
    <div
      className="voice-btn-wrap"
      style={{ '--vbtn-size': `${size}px` }}
    >
      {state === 'listening' && (
        <>
          <div className="voice-ripple voice-ripple-1" aria-hidden="true" />
          <div className="voice-ripple voice-ripple-2" aria-hidden="true" />
          <div className="voice-ripple voice-ripple-3" aria-hidden="true" />
        </>
      )}

      <button
        className={`voice-btn voice-btn--${state}`}
        onClick={startListening}
        aria-label={ariaLabel}
        aria-live="polite"
        aria-atomic="true"
      >
        {state === 'idle'        && <MicIcon />}
        {state === 'listening'   && <StopIcon />}
        {state === 'processing'  && <SpinnerIcon />}
      </button>

      <span className="voice-btn-hint" aria-live="polite">
        {state === 'idle'       ? hint
        : state === 'listening' ? 'Listening…'
        :                         'Processing…'}
      </span>
    </div>
  )
}
