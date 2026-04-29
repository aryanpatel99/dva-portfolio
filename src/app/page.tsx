'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Terminal, Code, GraduationCap, ExternalLink,
  ArrowDown, Mail, Copy, Check
} from 'lucide-react';
import Image from 'next/image';
import s from './page.module.css';

/* ── Brand SVG Icons ── */
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const CodeforcesIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 7.5A1.5 1.5 0 016 9v10.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 010 19.5V9a1.5 1.5 0 011.5-1.5h3zm9-4.5A1.5 1.5 0 0115 4.5v15a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 19.5v-15A1.5 1.5 0 0110.5 3h3zm9 7.5A1.5 1.5 0 0124 12v7.5a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h3z"/>
  </svg>
);

const LeetCodeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

/* ═══ Hooks ═══ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); io.unobserve(el); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ═══ Glow Card ═══ */
function GlowCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current?.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    ref.current?.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  }, []);
  return (
    <div ref={ref} className={`${s.card} ${className || ''}`} onMouseMove={handleMouse}>
      <div className={s.cardGlow} />
      {children}
    </div>
  );
}

/* ═══ Image Gallery ═══ */
function ImageGallery({ images }: { images: { src: string; alt: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className={s.gallery}>
      <div className={s.galleryMain}>
        {images.map((img, i) => (
          <Image key={img.src} src={img.src} alt={img.alt} fill
            sizes="(max-width: 768px) 100vw, 1100px"
            className={i === active ? s.imgActive : s.imgHidden}
            priority={i === 0} />
        ))}
      </div>
      <div className={s.thumbStrip}>
        {images.map((img, i) => (
          <button key={img.src}
            className={`${s.thumb} ${i === active ? s.thumbOn : ''}`}
            onClick={() => setActive(i)}
            aria-label={`View ${img.alt}`}>
            <Image src={img.src} alt="" width={56} height={56} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══ Copy Email Button ═══ */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = 'abhayanth.2024@nst.rishihood.edu.in';
  const copy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button className={s.emailPill} onClick={copy}>
      <span className={s.emailText}>{email}</span>
      <span className={s.emailCopy}>
        {copied ? <><Check size={12} /> COPIED</> : <><Copy size={12} /> CLICK TO COPY</>}
      </span>
    </button>
  );
}

/* ═══ Data ═══ */
const bankImages = [
  { src: '/images/project2-1.png', alt: 'Campaign Effectiveness' },
  { src: '/images/project2-2.png', alt: 'Customer Profile' },
  { src: '/images/project2-3.png', alt: 'Economic Impact' },
  { src: '/images/project2-4.png', alt: 'Interaction History' },
];

/* ═══════════════════════════════════════════════════════ */
/*                      PAGE                              */
/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  const aboutHdr = useReveal();
  const aboutCards = useReveal();
  const linksRef = useReveal();
  const projHdr = useReveal();
  const p1 = useReveal();
  const p2 = useReveal();
  const helloRef = useReveal();

  return (
    <div className={s.page}>

      {/* ═══ HERO ═══ */}
      <section className={s.hero}>
        <div className={s.auroraBg}>
          <div className={s.blob1} />
          <div className={s.blob2} />
          <div className={s.blob3} />
        </div>
        <div className={s.gridLines} />

        <div className={s.heroInner}>
          <span className={s.badge}>
            <span className={s.badgeDot} />
            Available for collaboration
          </span>
          <h1 className={s.heroTitle}>Abhayanth K.</h1>
          <p className={s.heroSub}>
            AI engineer building multi-agent pipelines, workflow engines,
            and full-stack platforms. Deep focus on agentic AI,
            statistical modeling & production reliability.
          </p>
          <div className={s.heroBtns}>
            <a href="#projects" className={s.btnPrimary}>
              <ArrowDown size={15} /> View Projects
            </a>
            <a href="https://github.com/Abhayanthk" target="_blank" rel="noopener noreferrer" className={s.btnGhost}>
              <GithubIcon size={15} /> GitHub
            </a>
          </div>
        </div>

        <div className={s.scrollHint}>
          <span>Scroll</span>
          <div className={s.scrollBar} />
        </div>
      </section>

      {/* ═══ PROFILE ═══ */}
      <section className={s.wrap}>
        <div ref={aboutHdr} className={`${s.secHead} reveal`}>
          <span className={s.label}>Profile</span>
          <h2 className={s.secTitle}>Engineering Background</h2>
          <p className={s.secSub}>Data Visualization & Analytics · Full-Stack AI</p>
        </div>

        <div ref={aboutCards} className={`${s.grid3} stagger`}>
          <GlowCard>
            <div className={s.cardIcon}><Terminal size={18} /></div>
            <span className={s.cardLabel}>Tech Stack</span>
            <span className={s.cardBody}>Next.js · TypeScript · Python · Prisma · PostgreSQL</span>
          </GlowCard>
          <GlowCard>
            <div className={s.cardIcon}><Code size={18} /></div>
            <span className={s.cardLabel}>Problem Solving</span>
            <span className={s.cardBody}>1,900+ problems solved. CF Specialist (max 1484). LC 547.</span>
          </GlowCard>
          <GlowCard>
            <div className={s.cardIcon}><GraduationCap size={18} /></div>
            <span className={s.cardLabel}>Education</span>
            <span className={s.cardBody}>B.Tech AI (2024–28) · Newton School of Technology · CGPA 8.87</span>
          </GlowCard>
        </div>

        <div ref={linksRef} className={`${s.pills} reveal`}>
          <a href="https://www.linkedin.com/in/abhayanth-k-675905323/" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <LinkedinIcon size={13} /> LinkedIn
          </a>
          <a href="https://codeforces.com/profile/Harly24" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <CodeforcesIcon size={13} /> Codeforces
          </a>
          <a href="https://leetcode.com/u/Harly24/" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <LeetCodeIcon size={13} /> LeetCode
          </a>
          <a href="mailto:abhayanth.2024@nst.rishihood.edu.in" className={s.pill}>
            <Mail size={13} /> Email
          </a>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" className={s.wrap}>
        <div ref={projHdr} className={`${s.secHead} reveal`}>
          <span className={s.label}>Work</span>
          <h2 className={s.secTitle}>Data Visualization Projects</h2>
          <p className={s.secSub}>Capstone projects turning complex datasets into actionable insights.</p>
        </div>

        {/* Project 1 */}
        <article ref={p1} className={`${s.proj} reveal`}>
          <div className={s.projImg} style={{ background: '#f3f1ec' }}>
            <Image src="/images/project1.png" alt="Maternal Health Dashboard" fill
              sizes="(max-width: 768px) 100vw, 1100px" style={{ objectFit: 'contain' }} priority />
          </div>
          <div className={s.projBody}>
            <span className={s.projTag}>Healthcare · Capstone</span>
            <h3 className={s.projTitle}>Maternal & Newborn Health Insights During COVID-19</h3>
            <p className={s.projDesc}>
              Analysis of survey-based data from the PdP study across Canada — 10,773 records
              covering maternal demographics, mental health, pandemic stress & birth outcomes.
            </p>
            <a href="https://github.com/Jag2007/SectionC_Group6_Pregnant_Women_COVID19" target="_blank" rel="noopener noreferrer" className={s.projLink}>
              <GithubIcon size={14} /> View on GitHub
            </a>
            <div className={s.kpis}>
              <div className={s.kpi}><span className={s.kpiVal}>29.4%</span><span className={s.kpiLbl}>C-Section Rate</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>51.5</span><span className={s.kpiLbl}>Pandemic Stress /100</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>18.4</span><span className={s.kpiLbl}>PROMIS Anxiety</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>5,389</span><span className={s.kpiLbl}>Cleaned Records</span></div>
            </div>
          </div>
        </article>

        {/* Project 2 */}
        <article ref={p2} className={`${s.proj} reveal`}>
          <ImageGallery images={bankImages} />
          <div className={s.projBody}>
            <span className={s.projTag}>Banking · Direct Marketing</span>
            <h3 className={s.projTitle}>Bank Marketing Campaign Analytics</h3>
            <p className={s.projDesc}>
              Optimising term-deposit conversion via customer, campaign & macro-economic analytics —
              UCI Portuguese Bank Dataset. Propensity model at 90.8% accuracy.
            </p>
            <a href="https://github.com/Lalith0024/Section_C_Group_11_Bank_Marketing_Dataset" target="_blank" rel="noopener noreferrer" className={s.projLink}>
              <GithubIcon size={14} /> View on GitHub
            </a>
            <div className={s.kpis}>
              <div className={s.kpi}><span className={s.kpiVal}>41,176</span><span className={s.kpiLbl}>Contacts Analysed</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>11.27%</span><span className={s.kpiLbl}>Baseline Conversion</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>6.9×</span><span className={s.kpiLbl}>Top-Driver Lift</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>90.8%</span><span className={s.kpiLbl}>Model Accuracy</span></div>
            </div>
          </div>
        </article>
      </section>

      {/* ═══ HELLO ═══ */}
      <section ref={helloRef} className={`${s.hello} reveal`}>
        <div className={s.helloDot} />
        <h2 className={s.helloTitle}>hello?</h2>
        <p className={s.helloSub}>If you&apos;ve made it this far, let&apos;s talk.</p>
        <CopyEmail />
        <div className={s.socialGrid}>
          <a href="https://github.com/Abhayanthk" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><GithubIcon size={16} /></span>
            <span className={s.socialLabel}>GITHUB</span>
            <span className={s.socialHandle}>@Abhayanthk</span>
          </a>
          <a href="https://www.linkedin.com/in/abhayanth-k-675905323/" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><LinkedinIcon size={16} /></span>
            <span className={s.socialLabel}>LINKEDIN</span>
            <span className={s.socialHandle}>abhayanth-k</span>
          </a>
          <a href="https://codeforces.com/profile/Harly24" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><CodeforcesIcon size={16} /></span>
            <span className={s.socialLabel}>CODEFORCES</span>
            <span className={s.socialHandle}>Harly24</span>
          </a>
          <a href="https://leetcode.com/u/Harly24/" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><LeetCodeIcon size={16} /></span>
            <span className={s.socialLabel}>LEETCODE</span>
            <span className={s.socialHandle}>Harly24</span>
          </a>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={s.footer}>
        <span>© 2026 Abhayanth K · Built with Next.js</span>
      </footer>
    </div>
  );
}
