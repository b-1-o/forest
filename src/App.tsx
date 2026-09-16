import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Code2, Github, Layers3, Mail, MousePointer2, Sparkles } from 'lucide-react'
import './styles.css'

const projects = [
  { n:'01', title:'Digital interfaces', text:'Responsive websites with clear hierarchy, precise motion and a visual language built around the brand.', tags:['React','TypeScript','UI'] },
  { n:'02', title:'Royal Touch', text:'A dark, premium mobile-wash experience designed around trust, service and fast conversion.', tags:['Web','UX','Business'] },
  { n:'03', title:'Experiments', text:'Small products, interaction studies and technical ideas built to understand how digital things actually work.', tags:['Lab','Motion','Code'] },
]

function App(){
  const [intro, setIntro] = useState(true)
  const [entered, setEntered] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mouse, setMouse] = useState({x:.5,y:.5})
  const heroRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0); const my = useMotionValue(0)
  const sx = useSpring(mx,{stiffness:70,damping:20}); const sy = useSpring(my,{stiffness:70,damping:20})
  const forestX = useTransform(sx,[-.5,.5],[-18,18]); const forestY = useTransform(sy,[-.5,.5],[-10,10])

  useEffect(()=>{
    const move=(e:MouseEvent)=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;mx.set(x);my.set(y);setMouse({x:e.clientX/innerWidth,y:e.clientY/innerHeight})}
    const scroll=()=>setScrolled(scrollY>70)
    addEventListener('mousemove',move); addEventListener('scroll',scroll,{passive:true}); return()=>{removeEventListener('mousemove',move);removeEventListener('scroll',scroll)}
  },[])

  useEffect(()=>{const t=setTimeout(()=>setIntro(false),3600);return()=>clearTimeout(t)},[])
  const enter=()=>{setEntered(true);setTimeout(()=>document.querySelector('#about')?.scrollIntoView({behavior:'smooth'}),850)}
  const nav=(id:string)=>{setActive(id);document.querySelector('#'+id)?.scrollIntoView({behavior:'smooth'})}

  return <div className="site" style={{'--mx':`${mouse.x*100}%`,'--my':`${mouse.y*100}%`} as React.CSSProperties}>
    <div className="grain"/><div className="aurora"/>
    <AnimatePresence>{intro && <motion.div className="intro" initial={{opacity:1}} exit={{opacity:0,scale:1.03,filter:'blur(10px)'}} transition={{duration:1.1}}>
      <div className="intro-line"/><motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:.4}}>ERIK / DIGITAL DESIGN & DEVELOPMENT</motion.p>
      <motion.h1 initial={{opacity:0,filter:'blur(18px)',y:20}} animate={{opacity:1,filter:'blur(0px)',y:0}} transition={{delay:.65,duration:1.2}}>Into the quiet.</motion.h1>
      <motion.div className="loader" initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:2.7,ease:'easeInOut'}}/>
    </motion.div>}</AnimatePresence>

    <header className={`nav ${scrolled?'nav-solid':''}`}>
      <button className="brand" onClick={()=>nav('home')}><span>ERIK</span><i>•</i><small>WEB / UI</small></button>
      <nav>{['about','work','contact'].map(x=><button key={x} className={active===x?'active':''} onClick={()=>nav(x)}>{x}</button>)}</nav>
      <div className="status"><span/> available for select work</div>
    </header>

    <main>
      <section id="home" ref={heroRef} className="hero">
        <motion.div className="forest" style={{x:forestX,y:forestY}} initial={{scale:1.12}} animate={{scale:1}} transition={{duration:4.2,ease:[.2,.8,.2,1]}}>
          <img src="./assets/main wp.jpg" alt="misty forest"/>
        </motion.div>
        <div className="depth d1"/><div className="depth d2"/><div className="mist mist-a"/><div className="mist mist-b"/>
        <div className="hero-vignette"/>
        <div className="hero-content">
          <motion.div className="eyebrow" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:3.7}}>LOS ANGELES / 2026</motion.div>
          <motion.h2 initial={{opacity:0,y:55,filter:'blur(14px)'}} animate={{opacity:1,y:0,filter:'blur(0)'}} transition={{delay:3.85,duration:1.15}}>I make small<br/><em>businesses</em> look<br/>like they mean it.</motion.h2>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:4.45}} className="hero-sub">Web development, interface design and motion —<br/>built to feel as considered as the product itself.</motion.p>
          <AnimatePresence>{!scrolled && !entered && !intro && <motion.button className="fog-cta" onClick={enter} initial={{opacity:0,y:70,filter:'blur(20px)',scale:.92}} animate={{opacity:1,y:0,filter:'blur(0)',scale:1}} exit={{opacity:0,y:-25,filter:'blur(15px)'}} transition={{duration:1.1,ease:[.16,1,.3,1]}}>
            <span className="cta-grid"><b>US BASED</b><b>FREELANCE</b><b>WEB</b><b>UI</b></span><span className="cta-arrow"><ArrowUpRight size={17}/></span>
          </motion.button>}</AnimatePresence>
        </div>
        <div className="scroll-hint"><MousePointer2 size={13}/><span>SCROLL TO EXPLORE</span><div/></div>
      </section>

      <section id="about" className="section about">
        <div className="section-index">01 / ABOUT</div>
        <div className="about-grid"><div><p className="kicker">A quiet approach to loud ideas.</p><h3>Good digital work should<br/><span>feel inevitable.</span></h3></div><div className="glass-copy"><p>Hi, I’m Erik. I’m a web developer based in the United States. I focus on clean interfaces, responsive layouts and sites that are easy to understand, fast to use, and ready to help a business grow.</p><p>I like taking things apart, understanding how they work, then rebuilding the idea with better motion, structure and character.</p><div className="mini-meta"><span><Layers3 size={15}/> systems</span><span><Code2 size={15}/> development</span><span><Sparkles size={15}/> motion</span></div></div></div>
      </section>

      <section id="work" className="section work"><div className="section-index">02 / SELECTED WORK</div><div className="work-head"><h3>Built with intent.<br/><span>Not decoration.</span></h3><p>Projects sit at the intersection of business, interface and atmosphere.</p></div><div className="projects">{projects.map((p,i)=><motion.article className="project" key={p.n} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{delay:i*.08,duration:.7}}><div className="project-top"><span>{p.n}</span><ArrowUpRight size={19}/></div><h4>{p.title}</h4><p>{p.text}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></motion.article>)}</div></section>

      <section className="manifesto"><div className="manifesto-glass"><span>THE PRINCIPLE</span><h3>Less noise.<br/><i>More signal.</i></h3><p>Every transition should have a reason. Every pixel should earn its place.</p></div></section>

      <section id="contact" className="section contact"><div className="section-index">03 / CONTACT</div><div className="contact-wrap"><div><p className="kicker">Have something worth building?</p><h3>Let’s make it<br/><span>feel real.</span></h3></div><a className="contact-card" href="mailto:hello@erik.dev"><span><Mail size={19}/> hello@erik.dev</span><ArrowUpRight/></a></div></section>
    </main>
    <footer><span>© 2026 ERIK</span><span>BUILT IN THE QUIET</span><a href="https://github.com/b-1-o/forest" target="_blank" rel="noreferrer"><Github size={15}/> SOURCE</a></footer>
  </div>
}
export default App
