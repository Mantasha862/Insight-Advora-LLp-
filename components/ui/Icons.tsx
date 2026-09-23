// 26px two-tone line icons (forest + gold) for the practice areas.
const paths: Record<string, React.ReactNode> = {
  strategy: (
    <>
      <circle cx="13" cy="13" r="9.5" stroke="currentColor" />
      <circle cx="13" cy="13" r="5" stroke="currentColor" />
      <path d="M13 13 L21 5 M18 5h3v3" className="stroke-gold" />
    </>
  ),
  operations: (
    <>
      <path d="M3 18h6l2-4 3 7 3-12 2 5h4" stroke="currentColor" />
      <path d="M3 23h20" className="stroke-gold" />
    </>
  ),
  growth: (
    <>
      <path d="M4 22V16M10 22V12M16 22V9M22 22V5" stroke="currentColor" />
      <path d="M3 13 L11 7 L15 10 L23 3 M19 3h4v4" className="stroke-gold" />
    </>
  ),
  transactions: (
    <>
      <circle cx="9" cy="13" r="6" stroke="currentColor" />
      <circle cx="17" cy="13" r="6" stroke="currentColor" />
      <path d="M13 8.5v9" className="stroke-gold" />
    </>
  ),
  ehs: (
    <>
      <path d="M13 3l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V6z" stroke="currentColor" />
      <path d="M9 13l3 3 5-6" className="stroke-gold" />
    </>
  ),
  esg: (
    <>
      <path d="M6 20C6 11 12 5 22 4c0 10-6 16-15 16" stroke="currentColor" />
      <path d="M4 23c4-6 8-9 13-12" className="stroke-gold" />
    </>
  ),
};

export function ServiceIcon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths[name] ?? paths.strategy}
    </svg>
  );
}

export function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.38-.03-3.16-1.93-3.16-1.93 0-2.22 1.5-2.22 3.06V21H9z" />
    </svg>
  );
}
