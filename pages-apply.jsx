/* FloRide — How to Apply page with embedded multi-step form */
const { useState: useStateA, useMemo: useMemoA } = React;

function ApplyPage({ navigate }) {
  const i = useT();
  const steps = [
    { label: i('About you', 'Sobre ti') },
    { label: i('Eligibility', 'Elegibilidad') },
    { label: i('Schedule & zone', 'Horario y zona') },
    { label: i('Review & send', 'Revisar y enviar') },
  ];

  const [step, setStep] = useStateA(0);
  const [submitted, setSubmitted] = useStateA(false);
  const [data, setData] = useStateA({
    firstName: '', lastName: '', email: '', phone: '', city: '',
    age21: 'yes', license: 'yes', tickets: 'none', criminal: 'no',
    zone: 'Orlando Central', shift: 'morning', start: '2-weeks',
    referredBy: '',
  });

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const canAdvance = () => {
    if (step === 0) return data.firstName && data.lastName && data.email && data.phone;
    return true;
  };

  return (
    <>
      <PageHeader
        eyebrow={i('How to apply', 'Cómo aplicar')}
        title={i('Three steps. Eight minutes. Then we call.', 'Tres pasos. Ocho minutos. Luego te llamamos.')}
        lede={i("No generic contact form. No black hole inbox. The form below routes straight to a human, and you'll hear from us within two business days.", 'Sin formulario genérico. El formulario va directo a una persona real y te contactaremos en dos días hábiles.')}
      />

      {/* Process */}
      <section className="fr-section--tight surface-white" style={{ paddingTop: 60 }}>
        <div className="fr-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, position: 'relative' }} className="fr-process-grid">
            <ProcessStep n="01" t={i('Apply online', 'Aplica en línea')} b={i("Fill out the 8-minute form below. We'll review every word.", 'Completa el formulario de 8 minutos. Revisamos cada palabra.')} />
            <ProcessStep n="02" t={i('Meet your dispatcher', 'Conoce a tu despachador')} b={i('A 30-minute call or in-person chat. Real conversation, not a script.', 'Una llamada de 30 minutos. Conversación real, no un guión.')} />
            <ProcessStep n="03" t={i('Ride-along week', 'Semana de acompañamiento')} b={i("One paid week with a senior driver. If it clicks, we offer the spot.", 'Una semana pagada con un conductor senior. Si encaja, te ofrecemos el puesto.')} last />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="fr-section surface-paper">
        <div className="fr-container" style={{ maxWidth: 980 }}>
          <div style={{
            background: '#fff',
            borderRadius: 'var(--r-xl)',
            border: '1px solid rgba(26,26,46,0.06)',
            boxShadow: 'var(--shadow-2)',
            overflow: 'hidden',
          }}>
            {submitted ? (
              <SuccessPanel navigate={navigate} data={data} reset={() => { setSubmitted(false); setStep(0); }} />
            ) : (
              <>
                {/* Stepper */}
                <div style={{ padding: '28px 36px', borderBottom: '1px solid rgba(26,26,46,0.06)', display: 'grid', gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 12 }}>
                  {steps.map((s, i) => {
                    const done = i < step;
                    const active = i === step;
                    return (
                      <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div style={{
                          height: 4, borderRadius: 4,
                          background: done || active ? 'var(--brand-accent)' : 'rgba(26,26,46,0.1)',
                          transition: 'background .25s ease',
                        }}/>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            width: 22, height: 22, borderRadius: '50%',
                            background: done ? 'var(--brand-accent)' : active ? 'var(--brand-ink)' : 'transparent',
                            color: done || active ? '#fff' : 'var(--brand-muted-dark)',
                            border: done || active ? 'none' : '1px solid rgba(26,26,46,0.18)',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                          }}>{done ? <Icon.Check/> : i + 1}</span>
                          <span style={{
                            fontSize: 12, fontWeight: 600,
                            color: active ? 'var(--brand-ink)' : 'var(--brand-muted-dark)',
                          }}>{s.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ padding: '36px 36px 24px' }}>
                  {step === 0 && <Step1 data={data} set={set} />}
                  {step === 1 && <Step2 data={data} set={set} />}
                  {step === 2 && <Step3 data={data} set={set} />}
                  {step === 3 && <Step4 data={data} />}
                </div>

                <div style={{
                  padding: '20px 36px', borderTop: '1px solid rgba(26,26,46,0.06)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'var(--brand-paper)',
                }}>
                  <button
                    className="fr-btn fr-btn--ghost"
                    style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
                    onClick={() => setStep(step - 1)}
                  >
                    <span style={{ transform: 'scaleX(-1)' }}><Icon.Arrow/></span> {i('Back', 'Atrás')}
                  </button>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', color: 'var(--brand-muted-dark)' }}>
                    {i('Step', 'Paso')} {step + 1} {i('of', 'de')} {steps.length}
                  </div>
                  {step < steps.length - 1 ? (
                    <button
                      className="fr-btn fr-btn--primary"
                      onClick={() => canAdvance() && setStep(step + 1)}
                      style={{ opacity: canAdvance() ? 1 : 0.5, pointerEvents: canAdvance() ? 'auto' : 'none' }}
                    >
                      {i('Continue', 'Continuar')} <Icon.Arrow/>
                    </button>
                  ) : (
                    <button className="fr-btn fr-btn--primary" onClick={() => setSubmitted(true)}>
                      {i('Submit application', 'Enviar solicitud')} <Icon.Arrow/>
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <div style={{ marginTop: 22, fontSize: 13, color: 'var(--brand-muted-dark)', textAlign: 'center' }}>
            {i("By submitting, you agree to be contacted by FloRide about your application. We don't sell or share your info.", 'Al enviar, aceptas que FloRide se comunique contigo. No vendemos ni compartimos tu información.')}
          </div>
        </div>
      </section>

      <FinalCTA navigate={navigate} />
    </>
  );
}

function ProcessStep({ n, t, b, last }) {
  return (
    <div style={{
      padding: '32px 30px',
      borderRight: last ? 'none' : '1px solid rgba(26,26,46,0.08)',
      position: 'relative',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
        color: 'var(--brand-accent)', letterSpacing: '0.06em',
      }}>{n}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, marginTop: 10 }}>{t}</div>
      <div style={{ color: 'var(--brand-muted-dark)', marginTop: 8, fontSize: 14.5, lineHeight: 1.6 }}>{b}</div>
      {!last ? (
        <div style={{
          position: 'absolute', top: '50%', right: -8, transform: 'translateY(-50%)',
          width: 16, height: 16, borderRadius: '50%', background: '#fff',
          border: '1px solid rgba(26,26,46,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--brand-accent)',
        }}><Icon.Arrow/></div>
      ) : null}
    </div>
  );
}

/* ---------- Form steps ---------- */
function Step1({ data, set }) {
  const i = useT();
  return (
    <div>
      <h3 className="fr-h3" style={{ fontSize: 26 }}>{i('Tell us about you.', 'Cuéntanos sobre ti.')}</h3>
      <p style={{ color: 'var(--brand-muted-dark)', marginTop: 6 }}>{i("The basics. We'll get to the road in a minute.", 'Lo básico. Llegamos a la ruta en un momento.')}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28 }} className="fr-form-grid">
        <FormField label={i('First name *', 'Nombre *')}><input className="fr-input" value={data.firstName} onChange={(e) => set('firstName', e.target.value)} placeholder="Jordan"/></FormField>
        <FormField label={i('Last name *', 'Apellido *')}><input className="fr-input" value={data.lastName} onChange={(e) => set('lastName', e.target.value)} placeholder="Lee"/></FormField>
        <FormField label={i('Email *', 'Correo electrónico *')}><input className="fr-input" type="email" value={data.email} onChange={(e) => set('email', e.target.value)} placeholder="jordan@example.com"/></FormField>
        <FormField label={i('Phone *', 'Teléfono *')}><input className="fr-input" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(407) 555-0142"/></FormField>
        <FormField label={i('City you live in', 'Ciudad donde vives')}><input className="fr-input" value={data.city} onChange={(e) => set('city', e.target.value)} placeholder="Orlando"/></FormField>
        <FormField label={i('Referred by (optional)', 'Referido por (opcional)')}><input className="fr-input" value={data.referredBy} onChange={(e) => set('referredBy', e.target.value)} placeholder={i("Their full name — they'll get the $750 bonus", 'Nombre completo — recibirán el bono de $750')}/></FormField>
      </div>
      <style>{`@media (max-width: 720px) { .fr-form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function Step2({ data, set }) {
  const i = useT();
  return (
    <div>
      <h3 className="fr-h3" style={{ fontSize: 26 }}>{i('Eligibility check.', 'Verificación de elegibilidad.')}</h3>
      <p style={{ color: 'var(--brand-muted-dark)', marginTop: 6 }}>{i('Standard DSP requirements. We review answers individually — be honest.', 'Requisitos estándar del DSP. Revisamos cada respuesta — sé honesto.')}</p>

      <div style={{ display: 'grid', gap: 18, marginTop: 28 }}>
        <RadioGroup
          label={i('Are you 21 or older?', '¿Tienes 21 años o más?')}
          value={data.age21}
          onChange={(v) => set('age21', v)}
          options={[['yes', i('Yes', 'Sí')], ['no', i('Not yet', 'Todavía no')]]}
        />
        <RadioGroup
          label={i("Do you have a valid U.S. driver's license?", '¿Tienes una licencia de conducir válida en EE.UU.?')}
          value={data.license}
          onChange={(v) => set('license', v)}
          options={[['yes', i('Yes', 'Sí')], ['no', i('No / out of state', 'No / fuera del estado')]]}
        />
        <RadioGroup
          label={i('Moving violations or accidents in the last 3 years?', '¿Violaciones de tránsito o accidentes en los últimos 3 años?')}
          value={data.tickets}
          onChange={(v) => set('tickets', v)}
          options={[['none', i('None', 'Ninguna')], ['1-2', i('1 or 2 minor', '1 ó 2 menores')], ['3+', i('3+ or major', '3+ o mayor')]]}
        />
        <RadioGroup
          label={i('Felony convictions in the last 7 years?', '¿Condenas por delito grave en los últimos 7 años?')}
          value={data.criminal}
          onChange={(v) => set('criminal', v)}
          options={[['no', 'No'], ['yes', i('Yes — happy to discuss', 'Sí — con gusto lo comento')]]}
        />
      </div>
    </div>
  );
}

function Step3({ data, set }) {
  const i = useT();
  const zones = ['Orlando Central', 'Winter Park / Maitland', 'Kissimmee / St. Cloud', 'Sanford / Lake Mary', 'Apopka / Ocoee', "Lake Nona / Hunter's Creek"];
  return (
    <div>
      <h3 className="fr-h3" style={{ fontSize: 26 }}>{i('Where & when.', '¿Dónde y cuándo?')}</h3>
      <p style={{ color: 'var(--brand-muted-dark)', marginTop: 6 }}>{i('We try to match drivers to zones near where they live.', 'Tratamos de asignar conductores a zonas cercanas a donde viven.')}</p>

      <FormField label={i('Preferred zone', 'Zona preferida')} style={{ marginTop: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }} className="fr-zone-grid">
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => set('zone', z)}
              style={{
                textAlign: 'left', padding: '14px 16px',
                borderRadius: 12,
                border: data.zone === z ? '2px solid var(--brand-accent)' : '1px solid rgba(26,26,46,0.12)',
                background: data.zone === z ? 'rgba(255,107,53,0.06)' : '#fff',
                fontWeight: 500, fontSize: 14,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
              {z}
              {data.zone === z ? <span style={{ color: 'var(--brand-accent)' }}><Icon.Check/></span> : null}
            </button>
          ))}
        </div>
        <style>{`@media (max-width: 600px) { .fr-zone-grid { grid-template-columns: 1fr !important; } }`}</style>
      </FormField>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }} className="fr-form-grid">
        <RadioGroup
          label={i('Preferred shift', 'Turno preferido')}
          value={data.shift}
          onChange={(v) => set('shift', v)}
          options={[['morning', i('Wave A (8 AM)', 'Ola A (8 AM)')], ['mid', i('Wave B (10 AM)', 'Ola B (10 AM)')], ['evening', i('Wave C (1 PM)', 'Ola C (1 PM)')]]}
          stacked
        />
        <RadioGroup
          label={i('How soon can you start?', '¿Cuándo puedes empezar?')}
          value={data.start}
          onChange={(v) => set('start', v)}
          options={[['now', i('This week', 'Esta semana')], ['2-weeks', i('Within 2 weeks', 'En 2 semanas')], ['month', i('Within a month', 'En un mes')], ['later', i('Just exploring', 'Solo explorando')]]}
          stacked
        />
      </div>
    </div>
  );
}

function Step4({ data }) {
  const i = useT();
  const summary = [
    [i('Name', 'Nombre'), `${data.firstName} ${data.lastName}`],
    [i('Contact', 'Contacto'), `${data.email} · ${data.phone}`],
    [i('City', 'Ciudad'), data.city || '—'],
    [i('Age 21+', '21 años o más'), data.age21 === 'yes' ? i('Yes', 'Sí') : i('Not yet', 'Todavía no')],
    [i('License', 'Licencia'), data.license === 'yes' ? i('Valid US', 'Válida EE.UU.') : i('Out of state', 'Fuera del estado')],
    [i('Tickets (3 yrs)', 'Multas (3 años)'), data.tickets],
    [i('Felonies (7 yrs)', 'Delitos (7 años)'), data.criminal],
    [i('Preferred zone', 'Zona preferida'), data.zone],
    [i('Shift', 'Turno'), data.shift],
    [i('Start', 'Inicio'), data.start],
    [i('Referred by', 'Referido por'), data.referredBy || '—'],
  ];
  return (
    <div>
      <h3 className="fr-h3" style={{ fontSize: 26 }}>{i('Looks good?', '¿Todo bien?')}</h3>
      <p style={{ color: 'var(--brand-muted-dark)', marginTop: 6 }}>{i('Double-check, then send it our way.', 'Revisa y envíanos tu solicitud.')}</p>
      <div style={{
        marginTop: 28, padding: 24, borderRadius: 'var(--r-md)',
        background: 'var(--brand-paper)', border: '1px solid rgba(26,26,46,0.06)',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 32px' }} className="fr-form-grid">
          {summary.map(([k, v]) => (
            <div key={k}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--brand-muted-dark)' }}>{k}</div>
              <div style={{ fontSize: 14.5, fontWeight: 500, marginTop: 4, color: 'var(--brand-ink)' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FormField({ label, children, style }) {
  return (
    <label style={{ display: 'block', ...style }}>
      <span style={{
        display: 'block',
        fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'var(--brand-muted-dark)', marginBottom: 8,
      }}>{label}</span>
      {children}
    </label>
  );
}

function RadioGroup({ label, value, onChange, options, stacked = false }) {
  return (
    <FormField label={label}>
      <div style={{ display: stacked ? 'grid' : 'flex', gridTemplateColumns: stacked ? '1fr' : undefined, gap: 8, flexWrap: 'wrap' }}>
        {options.map(([val, lab]) => (
          <button
            key={val}
            onClick={() => onChange(val)}
            style={{
              padding: '12px 16px', borderRadius: 10,
              border: value === val ? '2px solid var(--brand-accent)' : '1px solid rgba(26,26,46,0.14)',
              background: value === val ? 'rgba(255,107,53,0.06)' : '#fff',
              fontSize: 14, fontWeight: 500,
              display: 'flex', alignItems: 'center', gap: 8,
              flex: stacked ? '1 1 auto' : '0 0 auto',
              justifyContent: stacked ? 'space-between' : 'flex-start',
            }}
          >
            <span style={{
              width: 16, height: 16, borderRadius: '50%',
              border: value === val ? '5px solid var(--brand-accent)' : '2px solid rgba(26,26,46,0.2)',
              transition: 'all .15s ease',
            }}/>
            {lab}
          </button>
        ))}
      </div>
    </FormField>
  );
}

function SuccessPanel({ navigate, data, reset }) {
  const i = useT();
  return (
    <div style={{ padding: '60px 40px', textAlign: 'center' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%', margin: '0 auto 22px',
        background: 'var(--brand-accent)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Icon.Check /></div>
      <h2 className="fr-h2" style={{ fontSize: 36 }}>{i('Application received,', 'Solicitud recibida,')} {data.firstName || i('driver', 'conductor')}.</h2>
      <p className="fr-lede" style={{ marginTop: 14, marginLeft: 'auto', marginRight: 'auto' }}>
        {i("We'll review your info and get back to you within 48 hours at", 'Revisaremos tu información y te contactaremos en 48 horas a')} <strong>{data.email || i('your email', 'tu correo')}</strong> {i('or', 'o')} <strong>{data.phone || i('your phone', 'tu teléfono')}</strong>.{' '}
        {i("If we're a fit, the next step is a 30-min call.", 'Si somos un buen match, el siguiente paso es una llamada de 30 minutos.')}
      </p>
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button className="fr-btn fr-btn--solid-dark" onClick={() => navigate('faq')}>{i('Read the FAQ', 'Leer las preguntas')} <Icon.Arrow/></button>
        <button className="fr-btn fr-btn--ghost" onClick={reset}>{i('Submit another', 'Enviar otra')}</button>
      </div>
      <div style={{ marginTop: 40, padding: 22, background: 'var(--brand-paper)', borderRadius: 16, textAlign: 'left', maxWidth: 540, margin: '40px auto 0' }}>
        <div className="fr-eyebrow muted" style={{ fontSize: 11 }}>{i('What happens next', 'Qué sigue')}</div>
        <ol style={{ paddingLeft: 18, marginTop: 12, color: 'var(--brand-muted-dark)', fontSize: 14.5, lineHeight: 1.7 }}>
          <li>{i('Within 48 hours — we email or text confirming we got your application.', 'En 48 horas — te enviamos un email o texto confirmando que recibimos tu solicitud.')}</li>
          <li>{i('Within 5 business days — we set up a 30-min intro call with a dispatcher.', 'En 5 días hábiles — coordinamos una llamada de 30 min con un despachador.')}</li>
          <li>{i("If we both feel good — we book your paid ride-along week.", 'Si ambos estamos de acuerdo — reservamos tu semana de acompañamiento pagada.')}</li>
        </ol>
      </div>
    </div>
  );
}

Object.assign(window, { ApplyPage });
