import http from 'node:http';

const PORT = Number(process.env.PORT || 8787);
const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-6.2-sol';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;
const hits = new Map();
const SYSTEM = `You are Rumi, a kind, upbeat English tutor for an 8-year-old beginner whose first language is Polish. Your ONLY job is playful, age-appropriate English learning at Pre-A1/A1 level. Speak in very short sentences. First give one simple English sentence, then a brief Polish explanation if useful. Ask only one question at a time. Praise effort, gently correct one mistake at a time, and offer a tiny retry. Use games, colors, animals, food, family, school and everyday situations. Never ask for or repeat a child's full name, address, school, phone, passwords, photos, location or other personal data. If the child shares personal information, do not engage with it; kindly say not to share private details online and return to an English exercise. Refuse any sexual, violent, dangerous, hateful, self-harm, medical, financial or adult topic in a calm child-friendly way and redirect to English learning. Do not claim to be human, a real friend, or a real person. Do not encourage secrecy from parents, off-platform contact, purchases or sharing images. Never provide links or ask the child to leave the app. Keep replies under 65 words. Avoid copyrighted song lyrics; you may create original rhymes.`;

function send(res, status, data) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'access-control-allow-origin': ALLOWED_ORIGIN,
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type'
  });
  res.end(JSON.stringify(data));
}
function limited(ip) {
  const now = Date.now();
  const old = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  if (old.length >= MAX_PER_WINDOW) return true;
  old.push(now); hits.set(ip, old); return false;
}
function outputText(payload) {
  if (typeof payload.output_text === 'string') return payload.output_text.trim();
  for (const item of payload.output || []) {
    if (item.type === 'message') {
      for (const part of item.content || []) if (part.type === 'output_text' && part.text) return part.text.trim();
    }
  }
  return '';
}
const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  if (req.method === 'GET' && url.pathname === '/health') return send(res, 200, { ok: true, service: 'rumi-tutor', aiConfigured: Boolean(API_KEY) });
  if (req.method !== 'POST' || url.pathname !== '/api/chat') return send(res, 404, { error: 'Not found' });
  const ip = req.socket.remoteAddress || 'unknown';
  if (limited(ip)) return send(res, 429, { error: 'Za dużo wiadomości. Zróbmy krótką przerwę.' });
  if (!API_KEY) return send(res, 503, { error: 'AI nie jest skonfigurowane na serwerze. Rumi może nadal korzystać z lokalnych ćwiczeń.' });
  let raw = '';
  try {
    for await (const chunk of req) {
      raw += chunk;
      if (raw.length > 12_000) return send(res, 413, { error: 'Wiadomość jest za długa.' });
    }
    const body = JSON.parse(raw || '{}');
    const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
    const safeMessages = messages.filter(m => m && ['user','assistant'].includes(m.role) && typeof m.content === 'string')
      .map(m => ({ role: m.role, content: m.content.slice(0, 700) }));
    if (!safeMessages.length || safeMessages.at(-1).role !== 'user') return send(res, 400, { error: 'Brak wiadomości uczennicy.' });
    const moderation = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST', headers: { authorization: `Bearer ${API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'omni-moderation-latest', input: safeMessages.at(-1).content })
    });
    if (!moderation.ok) return send(res, 502, { error: 'Nie udało się sprawdzić bezpieczeństwa wiadomości.' });
    const mod = await moderation.json();
    if (mod.results?.[0]?.flagged) return send(res, 200, { reply: "Let's choose a safe English topic. 💜 What animal do you like? Jakie zwierzątko lubisz?" });
    const upstream = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST', headers: { authorization: `Bearer ${API_KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODEL, instructions: SYSTEM, input: safeMessages, max_output_tokens: 130, store: false })
    });
    const payload = await upstream.json();
    if (!upstream.ok) return send(res, 502, { error: 'Usługa AI jest chwilowo niedostępna.' });
    const reply = outputText(payload);
    if (!reply) return send(res, 502, { error: 'Rumi nie otrzymała odpowiedzi. Spróbuj ponownie.' });
    return send(res, 200, { reply });
  } catch {
    return send(res, 400, { error: 'Nie udało się odczytać wiadomości.' });
  }
});
server.listen(PORT, () => console.log(`Rumi tutor API listening on ${PORT}`));
