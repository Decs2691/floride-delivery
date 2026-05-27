/* ============================================================
   FloRide — Employee Portal
   pages-portal.jsx
   ============================================================ */

const { useState: usePS, useEffect: usePE } = React;

// ─── Demo credentials ─────────────────────────────────────────
const DEMO_USERS = {
  'emprender2691@gmail.com': {
    password: 'floride2026',
    role: 'driver',
    name: 'Daniel Cantor Soto',
    id: 'DR-0045',
    route: 'Lake Nona / Hunter\'s Creek',
    shiftTime: '9:50 AM',
    station: 'DFL4 — Orlando',
  },
  'driver@floride.com': {
    password: 'driver2026',
    role: 'driver',
    name: 'Daniel Cantor Soto',
    id: 'DR-0045',
    route: 'Lake Nona / Hunter\'s Creek',
    shiftTime: '9:50 AM',
    station: 'DFL4 — Orlando',
  },
  'manager@floride.com': {
    password: 'manager2026',
    role: 'manager',
    name: 'Yamila Ricardo',
    id: 'MG-001',
    title: 'Operations Supervisor',
    station: 'DFL4 — Orlando',
  },
};

// ─── Sample data ──────────────────────────────────────────────
const SCORECARD = {
  week: 'May 19 – 25, 2026',
  overall: 87,
  history: [82, 85, 79, 88, 84, 87],
  metrics: [
    { name: 'Delivered & Received', abbr: 'DNR', score: 94 },
    { name: 'On-Time Delivery',      abbr: 'OTD', score: 88 },
    { name: 'Photo on Delivery',     abbr: 'POD', score: 79 },
    { name: 'Customer Feedback',     abbr: 'CSAT', score: 91 },
    { name: 'Safe Driving Score',    abbr: 'SDS', score: 85 },
    { name: 'Proper Park Sequence',  abbr: 'PPS', score: 72 },
  ],
  tips: [
    { metric: 'Photo on Delivery', icon: '📷', tip: 'Your POD score dropped to 79 this week. Take the photo BEFORE walking away — make sure the package is fully visible in the frame, not just the door.' },
    { metric: 'Proper Park Sequence', icon: '🅿️', tip: 'PPS is at 72 — make this your priority this week. Always: hazard lights ON → parking brake → step out. Even on 10-second stops.' },
  ],
};

const ANNOUNCEMENTS = [
  { id: 1, date: 'May 26, 2026', title: 'Extra Routes Available — Saturday May 30', body: 'We have 8 open routes this Saturday. Pay is $210 flat + tips. Reply to this notification if you\'re available.', urgent: true, from: 'Yamila Ricardo · Operations' },
  { id: 2, date: 'May 24, 2026', title: 'Van Inspection Week — All Vans by Friday', body: 'All vehicles must pass inspection by Friday May 29. Check with your dispatcher for your assigned time slot.', urgent: false, from: 'Alex Johnson · CEO' },
  { id: 3, date: 'May 20, 2026', title: 'Uniform Policy Reminder', body: 'Starting June 1, all drivers must wear the full FloRide uniform (vest + hat) during every shift. No exceptions.', urgent: false, from: 'Logan Martinez · CEO' },
];

const VIDEOS = [
  { id: 1, title: 'What to do when a customer isn\'t home', duration: '3:42', category: 'Delivery', color: '#FF6B35' },
  { id: 2, title: 'Handling damaged packages on route', duration: '4:15', category: 'Protocol', color: '#3B9EFF' },
  { id: 3, title: 'Safe driving in heavy rain', duration: '5:08', category: 'Safety', color: '#22c55e' },
  { id: 4, title: 'Using the Mentor app correctly', duration: '2:55', category: 'Tools', color: '#a855f7' },
];

const DRIVER_LIST = [
  { id: 'DR-0045', name: 'Daniel Cantor Soto', score: 87, tier: 'Great',    routes: 5 },
  { id: 'DR-0032', name: 'Maria Gonzalez',  score: 95, tier: 'Fantastic',  routes: 5 },
  { id: 'DR-0018', name: 'Carlos Reyes',    score: 71, tier: 'Fair',       routes: 4 },
  { id: 'DR-0061', name: 'James Thompson',  score: 88, tier: 'Great',      routes: 5 },
  { id: 'DR-0074', name: 'Lena Muller',     score: 62, tier: 'At Risk',    routes: 3 },
  { id: 'DR-0055', name: 'Antoine Dubois',  score: 91, tier: 'Fantastic',  routes: 5 },
];

// ─── Helpers ──────────────────────────────────────────────────
function scoreColor(s) {
  if (s >= 90) return { bg: 'rgba(34,197,94,0.1)',   text: '#16a34a', border: 'rgba(34,197,94,0.25)' };
  if (s >= 80) return { bg: 'rgba(59,158,255,0.1)',  text: '#2563eb', border: 'rgba(59,158,255,0.25)' };
  if (s >= 70) return { bg: 'rgba(251,191,36,0.1)',  text: '#d97706', border: 'rgba(251,191,36,0.25)' };
  return           { bg: 'rgba(239,68,68,0.1)',    text: '#dc2626', border: 'rgba(239,68,68,0.25)' };
}

function tierColor(t) {
  return ({ Fantastic:'#16a34a', Great:'#2563eb', Fair:'#d97706', 'At Risk':'#dc2626' })[t] || '#666';
}

// ─── Score Ring ───────────────────────────────────────────────
function ScoreRing({ score, size = 100 }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const col = score >= 90 ? '#16a34a' : score >= 80 ? '#3B9EFF' : score >= 70 ? '#d97706' : '#dc2626';
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(26,26,46,0.07)" strokeWidth={10} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={col} strokeWidth={10}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
        <div style={{ fontSize: size*0.26, fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--brand-ink)', lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: size*0.11, color: '#999', marginTop: 2 }}>/ 100</div>
      </div>
    </div>
  );
}

// ─── Portal Navbar ────────────────────────────────────────────
function PortalNav({ user, onLogout, active, setActive }) {
  const dLinks = ['dashboard','scorecard','training','announcements'];
  const mLinks = ['overview','my-team','announcements','scorecards'];
  const links = user.role === 'driver' ? dLinks : mLinks;
  const labels = { dashboard:'Dashboard', scorecard:'My Scorecard', training:'Training', announcements:'Announcements', overview:'Overview', 'my-team':'My Team', scorecards:'Scorecards' };

  return (
    <header style={{ position:'sticky', top:0, zIndex:40, background:'#fff', borderBottom:'1px solid rgba(26,26,46,0.08)', height:60, display:'flex', alignItems:'center', boxShadow:'0 1px 8px rgba(26,26,46,0.05)' }}>
      <div style={{ maxWidth:1160, margin:'0 auto', width:'100%', padding:'0 28px', display:'flex', alignItems:'center', gap:8 }}>
        <FloRideLogo size={22} />
        <nav style={{ display:'flex', gap:2, marginLeft:28 }}>
          {links.map(l => (
            <button key={l} onClick={() => setActive(l)} style={{
              padding:'7px 13px', fontSize:13, fontWeight:500, borderRadius:8,
              color: active===l ? 'var(--brand-accent)' : '#555',
              background: active===l ? 'rgba(255,107,53,0.07)' : 'transparent',
              transition:'all .15s',
            }}>{labels[l]}</button>
          ))}
        </nav>
        <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--brand-ink)', lineHeight:1.2 }}>{user.name}</div>
            <div style={{ fontSize:11, color:'#aaa' }}>{user.id}</div>
          </div>
          <Avatar name={user.name} size={36} />
          <button onClick={onLogout} style={{ padding:'7px 13px', fontSize:12, fontWeight:600, border:'1px solid rgba(26,26,46,0.14)', borderRadius:8, color:'#666' }}>
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── DRIVER PORTAL ────────────────────────────────────────────
function DriverPortal({ user, onLogout }) {
  const [active, setActive] = usePS('dashboard');
  return (
    <div style={{ minHeight:'100vh', background:'#f7f7fa' }}>
      <PortalNav user={user} onLogout={onLogout} active={active} setActive={setActive} />
      <main style={{ maxWidth:1160, margin:'0 auto', padding:'36px 28px' }}>
        {active === 'dashboard'     && <DriverHome     user={user} setActive={setActive} />}
        {active === 'scorecard'     && <DriverScorecard />}
        {active === 'training'      && <DriverTraining />}
        {active === 'announcements' && <DriverAnnouncements />}
      </main>
    </div>
  );
}

function DriverHome({ user, setActive }) {
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:13, color:'#999', fontWeight:500 }}>Monday, May 26, 2026</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'var(--brand-ink)', margin:'4px 0 8px' }}>
          Good morning, {user.name.split(' ')[0]}
        </h1>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
          <span style={{ background:'rgba(34,197,94,0.1)', color:'#16a34a', padding:'3px 10px', borderRadius:999, fontWeight:600, fontSize:12 }}>● Active</span>
          <span style={{ color:'#666' }}>Route: <strong>{user.route}</strong></span>
          <span style={{ color:'#ccc' }}>·</span>
          <span style={{ color:'#666' }}>Shift at <strong>{user.shiftTime}</strong></span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Overall Score',       value:'87',     unit:'/ 100',      col:'#2563eb' },
          { label:'Tier This Week',      value:'Great',  unit:'keep it up', col:'#2563eb' },
          { label:'Routes This Month',   value:'22',     unit:'completed',  col:'#16a34a' },
          { label:'Unread Announcements',value:'1',      unit:'new',        col:'#FF6B35' },
        ].map(k => (
          <div key={k.label} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)', boxShadow:'0 1px 4px rgba(26,26,46,0.04)' }}>
            <div style={{ fontSize:12, color:'#999', fontWeight:500, marginBottom:6 }}>{k.label}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:k.col, lineHeight:1 }}>{k.value}</div>
            <div style={{ fontSize:11, color:'#bbb', marginTop:4 }}>{k.unit}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:24 }}>
        {/* Scorecard preview */}
        <div style={{ background:'#fff', borderRadius:16, padding:24, border:'1px solid rgba(26,26,46,0.07)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
            <div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>This Week's Scorecard</h3>
              <div style={{ fontSize:12, color:'#999', marginTop:3 }}>{SCORECARD.week}</div>
            </div>
            <ScoreRing score={87} size={72} />
          </div>
          {SCORECARD.metrics.map(m => {
            const c = scoreColor(m.score);
            return (
              <div key={m.abbr} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(26,26,46,0.05)' }}>
                <span style={{ fontSize:13, color:'#555' }}>{m.name}</span>
                <span style={{ fontSize:13, fontWeight:700, color:c.text, background:c.bg, padding:'2px 8px', borderRadius:999 }}>{m.score}</span>
              </div>
            );
          })}
          <button onClick={() => setActive('scorecard')} style={{ marginTop:14, fontSize:12, color:'var(--brand-accent)', fontWeight:600, display:'flex', alignItems:'center', gap:4 }}>
            Full scorecard <Icon.Arrow style={{ width:14,height:14 }} />
          </button>
        </div>

        {/* Right column */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Urgent announcement */}
          <div style={{ background:'linear-gradient(135deg,#FF6B35 0%,#e8541d 100%)', borderRadius:16, padding:22, color:'#fff' }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', opacity:0.85, marginBottom:8 }}>🔔 Urgent</div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, marginBottom:6 }}>{ANNOUNCEMENTS[0].title}</div>
            <div style={{ fontSize:13, opacity:0.9, lineHeight:1.5 }}>{ANNOUNCEMENTS[0].body}</div>
            <div style={{ marginTop:10, fontSize:11, opacity:0.65 }}>{ANNOUNCEMENTS[0].from} · {ANNOUNCEMENTS[0].date}</div>
          </div>

          {/* AI Tip */}
          <div style={{ background:'#fff', borderRadius:16, padding:22, border:'1px solid rgba(255,107,53,0.2)', flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <div style={{ width:30,height:30,borderRadius:8,background:'rgba(26,26,46,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15 }}>✨</div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--brand-ink)' }}>AI Coaching Tip</div>
                <div style={{ fontSize:11, color:'#aaa' }}>Based on your scorecard</div>
              </div>
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:'var(--brand-accent)', marginBottom:8 }}>📷 Photo on Delivery · 79/100</div>
            <p style={{ fontSize:13, color:'#555', lineHeight:1.65, margin:0 }}>
              Take the photo BEFORE walking away — make sure the package is fully visible in the frame, not just the door.
            </p>
          </div>
        </div>
      </div>

      {/* Training library preview */}
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>Training Library</h3>
          <button onClick={() => setActive('training')} style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>See all →</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 }}>
          {VIDEOS.map(v => (
            <div key={v.id} style={{ background:'#fff', borderRadius:14, overflow:'hidden', border:'1px solid rgba(26,26,46,0.07)', cursor:'pointer', transition:'transform .15s,box-shadow .15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(26,26,46,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
            >
              <div style={{ height:90, background:`linear-gradient(135deg,${v.color}bb,${v.color})`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                <div style={{ width:34,height:34,borderRadius:'50%',background:'rgba(255,255,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                  <div style={{ width:0,height:0,borderTop:'8px solid transparent',borderBottom:'8px solid transparent',borderLeft:'13px solid #fff',marginLeft:3 }} />
                </div>
                <div style={{ position:'absolute',bottom:6,right:8,fontSize:10,fontWeight:700,background:'rgba(0,0,0,0.45)',color:'#fff',padding:'2px 6px',borderRadius:4 }}>{v.duration}</div>
              </div>
              <div style={{ padding:'10px 12px' }}>
                <div style={{ fontSize:10,color:v.color,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:4 }}>{v.category}</div>
                <div style={{ fontSize:12,fontWeight:600,color:'var(--brand-ink)',lineHeight:1.4 }}>{v.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DriverScorecard() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 4px' }}>My Scorecard</h2>
      <div style={{ fontSize:13, color:'#999', marginBottom:28 }}>Week of {SCORECARD.week}</div>

      <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap:20, marginBottom:24 }}>
        {/* Overall card */}
        <div style={{ background:'#fff', borderRadius:18, padding:28, border:'1px solid rgba(26,26,46,0.07)', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <ScoreRing score={87} size={140} />
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'var(--brand-ink)' }}>Great</div>
            <div style={{ fontSize:13, color:'#999' }}>Your tier this week</div>
          </div>
          {/* History bars */}
          <div style={{ width:'100%', marginTop:8 }}>
            <div style={{ display:'flex', justifyContent:'center', gap:6, alignItems:'flex-end', height:60 }}>
              {SCORECARD.history.map((s,i) => (
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                  <div style={{ width:28, height:`${(s/100)*52}px`, background: i===5 ? 'var(--brand-accent)' : 'rgba(26,26,46,0.1)', borderRadius:4, transition:'height .4s' }} />
                  <div style={{ fontSize:9, color:'#bbb' }}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:11, color:'#bbb', marginTop:6 }}>6-week history</div>
          </div>
        </div>

        {/* Metric cards */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
          {SCORECARD.metrics.map(m => {
            const c = scoreColor(m.score);
            return (
              <div key={m.abbr} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:`1.5px solid ${c.border}` }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                  <div>
                    <div style={{ fontSize:10, color:'#bbb', fontWeight:600, letterSpacing:'0.07em', textTransform:'uppercase', marginBottom:4 }}>{m.abbr}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:'var(--brand-ink)' }}>{m.name}</div>
                  </div>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:30, fontWeight:800, color:c.text }}>{m.score}</div>
                </div>
                <div style={{ marginTop:14, background:'rgba(26,26,46,0.06)', borderRadius:999, height:6, overflow:'hidden' }}>
                  <div style={{ width:`${m.score}%`, height:'100%', background:c.text, borderRadius:999, transition:'width .8s ease' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Tips */}
      <div>
        <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, margin:'0 0 14px' }}>✨ AI Coaching Tips for This Week</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {SCORECARD.tips.map((tip,i) => (
            <div key={i} style={{ background:'#fff', borderRadius:14, padding:22, border:'1px solid rgba(255,107,53,0.18)', background:'linear-gradient(135deg,rgba(255,107,53,0.03) 0%,rgba(26,26,46,0.02) 100%)' }}>
              <div style={{ fontSize:13, fontWeight:700, color:'var(--brand-accent)', marginBottom:10 }}>{tip.icon} {tip.metric}</div>
              <p style={{ fontSize:13, color:'#444', lineHeight:1.7, margin:0 }}>{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DriverTraining() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 4px' }}>Training Library</h2>
      <p style={{ color:'#999', fontSize:14, marginBottom:28 }}>Resources to handle any situation on the road.</p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
        {VIDEOS.map(v => (
          <div key={v.id} style={{ background:'#fff', borderRadius:16, overflow:'hidden', border:'1px solid rgba(26,26,46,0.07)', cursor:'pointer', transition:'transform .15s,box-shadow .15s' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 10px 30px rgba(26,26,46,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; }}
          >
            <div style={{ height:150, background:`linear-gradient(135deg,${v.color}cc,${v.color})`, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
              <div style={{ width:52,height:52,borderRadius:'50%',background:'rgba(255,255,255,0.22)',backdropFilter:'blur(4px)',display:'flex',alignItems:'center',justifyContent:'center' }}>
                <div style={{ width:0,height:0,borderTop:'10px solid transparent',borderBottom:'10px solid transparent',borderLeft:'18px solid #fff',marginLeft:4 }} />
              </div>
              <div style={{ position:'absolute',top:10,left:12,fontSize:10,fontWeight:700,background:'rgba(0,0,0,0.3)',color:'#fff',padding:'3px 8px',borderRadius:999,backdropFilter:'blur(4px)' }}>{v.category}</div>
              <div style={{ position:'absolute',bottom:10,right:12,fontSize:10,fontWeight:700,background:'rgba(0,0,0,0.4)',color:'#fff',padding:'3px 8px',borderRadius:4 }}>{v.duration}</div>
            </div>
            <div style={{ padding:'16px 18px' }}>
              <div style={{ fontWeight:600, fontSize:14, color:'var(--brand-ink)', lineHeight:1.4, marginBottom:10 }}>{v.title}</div>
              <button style={{ fontSize:12, color:v.color, fontWeight:700 }}>Watch video →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DriverAnnouncements() {
  const [read, setRead] = usePS({});
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 28px' }}>Announcements</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} style={{ background:'#fff', borderRadius:16, padding:'22px 24px', border:`1px solid ${a.urgent ? 'rgba(255,107,53,0.25)' : 'rgba(26,26,46,0.07)'}`, borderLeft:`4px solid ${a.urgent ? '#FF6B35' : 'transparent'}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                  {a.urgent && <span style={{ fontSize:10, fontWeight:700, background:'rgba(255,107,53,0.1)', color:'#FF6B35', padding:'2px 9px', borderRadius:999, textTransform:'uppercase', letterSpacing:'0.06em' }}>Urgent</span>}
                  {!read[a.id] && <span style={{ width:7,height:7,borderRadius:'50%',background:'#FF6B35',display:'inline-block' }} />}
                </div>
                <h4 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, margin:'0 0 8px' }}>{a.title}</h4>
                <p style={{ fontSize:13, color:'#555', lineHeight:1.65, margin:'0 0 10px' }}>{a.body}</p>
                <div style={{ fontSize:11, color:'#bbb' }}>{a.from} · {a.date}</div>
              </div>
              {!read[a.id] ? (
                <button onClick={() => setRead(r => ({...r,[a.id]:true}))} style={{ marginLeft:20, padding:'8px 16px', fontSize:12, fontWeight:600, background:'rgba(26,26,46,0.05)', border:'1px solid rgba(26,26,46,0.1)', borderRadius:8, color:'#555', flexShrink:0, whiteSpace:'nowrap' }}>
                  Acknowledge ✓
                </button>
              ) : (
                <span style={{ marginLeft:20, fontSize:12, color:'#16a34a', fontWeight:600, flexShrink:0 }}>✓ Read</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MANAGER PORTAL ───────────────────────────────────────────
function ManagerPortal({ user, onLogout }) {
  const [active, setActive] = usePS('overview');
  return (
    <div style={{ minHeight:'100vh', background:'#f7f7fa' }}>
      <PortalNav user={user} onLogout={onLogout} active={active} setActive={setActive} />
      <main style={{ maxWidth:1160, margin:'0 auto', padding:'36px 28px' }}>
        {active === 'overview'       && <ManagerOverview user={user} setActive={setActive} />}
        {active === 'my-team'        && <ManagerTeam />}
        {active === 'announcements'  && <ManagerAnnouncements />}
        {active === 'scorecards'     && (
          <div style={{ textAlign:'center', padding:'80px 20px', color:'#999' }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📤</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:18, fontWeight:700, color:'var(--brand-ink)' }}>Scorecard Upload</div>
            <div style={{ fontSize:14, marginTop:6 }}>Upload the Amazon scorecard CSV and it will be distributed automatically.</div>
            <button style={{ marginTop:20, padding:'12px 24px', background:'var(--brand-accent)', color:'#fff', borderRadius:10, fontSize:14, fontWeight:700 }}>Upload Scorecard</button>
          </div>
        )}
      </main>
    </div>
  );
}

function ManagerOverview({ user, setActive }) {
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:13, color:'#999' }}>Monday, May 26, 2026</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'var(--brand-ink)', margin:'4px 0 4px' }}>Good morning, {user.name.split(' ')[0]}</h1>
        <div style={{ fontSize:13, color:'#999' }}>{user.title} · {user.station}</div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Active Drivers',    value:'60', sub:'on route today',   col:'#2563eb' },
          { label:'Avg Team Score',    value:'82', sub:'this week',        col:'#16a34a' },
          { label:'At-Risk Drivers',   value:'2',  sub:'need coaching',    col:'#dc2626' },
          { label:'Announcements',     value:'3',  sub:'sent this week',   col:'#FF6B35' },
        ].map(k => (
          <div key={k.label} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)' }}>
            <div style={{ fontSize:12, color:'#999', fontWeight:500, marginBottom:6 }}>{k.label}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:30, fontWeight:800, color:k.col }}>{k.value}</div>
            <div style={{ fontSize:11, color:'#bbb', marginTop:4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:20 }}>
        {/* Team table */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
          <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(26,26,46,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>Team Performance</h3>
            <button onClick={() => setActive('my-team')} style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>View all →</button>
          </div>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'rgba(26,26,46,0.025)' }}>
                {['Driver','ID','Score','Tier','Routes'].map(h => (
                  <th key={h} style={{ padding:'10px 20px', textAlign:'left', fontSize:11, fontWeight:600, color:'#aaa', letterSpacing:'0.04em', textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DRIVER_LIST.map(d => {
                const c = scoreColor(d.score);
                return (
                  <tr key={d.id} style={{ borderTop:'1px solid rgba(26,26,46,0.05)' }}>
                    <td style={{ padding:'12px 20px' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <Avatar name={d.name} size={30} />
                        <span style={{ fontSize:13, fontWeight:600, color:'var(--brand-ink)' }}>{d.name}</span>
                      </div>
                    </td>
                    <td style={{ padding:'12px 20px', fontSize:12, color:'#aaa', fontFamily:'var(--font-mono)' }}>{d.id}</td>
                    <td style={{ padding:'12px 20px' }}>
                      <span style={{ fontSize:13, fontWeight:700, color:c.text, background:c.bg, padding:'2px 9px', borderRadius:999 }}>{d.score}</span>
                    </td>
                    <td style={{ padding:'12px 20px', fontSize:13, fontWeight:600, color:tierColor(d.tier) }}>{d.tier}</td>
                    <td style={{ padding:'12px 20px', fontSize:13, color:'#666' }}>{d.routes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Quick actions */}
        <div style={{ background:'#fff', borderRadius:16, padding:22, border:'1px solid rgba(26,26,46,0.07)', alignSelf:'start' }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:'0 0 14px' }}>Quick Actions</h3>
          {[
            { label:'Upload Scorecard',      icon:'📤', fn: () => setActive('scorecards') },
            { label:'Send Announcement',     icon:'📢', fn: () => setActive('announcements') },
            { label:'Schedule Extra Routes', icon:'🗓️', fn: () => {} },
            { label:'Add Training Video',    icon:'🎥', fn: () => {} },
          ].map(a => (
            <button key={a.label} onClick={a.fn} style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:10, marginBottom:6, background:'rgba(26,26,46,0.025)', border:'1px solid rgba(26,26,46,0.07)', textAlign:'left', fontSize:13, fontWeight:600, color:'var(--brand-ink)', transition:'background .15s' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(26,26,46,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(26,26,46,0.025)'}
            >
              <span style={{ fontSize:18 }}>{a.icon}</span>{a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ManagerTeam() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>My Team</h2>
      <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'rgba(26,26,46,0.03)' }}>
              {['Driver','ID','Score','Tier','Routes','Status'].map(h => (
                <th key={h} style={{ padding:'12px 22px', textAlign:'left', fontSize:11, fontWeight:600, color:'#aaa', letterSpacing:'0.04em', textTransform:'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DRIVER_LIST.map(d => {
              const c = scoreColor(d.score);
              return (
                <tr key={d.id} style={{ borderTop:'1px solid rgba(26,26,46,0.05)', transition:'background .12s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(26,26,46,0.015)'}
                  onMouseLeave={e => e.currentTarget.style.background=''}
                >
                  <td style={{ padding:'14px 22px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <Avatar name={d.name} size={34} />
                      <span style={{ fontSize:14, fontWeight:600, color:'var(--brand-ink)' }}>{d.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:'14px 22px', fontSize:12, color:'#bbb', fontFamily:'var(--font-mono)' }}>{d.id}</td>
                  <td style={{ padding:'14px 22px' }}>
                    <span style={{ fontSize:14, fontWeight:700, color:c.text, background:c.bg, padding:'3px 10px', borderRadius:999 }}>{d.score}</span>
                  </td>
                  <td style={{ padding:'14px 22px', fontSize:13, fontWeight:700, color:tierColor(d.tier) }}>{d.tier}</td>
                  <td style={{ padding:'14px 22px', fontSize:13, color:'#666' }}>{d.routes} routes</td>
                  <td style={{ padding:'14px 22px' }}>
                    <span style={{ fontSize:11, fontWeight:600, background:'rgba(34,197,94,0.1)', color:'#16a34a', padding:'3px 9px', borderRadius:999 }}>● Active</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ManagerAnnouncements() {
  const [showForm, setShowForm] = usePS(false);
  const [title, setTitle] = usePS('');
  const [msg, setMsg] = usePS('');
  const [sent, setSent] = usePS(false);

  function handleSend() {
    if (!title.trim() || !msg.trim()) return;
    setSent(true); setTitle(''); setMsg(''); setShowForm(false);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:0 }}>Announcements</h2>
        <button onClick={() => setShowForm(true)} style={{ padding:'10px 18px', background:'var(--brand-accent)', color:'#fff', borderRadius:10, fontSize:13, fontWeight:700 }}>
          + New Announcement
        </button>
      </div>

      {sent && (
        <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:12, padding:'12px 18px', marginBottom:18, color:'#16a34a', fontSize:13, fontWeight:600 }}>
          ✓ Announcement sent to all 60 team members.
        </div>
      )}

      {showForm && (
        <div style={{ background:'#fff', borderRadius:16, padding:24, border:'1px solid rgba(26,26,46,0.1)', marginBottom:20 }}>
          <h4 style={{ fontFamily:'var(--font-display)', fontWeight:700, margin:'0 0 16px', fontSize:15 }}>New Announcement</h4>
          <input placeholder="Subject / Title" value={title} onChange={e => setTitle(e.target.value)}
            style={{ width:'100%', padding:'11px 14px', borderRadius:9, border:'1.5px solid rgba(26,26,46,0.14)', fontSize:13, marginBottom:10, boxSizing:'border-box', outline:'none' }} />
          <textarea placeholder="Write your message here..." value={msg} onChange={e => setMsg(e.target.value)} rows={4}
            style={{ width:'100%', padding:'11px 14px', borderRadius:9, border:'1.5px solid rgba(26,26,46,0.14)', fontSize:13, resize:'vertical', boxSizing:'border-box', outline:'none' }} />
          <div style={{ display:'flex', gap:10, marginTop:12 }}>
            <button onClick={handleSend} style={{ padding:'10px 20px', background:'var(--brand-accent)', color:'#fff', borderRadius:9, fontSize:13, fontWeight:700 }}>Send to All Drivers</button>
            <button onClick={() => setShowForm(false)} style={{ padding:'10px 16px', border:'1px solid rgba(26,26,46,0.14)', borderRadius:9, fontSize:13, color:'#666' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} style={{ background:'#fff', borderRadius:14, padding:'20px 24px', border:`1px solid ${a.urgent ? 'rgba(255,107,53,0.2)' : 'rgba(26,26,46,0.07)'}`, borderLeft:`4px solid ${a.urgent ? '#FF6B35' : 'transparent'}` }}>
            {a.urgent && <span style={{ fontSize:10, fontWeight:700, background:'rgba(255,107,53,0.1)', color:'#FF6B35', padding:'2px 9px', borderRadius:999, textTransform:'uppercase', marginBottom:8, display:'inline-block' }}>Urgent</span>}
            <h4 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:'6px 0 8px' }}>{a.title}</h4>
            <p style={{ fontSize:13, color:'#555', lineHeight:1.65, margin:'0 0 8px' }}>{a.body}</p>
            <div style={{ fontSize:11, color:'#bbb' }}>Sent by {a.from} · {a.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = usePS('');
  const [pw, setPw] = usePS('');
  const [error, setError] = usePS('');
  const [loading, setLoading] = usePS(false);

  function submit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    setTimeout(() => {
      const u = DEMO_USERS[email.toLowerCase().trim()];
      if (u && u.password === pw) { onLogin({...u, email}); }
      else { setError('Invalid email or password. Please try again.'); setLoading(false); }
    }, 700);
  }

  const inputStyle = {
    width:'100%', padding:'12px 14px', borderRadius:10,
    border:'1.5px solid rgba(26,26,46,0.14)', fontSize:14,
    background:'#fff', outline:'none', boxSizing:'border-box',
    transition:'border-color .15s',
  };

  return (
    <div style={{ minHeight:'100vh', display:'flex' }}>
      {/* Left — brand panel */}
      <div style={{ flex:'0 0 46%', background:'var(--brand-ink)', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'52px 56px' }} className="portal-left">
        <FloRideLogo onDark size={26} />
        <div>
          <h1 style={{ fontFamily:'var(--font-display)', fontSize:42, fontWeight:800, color:'#fff', lineHeight:1.12, margin:'0 0 18px' }}>
            Your team,<br /><span style={{ color:'var(--brand-accent)' }}>connected.</span>
          </h1>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:15, lineHeight:1.7, maxWidth:340, margin:'0 0 36px' }}>
            Access your scorecard, training materials, and company announcements — all in one place.
          </p>
          {[
            { icon:'📊', text:'Your weekly scorecard & performance metrics' },
            { icon:'🎥', text:'Training videos for complex route situations' },
            { icon:'📢', text:'Company announcements & shift notifications' },
          ].map(f => (
            <div key={f.text} style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:14 }}>
              <span style={{ fontSize:18, marginTop:1 }}>{f.icon}</span>
              <span style={{ fontSize:13, color:'rgba(255,255,255,0.7)', lineHeight:1.5 }}>{f.text}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.3)' }}>© 2026 FloRide Delivery, LLC</div>
      </div>

      {/* Right — form */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', background:'#f7f7fa', padding:'40px 24px' }}>
        <div style={{ width:'100%', maxWidth:380 }}>
          <div style={{ marginBottom:34 }}>
            <h2 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'var(--brand-ink)', margin:'0 0 6px' }}>Employee Sign In</h2>
            <p style={{ color:'#999', fontSize:14, margin:0 }}>Use your FloRide employee email</p>
          </div>

          <form onSubmit={submit}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--brand-ink)', marginBottom:6 }}>Email address</label>
              <input type="email" placeholder="you@floridedelivery.com" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle}
                onFocus={e => e.target.style.borderColor='#FF6B35'}
                onBlur={e => e.target.style.borderColor='rgba(26,26,46,0.14)'} />
            </div>
            <div style={{ marginBottom:22 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <label style={{ fontSize:12, fontWeight:600, color:'var(--brand-ink)' }}>Password</label>
                <button type="button" style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>Forgot password?</button>
              </div>
              <input type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} required style={inputStyle}
                onFocus={e => e.target.style.borderColor='#FF6B35'}
                onBlur={e => e.target.style.borderColor='rgba(26,26,46,0.14)'} />
            </div>

            {error && (
              <div style={{ marginBottom:16, padding:'10px 14px', background:'rgba(239,68,68,0.07)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:8, color:'#dc2626', fontSize:13 }}>{error}</div>
            )}

            <button type="submit" disabled={loading} style={{ width:'100%', padding:'13px', borderRadius:10, background: loading ? 'rgba(255,107,53,0.55)' : 'var(--brand-accent)', color:'#fff', fontSize:14, fontWeight:700, cursor: loading ? 'wait' : 'pointer', transition:'background .15s' }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={{ textAlign:'center', fontSize:12, color:'#bbb', marginTop:28 }}>
            Need access? Contact <span style={{ color:'var(--brand-accent)' }}>support@floridedelivery.com</span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 780px) { .portal-left { display: none !important; } }
      `}</style>
    </div>
  );
}

// ─── Portal root ──────────────────────────────────────────────
function PortalPage({ user, setUser }) {
  if (!user) return <LoginPage onLogin={setUser} />;
  if (user.role === 'manager') return <ManagerPortal user={user} onLogout={() => setUser(null)} />;
  return <DriverPortal user={user} onLogout={() => setUser(null)} />;
}

Object.assign(window, { PortalPage });
