'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  Terminal, Code, GraduationCap,
  ArrowDown, Mail, Copy, Check, Briefcase, ExternalLink
} from 'lucide-react';
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

const LeetCodeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
  </svg>
);

const CodeforcesIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 7.5A1.5 1.5 0 016 9v10.5a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 010 19.5V9a1.5 1.5 0 011.5-1.5h3zm9-4.5A1.5 1.5 0 0115 4.5v15a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 19.5v-15A1.5 1.5 0 0110.5 3h3zm9 7.5A1.5 1.5 0 0124 12v7.5a1.5 1.5 0 01-1.5 1.5h-3a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5h3z"/>
  </svg>
);

const HackerRankIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c1.285 0 9.75 4.886 10.392 6 .645 1.115.645 10.885 0 12S13.287 24 12 24C10.715 24 2.25 19.114 1.608 18 .963 16.886.963 7.114 1.608 6 2.25 4.886 10.715 0 12 0zm2.205 6.015h-1.043c-.122 0-.208.037-.265.108-.06.074-.072.147-.072.243v1.73H10.63v-1.73c0-.096-.02-.169-.072-.243a.344.344 0 00-.265-.108H9.25a.344.344 0 00-.265.108c-.06.074-.072.147-.072.243v6.582c0 .096.02.169.072.243a.344.344 0 00.265.108h1.043c.122 0 .208-.037.265-.108.06-.074.072-.147.072-.243V11.07h2.2v1.877c0 .096.02.169.072.243a.344.344 0 00.265.108h1.043c.122 0 .208-.037.265-.108.06-.074.072-.147.072-.243V6.366c0-.096-.02-.169-.072-.243a.344.344 0 00-.265-.108z"/>
  </svg>
);

const HackerEarthIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.65 0H1.35C.605 0 0 .605 0 1.35v21.3C0 23.395.605 24 1.35 24h21.3c.745 0 1.35-.605 1.35-1.35V1.35C24 .605 23.395 0 22.65 0zM12 18.3L5.7 12l2.1-2.1 4.2 4.2 8.4-8.4 2.1 2.1L12 18.3z"/>
  </svg>
);

const CodeChefIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.257.004C5.026.253.035 5.433 0 11.668c-.032 5.769 4.091 10.657 9.608 11.618v-2.055c-4.108-.934-7.2-4.61-7.172-8.994.031-4.57 3.46-8.35 7.84-8.965v6.67H8.13a.37.37 0 00-.37.37v1.406c0 .204.166.37.37.37h1.147v3.95c0 .204.166.37.37.37h1.403c.204 0 .37-.166.37-.37v-3.95h1.03c.205 0 .37-.166.37-.37v-1.406a.37.37 0 00-.37-.37H11.42V3.295c4.268.71 7.55 4.435 7.55 8.93 0 4.29-3.05 7.908-7.096 8.88v2.065C17.63 22.202 21.6 17.384 21.6 11.665c0-6.317-4.96-11.48-11.205-11.662a11.63 11.63 0 00-.138-.001z"/>
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

/* ═══ Blinkit images ═══ */
const blinkitImages = [
  { src: '/images/blinkit-1.png', alt: 'Market Pulse — Revenue Mix & SKU Pareto' },
  { src: '/images/blinkit-2.png', alt: 'Where Impulse Lives — Category Breakdown' },
  { src: '/images/blinkit-3.png', alt: 'Pack Price Ladder — Convenience Premium' },
  { src: '/images/blinkit-4.png', alt: 'Geography & Promo Analysis — City Impulse' },
];

/* ═══ Copy Email Button ═══ */
function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = 'aryan.patel2024@nst.rishihood.edu.in';
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

/* ═══════════════════════════════════════════════════════ */
/*                      PAGE                              */
/* ═══════════════════════════════════════════════════════ */
export default function Home() {
  const aboutHdr  = useReveal();
  const aboutCards = useReveal();
  const expRef    = useReveal();
  const linksRef  = useReveal();
  const projHdr   = useReveal();
  const p1        = useReveal();
  const p2        = useReveal();
  const helloRef  = useReveal();

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
            Open to opportunities
          </span>
          <h1 className={s.heroTitle}>Aryan Patel.</h1>
          <p className={s.heroSub}>
            Full-Stack Developer specialising in React.js, Next.js &amp; scalable
            backend architecture — integrating AI and turning complex data into
            high-performance web experiences.
          </p>
          <div className={s.heroBtns}>
            <a href="#projects" className={s.btnPrimary}>
              <ArrowDown size={15} /> View Projects
            </a>
            <a href="https://github.com/aryanpatel99" target="_blank" rel="noopener noreferrer" className={s.btnGhost}>
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
          <h2 className={s.secTitle}>About Me</h2>
          <p className={s.secSub}>
            Full-Stack Developer with 300+ problems solved across LeetCode (1400+ rating), Codeforces, and CodeChef.
            Experienced in integrating AI functionalities and delivering accessible, high-performance web applications
            using Next.js, TypeScript, Python, and modern DevOps tools.
          </p>
        </div>

        <div ref={aboutCards} className={`${s.grid3} stagger`}>
          <GlowCard>
            <div className={s.cardIcon}><Terminal size={18} /></div>
            <span className={s.cardLabel}>Tech Stack</span>
            <span className={s.cardBody}>Next.js · React · TypeScript · Node.js · Python · PostgreSQL · MongoDB · Prisma</span>
          </GlowCard>
          <GlowCard>
            <div className={s.cardIcon}><Code size={18} /></div>
            <span className={s.cardLabel}>Problem Solving</span>
            <span className={s.cardBody}>300+ problems solved. LeetCode 1400+. Codeforces · CodeChef · HackerRank · HackerEarth.</span>
          </GlowCard>
          <GlowCard>
            <div className={s.cardIcon}><GraduationCap size={18} /></div>
            <span className={s.cardLabel}>Education</span>
            <span className={s.cardBody}>B.Tech AI (2024–28) · Newton School of Technology, Rishihood University · CGPA 8.667</span>
          </GlowCard>
        </div>

        {/* ── Internship ── */}
        <div ref={expRef} className={`reveal`}>
          <div className={s.secHead} style={{ marginBottom: '20px' }}>
            <span className={s.label}>Experience</span>
            <h2 className={s.secTitle}>Internship</h2>
          </div>
          <GlowCard>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div className={s.cardIcon} style={{ flexShrink: 0 }}><Briefcase size={18} /></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <span className={s.cardLabel}>QA Associate — CredoHire</span>
                  <span style={{ fontSize: '12px', color: '#475569', fontWeight: 500 }}>May 2025 – Aug 2025 · Remote</span>
                </div>
                <span className={s.cardBody}>
                  Collaborated with the engineering team to identify, document, and resolve software defects.
                  Conducted rigorous functional and UI/UX testing, delivering structured analytical feedback that
                  directly enhanced product performance. Systematically identified edge cases and optimised testing workflows alongside senior developers.
                </span>
                <a href="https://shorturl.at/7TbAw" target="_blank" rel="noopener noreferrer" className={s.projLink} style={{ marginTop: '4px' }}>
                  View Certificate ↗
                </a>
              </div>
            </div>
          </GlowCard>
        </div>

        {/* ── Social Pills ── */}
        <div ref={linksRef} className={`${s.pills} reveal`}>
          <a href="https://www.linkedin.com/in/aryanpatel99/" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <LinkedinIcon size={13} /> LinkedIn
          </a>
          <a href="https://github.com/aryanpatel99" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <GithubIcon size={13} /> GitHub
          </a>
          <a href="https://leetcode.com/u/ARYAN99_/" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <LeetCodeIcon size={13} /> LeetCode
          </a>
          <a href="https://codeforces.com/profile/aryanpatel6215" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <CodeforcesIcon size={13} /> Codeforces
          </a>
          <a href="https://www.codechef.com/users/neat_foxes_87" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <CodeChefIcon size={13} /> CodeChef
          </a>
          <a href="https://www.hackerrank.com/profile/aryanpatel6215" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <HackerRankIcon size={13} /> HackerRank
          </a>
          <a href="https://www.hackerearth.com/@aryanpatel6215" target="_blank" rel="noopener noreferrer" className={s.pill}>
            <HackerEarthIcon size={13} /> HackerEarth
          </a>
          <a href="mailto:aryan.patel2024@nst.rishihood.edu.in" className={s.pill}>
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

        {/* Project 1 — Retail Profitability */}
        <article ref={p1} className={`${s.proj} reveal`}>
          <div className={s.projImg} style={{ background: '#b8c8e8' }}>
            <Image src="/images/retail-dashboard.png" alt="Retail Profitability & Margin Optimization Dashboard" fill
              sizes="(max-width: 768px) 100vw, 1100px" style={{ objectFit: 'cover' }} priority />
          </div>
          <div className={s.projBody}>
            <span className={s.projTag}>Retail · Capstone 1</span>
            <h3 className={s.projTitle}>Retail Profitability &amp; Margin Optimization Dashboard</h3>
            <p className={s.projDesc}>
              End-to-end analysis of ~9,800 US retail transactions to uncover patterns in profitability, regional performance,
              category-level margins, and shipping efficiency — delivered as an interactive Excel dashboard for business stakeholders.
            </p>
            <div className={s.projLinks}>
              <a href="https://docs.google.com/spreadsheets/d/1eI8eT-lTITb30jTpvw0EvFOd2hQksZV_RVYjujOPWew/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className={s.projLink}>
                <ExternalLink size={13} /> View Dashboard
              </a>
              <a href="https://docs.google.com/document/d/1irLA_jXtsgEpZnzh0xRmhwhzpkpY8BP_tJ3v2AU9rkk/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className={s.projLink}>
                <ExternalLink size={13} /> Full Report
              </a>
            </div>
            <div className={s.kpis}>
              <div className={s.kpi}><span className={s.kpiVal}>9,800</span><span className={s.kpiLbl}>Transactions</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>$2.28M</span><span className={s.kpiLbl}>Total Sales</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>4</span><span className={s.kpiLbl}>US Regions</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>3</span><span className={s.kpiLbl}>Categories</span></div>
            </div>
          </div>
        </article>

        {/* Project 2 — The Unplanned Basket */}
        <article ref={p2} className={`${s.proj} reveal`}>
          <ImageGallery images={blinkitImages} />
          <div className={s.projBody}>
            <span className={s.projTag}>Quick Commerce · Capstone 2</span>
            <h3 className={s.projTitle}>The Unplanned Basket — Blinkit Impulse Analysis</h3>
            <p className={s.projDesc}>
              Impulse-proxy scoring model across 13,000 SKUs in 10 Indian cities — quantifying what share of Blinkit&apos;s
              revenue is planned necessity vs unplanned convenience, and pricing the 6× premium consumers pay for small-pack formats.
            </p>
            <div className={s.projLinks}>
              <a href="https://public.tableau.com/app/profile/aryan.patel8829/viz/Blinkit_Analysis_G19/Dashboard2" target="_blank" rel="noopener noreferrer" className={s.projLink}>
                <ExternalLink size={13} /> Tableau Dashboard
              </a>
            </div>
            <div className={s.kpis}>
              <div className={s.kpi}><span className={s.kpiVal}>13,000</span><span className={s.kpiLbl}>SKUs Analysed</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>21.6%</span><span className={s.kpiLbl}>Impulse Share</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>6×</span><span className={s.kpiLbl}>Convenience Premium</span></div>
              <div className={s.kpi}><span className={s.kpiVal}>₹509M</span><span className={s.kpiLbl}>Total Revenue</span></div>
            </div>
          </div>
        </article>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section ref={helloRef} className={`${s.contact} reveal`}>
        <div className={s.contactLeft}>
          <span className={s.label}>Contact</span>
          <h2 className={s.contactTitle}>Let&apos;s build<br />something together.</h2>
          <p className={s.contactSub}>
            Open to internships, collaborations, and full-time roles.
            Whether it&apos;s a project idea or just a chat — my inbox is always open.
          </p>
          <CopyEmail />
        </div>
        <div className={s.contactRight}>
          <div className={s.socialGrid}>
          <a href="https://github.com/aryanpatel99" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><GithubIcon size={16} /></span>
            <span className={s.socialLabel}>GITHUB</span>
            <span className={s.socialHandle}>@aryanpatel99</span>
          </a>
          <a href="https://www.linkedin.com/in/aryanpatel99/" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><LinkedinIcon size={16} /></span>
            <span className={s.socialLabel}>LINKEDIN</span>
            <span className={s.socialHandle}>aryanpatel99</span>
          </a>
          <a href="https://leetcode.com/u/ARYAN99_/" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><LeetCodeIcon size={16} /></span>
            <span className={s.socialLabel}>LEETCODE</span>
            <span className={s.socialHandle}>ARYAN99_</span>
          </a>
          <a href="https://codeforces.com/profile/aryanpatel6215" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><CodeforcesIcon size={16} /></span>
            <span className={s.socialLabel}>CODEFORCES</span>
            <span className={s.socialHandle}>aryanpatel6215</span>
          </a>
          <a href="https://www.codechef.com/users/neat_foxes_87" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><CodeChefIcon size={16} /></span>
            <span className={s.socialLabel}>CODECHEF</span>
            <span className={s.socialHandle}>neat_foxes_87</span>
          </a>
          <a href="https://www.hackerrank.com/profile/aryanpatel6215" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><HackerRankIcon size={16} /></span>
            <span className={s.socialLabel}>HACKERRANK</span>
            <span className={s.socialHandle}>aryanpatel6215</span>
          </a>
          <a href="https://www.hackerearth.com/@aryanpatel6215" target="_blank" rel="noopener noreferrer" className={s.socialCard}>
            <span className={s.socialIcon}><HackerEarthIcon size={16} /></span>
            <span className={s.socialLabel}>HACKEREARTH</span>
            <span className={s.socialHandle}>aryanpatel6215</span>
          </a>
          <a href="mailto:aryan.patel2024@nst.rishihood.edu.in" className={s.socialCard}>
            <span className={s.socialIcon}><Mail size={16} /></span>
            <span className={s.socialLabel}>EMAIL</span>
            <span className={s.socialHandle}>aryan.patel2024</span>
          </a>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className={s.footer}>
        <span>© 2026 Aryan Patel · Built with Next.js</span>
      </footer>
    </div>
  );
}
