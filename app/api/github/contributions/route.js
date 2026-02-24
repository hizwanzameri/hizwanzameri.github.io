const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

const CONTRIBUTIONS_QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

function getDateRange() {
  const to = new Date();
  const from = new Date(to);
  from.setDate(from.getDate() - 371);
  return {
    from: from.toISOString(),
    to: to.toISOString(),
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username') || process.env.GITHUB_USERNAME;

  if (!username) {
    return Response.json(
      { ok: false, error: 'missing_username' },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60' } }
    );
  }

  const { from, to } = getDateRange();
  const headers = {
    'Content-Type': 'application/json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(GITHUB_GRAPHQL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login: username, from, to },
    }),
  });

  if (!res.ok) {
    let errorMessage = 'github_error';
    try {
      const errBody = await res.json();
      if (errBody?.message) errorMessage = errBody.message;
    } catch (_) {}
    return Response.json(
      { ok: false, error: errorMessage },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60' } }
    );
  }

  const json = await res.json();
  if (json.errors?.length) {
    const msg = json.errors[0]?.message || 'graphql_error';
    return Response.json(
      { ok: false, error: msg },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60' } }
    );
  }

  const user = json.data?.user;
  if (!user) {
    return Response.json(
      { ok: false, error: 'user_not_found' },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60' } }
    );
  }

  const calendar = user.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    return Response.json(
      { ok: false, error: 'no_calendar' },
      { status: 200, headers: { 'Cache-Control': 'public, s-maxage=60' } }
    );
  }

  return Response.json(
    {
      ok: true,
      username,
      totalContributions: calendar.totalContributions ?? 0,
      weeks: calendar.weeks ?? [],
    },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
