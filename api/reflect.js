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

  const { input, answer, systemPrompt, max_tokens } = req.body;
  const userInput = input || answer;

  if (!userInput) {
    return res.status(400).json({ error: 'Missing required field: input' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
  }

  // Combined pattern-map synthesis (numerology + 10 section summaries + overall
  // + mirror + moving-forward) needs far more room than a single-question
  // reflection — callers pass max_tokens explicitly; this just enforces a ceiling.
  const requestedTokens = Number(max_tokens) || 1000;
  const cappedTokens = Math.min(Math.max(requestedTokens, 1), 4096);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: cappedTokens,
      system: systemPrompt || undefined,
      messages: [{ role: 'user', content: userInput }],
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
