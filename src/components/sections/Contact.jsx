// api/contact.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Parseo del body para JSON y x-www-form-urlencoded
async function parseBody(req) {
  try {
    const ct = req.headers['content-type'] || '';
    if (ct.includes('application/json')) {
      return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    }
    if (ct.includes('application/x-www-form-urlencoded')) {
      const text = typeof req.body === 'string' ? req.body : '';
      const params = new URLSearchParams(text);
      return Object.fromEntries(params);
    }
    return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch {
    return {};
  }
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v ?? '');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  // Soporta preflight si hiciera falta
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST,OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST,OPTIONS');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = await parseBody(req);
  const { name = '', email = '', message = '', honeypot = '' } = body || {};

  // Honeypot anti-spam (campo oculto "company" en el form)
  if (honeypot) return res.status(200).json({ ok: true });

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ error: 'Email no válido' });
  }

  // Normaliza y limita longitudes
  const clean = (s, max) => String(s).trim().slice(0, max);
  const _name = clean(name, 100);
  const _email = clean(email, 150);
  const _message = clean(message, 5000);

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
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      // Usa este remitente de prueba; cuando verifiques dominio, cámbialo a tu remitente propio
      from: 'Sanital <onboarding@resend.dev>',
      to: ['wandamarketingspecialist@gmail.com'],
      reply_to: _email, // para que puedas responder directo al paciente
      subject,
      text: `Nombre: ${_name}\nEmail: ${_email}\n\nMensaje:\n${_message}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'No se pudo enviar el email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
}

