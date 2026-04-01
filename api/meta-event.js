const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const META_API_URL = `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`;

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { eventName = 'PageView', eventSourceUrl, userData = {} } = req.body;

  const clientIp =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    '';

  const clientUserAgent = req.headers['user-agent'] || '';

  const userDataPayload = {
    client_ip_address: clientIp,
    client_user_agent: clientUserAgent,
    ...(userData.email && { em: [userData.email] }),
    ...(userData.phone && { ph: [userData.phone] }),
    ...(userData.firstName && { fn: [userData.firstName] }),
    ...(userData.lastName && { ln: [userData.lastName] }),
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
    const response = await fetch(`${META_API_URL}?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Meta API error:', data);
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, meta: data });
  } catch (err) {
    console.error('Error sending event to Meta:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
