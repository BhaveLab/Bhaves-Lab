const SYSTEM_PROMPT = `You are The Chamber's Reflection Engine inside Bhavé's Lab.

Your purpose is to analyze a user's 21 responses and generate a Chamber Reflection report.

RULES:
- Do not diagnose, prescribe, motivate, or fix.
- Do not use these terms: healing, toxic, high vibe, manifest, hustle, grind, coaching, therapy, transformation, journey, growth, spiritual, tribe, community.
- Do not tell the user what to do.
- Observe only. Reflect only. Name what appears.
- Be precise. Be direct. Not harsh. Not warm in a therapeutic way.
- Language is observational, not instructional.
- Use the word "study" not "learn". Use "awareness" not "consciousness growth".

OUTPUT FORMAT — return ONLY this JSON structure, no markdown, no preamble:
{
  "signal": "2-3 sentences on what appears to be calling for attention across the responses",
  "pattern": "2-3 sentences on what repeats — recurring words, emotions, situations",
  "state": "2-3 sentences on the dominant state influencing perception in these responses",
  "negotiation": "2-3 sentences on what the user appears to already know but continues to negotiate with",
  "direction": "2-3 sentences on what naturally emerges from the observations — not a prescription, just what is visible"
}`;

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildReflectionEmail(report) {
  const sections = [
    { key: 'signal',      label: 'Signal' },
    { key: 'pattern',     label: 'Pattern' },
    { key: 'state',       label: 'State' },
    { key: 'negotiation', label: 'Negotiation' },
    { key: 'direction',   label: 'Direction' },
  ];

  const sectionRows = sections.map(({ key, label }) => `
          <tr>
            <td style="padding:20px 0 0;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0 0 6px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:#3dd6c8;opacity:0.8;">[ ${escapeHtml(label)} ]</p>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#e8e4dc;line-height:1.8;">${escapeHtml(report[key] || '')}</p>
            </td>
          </tr>
          <tr><td style="padding-top:20px;border-bottom:1px solid #1a1a1a;background-color:#080808;" bgcolor="#080808"></td></tr>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Chamber Reflection — Bhavé's Lab</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;" bgcolor="#080808">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 20px;background-color:#080808;" bgcolor="#080808">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="max-width:580px;background-color:#080808;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #1e1e1e;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#3dd6c8;opacity:0.55;">Bhavé's Lab</p>
              <h1 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;color:#e8e4dc;letter-spacing:0.02em;">The Chamber Reflection</h1>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:#5a5448;line-height:1.75;">Twenty-one questions. No answers given.<br>Only what was already there — observed.</p>
            </td>
          </tr>

          <!-- Sections -->
          <tr>
            <td style="background-color:#080808;" bgcolor="#080808">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;">
                ${sectionRows}
              </table>
            </td>
          </tr>

          <!-- Closing quote -->
          <tr>
            <td style="padding:32px 0 0;background-color:#080808;" bgcolor="#080808">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;">
                <tr>
                  <td width="2" style="width:2px;background-color:#b8922a;" bgcolor="#b8922a">&nbsp;</td>
                  <td style="padding:16px 20px;background-color:#0d0b09;" bgcolor="#0d0b09">
                    <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:#c8a96e;line-height:1.8;">"The mystery is not the information. The mystery is why we continue negotiating with what we already know."</p>
                    <p style="margin:8px 0 0;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.2em;color:#b8922a;opacity:0.7;">— Bhavé</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:32px 0 0;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0 0 12px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#b8922a;opacity:0.6;">Continue the Study</p>
              <p style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#6b6b6b;line-height:1.75;">Seven books. One framework. The full sequence — State through Source.</p>
              <a href="https://gospel.bhaveslab.com" style="display:inline-block;font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#3dd6c8;text-decoration:none;border:1px solid #1a6b65;padding:10px 22px;">gospel.bhaveslab.com</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:40px;border-top:1px solid #1a1510;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:12px;font-style:italic;color:#3a3228;line-height:1.7;">If something here pulled at you, that is signal.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function generateReflection(responses) {
  const text = responses.map((r, i) =>
    `Q${i + 1}: ${r.q}\nA: ${r.a}`
  ).join('\n\n');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: 'Here are the 21 responses:\n\n' + text }],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Anthropic API error');
  }

  const data = await res.json();
  const raw = data.content?.[0]?.text ?? '';
  const clean = raw.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

async function sendEmail(payload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, responses } = req.body;

  if (!responses || !Array.isArray(responses) || responses.length === 0) {
    return res.status(400).json({ error: 'Missing responses' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  try {
    const report = await generateReflection(responses);

    // Send internal notification
    await sendEmail({
      from: "Bhavé's Lab <info@bhaveslab.com>",
      to: 'mirror@bhaveslab.com',
      subject: `Chamber Submission — ${email || 'anonymous'}`,
      html: `<p><strong>Email:</strong> ${escapeHtml(email || '—')}</p><p><strong>Responses:</strong> ${responses.length}</p>`,
    }).catch(err => console.error('[chamber] internal notify error:', err.message));

    // Send reflection to user if email provided
    if (email && email.includes('@')) {
      const userRes = await sendEmail({
        from: "Bhavé's Lab <info@bhaveslab.com>",
        to: email,
        subject: "Your Chamber Reflection — Bhavé's Lab",
        html: buildReflectionEmail(report),
      });

      const userData = await userRes.json();
      if (!userRes.ok) {
        console.error('[chamber] Resend user email FAILED:', userRes.status, JSON.stringify(userData));
      } else {
        console.log('[chamber] Reflection sent to:', email);
      }
    }

    return res.status(200).json({ report });
  } catch (err) {
    console.error('[chamber] handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
