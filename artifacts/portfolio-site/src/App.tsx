import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Github,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
  Youtube,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

const projects = [
  {
    number: '01',
    year: '2024',
    title: <>GlobalMart<br />Mall</>,
    name: 'E-commerce Website',
    description:
      'A responsive e-commerce web application with product pages, shopping cart functionality, and a Node.js backend.',
    meta: ['JavaScript', 'Node.js', 'E-commerce'],
    href: 'https://github.com/RYDON002/GlobalMart-Mall-Frontend.git',
    visualClass: 'visual-aurora',
    label: 'GlobalMart Mall / e-commerce',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Online shopping interface with products on a laptop',
  },
  {
    number: '02',
    year: '2025',
    title: <>GPA / CPA<br />Calculator</>,
    name: 'GPA/CPA Calculator',
    description:
      'A focused academic calculator designed and built to make GPA and CPA results easier to work out and understand.',
    meta: ['React', 'UI design', 'Product'],
    href: 'https://github.com/RYDON002/GPA-CALCULATOR.git',
    visualClass: 'visual-tape',
    label: 'GPA / CPA Calculator / product',
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Mathematical formulas written on a board',
  },
  {
    number: '03',
    year: '2026',
    title: <>MHWU<br />KNTN</>,
    name: 'mhwunktn.org',
    description:
      'A live website where I contributed as the backend developer, focusing on the server-side work behind the experience.',
    meta: ['Backend', 'Web development', 'Live site'],
    href: 'https://mhwunktn.org/',
    visualClass: 'visual-quiet',
    label: 'mhwunktn.org / live website',
    imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Community members joining hands together',
  },
];

const skills = [
  'JavaScript',
  'React',
  'Next.js',
  'Node.js',
  'Express.js',
  'HTML / CSS',
  'Tailwind CSS',
  'PostgreSQL',
  'MongoDB',
  'REST APIs',
  'JWT / Authentication',
  'Docker',
  'Git / GitHub',
  'Figma',
  'UI / UX Design',
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('programmerrydon@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setFormStatus('Email: programmerrydon@gmail.com');
    }
  };

  const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') || 'there');
    const email = String(data.get('email') || '');
    const subject = encodeURIComponent(`A new project from ${name}`);
    const body = encodeURIComponent(
      `${String(data.get('message') || '')}\n\nReply to: ${email}`,
    );
    window.location.href = `mailto:programmerrydon@gmail.com?subject=${subject}&body=${body}`;
    setFormStatus('Your mail app is opening — talk soon.');
  };

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="portfolio-shell">
      <header className="site-header" data-testid="site-header">
        <div className="header-inner">
          <a href="#top" className="wordmark" data-testid="link-home">
            <span className="wordmark-mark">R</span>
            <span>Mubarak Goni Sule <b>/</b> RDN</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#work" data-testid="link-work">Work</a>
            <a href="#about" data-testid="link-about">About</a>
            <a href="#skills" data-testid="link-skills">Skills</a>
            <a href="#process" data-testid="link-process">Process</a>
            <a href="#contact" data-testid="link-contact">Contact</a>
          </nav>
          <div className="header-availability" data-testid="status-availability">
            <span className="availability-dot" />
            Available for roles &amp; collaborations
          </div>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {[
              ['work', 'Work'],
              ['about', 'About'],
              ['skills', 'Skills'],
              ['process', 'Process'],
              ['contact', 'Contact'],
            ].map(([id, label]) => (
              <button key={id} type="button" onClick={() => scrollToSection(id)}>
                {label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container-wide hero-grid">
            <div>
              <div className="eyebrow intro-enter">Full-Stack Developer / UI Designer — Katsina, Nigeria</div>
              <h1 id="hero-title" className="display-serif intro-enter" style={{ animationDelay: '.08s' }}>
                I build what people <em>need.</em>
              </h1>
              <p className="hero-intro intro-enter" style={{ animationDelay: '.16s' }}>
                I’m Mubarak Goni Sule, a pragmatic Full-Stack Developer and UI Designer building scalable web applications, reliable backend systems, responsive frontends, and polished user interfaces.
              </p>
              <div className="hero-actions intro-enter" style={{ animationDelay: '.24s' }}>
                <a className="button-primary" href="#work" data-testid="button-explore-work">
                  Explore my work <ArrowDownRight size={14} />
                </a>
                <a className="button-text" href="mailto:programmerrydon@gmail.com" data-testid="link-email-hero">
                  Say hello <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
            <div className="hero-art intro-enter" style={{ animationDelay: '.2s' }} aria-label="Abstract RDN self portrait illustration" data-testid="visual-hero-art">
              <div className="art-paper" />
              <div className="art-portrait" />
              <div className="art-caption">MGS / 2026<br />Built to meet the need</div>
              <span className="art-stamp">RDN</span>
            </div>
          </div>
          <div className="hero-side-note"><span className="side-note-line" /> Scroll to explore</div>
        </section>

        <div className="marquee" aria-label="Skills and disciplines">
          <div className="marquee-track">
            {['Full-stack development', 'UI / UX design', 'React', 'Node.js', 'PostgreSQL', 'Full-stack development', 'UI / UX design', 'React', 'Node.js', 'PostgreSQL'].map((item, index) => (
              <span key={`${item}-${index}`} data-testid={`text-discipline-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section id="work" className="section section-dark" aria-labelledby="work-title">
          <div className="container-wide">
            <div className="section-heading reveal">
              <div className="eyebrow">01 / Selected work</div>
              <div>
                <h2 id="work-title" className="display-serif">Projects built to <em>do the job.</em></h2>
                <p>Real projects across full-stack development, interfaces, APIs, and the details that make software useful.</p>
              </div>
            </div>
            <div className="work-list">
              {projects.map((project, index) => (
                <a
                  className={`work-item reveal delay-${Math.min(index + 1, 3)}`}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  key={project.name}
                  data-testid={`card-project-${index}`}
                >
                  <div className="work-copy">
                    <div>
                      <div className="work-number">{project.number} — {project.year}</div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                    </div>
                    <div className="work-meta">
                      {project.meta.map((item) => <span key={item}>{item}</span>)}
                    </div>
                  </div>
                  <div className={`work-visual ${project.visualClass}`} data-testid={`visual-project-${index}`}>
                    <img className="project-image" src={project.imageUrl} alt={project.imageAlt} loading="lazy" />
                    <span className="visual-wash" aria-hidden="true" />
                    <span className="visual-label">{project.label}</span>
                    <span className="work-arrow"><ExternalLink size={17} /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section section-ink" aria-labelledby="about-title">
          <div className="container-wide about-grid">
            <div className="about-display reveal">
              <div className="eyebrow">02 / About Mubarak</div>
              <h2 id="about-title" className="display-serif">A builder with a designer’s <em>eye.</em></h2>
              <div className="about-sticker">RDN<br />Since 2022</div>
            </div>
            <div className="about-copy reveal delay-1">
              <p>I started with a curiosity about how digital products work — not only how they look, but how every part connects. Four years later, I work across the full product stack, combining engineering discipline with design thinking to make software that is clear, reliable, and useful.</p>
              <div className="about-details">
                <div>
                  <div className="detail-label">Currently</div>
                  <ul className="detail-list">
                    <li>Student and full-stack developer</li>
                    <li>Based in Katsina, Nigeria</li>
                    <li>Mastering cybersecurity specialization</li>
                    <li>Open to roles, contracts, and collaborations</li>
                  </ul>
                </div>
                <div>
                  <div className="detail-label">Focus</div>
                  <ul className="detail-list">
                    <li>Scalable web applications</li>
                    <li>Reliable APIs and backend systems</li>
                    <li>Responsive frontend experiences</li>
                    <li>Thoughtful UI / UX design</li>
                  </ul>
                </div>
              </div>
              <div className="stats-grid" aria-label="Experience statistics">
                <div><strong>4+</strong><span>Years building</span></div>
                <div><strong>100+</strong><span>Projects completed</span></div>
                <div><strong>50+</strong><span>Clients supported</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section section-skills" aria-labelledby="skills-title">
          <div className="container-wide skills-grid">
            <div className="reveal">
              <div className="eyebrow">03 / Toolkit</div>
              <h2 id="skills-title" className="display-serif">The tools I use to turn ideas into <em>working products.</em></h2>
            </div>
            <div className="skill-cloud reveal delay-1">
              {skills.map((skill, index) => <span key={skill} data-testid={`skill-${index}`}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section id="process" className="section section-dark" aria-labelledby="process-title">
          <div className="container-wide process-grid">
            <div className="process-intro reveal">
              <div className="eyebrow">04 / How I work</div>
              <h2 id="process-title" className="display-serif">Understand. Design. <em>Build.</em></h2>
            </div>
            <div className="process-list reveal delay-1">
              {[
                ['01', 'Understand the user', 'I get specific about the real problem, the people it affects, and the requirements that actually matter.'],
                ['02', 'Design the interaction', 'I shape simple flows and clear interfaces before implementation, keeping the experience useful and accessible.'],
                ['03', 'Build it reliably', 'I write maintainable code across the frontend, backend, APIs, and database — then keep improving what ships.'],
              ].map(([number, title, copy], index) => (
                <div className="process-row" key={number} data-testid={`row-process-${index}`}>
                  <span className="step">{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <span className="time">RDN<br />method</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="container-wide contact-grid">
            <div className="reveal">
              <div className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>05 / Let’s work</div>
              <h2 id="contact-title" className="display-serif">Have a project in <em>mind?</em></h2>
              <p className="contact-copy">I’m available for full-time roles, contract work, and collaborations. Tell me what you’re building and how I can help.</p>
              <div className="contact-details">
                <a href="mailto:programmerrydon@gmail.com"><Mail size={14} /> programmerrydon@gmail.com</a>
                <a href="tel:+2348162993717"><Phone size={14} /> +234 816 299 3717</a>
                <a href="https://wa.me/2348162993717" target="_blank" rel="noreferrer"><ArrowUpRight size={14} /> WhatsApp</a>
              </div>
              <button className="button-text contact-copy-button" onClick={copyEmail} type="button" data-testid="button-copy-email">
                {copied ? <><Check size={14} /> Email copied</> : <><Copy size={14} /> Copy my email</>}
              </button>
            </div>
            <form className="contact-form reveal delay-1" onSubmit={submitContact} data-testid="form-contact">
              <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="Your name" data-testid="input-contact-name" /></div>
              <div className="field"><label htmlFor="email">Your email</label><input id="email" name="email" type="email" required placeholder="you@example.com" data-testid="input-contact-email" /></div>
              <div className="field"><label htmlFor="message">Tell me about it</label><textarea id="message" name="message" required placeholder="What are you building?" data-testid="input-contact-message" /></div>
              <button className="button-primary form-submit" type="submit" data-testid="button-submit-contact">Start a conversation <ArrowUpRight size={14} /></button>
              {formStatus && <p className="form-status" role="status" data-testid="status-contact">{formStatus}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container-wide footer-inner">
          <div className="footer-brand">
            <span className="wordmark-mark">R</span>
            <small>© 2026 Mubarak Goni Sule / RDN — Built with intention</small>
          </div>
          <div className="footer-links">
            <a href="https://github.com/RYDON002" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={15} /></a>
            <a href="https://youtube.com/@rydon001" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube size={15} /></a>
            <a href="https://instagram.com/rydon__001" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={15} /></a>
            <a href="mailto:programmerrydon@gmail.com" aria-label="Email"><Mail size={15} /></a>
            <a href="#top" data-testid="link-back-top">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;