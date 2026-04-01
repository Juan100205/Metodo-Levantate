import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;
const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_API_VERSION = 'v21.0';
const META_API_URL = `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events`;

app.use(cors());
app.use(express.json());

// POST /api/meta/event
// Body: { eventName, eventSourceUrl, userData? }
// userData puede tener: email, phone, firstName, lastName, city, state, zip, country
app.post('/api/meta/event', async (req, res) => {
  const { eventName = 'PageView', eventSourceUrl, userData = {} } = req.body;

  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.socket.remoteAddress;

  const clientUserAgent = req.headers['user-agent'] || '';

  // Construir user_data — solo campos presentes
  const userDataPayload = {
    client_ip_address: clientIp,
    client_user_agent: clientUserAgent,
    ...(userData.email && { em: [userData.email] }),
    ...(userData.phone && { ph: [userData.phone] }),
    ...(userData.firstName && { fn: [userData.firstName] }),
    ...(userData.lastName && { ln: [userData.lastName] }),
    ...(userData.city && { ct: [userData.city] }),
    ...(userData.state && { st: [userData.state] }),
    ...(userData.zip && { zp: [userData.zip] }),
    ...(userData.country && { country: [userData.country] }),
    ...(userData.fbc && { fbc: userData.fbc }),
    ...(userData.fbp && { fbp: userData.fbp }),
  };

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: eventSourceUrl || '',
        user_data: userDataPayload,
      },
    ],
  };

  try {
    const response = await fetch(
      `${META_API_URL}?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Meta API error:', data);
      return res.status(response.status).json({ error: data });
    }

    return res.json({ success: true, meta: data });
  } catch (err) {
    console.error('Error sending event to Meta:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Levantate server running on http://localhost:${PORT}`);
});
