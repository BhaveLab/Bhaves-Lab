const MIRROR_QUESTIONS = [
  "What is the dominant frequency you have been operating in lately — not a mood, the actual ground condition underneath everything?",
  "What is the one thing you keep seeing in every situation right now — even when the situations are different?",
  "What conclusion about yourself feels so obvious it has never needed questioning?",
  "What do you keep choosing that you already know isn't producing what you want?",
  "What feeling or physical state keeps returning regardless of what you do to address it?",
  "What area of your life has stayed exactly the same despite your clearest efforts to change it?",
  "What brought you here today — not the story, just what is actually active right now?",
  "If something in this Mirror lands and you want to go deeper — what is the best way to reach you?",
];

const PATH_CONFIGS = [
  { name: 'Study Session', url: 'https://bhaveslab.com/study-session' },
  { name: 'Inner Mining', url: 'https://bhaveslab.com/hypnosis' },
  { name: 'Pattern Immersion', url: 'https://bhaveslab.com/pattern-immersion' },
];

const MIRROR_SYSTEM_PROMPT = `You are the Consciousness Mirror at Bhavé's Lab. You have received 8 answers from a source being. Read across all 8 answers and write one precise paragraph that reflects back the pattern you observe — what state is running, what formation is visible, what the answers collectively reveal. Do not be generic. Do not use wellness language. Be direct, precise, and observational. Sign off as: The Mirror. Do not use markdown formatting. No asterisks, no bold, no italics. Plain prose only.

After the reflection paragraph, output a blank line, then output exactly this block with no extra text before or after:
PATH OPTIONS:
Study Session — [one sentence on why this fits what they brought].
Inner Mining — [one sentence on why this fits].
Pattern Immersion — [one sentence on why this fits].

Always return all three paths. The Mirror sees all three as available — the person chooses.
Path guidance:
- Study Session: pattern awareness is emerging or new — needs a clear starting point and structured first look
- Inner Mining: a specific recurring state, physical sensation, or embodied pattern is dominant — subconscious access is the lever
- Pattern Immersion: patterns are named and understood but persist despite effort — deeper structural work over time is what moves them`;

const TRACE_FIELDS = [
  { key: 'stateWord',       label: 'State Word' },
  { key: 'reality',         label: 'Reality' },
  { key: 'experience',      label: 'Experience' },
  { key: 'decision',        label: 'Decision' },
  { key: 'stateAtDecision', label: 'State at Decision' },
  { key: 'formation',       label: 'Formation' },
  { key: 'perception',      label: 'Perception' },
  { key: 'stateOrigin',     label: 'State Origin' },
  { key: 'gapResponse1',    label: 'Gap Response 1' },
  { key: 'gapResponse2',    label: 'Gap Response 2' },
  { key: 'realityUpdate',   label: 'Reality Update', optional: true },
];

function parseReflectionResponse(fullText) {
  const pathMarker = 'PATH OPTIONS:';
  const pathIndex = fullText.indexOf(pathMarker);

  let reflection = fullText.trim();
  const paths = [];

  if (pathIndex !== -1) {
    reflection = fullText.slice(0, pathIndex).trim();
    const pathSection = fullText.slice(pathIndex + pathMarker.length).trim();

    for (const { name, url } of PATH_CONFIGS) {
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = pathSection.match(new RegExp(escaped + '\\s*[\\u2014\\u2013-]\\s*(.+?)(?=\\n|$)', 'i'));
      if (match) {
        paths.push({ name, url, why: match[1].trim() });
      }
    }
  }

  return { reflection, paths };
}

async function getMirrorReflection(answers) {
  const userMessage = MIRROR_QUESTIONS.map((q, i) =>
    `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i] || '—'}`
  ).join('\n\n');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 900,
      system: MIRROR_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('[notify] Claude reflection error:', data);
    return { reflection: null, paths: [] };
  }

  const fullText = data.content?.map(c => c.text || '').join('') || '';
  return parseReflectionResponse(fullText);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPathBlocksHTML(paths) {
  if (!paths || !paths.length) return '';

  const blocks = paths.map(({ name, url, why }) => `
    <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;margin-bottom:8px;">
      <tr>
        <td width="2" style="width:2px;background-color:#c9a96e;" bgcolor="#c9a96e">&nbsp;</td>
        <td style="padding:14px 18px;background-color:#0d0b09;" bgcolor="#0d0b09">
          <p style="margin:0 0 6px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#c9a96e;">${escapeHtml(name)}</p>
          <p style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:#e8e4dc;line-height:1.65;">${escapeHtml(why)}</p>
          <a href="https://calendly.com/bhaveslab/30min" style="font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#c9a96e;text-decoration:none;opacity:0.7;">Book a session →</a>
        </td>
      </tr>
    </table>`).join('');

  return `
    <tr>
      <td style="padding:32px 0 0;background-color:#080808;" bgcolor="#080808">
        <p style="margin:0 0 14px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a96e;opacity:0.4;">Paths available</p>
        ${blocks}
      </td>
    </tr>`;
}

function buildReadoutHTML(answers, reflection, paths) {
  const answerRows = MIRROR_QUESTIONS.map((q, i) => {
    const answer = answers && answers[i] ? escapeHtml(answers[i]) : '—';
    return `
      <tr>
        <td style="padding:16px 0 6px;background-color:#080808;" bgcolor="#080808">
          <p style="margin:0 0 5px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:#c9a96e;opacity:0.5;">Q${i + 1} — ${escapeHtml(q)}</p>
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#e8e4dc;line-height:1.7;">${answer}</p>
        </td>
      </tr>`;
  }).join('');

  const reflectionBlock = reflection ? `
        <tr>
          <td style="padding:28px 0 32px;background-color:#080808;" bgcolor="#080808">
            <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;">
              <tr>
                <td width="2" style="width:2px;background-color:#c9a96e;" bgcolor="#c9a96e">&nbsp;</td>
                <td style="padding:18px 22px;background-color:#0d0b09;" bgcolor="#0d0b09">
                  <p style="margin:0 0 10px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a96e;opacity:0.6;">The Mirror</p>
                  <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;font-style:italic;color:#e8e4dc;line-height:1.85;">${escapeHtml(reflection)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>` : '';

  const pathBlocksHTML = buildPathBlocksHTML(paths);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Consciousness Mirror Readout</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;" bgcolor="#080808">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 20px;background-color:#080808;" bgcolor="#080808">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="max-width:580px;background-color:#080808;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #2a2218;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#c9a96e;opacity:0.55;">Bhavé's Lab</p>
              <h1 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;color:#e8e4dc;letter-spacing:0.02em;">The Consciousness Mirror</h1>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:#5a5448;line-height:1.75;">Eight questions. No answers given.<br>Only what was already there — reflected back.</p>
            </td>
          </tr>

          ${reflectionBlock}

          <!-- Answers label -->
          <tr>
            <td style="padding:${reflection ? '4px' : '28px'} 0 6px;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#c9a96e;opacity:0.4;">Your Answers</p>
            </td>
          </tr>

          <!-- Answers -->
          <tr>
            <td style="background-color:#080808;" bgcolor="#080808">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;">
                ${answerRows}
              </table>
            </td>
          </tr>

          ${pathBlocksHTML}

          <!-- Footer divider -->
          <tr>
            <td style="padding-top:36px;border-top:1px solid #1a1510;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-style:italic;color:#3a3228;line-height:1.7;">If something here pulled at you, that is signal.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildTraceReadoutHTML(fields, date) {
  const fieldRows = TRACE_FIELDS
    .filter(({ key, optional }) => !optional || fields[key])
    .map(({ key, label }) => {
      const value = fields[key] ? escapeHtml(fields[key]) : '—';
      return `
      <tr>
        <td style="padding:16px 0 6px;background-color:#080808;" bgcolor="#080808">
          <p style="margin:0 0 5px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:#c9a96e;opacity:0.5;">${escapeHtml(label)}</p>
          <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#e8e4dc;line-height:1.7;">${value}</p>
        </td>
      </tr>`;
    }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Your Trace</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;" bgcolor="#080808">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 20px;background-color:#080808;" bgcolor="#080808">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="max-width:580px;background-color:#080808;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;border-bottom:1px solid #2a2218;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#c9a96e;opacity:0.55;">Bhavé's Lab</p>
              <h1 style="margin:0 0 10px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;color:#e8e4dc;letter-spacing:0.02em;">The Trace</h1>
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;font-style:italic;color:#5a5448;line-height:1.75;">${escapeHtml(date)}</p>
            </td>
          </tr>

          <!-- Fields -->
          <tr>
            <td style="padding-top:8px;background-color:#080808;" bgcolor="#080808">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;">
                ${fieldRows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:36px;border-top:1px solid #1a1510;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-style:italic;color:#3a3228;line-height:1.7;">What was traced here is already in motion.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
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

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, source, name, answers, fields } = req.body;

  if (!email) return res.status(400).json({ error: 'Missing email' });

  const subjectMap = {
    'study-yourself-waitlist': 'Study Yourself Waitlist Sign-up',
    'consciousness-mirror': 'Consciousness Mirror Submission',
    'the-trace': 'The Trace Submission',
  };

  const internalSubject = subjectMap[source] || `Notification: ${source || 'unknown'}`;
  const nameLine = name ? `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` : '';
  const answersHTML = answers && answers.length
    ? `<ul style="margin:8px 0 0;padding-left:20px;">${answers.map((a, i) => `<li><strong>Q${i + 1}:</strong> ${escapeHtml(a || '—')}</li>`).join('')}</ul>`
    : '';

  try {
    // Always send internal notification
    const internalRes = await sendEmail({
      from: 'Bhave Lab <info@bhaveslab.com>',
      to: 'mirror@bhaveslab.com',
      subject: internalSubject,
      html: `
        ${nameLine}
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Source:</strong> ${source || 'unknown'}</p>
        ${answersHTML}
      `,
    });

    const internalData = await internalRes.json();
    if (!internalRes.ok) {
      console.error('[notify] Resend internal error:', internalData);
      return res.status(502).json({ error: 'Failed to send notification' });
    }

    // For mirror submissions, get Claude reflection + paths then send readout to user
    if (source === 'consciousness-mirror') {
      const { reflection, paths } = await getMirrorReflection(answers || []);

      const userRes = await sendEmail({
        from: "Bhavé's Lab <info@bhaveslab.com>",
        to: email,
        subject: "Your Consciousness Mirror Readout — Bhavé's Lab",
        html: buildReadoutHTML(answers || [], reflection, paths),
      });

      const userData = await userRes.json();
      console.log('[notify] Resend user readout — status:', userRes.status, '| to:', email, '| body:', JSON.stringify(userData));
      if (!userRes.ok) {
        console.error('[notify] Resend user readout FAILED:', userRes.status, JSON.stringify(userData));
      }
    }

    // For trace submissions, send formatted trace readout to user
    if (source === 'the-trace') {
      const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const traceFields = fields || {};

      const userRes = await sendEmail({
        from: "Bhavé's Lab <mirror@bhaveslab.com>",
        to: email,
        subject: `Your Trace — ${date}`,
        html: buildTraceReadoutHTML(traceFields, date),
      });

      const userData = await userRes.json();
      console.log('[notify] Resend trace readout — status:', userRes.status, '| to:', email, '| body:', JSON.stringify(userData));
      if (!userRes.ok) {
        console.error('[notify] Resend trace readout FAILED:', userRes.status, JSON.stringify(userData));
      }
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('[notify] handler error:', error.message);
    res.status(500).json({ error: `Notify failed: ${error.message}` });
  }
}
