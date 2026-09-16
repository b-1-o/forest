import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Code2, Layers3, Mail, MousePointer2, Sparkles } from 'lucide-react'
import forestImage from '../assets/main wp.jpg'
import './styles.css'

const projects = [
  { n: '01', title: 'Digital interfaces', text: 'Responsive websites with clear hierarchy, precise motion and a visual language built around the brand.', tags: ['React', 'TypeScript', 'UI'] },
  { n: '02', title: 'Royal Touch', text: 'A dark, premium mobile-wash experience designed around trust, service and fast conversion.', tags: ['Web', 'UX', 'Business'] },
  { n: '03', title: 'Experiments', text: 'Small products, interaction studies and technical ideas built to understand how digital things actually work.', tags: ['Lab', 'Motion', 'Code'] },
]

const navItems = ['about', 'work', 'contact'] as const

function App() {
  const [intro, setIntro] = useState(true)
  const [entered, setEntered] = useState(false)
  const [active, setActive] = useState('home')
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [heroReady, setHeroReady] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 65, damping: 24, mass: 0.8 })
  const sy = useSpring(my, { stiffness: 65, damping: 24, mass: 0.8 })
  const forestX = useTransform(sx, [-0.5, 0.5], [-16, 16])
  const forestY = useTransform(sy, [-0.5, 0.5], [-9, 9])

  useEffect(() => {
    const move = (event: MouseEvent) => {
      const x = event.clientX / window.innerWidth - 0.5
      const y = event.clientY / window.innerHeight - 0.5
      mx.set(x)
      my.set(y)
      setMouse({ x: event.clientX, y: event.clientY })
    }

    const updateActive = () => {
      const sections = ['home', ...navItems]
      const current = sections.find((id) => {
        const element = document.getElementById(id)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= window.innerHeight * 0.35 && rect.bottom >= window.innerHeight * 0.35
      })
      if (current) setActive(current)
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('scroll', updateActive)
    }
  }, [mx, my])

  useEffect(() => {
    const introTimer = window.setTimeout(() => setIntro(false), 3100)
    const readyTimer = window.setTimeout(() => setHeroReady(true), 4050)
    return () => {
      window.clearTimeout(introTimer)
      window.clearTimeout(readyTimer)
    }
  }, [])

  const goTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const enter = () => {
    setEntered(true)
    window.setTimeout(() => goTo('about'), 750)
  }

  return (
    <div className="site" style={{ '--mouse-x': `${mouse.x}px`, '--mouse-y': `${mouse.y}px` } as CSSProperties}>
      <div className="aurora" aria-hidden="true" />

      <AnimatePresence>
        {intro && (
          <motion.div className="intro" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.025, filter: 'blur(8px)' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <div className="intro-mark" aria-hidden="true"><span /></div>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
              ERIK / DIGITAL DESIGN &amp; DEVELOPMENT
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 22, filter: 'blur(16px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ delay: 0.45, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}>
              Into the quiet.
            </motion.h1>
            <div className="loader" aria-hidden="true"><motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.45, ease: [0.16, 1, 0.3, 1] }} /></div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="nav">
        <button className="brand" onClick={() => goTo('home')} aria-label="Go to home"><span>ERIK</span><i>•</i><small>WEB / UI</small></button>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => <button key={item} className={active === item ? 'active' : ''} onClick={() => goTo(item)}>{item}</button>)}
        </nav>
        <a className="availability" href="https://www.fiverr.com/s/Q27bB5p" target="_blank" rel="noreferrer"><span /> available for select work <ArrowUpRight size={12} /></a>
      </header>

      <main>
        <section id="home" ref={heroRef} className="hero">
          <motion.div className="forest" style={{ x: forestX, y: forestY }} initial={{ scale: 1.13 }} animate={{ scale: 1 }} transition={{ duration: 4.25, ease: [0.2, 0.8, 0.2, 1] }}>
            <img src={forestImage} alt="Misty forest" fetchPriority="high" decoding="async" />
          </motion.div>
          <div className="depth depth-vignette" aria-hidden="true" />
          <div className="depth depth-light" aria-hidden="true" />
          <div className="mist mist-a" aria-hidden="true" />
          <div className="mist mist-b" aria-hidden="true" />
          <div className="hero-vignette" aria-hidden="true" />

          <div className="hero-content">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.25, duration: 0.8 }}>LOS ANGELES / 2026</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 48, filter: 'blur(13px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0)' }} transition={{ delay: 3.4, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}>
              I make small<br /><em>businesses</em> look<br />like they mean it.
            </motion.h2>
            <motion.p className="hero-sub" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.9, duration: 0.8 }}>
              Web development, interface design and motion —<br />built to feel as considered as the product itself.
            </motion.p>

            <AnimatePresence>
              {!entered && !intro && heroReady && (
                <motion.button className="fog-cta" onClick={enter} initial={{ opacity: 0, y: 52, scale: 0.94, filter: 'blur(18px)' }} animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0)' }} exit={{ opacity: 0, y: -20, scale: 0.96, filter: 'blur(14px)' }} transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -4 }} whileTap={{ scale: 0.985 }}>
                  <span className="cta-grid"><b>US BASED</b><b>FREELANCE</b><b>WEB</b><b>UI</b></span><span className="cta-arrow"><ArrowUpRight size={17} /></span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="scroll-hint" aria-hidden="true"><MousePointer2 size={13} /><span>SCROLL TO EXPLORE</span><div /></div>
          <div className="hero-coordinate" aria-hidden="true">34°09′N / 118°24′W</div>
        </section>

        <section id="about" className="section about">
          <div className="section-index">01 / ABOUT</div>
          <div className="about-grid">
            <div><p className="kicker">A quiet approach to loud ideas.</p><h3>Good digital work should<br /><span>feel inevitable.</span></h3></div>
            <motion.div className="glass-copy" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <p>Hi, I’m Erik. I’m a web developer based in the United States. I focus on clean interfaces, responsive layouts and sites that are easy to understand, fast to use, and ready to help a business grow.</p>
              <p>I like taking things apart, understanding how they work, then rebuilding the idea with better motion, structure and character.</p>
              <div className="mini-meta"><span><Layers3 size={15} /> systems</span><span><Code2 size={15} /> development</span><span><Sparkles size={15} /> motion</span></div>
            </motion.div>
          </div>
        </section>

        <section id="work" className="section work">
          <div className="section-index">02 / SELECTED WORK</div>
          <div className="work-head"><h3>Built with intent.<br /><span>Not decoration.</span></h3><p>Projects sit at the intersection of business, interface and atmosphere.</p></div>
          <div className="projects">
            {projects.map((project, index) => (
              <motion.article className="project" key={project.n} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-90px' }} transition={{ delay: index * 0.09, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>
                <div className="project-top"><span>{project.n}</span><ArrowUpRight size={19} /></div>
                <h4>{project.title}</h4><p>{project.text}</p>
                <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="manifesto">
          <div className="manifesto-orb" aria-hidden="true" />
          <motion.div className="manifesto-glass" initial={{ opacity: 0, y: 35, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: '-120px' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <span>THE PRINCIPLE</span><h3>Less noise.<br /><i>More signal.</i></h3><p>Every transition should have a reason. Every pixel should earn its place.</p>
          </motion.div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-index">03 / CONTACT</div>
          <div className="contact-wrap"><div><p className="kicker">Have something worth building?</p><h3>Let’s make it<br /><span>feel real.</span></h3></div>
            <a className="contact-card" href="https://www.fiverr.com/s/Q27bB5p" target="_blank" rel="noreferrer"><span><Mail size={19} /> Start a project</span><ArrowUpRight /></a>
          </div>
        </section>
      </main>

      <footer><span>© 2026 ERIK</span><span>BUILT IN THE QUIET</span><a href="https://www.fiverr.com/s/Q27bB5p" target="_blank" rel="noreferrer">FIVERR <ArrowUpRight size={13} /></a></footer>
    </div>
  )
}

export default App
