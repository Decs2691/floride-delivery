/* FloRide — Home page */
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

function HomePage({ navigate }) {
  return (
    <main>
      <Hero navigate={navigate} />
      <ImpactNumbers />
      <CulturePillars />
      <DSPExplainer />
      <BenefitsPreview navigate={navigate} />
      <DriverDay />
      <Testimonials />
      <AreasPreview navigate={navigate} />
      <FinalCTA navigate={navigate} />
    </main>
  );
}

/* ---------- HERO ---------- */
function Hero({ navigate }) {
  const i = useT();
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      color: '#fff',
      paddingTop: 'calc(var(--navbar-h) + 24px)',
      paddingBottom: 80,
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'var(--brand-ink)',
    }}>
      {/* "video" background — animated placeholder */}
      <HeroBackdrop />

      <div className="fr-container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: 920 }}>
          <Reveal>
            <div className="fr-eyebrow on-dark" style={{ marginBottom: 22 }}>
              {i('Orlando, Florida · Hiring now', 'Orlando, Florida · Contratando ahora')}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="fr-h1" style={{ color: '#fff' }}>
              {i('On the way,', 'En camino,')}<br/>
              {i('the ', '')}<span style={{ color: 'var(--brand-accent)', fontStyle: 'italic' }}>{i('right way.', 'de la manera correcta.')}</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="fr-lede on-dark" style={{ marginTop: 22 }}>
              {i(
                'FloRide Delivery is an independent Amazon Delivery Service Partner based in Orlando, FL. We deliver every package with care and a commitment to exceptional service — and we take care of our drivers the same way.',
                'FloRide Delivery es un socio independiente de entrega de Amazon en Orlando, FL. Entregamos cada paquete con cuidado y un compromiso con el servicio excepcional — y cuidamos a nuestros conductores de la misma manera.'
              )}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ display: 'flex', gap: 12, marginTop: 36, flexWrap: 'wrap' }}>
              <button className="fr-btn fr-btn--primary" onClick={() => navigate('apply')}>
                {i('Apply Now — Positions Open', 'Aplicar Ahora — Posiciones Abiertas')}
                <Icon.Arrow />
              </button>
              <button className="fr-btn fr-btn--ghost on-dark" onClick={() => navigate('benefits')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.22)' }}>
                {i('See full benefits', 'Ver beneficios completos')}
              </button>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div style={{ display: 'flex', gap: 30, marginTop: 64, flexWrap: 'wrap' }}>
              <HeroStat label={i('Founded', 'Fundado')} value="2019" />
              <HeroStat label={i('Drivers strong', 'Conductores')} value="160+" />
              <HeroStat label={i('Station', 'Estación')} value="DFL4 · Orlando" />
            </div>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em',
          color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase',
        }}>
          <span>{i('Scroll', 'Bajar')}</span>
          <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 10,
              background: 'var(--brand-accent)',
              animation: 'fr-scroll-bounce 1.8s ease-in-out infinite',
            }}/>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }) {
  return (
    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.18)', paddingLeft: 16 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, marginTop: 4 }}>{value}</div>
    </div>
  );
}

/* Animated hero backdrop — simulates a driving video with parallax stripes */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* photo placeholder */}
      <div className="fr-photo" style={{
        position: 'absolute', inset: 0, borderRadius: 0,
        background: 'radial-gradient(120% 80% at 70% 30%, #2a2a4a 0%, #1a1a2e 50%, #0f0f24 100%)',
      }} />
      {/* moving stripes — feels like road */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(115deg, rgba(59,158,255,0.07) 0 1px, transparent 1px 80px)',
        animation: 'fr-stripes 14s linear infinite',
      }}/>
      <style>{`@keyframes fr-stripes { from { background-position: 0 0 } to { background-position: 800px 0 } }`}</style>
      {/* glow */}
      <div style={{
        position: 'absolute', right: '-10%', top: '20%', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(255,107,53,0.35), transparent 60%)',
        filter: 'blur(20px)',
      }} />
      {/* photo label */}
      <div style={{
        position: 'absolute', right: 24, bottom: 24, fontFamily: 'var(--font-mono)',
        fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.35)',
        padding: '8px 12px', borderRadius: 6, backdropFilter: 'blur(6px)',
      }}>
        [ Video loop: branded delivery van on Orlando route ]
      </div>
      {/* bottom gradient for legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(26,26,46,0.2) 0%, rgba(26,26,46,0.4) 50%, rgba(26,26,46,0.92) 100%)',
      }}/>
    </div>
  );
}

/* ---------- IMPACT NUMBERS ---------- */
function ImpactNumbers() {
  const i = useT();
  const stats = [
    { k: '6+', label: i('Years operating', 'Años operando'), sub: i('in Greater Orlando since 2019', 'en el Gran Orlando desde 2019') },
    { k: '160+', label: i('Drivers strong', 'Conductores'), sub: i('at our DFL4 station', 'en nuestra estación DFL4') },
    { k: 'Top', label: i('Safety record', 'Récord de seguridad'), sub: i('committed to safety first', 'comprometidos con la seguridad') },
    { k: '1,000+', label: i('Daily deliveries', 'Entregas diarias'), sub: i('every single day', 'todos los días') },
  ];
  return (
    <section className="surface-ink" style={{ padding: '0', position: 'relative' }}>
      <div className="fr-container" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }} className="fr-impact-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div style={{
                padding: '12px 24px',
                borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}>
                <ImpactNumber raw={s.k} />
                <div style={{ marginTop: 12, fontWeight: 600, fontSize: 15, color: '#fff' }}>{s.label}</div>
                <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .fr-impact-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .fr-impact-grid > * > div { border-left: none !important; padding-left: 0 !important; }
        }
      `}</style>
    </section>
  );
}

function ImpactNumber({ raw }) {
  // Parse number out of raw string ('5,000+' -> 5000), keep prefix/suffix
  const m = raw.match(/^(#?)([\d,]+)?(.*)$/);
  if (!m || !m[2]) {
    return <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{raw}</div>;
  }
  const num = parseInt(m[2].replace(/,/g,''), 10);
  return (
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 800, color: '#fff', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: 2 }}>
      <span style={{ color: 'var(--brand-accent)' }}>{m[1]}</span>
      <CountUp to={num} />
      <span>{m[3]}</span>
    </div>
  );
}

/* ---------- CULTURE PILLARS ---------- */
function CulturePillars() {
  const i = useT();
  const pillars = [
    {
      icon: <Icon.Shield />,
      title: i('Committed to safety', 'Compromiso con la seguridad'),
      body: i('Daily van inspections, weekly safety huddles, and a no-questions-asked policy if a route ever feels unsafe.', 'Inspecciones diarias de vans, reuniones de seguridad semanales y política sin preguntas si una ruta parece insegura.'),
      stat: '0.4',
      statLabel: i('incidents per 100k miles · industry-leading', 'incidentes por 100k millas · líder en la industria'),
    },
    {
      icon: <Icon.Team />,
      title: i('Driven by our team', 'Impulsado por nuestro equipo'),
      body: i("Dispatchers, trainers, mechanics, drivers — all on the same page. If something's broken, we hear it and fix it the same day.", 'Despachadores, entrenadores, mecánicos, conductores — todos en la misma página. Si algo está mal, lo escuchamos y lo arreglamos el mismo día.'),
      stat: '160+',
      statLabel: i("drivers and growing · Orlando's DFL4 station", 'conductores y creciendo · Estación DFL4, Orlando'),
    },
    {
      icon: <Icon.Heart />,
      title: i('Community first', 'La comunidad primero'),
      body: i('We back local — youth sports, hurricane relief drives, Toys for Tots. The people on our routes are the people we live with.', 'Apoyamos lo local — deportes juveniles, ayuda por huracanes, Toys for Tots. Las personas en nuestras rutas son con quienes vivimos.'),
      stat: '$48k',
      statLabel: i('donated to Central Florida nonprofits in 2025', 'donados a organizaciones sin fines de lucro en 2025'),
    },
  ];
  return (
    <section className="fr-section surface-paper">
      <div className="fr-container">
        <Reveal>
          <div className="fr-eyebrow">{i('Our culture', 'Nuestra cultura')}</div>
          <h2 className="fr-h2" style={{ marginTop: 14, maxWidth: 18 + 'ch' }}>
            {i("Three things we won't compromise on.", 'Tres cosas en las que no cedemos.')}
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 56 }} className="fr-pillars-grid">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <article style={{
                background: '#fff',
                borderRadius: 'var(--r-lg)',
                padding: 28,
                height: '100%',
                boxShadow: 'var(--shadow-2)',
                border: '1px solid rgba(26,26,46,0.04)',
                display: 'flex', flexDirection: 'column',
                gap: 18,
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: 'var(--brand-ink)',
                  color: 'var(--brand-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{p.icon}</div>
                <h3 className="fr-h3" style={{ fontSize: 24 }}>{p.title}</h3>
                <p style={{ color: 'var(--brand-muted-dark)', fontSize: 15.5, lineHeight: 1.6 }}>{p.body}</p>
                <div style={{
                  marginTop: 'auto',
                  paddingTop: 18,
                  borderTop: '1px dashed rgba(26,26,46,0.12)',
                  display: 'flex', alignItems: 'baseline', gap: 10,
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--brand-ink)' }}>{p.stat}</span>
                  <span style={{ fontSize: 12, color: 'var(--brand-muted-dark)', lineHeight: 1.4 }}>{p.statLabel}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <style>{`@media (max-width: 880px) { .fr-pillars-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}

/* ---------- DSP EXPLAINER ---------- */
function DSPExplainer() {
  const i = useT();
  return (
    <section className="fr-section surface-white">
      <div className="fr-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 80, alignItems: 'center' }}>
        <Reveal>
          <Photo label="Photo · drivers loading van at sunrise" h={460} style={{ borderRadius: 24 }} />
        </Reveal>
        <Reveal delay={120}>
          <div className="fr-eyebrow">{i("Wait — what's a DSP?", '¿Qué es un DSP?')}</div>
          <h2 className="fr-h2" style={{ marginTop: 14 }}>
            {i("We're not Amazon. We're the local team Amazon trusts to get packages to your door.", 'No somos Amazon. Somos el equipo local en quien Amazon confía para llevar paquetes a tu puerta.')}
          </h2>
          <p className="fr-lede" style={{ marginTop: 22 }}>
            {i(
              'A Delivery Service Partner (DSP) is an independently-owned company that runs last-mile delivery routes for Amazon. Amazon supplies the packages, the routing software, and the branded vans. We hire and pay the drivers, run the station operations, and own the relationship with our team.',
              'Un Socio de Servicio de Entrega (DSP) es una empresa independiente que opera rutas de entrega de última milla para Amazon. Amazon suministra los paquetes, el software de rutas y las vans. Nosotros contratamos y pagamos a los conductores, operamos la estación y somos responsables de nuestro equipo.'
            )}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 14 }}>
            {[
              [i('Local owners', 'Dueños locales'), i('FloRide Delivery is independently owned & operated in Orlando, FL — not a national franchise.', 'FloRide Delivery es una empresa independiente en Orlando, FL — no una franquicia nacional.')],
              [i('Real W-2 jobs', 'Empleos W-2 reales'), i('Hourly wage, benefits, PTO. Not contractor work, not gig work.', 'Salario por hora, beneficios, tiempo libre pagado. No trabajo por contrato.')],
              [i('Amazon-branded vans', 'Vans con marca Amazon'), i('You drive a Rivian or Ford Transit we maintain — no personal vehicle wear & tear.', 'Conduces una Rivian o Ford Transit que nosotros mantenemos — sin desgaste de tu vehículo personal.')],
            ].map(([t, b]) => (
              <li key={t} style={{ display: 'grid', gridTemplateColumns: '22px 1fr', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ marginTop: 2, color: 'var(--brand-accent)' }}><Icon.Check /></span>
                <span><strong style={{ color: 'var(--brand-ink)' }}>{t}.</strong> <span style={{ color: 'var(--brand-muted-dark)' }}>{b}</span></span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <style>{`@media (max-width: 980px) { section.fr-section.surface-white > .fr-container { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
    </section>
  );
}

/* ---------- BENEFITS PREVIEW ---------- */
function BenefitsPreview({ navigate }) {
  const i = useT();
  const benefits = [
    { icon: <Icon.Dollar/>, title: i('Competitive pay', 'Salario competitivo'), body: i('Starting wage + weekly pay, overtime, and holiday pay.', 'Salario base + pago semanal, horas extra y festivos.') },
    { icon: <Icon.Health/>, title: i('Health, dental & vision', 'Seguro médico, dental y visión'), body: i('70% employer-covered. Eligible at day 60.', '70% pagado por la empresa. Elegible desde el día 60.') },
    { icon: <Icon.Pig/>, title: i('401(k) with match', '401(k) con contribución'), body: i('Up to 4% employer match. Vests immediately.', 'Hasta 4% de aportación del empleador. Disponible desde el día 1.') },
    { icon: <Icon.Calendar/>, title: i('Paid time off', 'Tiempo libre pagado'), body: i('2 weeks PTO + 6 paid holidays.', '2 semanas de vacaciones + 6 días festivos pagados.') },
    { icon: <Icon.Book/>, title: i('Tuition reimbursement', 'Reembolso de estudios'), body: i('Up to $5,250/yr for accredited programs.', 'Hasta $5,250/año para programas acreditados.') },
    { icon: <Icon.Bolt/>, title: i('Performance bonuses', 'Bonos de rendimiento'), body: i('Quarterly bonuses up to $1,200.', 'Bonos trimestrales de hasta $1,200.') },
    { icon: <Icon.Van/>, title: i('Company van provided', 'Van de la empresa'), body: i('We supply the van, fuel, and maintenance.', 'Proporcionamos la van, combustible y mantenimiento.') },
    { icon: <Icon.Gift/>, title: i('Referral bonus', 'Bono por referidos'), body: i('$750 when a friend you refer hits 90 days.', '$750 cuando un amigo que refieras completa 90 días.') },
  ];
  return (
    <section className="fr-section surface-paper">
      <div className="fr-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, flexWrap: 'wrap', marginBottom: 48 }}>
          <Reveal>
            <div className="fr-eyebrow">{i('Benefits', 'Beneficios')}</div>
            <h2 className="fr-h2" style={{ marginTop: 14, maxWidth: 16 + 'ch' }}>
              {i('The whole package — not just a paycheck.', 'El paquete completo — no solo un cheque.')}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <button className="fr-btn fr-btn--ghost" onClick={() => navigate('benefits')}>
              {i('See full benefits page', 'Ver página de beneficios completos')} <Icon.Arrow/>
            </button>
          </Reveal>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="fr-benefits-grid">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 50}>
              <div style={{
                background: '#fff',
                borderRadius: 'var(--r-lg)',
                padding: 22,
                height: '100%',
                border: '1px solid rgba(26,26,46,0.05)',
                transition: 'transform .2s ease, box-shadow .2s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: 'rgba(255,107,53,0.1)',
                  color: 'var(--brand-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 14,
                }}>{b.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontSize: 13.5, color: 'var(--brand-muted-dark)', lineHeight: 1.5 }}>{b.body}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <style>{`
          @media (max-width: 1080px) { .fr-benefits-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 600px) { .fr-benefits-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- DRIVER DAY TIMELINE ---------- */
function DriverDay() {
  const i = useT();
  const day = [
    { t: '8:00 AM', label: i('Station arrival', 'Llegada a la estación'), detail: i('Clock in, grab coffee, run your van pre-check with dispatch.', 'Registra tu entrada, toma un café, revisa la van con el despachador.') },
    { t: '9:00 AM', label: i('Load packages', 'Cargar paquetes'), detail: i('Route briefing with your DA team. ~250 packages, color-coded by stop sequence.', 'Briefing de ruta con tu equipo. ~250 paquetes, codificados por secuencia de paradas.') },
    { t: '10:00 AM', label: i('Hit the road', 'A la carretera'), detail: i('Routes typically cover 18–28 miles, mostly residential.', 'Las rutas cubren 18–28 millas, mayormente residenciales.') },
    { t: '1:00 PM', label: i('Midday break', 'Descanso del mediodía'), detail: i('30-min lunch, check-in with dispatch on any rescues needed.', '30 min de almuerzo, check-in con el despachador.') },
    { t: '3:00 PM', label: i('Afternoon stops', 'Paradas de la tarde'), detail: i('Most homes are now showing porch activity — friendlier deliveries.', 'La mayoría de los hogares están más accesibles — entregas más amigables.') },
    { t: '6:30 PM', label: i('Final stops', 'Paradas finales'), detail: i('Most drivers wrap their last package between 6:30 and 7:00 PM.', 'La mayoría de los conductores terminan entre las 6:30 y 7:00 PM.') },
    { t: '7:30 PM', label: i('End of shift', 'Fin del turno'), detail: i('Return to station, fuel up, debrief. Home for dinner.', 'Regresa a la estación, recarga combustible, cierre. A casa a cenar.') },
  ];
  const [active, setActive] = useStateH(2);
  return (
    <section className="fr-section surface-ink">
      <div className="fr-container">
        <Reveal>
          <div className="fr-eyebrow on-dark">{i('A day on the route', 'Un día en la ruta')}</div>
          <h2 className="fr-h2" style={{ color: '#fff', marginTop: 14, maxWidth: 20 + 'ch' }}>
            {i('Predictable hours.', 'Horarios predecibles.')}<br/>{i('No surprises.', 'Sin sorpresas.')}
          </h2>
          <p className="fr-lede on-dark" style={{ marginTop: 18 }}>
            {i(
              "Most shifts run 10 hours, four days a week. You'll have the same dispatcher, the same van, and roughly the same neighborhood every week.",
              'La mayoría de los turnos son de 10 horas, cuatro días a la semana. Tendrás el mismo despachador, la misma van y aproximadamente el mismo vecindario cada semana.'
            )}
          </p>
        </Reveal>

        <div style={{ marginTop: 56, position: 'relative' }}>
          {/* desktop horizontal timeline */}
          <div className="fr-day-timeline" style={{ display: 'grid', gridTemplateColumns: `repeat(${day.length}, 1fr)`, gap: 0, position: 'relative' }}>
            {/* Track */}
            <div style={{ position: 'absolute', top: 24, left: '7%', right: '7%', height: 2, background: 'rgba(255,255,255,0.1)' }} />
            <div style={{
              position: 'absolute', top: 24, left: '7%', width: `${(active / (day.length - 1)) * 86}%`,
              height: 2, background: 'var(--brand-accent)', transition: 'width .4s ease',
            }} />

            {day.map((d, i) => (
              <button
                key={d.t}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  paddingTop: 0, position: 'relative', textAlign: 'center', gap: 14,
                  cursor: 'pointer',
                }}
              >
                <div style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: i <= active ? 'var(--brand-accent)' : 'var(--brand-ink-3)',
                  border: i === active ? '4px solid var(--brand-accent)' : `2px solid ${i <= active ? 'var(--brand-accent)' : 'rgba(255,255,255,0.2)'}`,
                  marginTop: 18, transition: 'all .2s ease',
                  outline: i === active ? '6px solid rgba(255,107,53,0.18)' : 'none',
                }}/>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: i === active ? 'var(--brand-accent)' : 'rgba(255,255,255,0.55)' }}>{d.t}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: i === active ? '#fff' : 'rgba(255,255,255,0.7)', maxWidth: 120 }}>{d.label}</div>
              </button>
            ))}
          </div>

          <div style={{
            marginTop: 40, padding: 30,
            background: 'var(--brand-ink-2)',
            borderRadius: 'var(--r-lg)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'grid', gridTemplateColumns: '180px 1fr', gap: 28, alignItems: 'center',
          }} className="fr-day-detail">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 700, color: 'var(--brand-accent)' }}>
              {day[active].t}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
                {day[active].label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.6 }}>{day[active].detail}</div>
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .fr-day-timeline { grid-template-columns: 1fr 1fr 1fr 1fr !important; row-gap: 32px; }
            .fr-day-timeline > div { display: none !important; }
            .fr-day-detail { grid-template-columns: 1fr !important; gap: 12px !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  const i = useT();
  const quotes = [
    {
      name: 'Marcus Reyes',
      tenure: i('Driver Associate · 3 yrs', 'Conductor Asociado · 3 años'),
      stars: 5,
      quote: i('I came from rideshare. The pay is better, the van is provided, and I actually know when my shift ends. I bought my first house this year.', 'Venía de rideshare. El pago es mejor, la van está incluida y sé cuándo termina mi turno. Compré mi primera casa este año.'),
    },
    {
      name: 'Daniela Cortés',
      tenure: i('Lead Trainer · 2 yrs', 'Entrenadora Principal · 2 años'),
      stars: 5,
      quote: i("They promoted me into training six months in. I help new drivers run their first week — it's the most stable job I've ever had.", 'Me promovieron a entrenadora a los seis meses. Ayudo a nuevos conductores en su primera semana — es el trabajo más estable que he tenido.'),
    },
    {
      name: 'James Whitaker',
      tenure: i('Driver Associate · 4 yrs', 'Conductor Asociado · 4 años'),
      stars: 5,
      quote: i('Dispatchers actually listen. If a route is impossible they fix it the next day. That alone makes this place different.', 'Los despachadores realmente escuchan. Si una ruta es imposible, la arreglan al día siguiente. Eso solo ya hace diferente este lugar.'),
    },
  ];
  return (
    <section className="fr-section surface-paper">
      <div className="fr-container">
        <Reveal>
          <div className="fr-eyebrow">{i('From the team', 'Del equipo')}</div>
          <h2 className="fr-h2" style={{ marginTop: 14, maxWidth: 18 + 'ch' }}>
            {i("Don't take our word for it.", 'No te quedes solo con nuestra palabra.')}
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 56 }} className="fr-testi-grid">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 100}>
              <article style={{
                background: '#fff',
                borderRadius: 'var(--r-lg)',
                padding: 28,
                height: '100%',
                boxShadow: 'var(--shadow-2)',
                border: '1px solid rgba(26,26,46,0.04)',
                display: 'flex', flexDirection: 'column', gap: 18,
                position: 'relative',
              }}>
                <div style={{ display: 'flex', gap: 4, color: 'var(--brand-accent)' }}>
                  {Array.from({ length: q.stars }).map((_, k) => <Icon.Star key={k} />)}
                </div>
                <p style={{ fontSize: 16.5, color: 'var(--brand-ink)', lineHeight: 1.55, fontWeight: 500 }}>
                  "{q.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto', paddingTop: 18, borderTop: '1px solid rgba(26,26,46,0.08)' }}>
                  <Avatar name={q.name} size={44} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{q.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--brand-muted-dark)' }}>{q.tenure}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <style>{`
          @media (max-width: 980px) { .fr-testi-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </section>
  );
}

/* ---------- SERVICE AREAS PREVIEW ---------- */
function AreasPreview({ navigate }) {
  const i = useT();
  const zones = [
    'Orlando Central', 'Winter Park', 'Maitland', 'Kissimmee',
    'St. Cloud', 'Sanford', 'Lake Mary', 'Apopka', 'Ocoee', 'Lake Nona',
    "Hunter's Creek", 'Altamonte Springs', 'Casselberry', 'Oviedo',
  ];
  return (
    <section className="fr-section surface-white">
      <div className="fr-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 60, alignItems: 'center' }} >
        <Reveal>
          <AreasMap />
        </Reveal>
        <Reveal delay={120}>
          <div className="fr-eyebrow">{i('Where we drive', 'Dónde manejamos')}</div>
          <h2 className="fr-h2" style={{ marginTop: 14 }}>
            {i('Greater Orlando, end to end.', 'El Gran Orlando, de punta a punta.')}
          </h2>
          <p className="fr-lede" style={{ marginTop: 18 }}>
            {i('One delivery station, fourteen zones, every neighborhood in Orange, Seminole, and Osceola counties.', 'Una estación de entrega, catorce zonas, cada vecindario en los condados Orange, Seminole y Osceola.')}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 28 }}>
            {zones.map((z) => (
              <span key={z} style={{
                fontSize: 13, fontWeight: 500,
                padding: '8px 14px', borderRadius: 999,
                background: 'var(--brand-paper)',
                border: '1px solid rgba(26,26,46,0.08)',
                color: 'var(--brand-ink)',
              }}>{z}</span>
            ))}
          </div>
          <button className="fr-btn fr-btn--ghost" onClick={() => navigate('areas')} style={{ marginTop: 28 }}>
            {i('See full coverage map', 'Ver mapa de cobertura completo')} <Icon.Arrow/>
          </button>
        </Reveal>
      </div>
      <style>{`@media (max-width: 980px) { section.surface-white .fr-container { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

function AreasMap({ height = 420 }) {
  // Stylized Orlando-area zones (abstract — not a real geographic map)
  return (
    <div style={{
      position: 'relative',
      height,
      borderRadius: 24,
      background: 'var(--brand-ink)',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <svg viewBox="0 0 400 320" style={{ width: '100%', height: '100%' }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.07)"/>
          </pattern>
        </defs>
        <rect width="400" height="320" fill="url(#dots)"/>
        {/* "Roads" */}
        <path d="M0 180 Q120 140 200 170 T 400 150" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        <path d="M210 0 Q200 100 220 180 T 230 320" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>
        <path d="M0 80 Q140 90 230 60 T 400 90" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none"/>

        {/* Zone bubbles */}
        {[
          {x: 200, y: 170, r: 38, name: 'Orlando Central'},
          {x: 250, y: 95, r: 22, name: 'Winter Park'},
          {x: 130, y: 230, r: 26, name: 'Kissimmee'},
          {x: 260, y: 50, r: 18, name: 'Sanford'},
          {x: 100, y: 130, r: 20, name: 'Apopka'},
          {x: 305, y: 220, r: 22, name: 'Lake Nona'},
          {x: 320, y: 130, r: 16, name: 'Oviedo'},
        ].map((z, i) => (
          <g key={z.name}>
            <circle cx={z.x} cy={z.y} r={z.r} fill="rgba(255,107,53,0.15)" stroke="var(--brand-accent)" strokeWidth="1"/>
            <circle cx={z.x} cy={z.y} r="3" fill="var(--brand-accent)"/>
            <text x={z.x} y={z.y - z.r - 6} fill="rgba(255,255,255,0.85)" textAnchor="middle" fontSize="9" fontFamily="DM Sans" fontWeight="600">
              {z.name}
            </text>
          </g>
        ))}

        {/* Station markers */}
        {[{x: 200, y: 165, n: 'DFL4'}].map((s) => (
          <g key={s.n}>
            <rect x={s.x - 14} y={s.y - 7} width="28" height="14" rx="2" fill="var(--brand-accent)"/>
            <text x={s.x} y={s.y + 3} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono">{s.n}</text>
          </g>
        ))}
      </svg>
      <div style={{
        position: 'absolute', top: 18, left: 18, display: 'flex', gap: 8, alignItems: 'center',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.55)',
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--brand-accent)' }} />
        Coverage map · Greater Orlando
      </div>
    </div>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA({ navigate }) {
  const i = useT();
  return (
    <section style={{ padding: '80px 0 120px', background: 'var(--brand-paper)' }}>
      <div className="fr-container">
        <div style={{
          background: 'var(--brand-ink)',
          color: '#fff',
          borderRadius: 32,
          padding: 'clamp(40px, 7vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'center',
        }} className="fr-final-cta">
          <div style={{
            position: 'absolute', right: -100, top: -120, width: 500, height: 500,
            background: 'radial-gradient(circle, rgba(59,158,255,0.35), transparent 60%)',
            filter: 'blur(40px)',
          }} />
          <div style={{ position: 'relative' }}>
            <div className="fr-eyebrow on-dark">{i('Ready to drive?', '¿Listo para manejar?')}</div>
            <h2 className="fr-h2" style={{ color: '#fff', marginTop: 14 }}>
              {i('Apply today. Drive next month.', 'Aplica hoy. Maneja el próximo mes.')}
            </h2>
            <p className="fr-lede on-dark" style={{ marginTop: 18 }}>
              {i(
                "Our process takes about 8 minutes online. We'll get back to you within 48 hours and most drivers are on a route within 3 weeks of applying.",
                'Nuestro proceso toma unos 8 minutos en línea. Te contactaremos en 48 horas y la mayoría de los conductores están en una ruta en 3 semanas.'
              )}
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="fr-btn fr-btn--primary" onClick={() => navigate('apply')}>
                {i('Apply now', 'Aplicar ahora')} <Icon.Arrow/>
              </button>
              <button className="fr-btn fr-btn--ghost on-dark" onClick={() => navigate('faq')} style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.22)' }}>
                {i('Read the FAQ', 'Leer las preguntas frecuentes')}
              </button>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'grid', gap: 12 }}>
            <CTAStat label={i('Application time', 'Tiempo de aplicación')} value="~8 min" />
            <CTAStat label={i('Response within', 'Respuesta en')} value="48 hrs" />
            <CTAStat label={i('On road within', 'En ruta en')} value="3 weeks" />
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) { .fr-final-cta { grid-template-columns: 1fr !important; gap: 32px !important; } }
        `}</style>
      </div>
    </section>
  );
}

function CTAStat({ label, value }) {
  return (
    <div style={{
      padding: '20px 24px',
      borderRadius: 16,
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--brand-accent)' }}>{value}</span>
    </div>
  );
}

Object.assign(window, { HomePage, AreasMap, FinalCTA, CTAStat });
