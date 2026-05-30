export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input, systemPrompt } = req.body;

  if (!input) {
    return res.status(400).json({ error: 'Missing required field: input' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: systemPrompt || undefined,
      messages: [{ role: 'user', content: input }],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    return res.status(response.status).json({ error: error.error?.message || 'Anthropic API error' });
  }

  const data = await response.json();
  const text = data.content?.[0]?.text ?? '';

  return res.status(200).json({ text });
}
