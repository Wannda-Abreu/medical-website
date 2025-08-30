import { Resend } from 'resend';

// eslint-disable-next-line no-undef
const resend = new Resend(process.env.RESEND_API_KEY);

function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v ?? ''); }
function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}

function readRawBody(req, limit = 1_000_000) {
  return new Promise((resolve, reject) => {
    let size = 0, data = '';
    req.on('data', c => { size += c.length; if (size > limit) { req.destroy(); reject(new Error('Payload demasiado grande')); } else { data += c; }});
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

async function parseBody(req) {
  const ct = (req.headers['content-type'] || '').toLowerCase();
  let body = req.body;
  if (body == null || body === '') body = await readRawBody(req).catch(() => '');
  try {
    if (ct.includes('application/json')) return typeof body === 'string' ? JSON.parse(body || '{}') : (body || {});
    if (ct.includes('application/x-www-form-urlencoded')) return Object.fromEntries(new URLSearchParams(typeof body === 'string' ? body : ''));
    return typeof body === 'string' && body.trim() ? JSON.parse(body) : (body || {});
  } catch { return {}; }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.setHeader('Allow','POST,OPTIONS'); return res.status(204).end(); }
  if (req.method !== 'POST')   { res.setHeader('Allow','POST,OPTIONS'); return res.status(405).json({ error:'Method not allowed' }); }

  const { name='', email='', message='', honeypot='' } = await parseBody(req) || {};
  if (honeypot) return res.status(200).json({ ok: true });
  if (!name || !email || !message) return res.status(400).json({ error: 'Faltan campos' });
  if (!isEmail(email)) return res.status(400).json({ error: 'Email no válido' });

  const clean = (s,m)=>String(s).trim().slice(0,m);
  const _name = clean(name,100), _email = clean(email,150), _message = clean(message,5000);

  const subject = `Consulta web – ${_name}`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;color:#1f2937">
      <h2 style="margin:0 0 8px;color:#065f46">Nuevo mensaje desde la web</h2>
      <p><strong>Nombre:</strong> ${escapeHtml(_name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(_email)}</p>
      <p><strong>Mensaje:</strong></p>
      <pre style="white-space:pre-wrap;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px">${escapeHtml(_message)}</pre>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
      <small>Fecha: ${new Date().toLocaleString('es-ES')} · Origen: ${req.headers.origin || req.headers.referer || 'N/D'}</small>
    </div>`;

  try {
    const result = await resend.emails.send({
      from: 'Sanital <onboarding@resend.dev>',
      to: ['wandamarketingspecialist@gmail.com'],
      subject, html,
      text: `Nombre: ${_name}\nEmail: ${_email}\n\nMensaje:\n${_message}`,
      reply_to: _email, replyTo: _email
    });
    if (result?.error) return res.status(502).json({ error:`Resend: ${result.error?.message || String(result.error)}` });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
