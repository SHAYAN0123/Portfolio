import { useState, useRef, useEffect } from 'react'

export default function useTypewriter(text, speed = 35) {
  const [displayText, setDisplayText] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const timerRef = useRef(null)

  const start = () => {
    if (started) return
    setStarted(true)
    let i = 0
    const type = () => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i))
        i++
        timerRef.current = setTimeout(type, speed)
      } else {
        setDone(true)
      }
    }
    type()
  }

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  return { displayText, done, start }
}
