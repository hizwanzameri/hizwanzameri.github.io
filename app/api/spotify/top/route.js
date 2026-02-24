const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!refreshToken || !clientId || !clientSecret) {
    return null;
  }

  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return Response.json(
      { ok: false, error: 'not_connected' },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const tracksRes = await fetch(
      `${SPOTIFY_API_BASE}/me/top/tracks?limit=1&time_range=short_term`,
      { headers }
    );

    if (tracksRes.ok) {
      const tracksData = await tracksRes.json();
      const items = tracksData?.items ?? [];

      if (items.length > 0) {
        const track = items[0];
        const trackPayload = {
          ok: true,
          type: 'track',
          track: {
            name: track.name,
            artists: track.artists?.map((a) => a.name) ?? [],
            albumImage: track.album?.images?.[0]?.url ?? null,
            url: track.external_urls?.spotify ?? null,
          },
        };
        return Response.json(trackPayload, {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          },
        });
      }
    }
  } catch {
    // fall through to top artist
  }

  try {
    const artistsRes = await fetch(
      `${SPOTIFY_API_BASE}/me/top/artists?limit=1&time_range=short_term`,
      { headers }
    );

    if (artistsRes.ok) {
      const artistsData = await artistsRes.json();
      const items = artistsData?.items ?? [];

      if (items.length > 0) {
        const artist = items[0];
        const artistPayload = {
          ok: true,
          type: 'artist',
          artist: {
            name: artist.name,
            image: artist.images?.[0]?.url ?? null,
            url: artist.external_urls?.spotify ?? null,
          },
        };
        return Response.json(artistPayload, {
          headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          },
        });
      }
    }
  } catch {
    // fall through
  }

  return Response.json(
    { ok: false, error: 'no_data' },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    }
  );
}
