import Link from 'next/link'

const EMAIL = 'leo.lagaize@hexa.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/leolagaize/'
const CV_URL = '/TODO-cv.pdf'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span className="font-mono text-[11px] text-muted-foreground/60">leo · 2025</span>
        <div className="flex items-center gap-1">
          {[
            { label: 'Email', href: `mailto:${EMAIL}` },
            { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
            { label: 'CV', href: CV_URL, external: true },
          ].map(({ label, href, external }) => (
            <Link
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex h-8 items-center rounded-md px-3 text-xs font-medium text-muted-foreground/70 transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
