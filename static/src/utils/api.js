let cachedToken = null

export async function getCsrfToken() {
  if (cachedToken) return cachedToken
  const res = await fetch('/api/csrf-token')
  if (!res.ok) throw new Error('Failed to fetch CSRF token')
  const data = await res.json()
  cachedToken = data.csrf_token
  return cachedToken
}

export async function postContact(fields, csrfToken) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrfToken },
    body: JSON.stringify(fields),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || `Server error ${res.status}`)
  }
  return res.json()
}

export async function getProjects() {
  const res = await fetch('/api/projects')
  if (!res.ok) throw new Error('Failed to load projects')
  return res.json()
}

export async function getSkills() {
  const res = await fetch('/api/skills')
  if (!res.ok) throw new Error('Failed to load skills')
  return res.json()
}
