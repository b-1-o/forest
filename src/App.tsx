import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Check, Code2, ExternalLink, Layers3, Sparkles } from 'lucide-react'
import forestImage from '../assets/main wp.jpg'
import './styles.css'

const navItems = ['about', 'services', 'stack', 'work', 'learning', 'contact'] as const

const services = [
  ['01', 'Web development', 'Fast, responsive websites built around the way a business actually works.'],
  ['02', 'UI / UX', 'Clear hierarchy, useful flows and interface details that make digital products easier to understand.'],
  ['03', 'Motion & interaction', 'Purposeful transitions, scroll effects and micro-interactions that add feeling without adding noise.'],
  ['04', 'Business websites', 'Focused landing pages and digital experiences that communicate value quickly and look credible.'],
]

const stack = [
  { label: 'FRONTEND', items: ['React', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Vite'] },
  { label: 'WORKFLOW', items: ['Git', 'GitHub', 'Figma', 'Linux', 'Responsive UI'] },
]

const learning = ['Three.js / WebGL', 'Assembly / Linux', 'Advanced animation', 'Systems & browsers']

const projects = [
  { n: '01', title: 'Business experiences', type: 'WEB / PRODUCT', text: 'Responsive websites shaped around real services, clear information and a smoother path from first impression to action.' },
  { n: '02', title: 'Digital interfaces', type: 'UI / DEVELOPMENT', text: 'Responsive interfaces with strong hierarchy, restrained motion and a visual system built around the product.' },
  { n: '03', title: 'Interactive systems', type: 'EXPERIMENTS / MOTION', text: 'Small experiments exploring interaction, animation, browsers, Linux and the space between design and technology.' },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  const [intro, setIntro] = useState(true)
  const [active, setActive] = useState('home')
  const worldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 3000)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    let frame = 0
    const target = worldRef.current
    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let smoothX = pointerX
    let smoothY = pointerY

    const update = () => {
      const y = window.scrollY
      const vh = window.innerHeight || 1
      target?.style.setProperty('--scroll', `${y}px`)
      target?.style.setProperty('--scroll-progress', `${Math.min(y / vh, 12)}`)
      smoothX += (pointerX - smoothX) * 0.055
      smoothY += (pointerY - smoothY) * 0.055
      target?.style.setProperty('--cursor-x', `${smoothX}px`)
      target?.style.setProperty('--cursor-y', `${smoothY}px`)
      frame = requestAnimationFrame(update)
    }

    const onMouse = (event: MouseEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      target?.style.setProperty('--mouse-x', `${event.clientX}px`)
      target?.style.setProperty('--mouse-y', `${event.clientY}px`)
    }

    update()
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const elements = ['home', ...navItems]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.15, 0.4] },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const goTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="site">
      <a className="skip" href="#about">Skip to content</a>

      <AnimatePresence>
        {intro && (
          <motion.div className="intro" exit={{ opacity: 0, scale: 1.025, filter: 'blur(14px)' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className="intro-mark" />
            <span>WEB / UI / DEVELOPMENT</span>
            <h1>Into the quiet.</h1>
            <div className="intro-loader"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }} /></div>
            <small>THE WORLD MOVES SLOWLY</small>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="world" ref={worldRef} aria-hidden="true">
        <div className="world-layer world-back"><img src={forestImage} alt="" /></div>
        <div className="world-layer world-mid"><img src={forestImage} alt="" /></div>
        <div className="world-layer world-near"><img src={forestImage} alt="" /></div>
        <div className="world-light" />
        <div className="world-fog world-fog-one" />
        <div className="world-fog world-fog-two" />
        <div className="world-vignette" />
        <div className="world-grain" />
        <div className="world-cursor" />
      </div>

      <header className="nav">
        <button className="brand" onClick={() => goTo('home')} aria-label="Back to top"><span className="brand-mark">+</span><small>WEB / UI</small></button>
        <nav aria-label="Primary navigation">{navItems.map((item) => <button key={item} className={active === item ? 'active' : ''} onClick={() => goTo(item)}>{item}</button>)}</nav>
        <a className="nav-cta" href="https://www.fiverr.com/s/Q27bB5p" target="_blank" rel="noreferrer">START <ArrowUpRight size={13} /></a>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-glow" />
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: intro ? 0 : 1, y: intro ? 20 : 0 }} transition={{ duration: 0.8 }}>WEB DEVELOPER / UI / DIGITAL</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 60, filter: 'blur(18px)' }} animate={{ opacity: intro ? 0 : 1, y: intro ? 60 : 0, filter: intro ? 'blur(18px)' : 'blur(0px)' }} transition={{ delay: 0.15, duration: 1.15, ease: [0.16, 1, 0.3, 1] }}>I make small<br /><em>businesses</em> look<br />like they mean it.</motion.h2>
            <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: intro ? 0 : 1 }} transition={{ delay: 0.55, duration: 0.8 }}>Clean interfaces. Responsive websites. Thoughtful motion.<br />Built to be useful, fast and unmistakably yours.</motion.p>
            <motion.button className="enter-button" initial={{ opacity: 0, y: 25 }} animate={{ opacity: intro ? 0 : 1, y: intro ? 25 : 0 }} transition={{ delay: 0.8, duration: 0.8 }} onClick={() => goTo('about')}><span>ENTER THE WORK</span><ArrowDown size={15} /></motion.button>
          </div>
          <div className="hero-bottom"><span>THE DIGITAL FOREST / 01</span><span><i /> SCROLL TO EXPLORE</span></div>
        </section>

        <section id="about" className="immersive-section about-section">
          <div className="section-number">01 / ABOUT</div>
          <Reveal className="glass-panel about-panel">
            <div className="panel-top"><span>A QUIET APPROACH TO LOUD IDEAS</span><span>01 — 06</span></div>
            <div className="about-layout"><h3>Good digital work should <em>feel inevitable.</em></h3><div className="about-text"><p>I’m a web developer focused on clean interfaces, responsive layouts and websites that are easy to understand, fast to use and ready to help a business grow.</p><p>I like taking things apart, understanding how they work, then rebuilding the idea with better structure, motion and character.</p></div></div>
            <div className="panel-tags"><span><Layers3 size={14} /> SYSTEMS</span><span><Code2 size={14} /> DEVELOPMENT</span><span><Sparkles size={14} /> MOTION</span></div>
          </Reveal>
        </section>

        <section id="services" className="immersive-section services-section">
          <div className="section-number">02 / SERVICES</div>
          <Reveal><div className="section-intro"><span>WHAT I BUILD</span><h3>Useful things, <em>beautifully built.</em></h3></div></Reveal>
          <div className="service-list">{services.map(([number, title, text], index) => <Reveal key={number} delay={index * 0.07} className="glass-panel service-row"><span className="row-number">{number}</span><div><h4>{title}</h4><p>{text}</p></div><ArrowUpRight className="row-arrow" size={21} /></Reveal>)}</div>
        </section>

        <section id="stack" className="immersive-section stack-section">
          <div className="section-number">03 / STACK</div>
          <Reveal className="glass-panel stack-panel">
            <div className="stack-heading"><span>THE TOOLS BEHIND THE WORK</span><h3>Built with <em>code.</em></h3></div>
            <div className="stack-columns">{stack.map((column) => <div className="stack-column" key={column.label}><small>{column.label}</small>{column.items.map((item) => <div className="tech" key={item}><span>{item}</span><Check size={14} /></div>)}</div>)}<div className="stack-column learning-column"><small>CURRENTLY LEARNING</small>{learning.map((item) => <div className="tech learning-tech" key={item}><span>{item}</span><i>LEARNING</i></div>)}</div></div>
            <div className="stack-footer"><span><i /> ACTIVE BUILDING</span><b>BUILD / LEARN / REPEAT</b></div>
          </Reveal>
        </section>

        <section id="work" className="immersive-section work-section">
          <div className="section-number">04 / SELECTED WORK</div>
          <Reveal><div className="section-intro"><span>PROJECTS</span><h3>Ideas turned into <em>interfaces.</em></h3></div></Reveal>
          <div className="project-list">{projects.map((project, index) => <Reveal key={project.n} delay={index * 0.08} className="glass-panel project-row"><span className="row-number">{project.n}</span><div className="project-main"><small>{project.type}</small><h4>{project.title}</h4><p>{project.text}</p></div><ArrowUpRight className="row-arrow" size={24} /></Reveal>)}</div>
        </section>

        <section id="learning" className="immersive-section learning-section">
          <div className="section-number">05 / LEARNING</div>
          <Reveal className="learning-layout"><div className="glass-panel learning-copy"><span>CURRENTLY EXPLORING</span><h3>Still learning.<br /><em>Always building.</em></h3><p>Curiosity is part of the work. I’m exploring lower-level systems, graphics and advanced frontend techniques to understand more of what happens underneath the interface.</p></div><div className="glass-panel learning-list">{learning.map((item, index) => <div key={item}><span>0{index + 1}</span><b>{item}</b><ArrowUpRight size={16} /></div>)}</div></Reveal>
        </section>

        <section className="principle-section"><Reveal className="principle"><span>THE PRINCIPLE</span><h3>Less noise.<br /><em>More signal.</em></h3><p>Every transition has a reason. Every pixel earns its place.</p></Reveal></section>

        <section id="contact" className="immersive-section contact-section">
          <div className="section-number">06 / CONTACT</div>
          <Reveal className="glass-panel contact-panel"><span>HAVE SOMETHING WORTH BUILDING?</span><h3>Let’s make it <em>feel real.</em></h3><div className="contact-actions"><a className="primary-link" href="https://www.fiverr.com/s/Q27bB5p" target="_blank" rel="noreferrer">START A PROJECT <ExternalLink size={16} /></a></div></Reveal>
        </section>
      </main>

      <footer><span>WEB / UI / DEVELOPMENT</span><span>BUILT IN THE QUIET</span><a href="https://github.com/b-1-o/forest" target="_blank" rel="noreferrer">SOURCE</a></footer>
    </div>
  )
}

export default App
