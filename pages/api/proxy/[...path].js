import axios from 'axios';

const BASE = process.env.SANKA_BASE || 'https://www.sankavollerei.com';

export default async function handler(req, res) {
  const { path = [] } = req.query;
  const joined = Array.isArray(path) ? path.join('/') : path;

  const query = Object.entries(req.query || {})
    .filter(([k]) => k !== 'path')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

  const target = `${BASE}/${joined}${query ? `?${query}` : ''}`;

  try {
    const response = await axios({
      method: req.method,
      url: target,
      headers: {
        'User-Agent': req.headers['user-agent'] || 'komikku-proxy',
        Accept: 'application/json, text/plain, */*',
      },
      data: req.body || undefined,
      timeout: 15000,
    });

    res.status(response.status).setHeader('content-type', response.headers['content-type'] || 'application/json');
    res.send(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const message = err.response?.data || err.message;
    res.status(status).json({ error: 'Proxy failed', detail: message });
  }
}
