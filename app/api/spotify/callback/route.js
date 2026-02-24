const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

function getRedirectUri(request) {
  const host = request.headers.get('host') ?? '';
  const isLocal = host.includes('localhost') || host.startsWith('127.0.0.1');
  const protocol = isLocal ? 'http' : 'https';
  return `${protocol}://${host}/api/spotify/callback`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response(
      '<html><body><p>Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in env.</p></body></html>',
      {
        status: 500,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  if (error) {
    return new Response(
      `<html><body><p>Spotify auth error: ${error}</p><p><a href="/">Back home</a></p></body></html>`,
      {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  if (!code) {
    const redirectUri = getRedirectUri(request);
    const scope = 'user-top-read';
    const authUrl = new URL(SPOTIFY_AUTH_URL);
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', scope);
    return Response.redirect(authUrl.toString(), 302);
  }

  const redirectUri = getRedirectUri(request);
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const tokenRes = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return new Response(
      `<html><body><p>Token exchange failed: ${tokenRes.status}</p><pre>${text}</pre><p><a href="/">Back home</a></p></body></html>`,
      {
        status: 502,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  const tokenData = await tokenRes.json();
  const refreshToken = tokenData.refresh_token;

  if (!refreshToken) {
    return new Response(
      '<html><body><p>No refresh_token in response.</p><p><a href="/">Back home</a></p></body></html>',
      {
        status: 502,
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Spotify refresh token</title>
  <style>
    body { font-family: system-ui; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    code { background: #eee; padding: 2px 6px; border-radius: 4px; word-break: break-all; }
    .token { background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0; word-break: break-all; }
    a { color: #1db954; }
  </style>
</head>
<body>
  <h1>Spotify refresh token</h1>
  <p>Copy the value below and add it to your Vercel (or server) env as <code>SPOTIFY_REFRESH_TOKEN</code>.</p>
  <div class="token">${refreshToken}</div>
  <p><a href="/">Back home</a></p>
</body>
</html>
`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
