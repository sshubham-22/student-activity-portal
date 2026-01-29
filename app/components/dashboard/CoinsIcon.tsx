export default function CoinsIcon() {
    return (
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
      >
        <defs>
          <linearGradient id="coinGrad" x1="0" y1="0" x2="0" y2="64">
            <stop stopColor="#C4B5FD" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
  
        <ellipse cx="32" cy="16" rx="20" ry="8" fill="url(#coinGrad)" />
        <ellipse cx="32" cy="28" rx="20" ry="8" fill="url(#coinGrad)" />
        <ellipse cx="32" cy="40" rx="20" ry="8" fill="url(#coinGrad)" />
      </svg>
    )
  }
  