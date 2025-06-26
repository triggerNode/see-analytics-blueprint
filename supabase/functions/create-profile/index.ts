
/** Trigger: auth.user_created — auto-provision profile row */
import { serve } from 'https://deno.land/x/sift@0.6.0/mod.ts'

serve(async (req) => {
  const body = await req.json()
  const email: string = body.record.email ?? ''
  const isAdmin = ['olu@triggernode.com', 'founder@triggernode.com', 'admin@triggernode.com']
    .includes(email.toLowerCase())
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = Deno.env.toObject()

  const resp = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
    method: 'POST',
    headers: {
      apiKey: SUPABASE_SERVICE_ROLE_KEY!,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({
      id: body.record.id,
      is_admin: isAdmin,
      subscription_status: 'free'
    })
  })

  if (!resp.ok) {
    console.error('Profile insert failed', await resp.text())
    return new Response('error', { status: 500 })
  }
  return new Response('ok', { status: 200 })
})
