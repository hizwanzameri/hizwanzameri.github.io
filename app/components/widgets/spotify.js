'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SpotifyWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/spotify/top')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setData({ ok: false, error: 'fetch_error' });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="shiny-card w-full card-radius border-light">
        <div className="flex flex-col gap-2 items-start w-full">
          <span className="card-title-text gradient-text">On repeat</span>
          <span className="card-body-text">Loading…</span>
        </div>
      </div>
    );
  }

  if (!data?.ok) {
    return (
      <div className="shiny-card w-full card-radius border-light">
        <div className="flex flex-col gap-2 items-start w-full">
          <span className="card-title-text gradient-text">On repeat</span>
          <span className="card-body-text">
            Connect Spotify to show your top track. Visit{' '}
            <Link href="/api/spotify/callback" className="gradient-text underline">
              /api/spotify/callback
            </Link>{' '}
            once to get a refresh token, then add it to your env.
          </span>
        </div>
      </div>
    );
  }

  if (data.type === 'track' && data.track) {
    const { name, artists, albumImage, url } = data.track;
    const artistLine = Array.isArray(artists) ? artists.join(', ') : '';

    return (
      <div className="shiny-card w-full card-radius border-light">
        <div className="flex flex-col gap-2 items-start w-full">
          <span className="card-title-text gradient-text">Most played</span>
          <div className="flex flex-row gap-3 items-center w-full mt-1">
            {albumImage && (
              <img
                src={albumImage}
                alt=""
                width={64}
                height={64}
                className="rounded-md flex-shrink-0"
              />
            )}
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="card-body-text font-medium truncate">{name}</span>
              {artistLine && (
                <span className="text-sm text-white/70 truncate">{artistLine}</span>
              )}
              {url && (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm gradient-text mt-1"
                >
                  Open in Spotify
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.type === 'artist' && data.artist) {
    const { name, image, url } = data.artist;

    return (
      <div className="shiny-card w-full card-radius border-light">
        <div className="flex flex-col gap-2 items-start w-full">
          <span className="card-title-text gradient-text">Top artist</span>
          <div className="flex flex-row gap-3 items-center w-full mt-1">
            {image && (
              <img
                src={image}
                alt=""
                width={64}
                height={64}
                className="rounded-full flex-shrink-0"
              />
            )}
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="card-body-text font-medium">{name}</span>
              {url && (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm gradient-text mt-1"
                >
                  Open in Spotify
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shiny-card w-full card-radius border-light">
      <div className="flex flex-col gap-2 items-start w-full">
        <span className="card-title-text gradient-text">On repeat</span>
        <span className="card-body-text">No data right now.</span>
      </div>
    </div>
  );
}
