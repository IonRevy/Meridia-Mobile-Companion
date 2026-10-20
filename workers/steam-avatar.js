const DEFAULT_ALLOWED_ORIGINS = [
  'https://ionrevy.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

function allowedOrigins(env) {
  return (env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS.join(','))
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

function corsHeaders(origin, env) {
  const headers = new Headers({
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  });
  if (origin && allowedOrigins(env).includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
  }
  return headers;
}

function jsonResponse(data, status, headers) {
  const responseHeaders = new Headers(headers);
  responseHeaders.set('Content-Type', 'application/json; charset=utf-8');
  responseHeaders.set('X-Content-Type-Options', 'nosniff');
  return new Response(JSON.stringify(data), { status, headers: responseHeaders });
}

function parseSteamIdentity(rawIdentity) {
  const identity = rawIdentity.trim();
  if (/^\d{17}$/.test(identity)) return { steamId: identity };

  let vanity = identity;
  if (/^(https?:\/\/)?(www\.)?steamcommunity\.com\//i.test(identity)) {
    try {
      const url = new URL(identity.startsWith('http') ? identity : `https://${identity}`);
      if (!['steamcommunity.com', 'www.steamcommunity.com'].includes(url.hostname.toLowerCase())) return null;
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts[0] === 'profiles' && /^\d{17}$/.test(parts[1] || '')) return { steamId: parts[1] };
      if (parts[0] !== 'id' || !parts[1]) return null;
      vanity = parts[1];
    } catch {
      return null;
    }
  }

  if (!/^[a-zA-Z0-9_-]{2,64}$/.test(vanity)) return null;
  return { vanity };
}

async function steamApi(path, params, apiKey) {
  const url = new URL(`https://api.steampowered.com/ISteamUser/${path}`);
  url.searchParams.set('key', apiKey);
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, value);
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Steam profile service is temporarily unavailable.');
  return response.json();
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const headers = corsHeaders(origin, env);

    if (origin && !allowedOrigins(env).includes(origin)) {
      return jsonResponse({ error: 'This site is not allowed to use the Steam avatar service.' }, 403, headers);
    }
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'GET') return jsonResponse({ error: 'Use a GET request.' }, 405, headers);
    if (!env.STEAM_API_KEY) return jsonResponse({ error: 'Steam avatar lookup is not configured yet.' }, 503, headers);

    const identity = parseSteamIdentity(new URL(request.url).searchParams.get('username') || '');
    if (!identity) return jsonResponse({ error: 'Enter a valid public Steam profile name or profile URL.' }, 400, headers);

    try {
      let steamId = identity.steamId;
      if (!steamId) {
        const resolved = await steamApi('ResolveVanityURL/v1/', { vanityurl: identity.vanity }, env.STEAM_API_KEY);
        const match = resolved.response?.steamid;
        if (resolved.response?.success !== 1 || !/^\d{17}$/.test(match || '')) {
          return jsonResponse({ error: 'Steam could not find that public profile.' }, 404, headers);
        }
        steamId = match;
      }

      const result = await steamApi('GetPlayerSummaries/v2/', { steamids: steamId }, env.STEAM_API_KEY);
      const profile = result.response?.players?.[0];
      const avatarUrl = profile?.avatarfull || profile?.avatarmedium || profile?.avatar;
      if (!avatarUrl || !avatarUrl.startsWith('https://')) {
        return jsonResponse({ error: 'No public Steam profile picture was found.' }, 404, headers);
      }

      headers.set('Cache-Control', 'public, max-age=300, s-maxage=900');
      return jsonResponse({ avatarUrl }, 200, headers);
    } catch {
      return jsonResponse({ error: 'Steam profile lookup failed. Try again later.' }, 502, headers);
    }
  },
};
