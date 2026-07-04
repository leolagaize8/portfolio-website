import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { AboutSection } from '@/components/about-section'
import { ProjectsSection } from '@/components/projects-section'
import { ReachOutSection } from '@/components/reach-out-section'
import { Footer } from '@/components/footer'
import { Background } from '@/components/background'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Background />
      <Nav />
<main>
        <Hero />
        <AboutSection />
        <ProjectsSection />
        <ReachOutSection />
      </main>
      <Footer />
    </div>
  )
}
