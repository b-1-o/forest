import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Code2, Layers3, Mail, Sparkles } from 'lucide-react'
import forestImage from '../assets/main wp.jpg'
import './styles.css'

const navItems = ['about', 'services', 'stack', 'work', 'learning', 'contact'] as const

const services = [
  ['01', 'Web development', 'Fast, responsive websites built around the way a business actually works.'],
  ['02', 'UI / UX', 'Clear interfaces, visual hierarchy and interaction details that make products easier to use.'],
  ['03', 'Motion & interaction', 'Purposeful transitions, scroll effects and micro-interactions without unnecessary weight.'],
  ['04', 'Business websites', 'Focused landing pages and digital experiences designed to communicate value quickly.'],
]

const stack = [
  { group: 'FRONTEND', items: ['React', 'TypeScript', 'JavaScript', 'HTML / CSS', 'Vite'] },
  { group: 'TOOLS', items: ['Git', 'GitHub', 'Linux', 'Figma'] },
  { group: 'CURRENTLY LEARNING', items: ['Three.js', 'WebGL', 'ASM', 'Advanced animation'] },
]

const projects = [
  { n: '01', title: 'Royal Touch', type: 'Business / Web', text: 'A premium mobile automotive service experience built around trust, clarity and conversion.' },
  { n: '02', title: 'Digital interfaces', type: 'UI / Development', text: 'Responsive interfaces with strong hierarchy, restrained motion and a visual system built around the product.' },
  { n: '03', title: 'Experiments', type: 'Lab / Interaction', text: 'Small technical experiments exploring browsers, interfaces, animation, Linux and the way digital systems work.' },
]

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 55, filter: 'blur(10px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  )
}

function App() {
  const [intro, setIntro] = useState(true)
  const [active, setActive] = useState('home')
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [scrollY, setScrollY] = useState(0)
  const scrollRef = useRef(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 25, mass: 0.9 })
  const sy = useSpring(my, { stiffness: 55, damping: 25, mass: 0.9 })
  const forestX = useTransform(sx, [-0.5, 0.5], [-18, 18])
  const forestY = useTransform(sy, [-0.5, 0.5], [-10, 10])
  const forestScroll = useTransform(() => -Math.min(scrollRef.current * 0.12, 850))
  const midScroll = useTransform(() => -Math.min(scrollRef.current * 0.24, 1550))
  const fogScroll = useTransform(() => -Math.min(scrollRef.current * 0.42, 2600))

  useEffect(() => {
    const timer = window.setTimeout(() => setIntro(false), 2700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    let raf = 0
    const move = (event: MouseEvent) => {
      mx.set(event.clientX / window.innerWidth - 0.5)
      my.set(event.clientY / window.innerHeight - 0.5)
      setMouse({ x: event.clientX, y: event.clientY })
    }
    const scroll = () => {
      scrollRef.current = window.scrollY
      if (!raf) raf = requestAnimationFrame(() => { setScrollY(scrollRef.current); raf = 0 })
      const sections = ['home', ...navItems]
      const current = sections.find((id) => {
        const element = document.getElementById(id)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= window.innerHeight * 0.32 && rect.bottom >= window.innerHeight * 0.32
      })
      if (current) setActive(current)
    }
    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('scroll', scroll, { passive: true })
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('scroll', scroll); cancelAnimationFrame(raf) }
  }, [mx, my])

  const goTo = (id: string) => {
    setActive(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="site" style={{ '--mouse-x': `${mouse.x}px`, '--mouse-y': `${mouse.y}px` } as CSSProperties}>
      <a className="skip" href="#about">Skip to content</a>
      <div className="intro" data-hidden={!intro} aria-hidden={!intro}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="intro-inner">
          <span className="intro-overline">DIGITAL / WEB / UI</span>
          <h1>Into the quiet.</h1>
          <div className="intro-progress"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }} /></div>
        </motion.div>
      </div>

      <div className="world" aria-hidden="true">
        <motion.div className="world-image world-back" style={{ x: forestX, y: forestY, translateY: forestScroll }}><img src={forestImage} alt="" /></motion.div>
        <motion.div className="world-image world-mid" style={{ x: useTransform(sx, [-0.5, 0.5], [-30, 30]), y: midScroll }}><img src={forestImage} alt="" /></motion.div>
        <div className="world-atmosphere" />
        <motion.div className="world-fog" style={{ y: fogScroll }} />
        <div className="world-vignette" />
        <div className="world-cursor" style={{ left: mouse.x, top: mouse.y }} />
      </div>

      <header className={`nav ${scrollY > 80 ? 'nav-scrolled' : ''}`}>
        <button className="brand" onClick={() => goTo('home')} aria-label="Go to top"><span>●</span><small>WEB / UI</small></button>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => <button key={item} className={active === item ? 'active' : ''} onClick={() => goTo(item)}>{item}</button>)}
        </nav>
        <a className="nav-cta" href="https://www.fiverr.com/s/Q27bB5p" target="_blank" rel="noreferrer">AVAILABLE <ArrowUpRight size={13} /></a>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-spacer" />
          <div className="hero-copy">
            <motion.p className="eyebrow" initial={{ opacity: 0, y: 25 }} animate={{ opacity: intro ? 0 : 1, y: intro ? 25 : 0 }} transition={{ delay: 0.2, duration: 0.8 }}>WEB DEVELOPER / UI / DIGITAL</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 70, filter: 'blur(18px)' }} animate={{ opacity: intro ? 0 : 1, y: intro ? 70 : 0, filter: intro ? 'blur(18px)' : 'blur(0px)' }} transition={{ delay: 0.38, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>I make small<br /><em>businesses</em> look<br />like they mean it.</motion.h2>
            <motion.p className="hero-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: intro ? 0 : 1, y: intro ? 20 : 0 }} transition={{ delay: 0.72, duration: 0.8 }}>Clean interfaces. Responsive websites. Thoughtful motion.<br />Built to be useful, fast and unmistakably yours.</motion.p>
            <motion.button className="enter-scroll" initial={{ opacity: 0 }} animate={{ opacity: intro ? 0 : 1 }} transition={{ delay: 1.05, duration: 0.8 }} onClick={() => goTo('about')}><span>ENTER THE WORK</span><ArrowDown size={15} /></motion.button>
          </div>
          <div className="hero-meta"><span>SCROLL</span><i /><span>THE WORLD MOVES SLOWLY</span></div>
        </section>

        <section id="about" className="immersive-section about-section">
          <div className="section-number">01 / ABOUT</div>
          <Reveal className="glass-panel about-panel">
            <div className="panel-label">A QUIET APPROACH TO LOUD IDEAS</div>
            <div className="about-layout"><h3>Good digital work should <em>feel inevitable.</em></h3><div className="about-text"><p>I'm a web developer focused on clean interfaces, responsive layouts and websites that are easy to understand, fast to use and ready to help a business grow.</p><p>I like taking things apart, understanding how they work, then rebuilding the idea with better structure, motion and character.</p></div></div>
            <div className="panel-footer"><span>01 — 04</span><span>INTERFACE / SYSTEM / MOTION</span></div>
          </Reveal>
        </section>

        <section id="services" className="immersive-section services-section">
          <div className="section-number">02 / SERVICES</div>
          <Reveal><div className="section-intro"><span>WHAT I BUILD</span><h3>Useful things, <em>beautifully built.</em></h3></div></Reveal>
          <div className="service-list">
            {services.map(([number, title, text], index) => <Reveal key={number} delay={index * 0.06} className="glass-panel service-row"><span className="service-number">{number}</span><div><h4>{title}</h4><p>{text}</p></div><ArrowUpRight className="service-arrow" size={22} /></Reveal>)}
          </div>
        </section>

        <section id="stack" className="immersive-section stack-section">
          <div className="section-number">03 / STACK</div>
          <Reveal className="glass-panel stack-panel">
            <div className="stack-heading"><span>THE TOOLS BEHIND THE WORK</span><h3>Built with <em>code.</em></h3></div>
            <div className="stack-grid">{stack.map((column) => <div className="stack-column" key={column.group}><small>{column.group}</small>{column.items.map((item) => <div className="tech" key={item}><span>{item}</span><i /></div>)}</div>)}</div>
            <div className="stack-status"><span><i /> ACTIVE</span><b>BUILD / LEARN / REPEAT</b></div>
          </Reveal>
        </section>

        <section id="work" className="immersive-section work-section">
          <div className="section-number">04 / SELECTED WORK</div>
          <Reveal><div className="section-intro"><span>PROJECTS</span><h3>Ideas turned into <em>interfaces.</em></h3></div></Reveal>
          <div className="project-list">{projects.map((project, index) => <Reveal key={project.n} delay={index * 0.08} className="glass-panel project-row"><div className="project-index">{project.n}</div><div className="project-main"><small>{project.type}</small><h4>{project.title}</h4><p>{project.text}</p></div><ArrowUpRight className="project-arrow" size={24} /></Reveal>)}</div>
        </section>

        <section id="learning" className="immersive-section learning-section">
          <div className="section-number">05 / LEARNING</div>
          <Reveal className="learning-grid"><div className="glass-panel learning-copy"><span>CURRENTLY EXPLORING</span><h3>Still learning.<br /><em>Always building.</em></h3><p>Curiosity is part of the work. I'm exploring lower-level systems, graphics and advanced frontend techniques to understand more of what happens underneath the interface.</p></div><div className="glass-panel learning-list">{['Three.js / WebGL', 'Assembly / Linux', 'Advanced animation', 'Systems & browsers'].map((item, i) => <div key={item}><span>0{i + 1}</span><b>{item}</b><i /></div>)}</div></Reveal>
        </section>

        <section className="immersive-section principle-section"><Reveal className="principle"><span>THE PRINCIPLE</span><h3>Less noise.<br /><em>More signal.</em></h3><p>Every transition has a reason. Every pixel earns its place.</p></Reveal></section>

        <section id="contact" className="immersive-section contact-section">
          <div className="section-number">06 / CONTACT</div>
          <Reveal className="glass-panel contact-panel"><span>HAVE SOMETHING WORTH BUILDING?</span><h3>Let's make it <em>feel real.</em></h3><a href="https://www.fiverr.com/s/Q27bB5p" target="_blank" rel="noreferrer">START A PROJECT <ArrowUpRight size={18} /></a></Reveal>
        </section>
      </main>

      <footer><span>WEB / UI / DEVELOPMENT</span><span>BUILT IN THE QUIET</span><a href="https://www.fiverr.com/s/Q27bB5p" target="_blank" rel="noreferrer">FIVERR <ArrowUpRight size={13} /></a></footer>
    </div>
  )
}

export default App
