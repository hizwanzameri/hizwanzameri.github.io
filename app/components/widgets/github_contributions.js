'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function getLevel(count) {
  if (count === 0) return 'bg-[#7ef1e4]/5';
  if (count <= 2) return 'bg-[#7ef1e4]/20';
  if (count <= 4) return 'bg-[#7ef1e4]/70';
  if (count <= 6) return 'bg-[#7ef1e4]';
  return 'bg-[#7ef1e4]';
}

export default function GitHubContributionsWidget() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github/contributions')
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
          <span className="card-title-text gradient-text">GitHub contributions</span>
          <span className="card-body-text">Loading…</span>
        </div>
      </div>
    );
  }

  if (!data?.ok) {
    const err = data?.error;
    let message = 'Could not load contributions.';
    if (err === 'missing_username') {
      message = 'Set GITHUB_USERNAME in your environment to show contributions.';
    } else if (err === 'fetch_error') {
      message = 'Network or server error. Try again later.';
    } else if (err === 'user_not_found') {
      message = 'GitHub user not found. Check GITHUB_USERNAME is correct.';
    } else if (err === 'github_error') {
      message =
        'GitHub API error. If you see this often, add GITHUB_TOKEN to your .env for higher rate limits.';
    } else if (typeof err === 'string' && err.length > 0) {
      message = err;
    } else {
      message = 'Check GITHUB_USERNAME and GITHUB_TOKEN (optional) in .env.';
    }
    return (
      <div className="shiny-card w-full card-radius border-light">
        <div className="flex flex-col gap-2 items-start w-full">
          <span className="card-title-text gradient-text">GitHub contributions</span>
          <span className="card-body-text">{message}</span>
        </div>
      </div>
    );
  }

  const weeks = data.weeks || [];
  const username = data.username || '';
  const totalContributions = data.totalContributions ?? 0;

  const grid = Array(7)
    .fill(null)
    .map(() => Array(weeks.length).fill(null).map(() => ({ date: null, count: 0 })));

  weeks.forEach((week, col) => {
    (week.contributionDays || []).forEach((day) => {
      const d = new Date(day.date + 'T12:00:00Z');
      const row = d.getUTCDay();
      grid[row][col] = { date: day.date, count: day.contributionCount ?? 0 };
    });
  });

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Group columns by month (use first day of week), then one label per month centered over its block (GitHub-style)
  const cellW = 10;
  const gap = 2;
  const colWidth = cellW + gap;
  const monthBlocks = [];
  let blockStart = 0;
  let blockMonthKey = null;
  weeks.forEach((week, col) => {
    const days = week.contributionDays || [];
    const monthKey = days.length > 0 ? days[0].date.slice(0, 7) : null;
    if (monthKey !== blockMonthKey && blockMonthKey !== null) {
      monthBlocks.push({
        label: new Date(blockMonthKey + '-01T12:00:00Z').toLocaleDateString(undefined, {
          month: 'short',
        }),
        startCol: blockStart,
        endCol: col - 1,
      });
      blockStart = col;
    }
    if (monthKey !== null) blockMonthKey = monthKey;
  });
  if (blockMonthKey !== null) {
    monthBlocks.push({
      label: new Date(blockMonthKey + '-01T12:00:00Z').toLocaleDateString(undefined, {
        month: 'short',
      }),
      startCol: blockStart,
      endCol: weeks.length - 1,
    });
  }

  return (
    <div className="shiny-card w-full card-radius border-light">
      <div className="flex flex-col gap-3 items-start w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
          <span className="card-title-text gradient-text">GitHub contributions</span>
          {username && (
            <Link
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm gradient-text"
            >
              @{username}
            </Link>
          )}
        </div>
        <p className="card-body-text text-white/80">
          {totalContributions.toLocaleString()} contributions in the last year
        </p>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-0.5 items-start min-w-max">
            <div className="flex flex-col gap-0.5 justify-around text-[10px] text-white/50 pr-1 shrink-0">
              <span className="h-2.5 flex items-center" aria-hidden />
              {dayLabels.map((label, i) => (
                <span key={label} className="h-2.5 flex items-center">
                  {i % 2 === 1 ? label : ''}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex gap-0.5 mb-0.5 items-end">
                {monthBlocks.map((block, i) => (
                  <div
                    key={`${block.label}-${i}`}
                    className="h-2.5 flex items-center justify-center text-[10px] text-white/50 shrink-0"
                    style={{ width: (block.endCol - block.startCol + 1) * colWidth - gap }}
                  >
                    {block.label}
                  </div>
                ))}
              </div>
              {grid.map((row, rowIndex) => (
                <div key={rowIndex} className="flex gap-0.5">
                  {row.map((cell, colIndex) => {
                    const count = cell.count;
                    const dateLabel = cell.date
                      ? new Date(cell.date + 'T12:00:00Z').toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : '';
                    const contributionLabel =
                      count > 0
                        ? `${count} contribution${count !== 1 ? 's' : ''}`
                        : 'No contributions';
                    const title = dateLabel ? `${dateLabel}: ${contributionLabel}` : contributionLabel;
                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`w-2.5 h-2.5 rounded-sm shrink-0 ${getLevel(count)}`}
                        title={title}
                        aria-label={title}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-white/50">
          <span>Less</span>
          <div className="flex gap-0.5">
            {[0, 1, 4, 8].map((n) => (
              <div key={n} className={`w-2.5 h-2.5 rounded-sm ${getLevel(n)}`} aria-hidden />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
