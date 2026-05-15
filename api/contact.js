// POST /api/contact
// Receives form submissions from the landing page and creates a record in Airtable.
// All credentials come from Vercel env vars — never hardcoded.

export default async function handler(req, res) {
  // CORS / method gate
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;

  if (!token || !baseId || !tableId) {
    return res.status(500).json({ ok: false, error: 'server_misconfigured' });
  }

  // Body parsing: Vercel auto-parses JSON when Content-Type is application/json.
  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};

  // Extract + trim
  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const officeSize = str(body.officeSize);
  const projectBrief = str(body.projectBrief);

  // Additional fields (homepage form, optional for other landings)
  const city = str(body.city);
  const projectType = str(body.projectType);
  const budget = str(body.budget);
  const basedInPakistan = str(body.basedInPakistan);
  const existingClient = str(body.existingClient);

  // UTM attribution (all optional)
  const utmSource = str(body.utm_source);
  const utmMedium = str(body.utm_medium);
  const utmCampaign = str(body.utm_campaign);
  const utmTerm = str(body.utm_term);
  const utmContent = str(body.utm_content);

  // Landing-page attribution. Whitelist ensures the singleSelect never sees junk.
  const ALLOWED_LANDINGS = new Set(['corporate', 'corporate-quote', 'furniture', 'tech', 'homepage', 'architecture', 'interior-design', 'construction', 'construction-dha', 'supervision', 'about']);
  const landingRaw = str(body.landing).toLowerCase();
  const landing = ALLOWED_LANDINGS.has(landingRaw) ? landingRaw : 'corporate';

  // Validation — homepage form does not have officeSize, so skip that requirement when landing is homepage
  const errors = {};
  if (!name || name.length < 2) errors.name = 'Please enter your name.';
  // Email is optional on minimal ad LPs that collect phone-only. If provided, still validate format.
  const LANDINGS_WITHOUT_EMAIL = new Set(['construction-dha']);
  if (LANDINGS_WITHOUT_EMAIL.has(landing)) {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email.';
  } else {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email.';
  }
  if (!phone || phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a valid phone number.';
  const LANDINGS_WITHOUT_OFFICE_SIZE = new Set(['homepage', 'architecture', 'interior-design', 'construction', 'construction-dha', 'supervision', 'about', 'corporate-quote']);
  if (!LANDINGS_WITHOUT_OFFICE_SIZE.has(landing) && !officeSize) errors.officeSize = 'Please enter approximate size.';
  // Cold-traffic ad LPs ask for a brief but don't require it — capture happens on WhatsApp follow-up.
  const LANDINGS_WITHOUT_PROJECT_BRIEF = new Set(['corporate-quote']);
  if (!LANDINGS_WITHOUT_PROJECT_BRIEF.has(landing) && (!projectBrief || projectBrief.length < 10)) errors.projectBrief = 'Tell us a bit more (min 10 characters).';
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, error: 'validation_failed', errors });
  }

  // Length caps (defensive)
  const fields = {
    'Name': clip(name, 120),
    'Email': clip(email, 200),
    'Phone': clip(phone, 40),
    'Project Brief': clip(projectBrief, 4000),
    'Submitted At': new Date().toISOString(),
  };
  if (officeSize)  fields['Office Size']  = clip(officeSize, 80);
  if (city)        fields['City']         = clip(city, 80);
  if (projectType) fields['Project Type'] = clip(projectType, 80);
  if (budget)      fields['Budget']       = clip(budget, 200);

  // Prepend qualifier tags to Project Brief for visibility without requiring Airtable schema changes.
  let briefPrefix = '';
  if (basedInPakistan && basedInPakistan.toLowerCase().includes('no')) {
    briefPrefix += '[OVERSEAS LEAD] ';
  }
  if (existingClient) {
    const ec = existingClient.toLowerCase();
    if (ec.includes('currently engaged')) briefPrefix += '[EXISTING CLIENT - in design] ';
    else if (ec.includes('design completed')) briefPrefix += '[EXISTING CLIENT - design done] ';
    else if (ec.includes('considering')) briefPrefix += '[PROSPECT - considering design] ';
  }
  if (briefPrefix) {
    fields['Project Brief'] = clip(briefPrefix + projectBrief, 4000);
  }
  if (utmSource)   fields['UTM Source']   = clip(utmSource, 200);
  if (utmMedium)   fields['UTM Medium']   = clip(utmMedium, 200);
  if (utmCampaign) fields['UTM Campaign'] = clip(utmCampaign, 200);
  if (utmTerm)     fields['UTM Term']     = clip(utmTerm, 200);
  if (utmContent)  fields['UTM Content']  = clip(utmContent, 200);
  fields['Source'] = landing;

  try {
    const resp = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields, typecast: true }),
      }
    );

    if (!resp.ok) {
      const detail = await resp.text();
      console.error('Airtable error:', resp.status, detail);
      return res.status(502).json({ ok: false, error: 'upstream_error' });
    }

    const data = await resp.json();
    return res.status(200).json({ ok: true, id: data.id });
  } catch (err) {
    console.error('Handler exception:', err);
    return res.status(500).json({ ok: false, error: 'server_error' });
  }
}

function str(v) {
  return typeof v === 'string' ? v.trim() : '';
}
function clip(s, n) {
  return s.length > n ? s.slice(0, n) : s;
}
function safeParse(s) {
  try { return JSON.parse(s); } catch { return {}; }
}
