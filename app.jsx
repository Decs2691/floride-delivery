/* FloRide — App shell with route state + Tweaks panel */
const { useState: useStateApp, useEffect: useEffectApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#0A1F33", "#3B9EFF"],
  "displayFont": "Syne",
  "bodyFont": "DM Sans",
  "radiusScale": 1
}/*EDITMODE-END*/;

function App() {
  const [route, setRoute] = useStateApp('home');
  const [lang, setLang] = useStateApp('en');
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [portalUser, setPortalUser] = useStateApp(null);

  // Apply tweaks to root vars
  useEffectApp(() => {
    const r = document.documentElement;
    const [ink, accent] = t.palette;
    r.style.setProperty('--brand-ink', ink);
    r.style.setProperty('--brand-accent', accent);
    r.style.setProperty('--brand-accent-deep', shade(accent, -0.18));
    r.style.setProperty('--brand-accent-2', shade(accent, 0.22));
    r.style.setProperty('--brand-ink-2', shade(ink, 0.1));
    r.style.setProperty('--brand-ink-3', shade(ink, 0.2));
    r.style.setProperty('--font-display', `"${t.displayFont}", ui-sans-serif, system-ui, sans-serif`);
    r.style.setProperty('--font-body', `"${t.bodyFont}", ui-sans-serif, system-ui, sans-serif`);
    const scale = Number(t.radiusScale) || 1;
    r.style.setProperty('--r-sm', `${6 * scale}px`);
    r.style.setProperty('--r-md', `${12 * scale}px`);
    r.style.setProperty('--r-lg', `${20 * scale}px`);
    r.style.setProperty('--r-xl', `${28 * scale}px`);
    r.style.setProperty('--r-pill', `${999}px`);
  }, [t.palette, t.displayFont, t.bodyFont, t.radiusScale]);

  // Inject google fonts dynamically when tweaks switch fonts
  useEffectApp(() => {
    const fonts = new Set([t.displayFont, t.bodyFont]);
    fonts.forEach((f) => {
      const id = 'fr-gfont-' + f.replace(/\s+/g, '-');
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(f)}:wght@400;500;600;700;800&display=swap`;
      document.head.appendChild(link);
    });
  }, [t.displayFont, t.bodyFont]);

  // Scroll-to-top on route change
  useEffectApp(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  const navigate = (r) => setRoute(r);

  // Portal renders standalone — no FloRide navbar/footer
  if (route === 'portal') {
    return (
      <LangContext.Provider value={{ lang, setLang }}>
        <PortalPage user={portalUser} setUser={(u) => { setPortalUser(u); if (!u) setRoute('home'); }} />
      </LangContext.Provider>
    );
  }

  let Page;
  switch (route) {
    case 'about':    Page = <AboutPage navigate={navigate} />; break;
    case 'benefits': Page = <BenefitsPage navigate={navigate} />; break;
    case 'apply':    Page = <ApplyPage navigate={navigate} />; break;
    case 'areas':    Page = <AreasPage navigate={navigate} />; break;
    case 'faq':      Page = <FAQPage navigate={navigate} />; break;
    case 'blog':     Page = <BlogPage navigate={navigate} />; break;
    case 'contact':  Page = <ContactPage navigate={navigate} />; break;
    default:         Page = <HomePage navigate={navigate} />;
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div data-screen-label={`Page: ${route}`}>
        <Navbar route={route} navigate={navigate} />
        {Page}
        <Footer navigate={navigate} />
        <FloRideTweaks t={t} setTweak={setTweak} />
      </div>
    </LangContext.Provider>
  );
}

/* ---------- Tweaks panel ---------- */
function FloRideTweaks({ t, setTweak }) {
  const palettes = [
    ['#1A1A2E', '#FF6B35'], // FloRide (Florida orange)
    ['#0E2A2A', '#00B383'], // Verdant DSP (forest)
    ['#1B1530', '#A569FF'], // Aurora DSP (violet)
    ['#2C1810', '#E8A317'], // Sunset DSP (amber)
    ['#0A1F33', '#3B9EFF'], // Coastal DSP (blue)
    ['#1E1E1E', '#E63946'], // Crimson
  ];
  const displayFonts = ['Syne', 'Space Grotesk', 'Bricolage Grotesque', 'Outfit', 'Manrope'];
  const bodyFonts = ['DM Sans', 'Inter', 'Manrope', 'IBM Plex Sans', 'Outfit'];
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Brand palette">
        <TweakColor
          label="Ink + accent"
          value={t.palette}
          options={palettes}
          onChange={(v) => setTweak('palette', v)}
        />
      </TweakSection>
      <TweakSection label="Display font">
        <TweakSelect
          label="Headings"
          value={t.displayFont}
          options={displayFonts}
          onChange={(v) => setTweak('displayFont', v)}
        />
      </TweakSection>
      <TweakSection label="Body font">
        <TweakSelect
          label="Body"
          value={t.bodyFont}
          options={bodyFonts}
          onChange={(v) => setTweak('bodyFont', v)}
        />
      </TweakSection>
      <TweakSection label="Corner radius">
        <TweakSlider
          label="Scale"
          value={t.radiusScale}
          min={0}
          max={1.6}
          step={0.1}
          unit="×"
          onChange={(v) => setTweak('radiusScale', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ---------- helper: hex shade ---------- */
function shade(hex, amount) {
  // amount in [-1..1]; negative=darker, positive=lighter
  const h = (hex || '#000').replace('#','');
  const num = parseInt(h.length === 3 ? h.split('').map((c) => c+c).join('') : h, 16);
  let r = (num >> 16) & 0xff, g = (num >> 8) & 0xff, b = num & 0xff;
  const adj = (c) => Math.max(0, Math.min(255, Math.round(c + (amount > 0 ? (255 - c) * amount : c * amount))));
  r = adj(r); g = adj(g); b = adj(b);
  return `#${((1<<24) + (r<<16) + (g<<8) + b).toString(16).slice(1)}`;
}

/* ---------- Boot ---------- */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
