import Link from 'next/link'

const EMAIL = 'leo.lagaize@hexa.com'
const LINKEDIN_URL = 'https://www.linkedin.com/in/leolagaize/'

const sectionLinkClass =
  'inline-flex h-8 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'

const externalLinkClass =
  'inline-flex h-8 items-center rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground'

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="font-mono text-[13px] font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors">
          Leo Lagaize
        </Link>

        {/* Section links + external links */}
        <div className="flex items-center gap-0.5">
          <Link href="#about" className={sectionLinkClass}>About</Link>
          <Link href="#projects" className={sectionLinkClass}>Projects</Link>

          <div className="mx-2 h-4 w-px bg-border" />

          <Link href={`mailto:${EMAIL}`} className={externalLinkClass}>Email</Link>
          <Link
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={externalLinkClass}
          >
            LinkedIn
          </Link>
        </div>

      </div>
    </header>
  )
}
