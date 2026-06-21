export function HexaScaleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer hexagon */}
      <polygon
        points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner hexagon */}
      <polygon
        points="20,11 28,15.5 28,24.5 20,29 12,24.5 12,15.5"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
        opacity="0.35"
      />
      {/* Center dot */}
      <circle cx="20" cy="20" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

export function NewfundLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Diamond */}
      <path
        d="M20 3L37 20L20 37L3 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Upward arrow */}
      <path
        d="M20 28V14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 19L20 13L25 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
