/* FloRide — shared components */
const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Logo ---------- */
function FloRideLogo({ onDark = false, size = 28 }) {
  const ink = onDark ? '#fff' : 'var(--brand-ink)';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <rect x="1" y="6" width="30" height="20" rx="5" fill="var(--brand-accent)"/>
        <rect x="20" y="10" width="8" height="12" rx="2" fill="var(--brand-ink)"/>
        <circle cx="9" cy="26" r="3.2" fill={onDark ? '#fff' : 'var(--brand-ink)'}/>
        <circle cx="9" cy="26" r="1.2" fill="var(--brand-accent)"/>
        <circle cx="23" cy="26" r="3.2" fill={onDark ? '#fff' : 'var(--brand-ink)'}/>
        <circle cx="23" cy="26" r="1.2" fill="var(--brand-accent)"/>
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 18,
        letterSpacing: '-0.01em',
        color: ink,
      }}>
        FloRide<span style={{ color: 'var(--brand-accent)' }}> Delivery</span>
      </span>
    </div>
  );
}

/* ---------- Icons (line set) ---------- */
const Icon = {
  Arrow: (p) => (
    <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Shield: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...p}>
      <path d="M14 3.5l9 3v7.5c0 5.5-3.8 9.5-9 11-5.2-1.5-9-5.5-9-11V6.5l9-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M10 14l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Team: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...p}>
      <circle cx="9" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="19" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 22c0-3.3 2.7-6 6-6s6 2.7 6 6M13 22c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Heart: (p) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" {...p}>
      <path d="M14 24S4 17.5 4 10.7C4 7.5 6.5 5 9.7 5c1.9 0 3.4 1 4.3 2.4C14.9 6 16.4 5 18.3 5 21.5 5 24 7.5 24 10.7 24 17.5 14 24 14 24z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Dollar: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3v18M16 7c-1-1.5-2.4-2-4-2-2.2 0-4 1.3-4 3.3 0 4.7 9 2.7 9 7.4 0 2.1-2 3.3-4.3 3.3-1.8 0-3.3-.6-4.3-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Health: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 21c-3.5-2-8-5.6-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5.4-4.5 9-8 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 11h2v-2h2v2h2v2h-2v2h-2v-2H9v-2z" fill="currentColor"/>
    </svg>
  ),
  Pig: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3 13c0-3.3 3.6-6 8-6 1.3 0 2.5.2 3.5.6L17 6v3c1.2 1.1 2 2.5 2 4 0 1-.4 2-1 2.8V18h-2.5l-.7-1.3c-.9.2-1.8.3-2.8.3s-1.9-.1-2.8-.3L8.5 18H6v-2.2C4.2 14.9 3 14 3 13z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="15" cy="12" r="0.8" fill="currentColor"/>
    </svg>
  ),
  Calendar: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Book: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 5v14a2 2 0 0 1 2-2h14V4H6a2 2 0 0 0-2 2v0" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M4 19a2 2 0 0 0 2 2h14" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  Bolt: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Van: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M2 16V9h11l3 3h6v4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M2 16h2M10 16h6M22 16h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="7" cy="17.5" r="2" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="18" cy="17.5" r="2" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  Gift: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <rect x="3" y="9" width="18" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 13h18M12 9v11M12 9c0-3-4-3-4-1s2 2 4 2c2 0 4 0 4-2s-4-2-4 1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Star: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...p}>
      <path d="M8 1.5l1.9 4 4.4.6-3.2 3.1.8 4.4L8 11.5l-3.9 2.1.8-4.4L1.7 6.1l4.4-.6L8 1.5z"/>
    </svg>
  ),
  Map: (p) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  Phone: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <path d="M3 4c0-.6.4-1 1-1h1.7c.4 0 .8.3.9.7l.8 2.5c.1.4 0 .8-.3 1l-1.2 1c.8 1.7 2.1 3 3.8 3.8l1-1.2c.3-.3.7-.4 1-.3l2.5.8c.4.1.7.5.7.9V13c0 .6-.4 1-1 1A11 11 0 0 1 3 4z" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  Mail: (p) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}>
      <rect x="2" y="3.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2.5 4.5L8 9l5.5-4.5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  Plus: (p) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}>
      <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Minus: (p) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}>
      <path d="M4 10h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Check: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <path d="M3.5 9.5l3 3 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Close: (p) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}>
      <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

/* ---------- Button ---------- */
function Btn({ children, variant = 'primary', as: As = 'button', onDark = false, withArrow = true, ...rest }) {
  const cls = `fr-btn fr-btn--${variant}${onDark ? ' on-dark' : ''}`;
  return (
    <As className={cls} {...rest}>
      {children}
      {withArrow ? <Icon.Arrow /> : null}
    </As>
  );
}

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, delay = 0, as: As = 'div', ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); obs.disconnect(); }
      });
    }, { threshold: 0.12 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <As ref={ref} className={`fr-reveal ${shown ? 'in' : ''}`} style={{ animationDelay: `${delay}ms` }} {...rest}>
      {children}
    </As>
  );
}

/* ---------- Animated number ---------- */
function CountUp({ to, suffix = '', prefix = '', duration = 1400 }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const step = (t) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setV(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{prefix}{v.toLocaleString()}{suffix}</span>;
}

/* ---------- Navbar w/ Mega Menu + glassmorphism on scroll ---------- */
function Navbar({ route, navigate }) {
  const { lang, setLang } = useLang();
  const i = useT();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);
  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [route]);

  const items = [
    { id: 'home', label: i('Home', 'Inicio') },
    { id: 'about', label: i('About', 'Nosotros') },
    { id: 'benefits', label: i('Benefits', 'Beneficios') },
    { id: 'jobs', label: i('Jobs', 'Empleos'), mega: true },
    { id: 'areas', label: i('Service Areas', 'Áreas') },
    { id: 'faq', label: 'FAQ' },
    { id: 'blog', label: 'Blog' },
  ];

  const onPaperRoute = ['about','benefits','areas','faq','blog','contact','apply'].includes(route);
  const headerStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
    height: 'var(--navbar-h)',
    display: 'flex', alignItems: 'center',
    transition: 'background .25s ease, backdrop-filter .25s ease, box-shadow .25s ease, border-color .25s ease',
    borderBottom: '1px solid transparent',
  };
  if (scrolled || onPaperRoute) {
    headerStyle.background = onPaperRoute ? 'rgba(247,246,242,0.78)' : 'rgba(26,26,46,0.62)';
    headerStyle.backdropFilter = 'blur(18px) saturate(140%)';
    headerStyle.WebkitBackdropFilter = 'blur(18px) saturate(140%)';
    headerStyle.borderColor = onPaperRoute ? 'rgba(26,26,46,0.08)' : 'rgba(255,255,255,0.06)';
  }

  const dark = !onPaperRoute && !scrolled; // hero overlay style only on home top
  const linkColor = onPaperRoute ? 'var(--brand-ink)' : '#fff';

  return (
    <header style={headerStyle}>
      <div className="fr-container" style={{ display: 'flex', alignItems: 'center', gap: 24, width: '100%' }}>
        <button onClick={() => navigate('home')} aria-label="FloRide home" style={{ display: 'flex' }}>
          <FloRideLogo onDark={!onPaperRoute} />
        </button>

        <nav className="fr-nav-desktop" style={{ gap: 4, marginLeft: 'auto', alignItems: 'center' }}>
          {items.map((it) => (
            <div
              key={it.id}
              style={{ position: 'relative' }}
              onMouseEnter={() => it.mega && setOpenMenu(it.id)}
              onMouseLeave={() => it.mega && setOpenMenu(null)}
            >
              <button
                onClick={() => !it.mega && navigate(it.id)}
                style={{
                  padding: '10px 14px',
                  fontSize: 14, fontWeight: 500,
                  color: linkColor,
                  opacity: route === it.id ? 1 : 0.82,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  position: 'relative',
                }}
              >
                {it.label}
                {it.mega ? (
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
                ) : null}
                {route === it.id ? (
                  <span style={{ position: 'absolute', left: 14, right: 14, bottom: 4, height: 2, background: 'var(--brand-accent)', borderRadius: 2 }} />
                ) : null}
              </button>

              {it.mega && openMenu === it.id ? <JobsMegaMenu navigate={navigate} close={() => setOpenMenu(null)} /> : null}
            </div>
          ))}
        </nav>

        <div className="fr-nav-cta" style={{ gap: 10, alignItems: 'center', marginLeft: 'auto' }}>
          {/* Language toggle */}
          <div style={{ display: 'flex', borderRadius: 999, overflow: 'hidden', border: `1px solid ${onPaperRoute ? 'rgba(26,26,46,0.18)' : 'rgba(255,255,255,0.2)'}`, flexShrink: 0 }}>
            {['en', 'es'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  padding: '6px 11px', fontSize: 11, fontWeight: 700,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
                  background: lang === l ? 'var(--brand-accent)' : 'transparent',
                  color: lang === l ? '#fff' : linkColor,
                  textTransform: 'uppercase',
                }}
              >{l}</button>
            ))}
          </div>
          <button
            className="fr-btn fr-btn--ghost fr-nav-cta-contact"
            onClick={() => navigate('contact')}
            style={{ padding: '10px 16px', color: linkColor, borderColor: onPaperRoute ? 'rgba(26,26,46,0.18)' : 'rgba(255,255,255,0.22)' }}
          >
            {i('Contact', 'Contacto')}
          </button>
          <Btn onClick={() => navigate('apply')} variant="primary">{i('Apply Now', 'Aplicar Ahora')}</Btn>
        </div>

        {/* Hamburger trigger — visible at narrow widths */}
        <button
          className="fr-nav-burger"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          style={{ color: linkColor }}
        >
          <span/><span/><span/>
        </button>
      </div>

      <MobileDrawer
        open={mobileOpen}
        close={() => setMobileOpen(false)}
        items={items}
        route={route}
        navigate={navigate}
      />

      <style>{`
        .fr-nav-desktop { display: flex; }
        .fr-nav-cta { display: flex; }
        .fr-nav-burger { display: none; width: 44px; height: 44px; align-items: center; justify-content: center; flex-direction: column; gap: 5px; }
        .fr-nav-burger span { width: 22px; height: 2px; background: currentColor; border-radius: 2px; display: block; }
        @media (max-width: 1180px) {
          .fr-nav-desktop { display: none !important; }
          .fr-nav-cta { margin-left: auto; }
          .fr-nav-cta .fr-nav-cta-contact { display: none; }
          .fr-nav-burger { display: inline-flex; margin-left: 12px; }
        }
        @media (max-width: 560px) {
          .fr-nav-cta { display: none !important; }
          .fr-nav-burger { margin-left: auto; }
        }
      `}</style>
    </header>
  );
}

function MobileDrawer({ open, close, items, route, navigate }) {
  const { lang, setLang } = useLang();
  const i = useT();
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 60,
        background: 'var(--brand-ink)', color: '#fff',
        animation: 'fr-rise .25s ease-out both',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <FloRideLogo onDark />
        <button onClick={close} aria-label="Close menu" style={{ width: 44, height: 44, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.Close />
        </button>
      </div>
      <nav style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflow: 'auto' }}>
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => { navigate(it.id === 'jobs' ? 'areas' : it.id); close(); }}
            style={{
              padding: '18px 4px',
              textAlign: 'left',
              fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700,
              color: route === it.id ? 'var(--brand-accent)' : '#fff',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            {it.label}
            <Icon.Arrow/>
          </button>
        ))}
      </nav>
      <div style={{ padding: 24, display: 'grid', gap: 10, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {/* Language toggle */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 4 }}>
          {['en', 'es'].map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              style={{
                flex: 1, padding: '10px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase',
                background: lang === l ? 'var(--brand-accent)' : 'rgba(255,255,255,0.08)',
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.7)',
                border: lang === l ? 'none' : '1px solid rgba(255,255,255,0.12)',
              }}
            >{l === 'en' ? 'English' : 'Español'}</button>
          ))}
        </div>
        <button className="fr-btn fr-btn--primary" onClick={() => { navigate('apply'); close(); }} style={{ justifyContent: 'center' }}>
          {i('Apply Now', 'Aplicar Ahora')} <Icon.Arrow />
        </button>
        <button className="fr-btn fr-btn--ghost on-dark" onClick={() => { navigate('contact'); close(); }} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.22)', justifyContent: 'center' }}>
          {i('Contact us', 'Contáctanos')}
        </button>
      </div>
    </div>
  );
}

function JobsMegaMenu({ navigate, close }) {
  const zones = [
    { name: 'Orlando Central', count: 12, hub: 'DFL4 Station' },
    { name: 'Winter Park / Maitland', count: 5, hub: 'DFL4 Station' },
    { name: 'Kissimmee / St. Cloud', count: 8, hub: 'DFL4 Station' },
    { name: 'Sanford / Lake Mary', count: 4, hub: 'DFL4 Station' },
    { name: 'Apopka / Ocoee', count: 6, hub: 'DFL4 Station' },
    { name: 'Lake Nona / Hunter\'s Creek', count: 7, hub: 'DFL4 Station' },
  ];
  return (
    <div
      style={{
        position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
        marginTop: 8, width: 720, padding: 0,
        background: '#fff', color: 'var(--brand-ink)',
        borderRadius: 20, boxShadow: 'var(--shadow-3)',
        border: '1px solid rgba(26,26,46,0.06)',
        overflow: 'hidden',
        animation: 'fr-rise .2s ease-out both',
      }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr' }}>
        <div style={{ padding: '20px 22px' }}>
          <div className="fr-eyebrow muted" style={{ marginBottom: 12 }}>Driver positions</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {zones.map((z) => (
              <button
                key={z.name}
                onClick={() => { navigate('areas'); close(); }}
                style={{
                  textAlign: 'left', padding: '10px 12px', borderRadius: 10,
                  display: 'flex', flexDirection: 'column', gap: 2,
                  transition: 'background .15s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brand-paper)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{z.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: 'var(--brand-accent)', background: 'rgba(255,107,53,0.1)',
                    padding: '2px 6px', borderRadius: 999,
                  }}>{z.count} open</span>
                </div>
                <span style={{ fontSize: 12, color: 'var(--brand-muted-dark)' }}>{z.hub}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ background: 'var(--brand-ink)', color: '#fff', padding: '24px 22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="fr-eyebrow on-dark" style={{ marginBottom: 10 }}>This week</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, lineHeight: 1 }}>
              49 <span style={{ color: 'var(--brand-accent)' }}>open</span>
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>
              Driver Associate positions across 6 Orlando zones.
            </div>
          </div>
          <button
            onClick={() => { navigate('apply'); close(); }}
            className="fr-btn fr-btn--primary"
            style={{ marginTop: 16, justifyContent: 'space-between', width: '100%' }}
          >
            Start application <Icon.Arrow/>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer({ navigate }) {
  const i = useT();
  return (
    <footer style={{ background: 'var(--brand-ink)', color: '#fff', padding: '72px 0 28px' }}>
      <div className="fr-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 32, alignItems: 'flex-start' }}>
          <div>
            <FloRideLogo onDark size={30} />
            <p style={{ marginTop: 14, color: 'rgba(255,255,255,0.65)', fontSize: 14, maxWidth: 320 }}>
              {i('An independent Amazon Delivery Service Partner serving Greater Orlando since 2019. On the way, the right way.',
                 'Socio independiente de entrega de Amazon sirviendo el Gran Orlando desde 2019. En camino, de la manera correcta.')}
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <span style={pill}>EEO Employer</span>
              <span style={pill}>DOT Compliant</span>
            </div>
          </div>
          <FooterCol title={i('Company', 'Empresa')} links={[
            [i('About', 'Nosotros'), 'about'], [i('Benefits', 'Beneficios'), 'benefits'], [i('Service Areas', 'Áreas'), 'areas'], ['Blog', 'blog'],
          ]} navigate={navigate} />
          <FooterCol title={i('Drivers', 'Conductores')} links={[
            [i('Apply', 'Aplicar'), 'apply'], ['FAQ', 'faq'], [i('Contact', 'Contacto'), 'contact'],
          ]} navigate={navigate} />
          <div>
            <h5 style={footerH}>{i('Talk to us', 'Contáctanos')}</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, color: 'rgba(255,255,255,0.75)', fontSize: 14 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon.Phone/> (407) 555-0100</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon.Mail/> jobs@floridedelivery.com</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ marginTop: 3 }}><Icon.Map/></span>
                <span>4401 Seaboard Rd<br/>Orlando, FL 32808</span>
              </li>
            </ul>
          </div>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid rgba(255,255,255,0.08)', margin: '40px 0 20px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
          <span>{i('© 2026 FloRide Delivery, LLC. Independent Amazon Delivery Service Partner.', '© 2026 FloRide Delivery, LLC. Socio Independiente de Entrega de Amazon.')}</span>
          <span style={{ display: 'flex', gap: 18 }}>
            <a href="#" style={{ color: 'inherit' }}>Privacy</a>
            <a href="#" style={{ color: 'inherit' }}>Terms</a>
            <a href="#" style={{ color: 'inherit' }}>Accessibility</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
const footerH = { fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#fff', margin: '0 0 14px' };
const pill = { fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)' };

function FooterCol({ title, links, navigate }) {
  return (
    <div>
      <h5 style={footerH}>{title}</h5>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map(([label, id]) => (
          <li key={id}>
            <button onClick={() => navigate(id)} style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14 }}>{label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Photo placeholder ---------- */
function Photo({ label, h = 300, light = false, style = {} }) {
  return (
    <div className={`fr-photo${light ? ' light' : ''}`} style={{ height: h, borderRadius: 'var(--r-lg)', ...style }}>
      <div className="fr-photo-label">{label}</div>
    </div>
  );
}

/* ---------- Avatar placeholder ---------- */
function Avatar({ name, size = 48 }) {
  const initials = name.split(' ').map((n) => n[0]).slice(0,2).join('');
  const palette = ['#FF6B35', '#2d2d52', '#1A1A2E', '#e8541d'];
  const idx = (name.charCodeAt(0) + name.length) % palette.length;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: palette[idx], color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: size * 0.36,
      flexShrink: 0,
    }}>{initials}</div>
  );
}

/* Export to window */
Object.assign(window, {
  FloRideLogo, Icon, Btn, Reveal, CountUp, Navbar, Footer, Photo, Avatar,
});
