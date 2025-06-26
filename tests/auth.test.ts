
import { describe, it, expect } from 'vitest'

// Mock auth context value generator
const mockAuthValue = (email: string) => {
  const adminEmails = [
    'olu@triggernode.com',
    'founder@triggernode.com',
    'admin@triggernode.com'
  ]
  
  return {
    isAdmin: adminEmails.includes(email.toLowerCase()),
    tier: 'free' as const,
    user: { email }
  }
}

describe('AuthContext', () => {
  it('elevates admin e-mails', () => {
    const ctx = mockAuthValue('founder@triggernode.com')
    expect(ctx.isAdmin).toBe(true)
    expect(ctx.tier).toBe('free')
  })

  it('does not elevate regular users', () => {
    const ctx = mockAuthValue('regular@example.com')
    expect(ctx.isAdmin).toBe(false)
    expect(ctx.tier).toBe('free')
  })
})
