// Supabase Edge Function: pushover-notify
// Deploy:  supabase functions deploy pushover-notify --no-verify-jwt
// Secrets: supabase secrets set PUSHOVER_TOKEN=xxx PUSHOVER_USER=xxx

Deno.serve(async (req) => {
  try {
    const lead = await req.json();
    const title = `Cleaning Lead: ${lead.company || lead.name}`;
    const message = [
      `Name: ${lead.name}`,
      `Company: ${lead.company}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Facility: ${lead.facility_type || 'n/a'} | ${lead.square_footage || 'n/a'}`,
      `Frequency: ${lead.frequency || 'n/a'}`,
      `Town: ${lead.town || 'n/a'}`,
      lead.message ? `Notes: ${lead.message}` : null,
      `Page: ${lead.source_page || 'n/a'}`,
    ]
      .filter(Boolean)
      .join('\n');

    const res = await fetch('https://api.pushover.net/1/messages.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: Deno.env.get('PUSHOVER_TOKEN'),
        user: Deno.env.get('PUSHOVER_USER'),
        title,
        message,
        priority: 1,
      }),
    });

    return new Response(JSON.stringify({ ok: res.ok }), {
      headers: { 'Content-Type': 'application/json' },
      status: res.ok ? 200 : 502,
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: String(e) }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
