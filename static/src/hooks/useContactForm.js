import { useState } from 'react'
import { getCsrfToken, postContact } from '../utils/api.js'

export default function useContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const validate = () => {
    const e = {}
    if (!fields.name.trim()) e.name = 'Name is required'
    if (!fields.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Invalid email address'
    if (!fields.subject.trim()) e.subject = 'Subject is required'
    if (!fields.message.trim()) e.message = 'Message is required'
    else if (fields.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('submitting')
    try {
      const token = await getCsrfToken()
      await postContact(fields, token)
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
    }
  }

  const reset = () => { setStatus('idle'); setErrorMsg('') }

  return { fields, errors, status, errorMsg, handleChange, handleSubmit, reset }
}
