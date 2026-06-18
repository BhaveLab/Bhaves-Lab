function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const SECTIONS = [
  {
    label: 'Section 1 — The Person',
    questions: [
      { num: 1,  key: 'q1',  text: 'Who are you?' },
      { num: 2,  key: 'q2',  text: 'What do you do?' },
      { num: 3,  key: 'q3',  text: 'How did you find this work?' },
      { num: 4,  key: 'q4',  text: 'What experiences shaped your approach?' },
      { num: 5,  key: 'q5',  text: 'What keeps you committed to this work?' },
      { num: 6,  key: 'q6',  text: 'What makes your approach different from others in your field?' },
    ],
  },
  {
    label: 'Section 2 — The Mission',
    questions: [
      { num: 7,  key: 'q7',  text: 'Why does this work matter to you?' },
      { num: 8,  key: 'q8',  text: 'What problem are you trying to help solve?' },
      { num: 9,  key: 'q9',  text: 'What do you wish more people understood about your work?' },
      { num: 10, key: 'q10', text: 'What change are you hoping to create in the lives of the people you serve?' },
      { num: 11, key: 'q11', text: 'What future are you helping build?' },
    ],
  },
  {
    label: 'Section 3 — The People You Serve',
    questions: [
      { num: 12, key: 'q12', text: 'Who do you primarily help?' },
      { num: 13, key: 'q13', text: 'What are they struggling with when they first come to you?' },
      { num: 14, key: 'q14', text: 'What are they searching for?' },
      { num: 15, key: 'q15', text: 'What usually brings them to you?' },
      { num: 16, key: 'q16', text: 'What keeps them stuck?' },
      { num: 17, key: 'q17', text: 'What happens if they continue down the same path without support?' },
    ],
  },
  {
    label: 'Section 4 — The Transformation',
    questions: [
      { num: 18, key: 'q18', text: 'What shifts do clients typically experience through your work?' },
      { num: 19, key: 'q19', text: 'What surprises them most about the process?' },
      { num: 20, key: 'q20', text: 'What changes after working with you?' },
      { num: 21, key: 'q21', text: 'What do former clients often say about their experience?' },
      { num: 22, key: 'q22', text: 'What makes the transformation sustainable over time?' },
    ],
  },
  {
    label: 'Section 5 — The Work',
    questions: [
      { num: 23, key: 'q23', text: 'What services, programs, or experiences do you currently offer?' },
      { num: 24, key: 'q24', text: 'Walk us through your process from beginning to end.' },
      { num: 25, key: 'q25', text: 'What happens during the first interaction?' },
      { num: 26, key: 'q26', text: 'What should a client expect during the journey?' },
      { num: 27, key: 'q27', text: 'How do you support integration, accountability, or follow-through?' },
    ],
  },
  {
    label: 'Section 6 — The Environment',
    questions: [
      { num: 28, key: 'q28', text: 'Where does your work take place?' },
      { num: 29, key: 'q29', text: 'Describe the environment someone will experience when working with you.' },
      { num: 30, key: 'q30', text: 'What should someone know before reaching out or arriving?' },
      { num: 31, key: 'q31', text: 'If someone remembers only one thing about you or your work, what would you want it to be?' },
      { num: 32, key: 'q32', text: 'What is the next step for someone who feels called to work with you?' },
    ],
  },
];

function buildSectionRows(body) {
  return SECTIONS.map(({ label, questions }) => {
    const questionRows = questions.map(({ num, key, text }) => {
      const answer = body[key] ? escapeHtml(body[key]) : '<em style="color:#3a3228;">No answer provided</em>';
      return `
        <tr>
          <td style="padding:14px 0 10px;border-bottom:1px solid #111;background-color:#080808;" bgcolor="#080808">
            <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.28em;text-transform:uppercase;color:#c9a96e;opacity:0.5;">Q${num} — ${escapeHtml(text)}</p>
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:15px;color:#e8e4dc;line-height:1.75;">${answer}</p>
          </td>
        </tr>`;
    }).join('');

    return `
      <tr>
        <td style="padding:28px 0 6px;background-color:#080808;" bgcolor="#080808">
          <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#3dd6c8;opacity:0.7;">${escapeHtml(label)}</p>
        </td>
      </tr>
      ${questionRows}`;
  }).join('');
}

function buildEmailHTML(body) {
  const {
    bizName, yourName, titleRole, email, phone,
    location, website, socialLinks, primaryCTA,
    assets, assetNotes,
  } = body;

  const bizInfoRows = [
    ['Business Name', bizName],
    ['Name', yourName],
    ['Title / Role', titleRole],
    ['Email', email],
    ['Phone', phone],
    ['Location', location],
    ['Website', website],
    ['Social Media', socialLinks],
    ['Primary CTA', primaryCTA],
  ].filter(([, v]) => v).map(([label, value]) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #111;background-color:#080808;" bgcolor="#080808">
        <span style="font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#c9a96e;opacity:0.55;">${escapeHtml(label)}&nbsp;&nbsp;</span>
        <span style="font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#e8e4dc;">${escapeHtml(value)}</span>
      </td>
    </tr>`).join('');

  const assetsBlock = (assets || assetNotes) ? `
    <tr>
      <td style="padding:28px 0 6px;background-color:#080808;" bgcolor="#080808">
        <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#3dd6c8;opacity:0.7;">Website Assets</p>
      </td>
    </tr>
    ${assets ? `<tr><td style="padding:10px 0;border-bottom:1px solid #111;background-color:#080808;" bgcolor="#080808">
      <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#c9a96e;opacity:0.5;">Checked Items</p>
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#e8e4dc;line-height:1.75;">${escapeHtml(assets)}</p>
    </td></tr>` : ''}
    ${assetNotes ? `<tr><td style="padding:10px 0;border-bottom:1px solid #111;background-color:#080808;" bgcolor="#080808">
      <p style="margin:0 0 4px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:#c9a96e;opacity:0.5;">Notes</p>
      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:14px;color:#e8e4dc;line-height:1.75;">${escapeHtml(assetNotes)}</p>
    </td></tr>` : ''}
    <tr>
      <td style="padding:10px 0;background-color:#080808;" bgcolor="#080808">
        <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:10px;color:#3a3228;line-height:1.7;">If the respondent indicated file uploads, they will follow separately by email.</p>
      </td>
    </tr>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Source Interview — ${escapeHtml(bizName)}</title>
</head>
<body style="margin:0;padding:0;background-color:#080808;" bgcolor="#080808">
  <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;min-height:100vh;">
    <tr>
      <td align="center" style="padding:48px 20px;background-color:#080808;" bgcolor="#080808">
        <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="max-width:620px;background-color:#080808;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:28px;border-bottom:1px solid #2a2218;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0 0 8px;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.4em;text-transform:uppercase;color:#3dd6c8;opacity:0.6;">Bhavé's Lab</p>
              <h1 style="margin:0 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;color:#e8e4dc;">Source Interview</h1>
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:12px;color:#5a5448;">${escapeHtml(bizName)} &nbsp;/&nbsp; ${escapeHtml(yourName)}</p>
            </td>
          </tr>

          <!-- Business Info -->
          <tr>
            <td style="padding:20px 0 4px;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0;font-family:'Courier New',Courier,monospace;font-size:9px;letter-spacing:0.35em;text-transform:uppercase;color:#3dd6c8;opacity:0.7;">Business Information</p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#080808;" bgcolor="#080808">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;">
                ${bizInfoRows}
              </table>
            </td>
          </tr>

          <!-- Questions -->
          <tr>
            <td style="background-color:#080808;" bgcolor="#080808">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;">
                ${buildSectionRows(body)}
              </table>
            </td>
          </tr>

          <!-- Assets -->
          <tr>
            <td style="background-color:#080808;" bgcolor="#080808">
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#080808" style="background-color:#080808;">
                ${assetsBlock}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:36px;border-top:1px solid #1a1510;background-color:#080808;" bgcolor="#080808">
              <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:13px;font-style:italic;color:#3a3228;line-height:1.7;">Submitted via bhaveslab.com/interview</p>
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

  const body = req.body || {};
  const { bizName, yourName, email } = body;

  if (!bizName || !yourName || !email) {
    return res.status(400).json({ error: 'Missing required fields: bizName, yourName, email' });
  }

  const subject = `Source Interview — ${bizName} / ${yourName}`;

  try {
    const emailRes = await sendEmail({
      from: "Bhavé's Lab <info@bhaveslab.com>",
      to: 'info@bhaveslab.com',
      reply_to: email,
      subject,
      html: buildEmailHTML(body),
    });

    const emailData = await emailRes.json();

    if (!emailRes.ok) {
      console.error('[source-interview] Resend error:', JSON.stringify(emailData));
      return res.status(502).json({ error: 'Email delivery failed', detail: emailData });
    }

    console.log('[source-interview] sent:', subject, '| id:', emailData.id);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[source-interview] handler error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
