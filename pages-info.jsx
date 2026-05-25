/* FloRide Delivery — informational pages: About, Benefits, Areas, FAQ, Blog, Contact */
const { useState: useStateI } = React;

/* ---------- Generic page header ---------- */
function PageHeader({ eyebrow, title, lede, children }) {
  return (
    <section style={{
      paddingTop: 'calc(var(--navbar-h) + 64px)',
      paddingBottom: 48,
      background: 'var(--brand-paper)',
      borderBottom: '1px solid rgba(26,26,46,0.06)',
    }}>
      <div className="fr-container">
        <Reveal>
          <div className="fr-eyebrow">{eyebrow}</div>
          <h1 className="fr-h1" style={{ marginTop: 16, fontSize: 'clamp(40px, 5vw, 64px)' }}>{title}</h1>
          {lede ? <p className="fr-lede" style={{ marginTop: 22, fontSize: 19 }}>{lede}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

/* ============== ABOUT ============== */
function AboutPage({ navigate }) {
  const i = useT();
  const values = [
    { k: i('Show up', 'Preséntate'), t: i('Show up for each other.', 'Preséntate el uno por el otro.'), b: i("A 250-stop route is hard. We have each other's back when it gets hard.", 'Una ruta de 250 paradas es difícil. Nos apoyamos mutuamente cuando se pone duro.') },
    { k: i('Own it', 'Responsabilízate'), t: i('Own the route.', 'Hazte dueño de la ruta.'), b: i('Your van, your stops, your customers. We back you to make the call.', 'Tu van, tus paradas, tus clientes. Te respaldamos para que tomes decisiones.') },
    { k: i('Be honest', 'Sé honesto'), t: i('Be honest, fast.', 'Sé honesto, rápido.'), b: i("A problem you flag at 9 AM is a 30-min fix. At 6 PM, it's a crisis.", 'Un problema que reportas a las 9 AM se arregla en 30 min. A las 6 PM, es una crisis.') },
    { k: i('Get home', 'Llega a casa'), t: i('Get home on time.', 'Llega a casa a tiempo.'), b: i('Your shift ends so the next part of your life can start.', 'Tu turno termina para que el resto de tu vida pueda comenzar.') },
  ];
  const team = [
    { name: 'Logan Jack', role: 'Owner & General Manager', tenure: 'Since 2019' },
    { name: 'Operations Lead', role: 'Station Operations', tenure: 'DFL4 · Orlando' },
    { name: 'Safety Manager', role: 'Fleet & Safety', tenure: 'Committed to safety first' },
    { name: 'Dispatch Team', role: 'Driver Support', tenure: 'Here for you on every route' },
  ];
  const timeline = [
    { year: '2019', t: 'Founded', b: 'Logan Jack launches LLM Delivery with an Amazon DSP contract and a commitment to exceptional service in Orlando, FL.' },
    { year: '2020', t: 'Growing the team', b: 'Expanded driver count and delivery zones across Greater Orlando. Safety-first culture established from day one.' },
    { year: '2023', t: 'DFL4 station', b: 'Operating out of Amazon\'s DFL4 station at 4401 Seaboard Rd, Orlando — serving Orange, Seminole, and Osceola counties.' },
    { year: '2026', t: 'Today', b: '160+ drivers strong. On the way, the right way — every package, every day.' },
  ];
  return (
    <>
      <PageHeader
        eyebrow={i('About FloRide', 'Sobre FloRide')}
        title={i('Local owners. Real W-2 jobs. A team that sticks.', 'Dueños locales. Empleos W-2 reales. Un equipo que se queda.')}
        lede={i("FloRide is independently owned by Orlando residents. We started in 2019 with one route and one belief: drivers do their best work when they're paid well, treated right, and home for dinner.", 'FloRide es una empresa independiente de residentes de Orlando. Comenzamos en 2019 con una ruta y una convicción: los conductores trabajan mejor cuando se les paga bien, se les trata con respeto y llegan a casa a cenar.')}
      />

      <section className="fr-section surface-white">
        <div className="fr-container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 56, alignItems: 'center' }} >
          <Reveal>
            <Photo label="Photo · Logan & the team at DFL4" h={460} style={{ borderRadius: 24 }} />
          </Reveal>
          <Reveal delay={120}>
            <div className="fr-eyebrow">{i('Our mission', 'Nuestra misión')}</div>
            <h2 className="fr-h2" style={{ marginTop: 14 }}>{i('Be the DSP people brag about working at.', 'Ser el DSP del que la gente presume que trabaja.')}</h2>
            <p className="fr-lede" style={{ marginTop: 18 }}>
              {i("The delivery industry has a reputation problem — burnout, churn, drivers treated as disposable. We're trying to be the opposite of that. The work is hard; the company shouldn't be.", 'La industria de entrega tiene un problema de reputación — agotamiento, rotación alta, conductores tratados como desechables. Tratamos de ser lo opuesto. El trabajo es duro; la empresa no debería serlo.')}
            </p>
            <p className="fr-lede" style={{ marginTop: 14 }}>
              {i('Every operational decision we make runs through one filter: ', 'Cada decisión operativa pasa por un filtro: ')}<em>{i('does this make the route easier or harder for the person driving it?', '¿esto hace la ruta más fácil o más difícil para el conductor?')}</em>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="fr-section surface-paper">
        <div className="fr-container">
          <Reveal>
            <div className="fr-eyebrow">{i('Our values', 'Nuestros valores')}</div>
            <h2 className="fr-h2" style={{ marginTop: 14, maxWidth: 18 + 'ch' }}>{i('Four things we say out loud. Often.', 'Cuatro cosas que decimos en voz alta. A menudo.')}</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 48 }} className="fr-values-grid">
            {values.map((v, i) => (
              <Reveal key={v.k} delay={i * 70}>
                <div style={{
                  background: '#fff', borderRadius: 'var(--r-lg)', padding: 26,
                  border: '1px solid rgba(26,26,46,0.05)', height: '100%',
                  display: 'flex', flexDirection: 'column', gap: 12,
                }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-accent)' }}>0{i+1} · {v.k}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, lineHeight: 1.15 }}>{v.t}</div>
                  <div style={{ fontSize: 14, color: 'var(--brand-muted-dark)', lineHeight: 1.6 }}>{v.b}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`@media (max-width: 980px) { .fr-values-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px) { .fr-values-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <section className="fr-section surface-white">
        <div className="fr-container">
          <Reveal>
            <div className="fr-eyebrow">{i('Our story', 'Nuestra historia')}</div>
            <h2 className="fr-h2" style={{ marginTop: 14 }}>{i('Seven years. One Orlando.', 'Siete años. Un Orlando.')}</h2>
          </Reveal>
          <ol style={{ listStyle: 'none', padding: 0, margin: '48px 0 0', display: 'grid', gap: 0 }}>
            {timeline.map((row, i) => (
              <Reveal as="li" key={row.year} delay={i * 100}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '140px 1fr 1fr',
                  alignItems: 'flex-start', gap: 32,
                  padding: '28px 0',
                  borderTop: '1px solid rgba(26,26,46,0.08)',
                  position: 'relative',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--brand-accent)' }}>{row.year}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>{row.t}</div>
                  <div style={{ color: 'var(--brand-muted-dark)', fontSize: 15.5, lineHeight: 1.6, maxWidth: '50ch' }}>{row.b}</div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="fr-section surface-paper">
        <div className="fr-container">
          <Reveal>
            <div className="fr-eyebrow">{i('The team', 'El equipo')}</div>
            <h2 className="fr-h2" style={{ marginTop: 14 }}>{i('Real people. Real phones. Pick up when you call.', 'Personas reales. Teléfonos reales. Contestan cuando llamas.')}</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 48 }} className="fr-team-grid">
            {team.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div style={{
                  background: '#fff', borderRadius: 'var(--r-lg)', overflow: 'hidden',
                  border: '1px solid rgba(26,26,46,0.05)',
                }}>
                  <div className="fr-photo" style={{ height: 240, borderRadius: 0 }}>
                    <div className="fr-photo-label">{p.name.split(' ')[0]} portrait</div>
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>{p.name}</div>
                    <div style={{ fontSize: 13.5, color: 'var(--brand-muted-dark)', marginTop: 2 }}>{p.role}</div>
                    <div style={{ fontSize: 12, color: 'var(--brand-accent)', marginTop: 8, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>{p.tenure}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`@media (max-width: 980px) { .fr-team-grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px) { .fr-team-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <FinalCTA navigate={navigate} />
    </>
  );
}

/* ============== BENEFITS ============== */
function BenefitsPage({ navigate }) {
  const i = useT();
  const groups = [
    {
      title: i('Pay', 'Pago'),
      items: [
        ['$21.50/hr', 'Starting wage for Driver Associates'],
        ['+$1.50/hr', 'Raise at 90 days, on-time delivery'],
        ['+$2.00/hr', 'Raise at 1 year'],
        ['$0.50/hr', 'Night-shift differential (after 6 PM)'],
        ['Up to $1,200', 'Quarterly performance bonus'],
        ['$750', 'Referral bonus per hire that reaches 90 days'],
      ],
    },
    {
      title: i('Health & wellness', 'Salud y bienestar'),
      items: [
        ['70%', 'Employer-paid medical premium'],
        ['Day 60', 'Health, dental, vision eligibility'],
        ['$0', 'Telehealth visits — 24/7'],
        ['EAP', 'Free mental health support, 8 sessions/yr'],
        ['Free', 'Annual physical at partner clinic'],
        ['100%', 'On-the-job injury coverage'],
      ],
    },
    {
      title: i('Time & growth', 'Tiempo y crecimiento'),
      items: [
        ['2 weeks', 'Paid time off (3 weeks at 2 yrs)'],
        ['6 days', 'Paid holidays + your birthday'],
        ['Up to $5,250/yr', 'Tuition reimbursement'],
        ['CDL sponsored', 'We pay if you want to upgrade'],
        ['Promote internally', '70% of leads are former drivers'],
        ['4% match', '401(k), vests immediately'],
      ],
    },
    {
      title: i('On the road', 'En la ruta'),
      items: [
        ['Company van', 'Rivian or Ford Transit, fueled & maintained'],
        ['Uniform provided', 'New issue every 6 months'],
        ['Phone provided', 'You don\'t use your personal phone'],
        ['$15/day', 'Per-diem meal stipend on 10+ hr shifts'],
        ['Driver lounge', 'Coffee, snacks, AC — every station'],
        ['No surprise', 'routes — same area weekly'],
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow={i('Benefits', 'Beneficios')}
        title={i('Everything that comes with the job.', 'Todo lo que viene con el trabajo.')}
        lede={i("A Driver Associate at FloRide takes home roughly $56,000 in their first year — base pay, health benefits, 401(k) match, and PTO included. Here's the full breakdown.", 'Un Conductor Asociado en FloRide se lleva aproximadamente $56,000 en su primer año — salario base, beneficios de salud, 401(k) y tiempo libre incluidos.')}
      />

      <section className="fr-section surface-white">
        <div className="fr-container">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 80}>
              <div style={{
                padding: '40px 0',
                borderTop: gi === 0 ? 'none' : '1px solid rgba(26,26,46,0.1)',
                display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40,
              }} className="fr-benefits-row">
                <div>
                  <div className="fr-eyebrow">Section 0{gi + 1}</div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, marginTop: 12 }}>{g.title}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0 }} className="fr-benefits-items">
                  {g.items.map(([v, l], i) => (
                    <div key={l} style={{
                      padding: '20px 24px 20px 0',
                      borderTop: '1px solid rgba(26,26,46,0.06)',
                      borderBottom: i === g.items.length - 1 || i === g.items.length - 2 ? 'none' : 'none',
                      display: 'flex', flexDirection: 'column', gap: 4,
                    }}>
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--brand-ink)' }}>{v}</span>
                      <span style={{ fontSize: 14, color: 'var(--brand-muted-dark)' }}>{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <style>{`
            @media (max-width: 880px) { .fr-benefits-row { grid-template-columns: 1fr !important; gap: 16px !important; } .fr-benefits-items { grid-template-columns: 1fr !important; } }
          `}</style>
        </div>
      </section>

      {/* Total comp visualizer */}
      <section className="fr-section surface-ink">
        <div className="fr-container">
          <Reveal>
            <div className="fr-eyebrow on-dark">{i('What it adds up to', 'Lo que suma en total')}</div>
            <h2 className="fr-h2" style={{ color: '#fff', marginTop: 14, maxWidth: 22 + 'ch' }}>
              {i('First-year total comp for a Driver Associate.', 'Compensación total del primer año para un Conductor Asociado.')}
            </h2>
          </Reveal>
          <CompBar />
        </div>
      </section>

      <FinalCTA navigate={navigate} />
    </>
  );
}

function CompBar() {
  const segments = [
    { label: 'Base wage', value: 44720, note: '40 hrs × 52 wks × $21.50' },
    { label: 'Health benefits (employer)', value: 6240, note: '~$520/mo medical + dental' },
    { label: 'Performance bonus', value: 2400, note: 'avg quarterly bonus payout' },
    { label: '401(k) match', value: 1790, note: '4% on first $44,720' },
    { label: 'PTO + holidays', value: 1720, note: '2 wks + 6 days paid' },
  ];
  const total = segments.reduce((a, b) => a + b.value, 0);
  return (
    <div style={{ marginTop: 56 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 64, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
        $<CountUp to={total} />
        <span style={{ color: 'var(--brand-accent)', marginLeft: 8 }}>/ yr</span>
      </div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 8, fontFamily: 'var(--font-mono)' }}>
        Year-one total compensation · Driver Associate · 40 hr/wk
      </div>
      <div style={{
        marginTop: 28, display: 'flex', height: 28, borderRadius: 8, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {segments.map((s, i) => (
          <div key={s.label} style={{
            flex: s.value, background: i === 0 ? 'var(--brand-accent)' :
              i === 1 ? 'var(--brand-accent-2)' :
              i === 2 ? '#FFD6C2' :
              i === 3 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)',
          }} />
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, marginTop: 24 }} className="fr-comp-legend">
        {segments.map((s, i) => (
          <div key={s.label}>
            <div style={{
              width: 12, height: 12, borderRadius: 3,
              background: i === 0 ? 'var(--brand-accent)' : i === 1 ? 'var(--brand-accent-2)' : i === 2 ? '#FFD6C2' : i === 3 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.18)',
              marginBottom: 10,
            }}/>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: '#fff', marginTop: 4 }}>
              ${s.value.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{s.note}</div>
          </div>
        ))}
      </div>
      <style>{`@media (max-width: 880px) { .fr-comp-legend { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </div>
  );
}

/* ============== SERVICE AREAS ============== */
function AreasPage({ navigate }) {
  const i = useT();
  const counties = [
    { name: 'Orange County', station: 'DFL4', cities: ['Orlando', 'Winter Park', 'Maitland', 'Apopka', 'Ocoee', 'Winter Garden', 'Belle Isle', "Hunter's Creek", 'Lake Nona'] },
    { name: 'Seminole County', station: 'DFL4', cities: ['Sanford', 'Lake Mary', 'Altamonte Springs', 'Casselberry', 'Oviedo', 'Longwood', 'Winter Springs'] },
    { name: 'Osceola County', station: 'DFL4', cities: ['Kissimmee', 'St. Cloud', 'Celebration', 'Poinciana', 'Buenaventura Lakes'] },
  ];
  const [activeStation, setActiveStation] = useStateI('DFL4');
  return (
    <>
      <PageHeader
        eyebrow={i('Service areas', 'Áreas de servicio')}
        title={i('Greater Orlando, end to end.', 'El Gran Orlando, de punta a punta.')}
        lede={i("One station. Fourteen zones. We deliver to every neighborhood in Orange, Seminole, and Osceola counties — and we're hiring drivers in all of them.", 'Una estación. Catorce zonas. Entregamos en cada vecindario de los condados Orange, Seminole y Osceola — y contratamos conductores en todos.')}
      />

      <section className="fr-section surface-white">
        <div className="fr-container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48 }}>
          <AreasMap height={520} />
          <div>
            <div className="fr-eyebrow">{i('Stations', 'Estaciones')}</div>
            <h2 className="fr-h2" style={{ marginTop: 14, fontSize: 36 }}>{i('Our hub. Right in the heart of Orlando.', 'Nuestro hub. En el corazón de Orlando.')}</h2>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {['DFL4'].map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveStation(s)}
                  style={{
                    padding: '10px 18px', borderRadius: 999,
                    background: activeStation === s ? 'var(--brand-ink)' : 'transparent',
                    color: activeStation === s ? '#fff' : 'var(--brand-ink)',
                    border: activeStation === s ? '1px solid var(--brand-ink)' : '1px solid rgba(26,26,46,0.15)',
                    fontWeight: 600, fontSize: 14,
                  }}
                >Station {s}</button>
              ))}
            </div>
            <StationCard station={activeStation} />
          </div>
        </div>
      </section>

      <section className="fr-section surface-paper">
        <div className="fr-container">
          <Reveal>
            <div className="fr-eyebrow">{i('By county', 'Por condado')}</div>
            <h2 className="fr-h2" style={{ marginTop: 14, maxWidth: 18 + 'ch' }}>{i('Every city we cover, listed.', 'Cada ciudad que cubrimos, listada.')}</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 48 }} className="fr-counties">
            {counties.map((c) => (
              <Reveal key={c.name}>
                <div style={{
                  background: '#fff', borderRadius: 'var(--r-lg)', padding: 26,
                  border: '1px solid rgba(26,26,46,0.05)', height: '100%',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>{c.name}</h3>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11, padding: '4px 10px',
                      borderRadius: 999, background: 'var(--brand-ink)', color: '#fff', letterSpacing: '0.06em',
                    }}>{c.station}</span>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {c.cities.map((city) => (
                      <li key={city} style={{ fontSize: 14, color: 'var(--brand-muted-dark)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--brand-accent)' }}/>
                        {city}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <style>{`@media (max-width: 880px) { .fr-counties { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
      <FinalCTA navigate={navigate} />
    </>
  );
}

function StationCard({ station }) {
  const data = {
    DFL4: { addr: '4401 Seaboard Rd, Orlando FL 32808', shifts: '8 AM start · Wave A & B · M–Sa', drivers: 160, zones: 14 },
  };
  const d = data[station];
  return (
    <div style={{
      marginTop: 24, padding: 28, borderRadius: 'var(--r-lg)',
      background: 'var(--brand-paper)', border: '1px solid rgba(26,26,46,0.06)',
    }}>
      <div style={{ display: 'grid', gap: 18 }}>
        <Row label="Address" value={d.addr} />
        <Row label="Shifts" value={d.shifts} />
        <Row label="Drivers" value={`${d.drivers} on team`} />
        <Row label="Zones" value={`${d.zones} active`} />
      </div>
    </div>
  );
}
function Row({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 16, alignItems: 'baseline' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-muted-dark)' }}>{label}</span>
      <span style={{ fontWeight: 500, color: 'var(--brand-ink)' }}>{value}</span>
    </div>
  );
}

/* ============== FAQ ============== */
function FAQPage({ navigate }) {
  const i = useT();
  const groups = [
    {
      title: i('About the job', 'Sobre el trabajo'),
      qs: [
        ['Do I need a CDL?', 'No. A regular driver\'s license is all you need. Our vans are standard cargo vans (Rivian and Ford Transit) — no CDL required.'],
        ['What\'s the schedule?', 'Most drivers work 4 days a week, ~10 hours per shift. You\'ll have the same days off every week once you\'re trained in.'],
        ['How many packages per day?', 'Routes average 220–280 stops with ~250 packages. Routes are sized so a driver should finish in their scheduled hours, not over them.'],
        ['What\'s the route like?', 'About 85% residential, mostly in neighborhoods within 20 miles of your station. You\'ll know your area within two weeks.'],
      ],
    },
    {
      title: i('Pay & benefits', 'Pago y beneficios'),
      qs: [
        ['How much do drivers make?', 'Starting wage is $21.50/hr. With raises, bonuses, and benefits, year-one total comp lands around $56,000.'],
        ['When do benefits kick in?', 'Health, dental, and vision are eligible at day 60. 401(k) with employer match is available from day 1.'],
        ['Do I get paid for training?', 'Yes — full hourly wage for all training, including the paid week of classroom and ride-alongs.'],
        ['How does the referral bonus work?', 'Refer a friend who gets hired and stays 90 days, you get $750. There\'s no limit on how many referrals you can make.'],
      ],
    },
    {
      title: i('Hiring & onboarding', 'Contratación e incorporación'),
      qs: [
        ['How long is the application?', 'About 8 minutes online. We get back to most applicants within 48 hours.'],
        ['Do I need delivery experience?', 'No prior delivery experience required. We hire from retail, food service, rideshare, and warehouse backgrounds all the time.'],
        ['What does training look like?', 'One paid week — two days classroom (defensive driving, safety, customer service), three days ride-alongs with an experienced driver, then you solo with a coach on standby.'],
        ['What disqualifies me?', 'Major moving violations in the last 3 years, DUI in the last 5 years, or anything safety-related on the DMV record. We review case-by-case.'],
      ],
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={i('The questions we actually get asked.', 'Las preguntas que realmente nos hacen.')}
        lede={i("Plain-English answers. If yours isn't here, text us — number's in the footer.", 'Respuestas claras. Si la tuya no está aquí, escríbenos — el número está en el footer.')}
      />

      <section className="fr-section surface-white">
        <div className="fr-container" style={{ maxWidth: 880, margin: '0 auto' }}>
          {groups.map((g, gi) => (
            <div key={g.title} style={{ marginBottom: 60 }}>
              <Reveal>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginBottom: 20, color: 'var(--brand-accent)' }}>{g.title}</h2>
              </Reveal>
              <div>
                {g.qs.map(([q, a], i) => (
                  <FAQItem key={q} q={q} a={a} defaultOpen={gi === 0 && i === 0} />
                ))}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 60, padding: 36, borderRadius: 'var(--r-lg)', background: 'var(--brand-paper)', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>{i('Still wondering about something?', '¿Tienes otra pregunta?')}</h3>
            <p style={{ color: 'var(--brand-muted-dark)', marginTop: 8 }}>{i("We're real people, and we read every message.", 'Somos personas reales y leemos cada mensaje.')}</p>
            <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="fr-btn fr-btn--solid-dark" onClick={() => navigate('contact')}>{i('Contact us', 'Contáctanos')} <Icon.Arrow/></button>
              <button className="fr-btn fr-btn--ghost" onClick={() => navigate('apply')}>{i('Just apply', 'Solo aplica')}</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ q, a, defaultOpen }) {
  const [open, setOpen] = useStateI(!!defaultOpen);
  return (
    <div style={{ borderBottom: '1px solid rgba(26,26,46,0.1)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left',
          padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
          color: 'var(--brand-ink)', fontWeight: 600, fontSize: 18,
        }}
      >
        <span>{q}</span>
        <span style={{ flexShrink: 0, color: 'var(--brand-accent)' }}>{open ? <Icon.Minus/> : <Icon.Plus/>}</span>
      </button>
      <div style={{
        maxHeight: open ? 320 : 0, overflow: 'hidden',
        transition: 'max-height .35s ease, padding-bottom .35s ease',
        paddingBottom: open ? 22 : 0,
      }}>
        <p style={{ color: 'var(--brand-muted-dark)', fontSize: 15.5, lineHeight: 1.6, maxWidth: '70ch' }}>{a}</p>
      </div>
    </div>
  );
}

/* ============== BLOG ============== */
function BlogPage({ navigate }) {
  const i = useT();
  const posts = [
    {
      cat: 'Driver life',
      title: 'What a typical Tuesday looks like at FloRide Delivery',
      excerpt: 'From 8 AM check-in to 7 PM wrap, a Driver Associate walks us through their day at DFL4. Spoiler: the radio is a big part of it.',
      author: 'Marcus Reyes',
      time: '6 min read',
      date: 'May 10, 2026',
    },
    {
      cat: 'Hiring',
      title: 'How to nail the FloRide ride-along (we tell you everything)',
      excerpt: 'The 3-day ride-along is where most applicants either click with the work or realize it isn\'t for them. Here\'s what to expect.',
      author: 'Priya Acosta',
      time: '4 min read',
      date: 'April 28, 2026',
    },
    {
      cat: 'Community',
      title: 'Why FloRide sponsored 12 youth soccer teams this spring',
      excerpt: 'Our drivers are on Orlando streets all day. The kids on those streets matter. Here\'s how our community work actually happens.',
      author: 'Jordan Reyes',
      time: '3 min read',
      date: 'April 14, 2026',
    },
  ];
  return (
    <>
      <PageHeader
        eyebrow={i('FloRide Delivery Blog', 'Blog de FloRide Delivery')}
        title={i('Notes from the route.', 'Notas desde la ruta.')}
        lede={i("Driver stories, hiring tips, community work — written by the team, not a content agency.", 'Historias de conductores, consejos de contratación, trabajo comunitario — escrito por el equipo, no por una agencia.')}
      />
      <section className="fr-section surface-white">
        <div className="fr-container">
          {/* Featured */}
          <Reveal>
            <article style={{
              display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48,
              padding: 0, alignItems: 'center', marginBottom: 60,
            }} className="fr-blog-feature">
              <Photo label="Photo · FloRide driver on the route, midmorning" h={420} style={{ borderRadius: 24 }} />
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'var(--brand-accent)', background: 'rgba(255,107,53,0.1)',
                    padding: '4px 10px', borderRadius: 999,
                  }}>Featured · {posts[0].cat}</span>
                  <span style={{ fontSize: 12, color: 'var(--brand-muted-dark)' }}>{posts[0].date}</span>
                </div>
                <h2 className="fr-h2" style={{ marginTop: 16, fontSize: 40 }}>{posts[0].title}</h2>
                <p className="fr-lede" style={{ marginTop: 16 }}>{posts[0].excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28 }}>
                  <Avatar name={posts[0].author} size={36} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{posts[0].author}</div>
                    <div style={{ fontSize: 12, color: 'var(--brand-muted-dark)' }}>{posts[0].time}</div>
                  </div>
                </div>
              </div>
            </article>
            <style>{`@media (max-width: 880px) { .fr-blog-feature { grid-template-columns: 1fr !important; } }`}</style>
          </Reveal>

          {/* Other posts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="fr-blog-grid">
            {posts.slice(1).map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <article style={{
                  background: 'var(--brand-paper)',
                  borderRadius: 'var(--r-lg)', overflow: 'hidden',
                  border: '1px solid rgba(26,26,46,0.05)',
                  cursor: 'pointer',
                  transition: 'transform .2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = ''}
                >
                  <Photo label={`Photo · ${p.cat}`} h={220} style={{ borderRadius: 0 }} />
                  <div style={{ padding: 28 }}>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-accent)' }}>{p.cat}</span>
                      <span style={{ fontSize: 12, color: 'var(--brand-muted-dark)' }}>· {p.date}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, marginTop: 12, lineHeight: 1.2 }}>{p.title}</h3>
                    <p style={{ color: 'var(--brand-muted-dark)', marginTop: 12, fontSize: 14.5, lineHeight: 1.55 }}>{p.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22 }}>
                      <Avatar name={p.author} size={28} />
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{p.author}</span>
                      <span style={{ fontSize: 12, color: 'var(--brand-muted-dark)' }}>· {p.time}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <style>{`@media (max-width: 880px) { .fr-blog-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>
    </>
  );
}

/* ============== CONTACT ============== */
function ContactPage({ navigate }) {
  const i = useT();
  const [sent, setSent] = useStateI(false);
  return (
    <>
      <PageHeader
        eyebrow={i('Get in touch', 'Comunícate')}
        title={i('Talk to a real person.', 'Habla con una persona real.')}
        lede={i('Question, not ready to apply, want to send us a wave — pick a channel. Office hours are Monday–Friday, 8 AM to 6 PM.', 'Pregunta, no estás listo para aplicar, solo quieres saludar — elige un canal. Horario: lunes a viernes, 8 AM a 6 PM.')}
      />
      <section className="fr-section surface-white">
        <div className="fr-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56 }} >
          <div>
            <div style={{ display: 'grid', gap: 22 }}>
              {[
                [i('Phone', 'Teléfono'), '(407) 555-0100', i('Best for drivers on shift', 'Mejor para conductores en turno'), <Icon.Phone/>],
                [i('Email', 'Correo'), 'jobs@floridedelivery.com', i('We respond within 24 hrs', 'Respondemos en 24 horas'), <Icon.Mail/>],
                [i('Office', 'Oficina'), '4401 Seaboard Rd\nOrlando, FL 32808', i('Walk-ins welcome 9 AM–5 PM', 'Visitas sin cita 9 AM–5 PM'), <Icon.Map/>],
              ].map(([label, val, sub, icon]) => (
                <div key={label} style={{
                  padding: 22, borderRadius: 'var(--r-lg)',
                  background: 'var(--brand-paper)', border: '1px solid rgba(26,26,46,0.06)',
                  display: 'grid', gridTemplateColumns: '48px 1fr', gap: 18,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'var(--brand-ink)', color: 'var(--brand-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{icon}</div>
                  <div>
                    <div className="fr-eyebrow muted" style={{ fontSize: 11 }}>{label}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, marginTop: 6, whiteSpace: 'pre-line' }}>{val}</div>
                    <div style={{ fontSize: 13, color: 'var(--brand-muted-dark)', marginTop: 4 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--brand-ink)', color: '#fff', borderRadius: 'var(--r-xl)', padding: 40 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', margin: '0 auto 18px',
                  background: 'var(--brand-accent)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon.Check /></div>
                <h3 className="fr-h3" style={{ color: '#fff' }}>{i('Message received.', 'Mensaje recibido.')}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 10 }}>{i("We'll text or email you back within one business day.", 'Te responderemos por texto o correo en un día hábil.')}</p>
                <button className="fr-btn fr-btn--primary" style={{ marginTop: 24 }} onClick={() => setSent(false)}>
                  {i('Send another', 'Enviar otro')} <Icon.Arrow/>
                </button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <h3 className="fr-h3" style={{ color: '#fff', fontSize: 28 }}>{i('Send us a message', 'Envíanos un mensaje')}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 8, fontSize: 14 }}>{i('Not a hiring inquiry? Use this. To apply, use the multi-step form instead.', '¿No es una consulta de empleo? Usa esto. Para aplicar, usa el formulario de varios pasos.')}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 24 }}>
                  <Field label={i('Your name', 'Tu nombre')}><input className="fr-input" required defaultValue="" placeholder="Jordan Lee" /></Field>
                  <Field label={i('Email', 'Correo electrónico')}><input className="fr-input" type="email" required placeholder="jordan@example.com" /></Field>
                </div>
                <div style={{ marginTop: 14 }}>
                  <Field label={i("What's this about?", '¿De qué se trata?')}>
                    <select className="fr-select" defaultValue="general">
                      <option value="general">{i('General question', 'Pregunta general')}</option>
                      <option value="delivery">{i('A delivery to my address', 'Una entrega en mi dirección')}</option>
                      <option value="partnership">{i('Business partnership', 'Alianza de negocio')}</option>
                      <option value="press">{i('Press', 'Prensa')}</option>
                    </select>
                  </Field>
                </div>
                <div style={{ marginTop: 14 }}>
                  <Field label={i('Message', 'Mensaje')}>
                    <textarea className="fr-textarea" rows="5" placeholder={i('Tell us what\'s up.', 'Cuéntanos qué pasa.')} />
                  </Field>
                </div>
                <button type="submit" className="fr-btn fr-btn--primary" style={{ marginTop: 22 }}>
                  {i('Send message', 'Enviar mensaje')} <Icon.Arrow/>
                </button>
              </form>
            )}
          </div>
        </div>
        <style>{`
          @media (max-width: 980px) { section.fr-section.surface-white > .fr-container { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{label}</span>
      {children}
    </label>
  );
}

Object.assign(window, { AboutPage, BenefitsPage, AreasPage, FAQPage, BlogPage, ContactPage, FinalCTA: window.FinalCTA });
