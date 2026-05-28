/* ============================================================
   FloRide — Employee Portal
   pages-portal.jsx
   ============================================================ */

const { useState: usePS, useEffect: usePE } = React;
const isMob = () => typeof window !== 'undefined' && window.innerWidth < 640;
const isTab = () => typeof window !== 'undefined' && window.innerWidth < 900;

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
  'trainer@floride.com': {
    password: 'trainer2026',
    role: 'trainer',
    name: 'Marcus Webb',
    id: 'TR-003',
    title: 'Driver Trainer',
    station: 'DFL4 — Orlando',
  },
  'dispatch@floride.com': {
    password: 'dispatch2026',
    role: 'dispatch',
    name: 'Sofia Morales',
    id: 'DS-007',
    title: 'Dispatch Coordinator',
    station: 'DFL4 — Orlando',
  },
  'sassistant@floride.com': {
    password: 'sassist2026',
    role: 'supervisor-assistant',
    name: 'Kevin Park',
    id: 'SA-002',
    title: 'Supervisor Assistant',
    station: 'DFL4 — Orlando',
  },
  'supervisor@floride.com': {
    password: 'super2026',
    role: 'supervisor',
    name: 'Yamila Ricardo',
    id: 'SV-001',
    title: 'Operations Supervisor',
    station: 'DFL4 — Orlando',
  },
  'ops@floride.com': {
    password: 'ops2026',
    role: 'ops-manager',
    name: 'Jordan Ellis',
    id: 'OM-001',
    title: 'Operations Manager',
    station: 'DFL4 — Orlando',
  },
  'ceo@floride.com': {
    password: 'ceo2026',
    role: 'ceo',
    name: 'Alex Johnson',
    id: 'CEO-01',
    title: 'Chief Executive Officer',
    station: 'FloRide HQ — Orlando',
  },
};

// ─── Infraction streaks per driver ───────────────────────────
const INFRACTION_STREAKS = {
  'DR-0045': { days: 47, lastInc: 'Apr 9',  milestone: 60  },
  'DR-0032': { days: 112,lastInc: 'Feb 4',  milestone: 120 },
  'DR-0018': { days: 8,  lastInc: 'May 18', milestone: 30  },
  'DR-0061': { days: 63, lastInc: 'Mar 24', milestone: 90  },
  'DR-0074': { days: 3,  lastInc: 'May 23', milestone: 30  },
  'DR-0055': { days: 89, lastInc: 'Feb 26', milestone: 90  },
};

// ─── Recognition data ─────────────────────────────────────────
const RECOGNITION = {
  month: 'May 2026',
  winner: {
    id: 'DR-0032',
    name: 'Maria Gonzalez',
    score: 95,
    tier: 'Platinum',
    routes: 22,
    highlights: [
      { label: 'Delivered & Received', value: '99/100' },
      { label: 'Customer Feedback',    value: '98/100' },
      { label: 'Safe Driving Score',   value: '97/100' },
    ],
    quote: 'Maria has been an absolute standout this month. She completed 22 routes with zero incidents, received 4 personal compliments from customers, and helped two new drivers during their first week on the road. Her consistency and attitude set the standard for the entire team.',
    from: 'Yamila Ricardo · Operations Supervisor',
  },
  topWeek: [
    { id:'DR-0055', name:'Antoine Dubois',    score:91, highlight:'Zero incidents · 5 routes completed', badge:'⭐' },
    { id:'DR-0061', name:'James Thompson',     score:88, highlight:'Highest On-Time score · 5 routes',   badge:'⭐' },
    { id:'DR-0045', name:'Daniel Cantor Soto', score:87, highlight:'47-day streak · Most improved this week', badge:'📈' },
  ],
};


// ─── Notifications per role ────────────────────────────────────
const NOTIFICATIONS = {
  'driver': [
    { id:1, icon:'📊', title:'Your scorecard is ready', body:'Week of May 19–25 · Score: 87 · Tier: Gold', time:'2h ago',  read:false },
    { id:2, icon:'🔔', title:'New announcement', body:'Extra Routes Available — Saturday May 30. Reply if available.', time:'4h ago',  read:false },
    { id:3, icon:'🏆', title:'Recognition Wall updated', body:'Maria Gonzalez named Employee of the Month. See who made the Top 3 this week!', time:'1d ago',  read:true },
    { id:4, icon:'✅', title:'Training completed', body:'You finished "Safe driving in heavy rain" — great work!', time:'2d ago',  read:true },
  ],
  'manager': [
    { id:1, icon:'🚨', title:'Bronze Alert — Action Required', body:'Lena Muller has been Bronze for 3 consecutive weeks. Schedule coaching this week.', time:'1h ago',  read:false },
    { id:2, icon:'📋', title:'2 driver requests pending', body:'Carlos Reyes: Day Off. Lena Muller: Uniform issue. Review in Requests tab.', time:'3h ago',  read:false },
    { id:3, icon:'📤', title:'Scorecard uploaded', body:'Week May 19–25 scores are now visible to all drivers.', time:'1d ago',  read:true },
  ],
  'trainer': [
    { id:1, icon:'🎓', title:'Tomás Guerrero — Final Eval Today', body:'Final evaluation scheduled at 7:00 AM on Route. Be ready.', time:'30m ago', read:false },
    { id:2, icon:'👤', title:'New trainee assigned', body:'Luis Fernandez starts Day 1 tomorrow at DFL4 Lot A.', time:'1d ago',  read:true },
  ],
  'dispatch': [
    { id:1, icon:'⚠️', title:'RT-005 Delayed — Carlos Reyes', body:'Sanford route at 33%. Vehicle overheating reported. Check INC-041.', time:'45m ago', read:false },
    { id:2, icon:'🚨', title:'New incident reported', body:'INC-041: Van overheating on US-17. Driver pulled over safely.', time:'1h ago',  read:false },
    { id:3, icon:'❌', title:'Luis Fernandez absent today', body:'RT-008 Lake Mary has no driver. Reassign or cancel route.', time:'2h ago',  read:false },
  ],
  'supervisor-assistant': [
    { id:1, icon:'⏰', title:'Carlos Reyes checked in late', body:'3rd late arrival this week. Flag for supervisor review.', time:'2h ago',  read:false },
    { id:2, icon:'❌', title:'Luis Fernandez absent', body:'No check-in as of 9:00 AM. Route unassigned.', time:'3h ago',  read:false },
    { id:3, icon:'📋', title:'Daily report due at noon', body:'Submit attendance report to supervisor before 12:00 PM.', time:'4h ago',  read:true },
  ],
  'supervisor': [
    { id:1, icon:'🚨', title:'Bronze Alert — Coaching Required', body:'Lena Muller: 3 consecutive Bronze weeks. Open a formal coaching session.', time:'1h ago',  read:false },
    { id:2, icon:'📊', title:'Weekly team report ready', body:'Team avg score: 82. 2 drivers at risk. 1 Bronze alert.', time:'3h ago',  read:false },
    { id:3, icon:'⏰', title:'Attendance issue flagged', body:'Carlos Reyes: 3rd late arrival this week. Review recommended.', time:'5h ago',  read:true },
  ],
  'ops-manager': [
    { id:1, icon:'🚗', title:'Fleet inspection due Friday', body:'3 vans pending inspection. All must pass before May 29.', time:'2h ago',  read:false },
    { id:2, icon:'🚨', title:'Bronze Alert on team', body:'Lena Muller flagged for 3 consecutive Bronze weeks.', time:'3h ago',  read:false },
    { id:3, icon:'📈', title:'Weekly ops report available', body:'60 routes completed. On-time rate: 91%. See full report.', time:'1d ago',  read:true },
  ],
  'ceo': [
    { id:1, icon:'🚨', title:'Bronze Alert — Immediate Action', body:'Lena Muller (DR-0074) at 3 Bronze weeks. Supervisor notified.', time:'1h ago',  read:false },
    { id:2, icon:'💰', title:'Weekly revenue summary', body:'Est. revenue this week: $75,600 · Bonus tier: on track', time:'4h ago',  read:false },
    { id:3, icon:'🚗', title:'Fleet: 1 vehicle out of service', body:'Van #FL-012 overheating. Under review by dispatch.', time:'5h ago',  read:true },
  ],
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
  { id: 'DR-0045', name: 'Daniel Cantor Soto', score: 87, tier: 'Gold',     routes: 5, tierHistory: ['Silver','Gold','Gold']     },
  { id: 'DR-0032', name: 'Maria Gonzalez',     score: 95, tier: 'Platinum', routes: 5, tierHistory: ['Gold','Platinum','Platinum'] },
  { id: 'DR-0018', name: 'Carlos Reyes',       score: 71, tier: 'Silver',   routes: 4, tierHistory: ['Gold','Bronze','Silver']    },
  { id: 'DR-0061', name: 'James Thompson',     score: 88, tier: 'Gold',     routes: 5, tierHistory: ['Gold','Gold','Gold']        },
  { id: 'DR-0074', name: 'Lena Muller',        score: 62, tier: 'Bronze',   routes: 3, tierHistory: ['Bronze','Bronze','Bronze']  },
  { id: 'DR-0055', name: 'Antoine Dubois',     score: 91, tier: 'Platinum', routes: 5, tierHistory: ['Gold','Gold','Platinum']    },
];

// Drivers with 3 consecutive Bronze weeks → need intervention
const BRONZE_ALERTS = DRIVER_LIST.filter(d =>
  d.tierHistory && d.tierHistory.length === 3 && d.tierHistory.every(t => t === 'Bronze')
);

// ─── Role-specific sample data ───────────────────────────────
const TRAINEES = [
  { id:'DR-0088', name:'Luis Fernandez',   days:3,  progress:28, status:'In Training',  score: null },
  { id:'DR-0091', name:'Priya Sharma',     days:7,  progress:65, status:'In Training',  score: null },
  { id:'DR-0079', name:'Tomás Guerrero',   days:12, progress:90, status:'Final Eval',   score: 84   },
  { id:'DR-0083', name:'Aisha Okafor',     days:14, progress:100,status:'Completed',    score: 91   },
];

const TRAINING_SCHEDULE = [
  { day:'Mon May 26', time:'7:00 AM', trainee:'Luis Fernandez',  topic:'Van pre-inspection & safety check', location:'DFL4 Lot A' },
  { day:'Mon May 26', time:'8:30 AM', trainee:'Priya Sharma',    topic:'Route navigation & customer protocols', location:'On Route' },
  { day:'Tue May 27', time:'7:00 AM', trainee:'Tomás Guerrero',  topic:'Final evaluation — full solo route', location:'On Route' },
  { day:'Wed May 28', time:'9:00 AM', trainee:'Luis Fernandez',  topic:'Package handling & POD procedures', location:'Warehouse' },
];

const DISPATCH_ROUTES = [
  { id:'RT-001', driver:'Maria Gonzalez',  zone:'Orlando Central',     stops:148, status:'Active',    pct:62 },
  { id:'RT-002', driver:'Daniel Cantor',   zone:'Lake Nona',           stops:132, status:'Active',    pct:48 },
  { id:'RT-003', driver:'James Thompson',  zone:'Winter Park',         stops:119, status:'Active',    pct:71 },
  { id:'RT-004', driver:'Antoine Dubois',  zone:'Kissimmee',           stops:155, status:'Active',    pct:55 },
  { id:'RT-005', driver:'Carlos Reyes',    zone:'Sanford',             stops:108, status:'Delayed',   pct:33 },
  { id:'RT-006', driver:'Lena Muller',     zone:'Apopka',              stops:141, status:'Active',    pct:80 },
  { id:'RT-007', driver:'Aisha Okafor',    zone:'Hunter\'s Creek',     stops:127, status:'Completed', pct:100 },
  { id:'RT-008', driver:'Priya Sharma',    zone:'Lake Mary',           stops:98,  status:'Not Started',pct:0 },
];

const INCIDENTS = [
  { id:'INC-041', date:'May 26 · 10:14 AM', driver:'Carlos Reyes',   type:'Vehicle Issue',   desc:'Van overheating warning light. Pulled over safely at Sunoco on US-17.', status:'Open',     priority:'high' },
  { id:'INC-040', date:'May 26 · 8:52 AM',  driver:'Lena Muller',    type:'Customer Report', desc:'Customer claims package delivered to wrong address.', status:'In Review', priority:'medium' },
  { id:'INC-039', date:'May 25 · 3:30 PM',  driver:'James Thompson', type:'Accident',        desc:'Minor parking lot collision. No injuries. Photos submitted.', status:'Closed',   priority:'low' },
];

const ATTENDANCE = [
  { id:'DR-0045', name:'Daniel Cantor Soto', status:'On Time',  time:'9:48 AM', route:'Lake Nona' },
  { id:'DR-0032', name:'Maria Gonzalez',     status:'On Time',  time:'7:02 AM', route:'Orlando Central' },
  { id:'DR-0018', name:'Carlos Reyes',       status:'Late',     time:'9:22 AM', route:'Sanford' },
  { id:'DR-0061', name:'James Thompson',     status:'On Time',  time:'6:58 AM', route:'Winter Park' },
  { id:'DR-0074', name:'Lena Muller',        status:'On Time',  time:'7:15 AM', route:'Apopka' },
  { id:'DR-0055', name:'Antoine Dubois',     status:'On Time',  time:'7:01 AM', route:'Kissimmee' },
  { id:'DR-0088', name:'Luis Fernandez',     status:'Absent',   time:'—',       route:'—' },
];

const REQUESTS = [
  { id:'REQ-018', driver:'Carlos Reyes',   type:'Day Off Request',  msg:'Requesting Friday May 30 off — family emergency.', time:'9:05 AM', urgent:true  },
  { id:'REQ-017', driver:'Lena Muller',    type:'Uniform Issue',    msg:'My vest size is wrong. Need a Medium, received Large.', time:'8:30 AM', urgent:false },
  { id:'REQ-016', driver:'Luis Fernandez', type:'Question',         msg:'Where do I pick up my van scanner before the route?', time:'7:45 AM', urgent:false },
];

const CHECKLIST = [
  { id:1, task:'Confirm all 60 drivers have checked in', done:true },
  { id:2, task:'Send shift reminders for PM wave (2:00 PM)', done:false },
  { id:3, task:'Review Carlos Reyes attendance pattern — 3rd late this week', done:false },
  { id:4, task:'Update scanner inventory log in the system', done:true },
  { id:5, task:'Submit daily attendance report to supervisor by noon', done:false },
];

const COACHING_QUEUE = [
  { id:'DR-0074', name:'Lena Muller',   score:62, issues:['Safe Driving: 58', 'On-Time: 65'], sessions:0, priority:'urgent' },
  { id:'DR-0018', name:'Carlos Reyes',  score:71, issues:['POD: 68', 'Park Sequence: 70'], sessions:1, priority:'soon'   },
  { id:'DR-0045', name:'Daniel Cantor', score:87, issues:['POD: 79', 'Park Seq: 72'],      sessions:0, priority:'watch'  },
];

const FLEET = [
  { id:'VAN-12', driver:'Maria Gonzalez',  status:'Active',    mileage:87420, lastInsp:'May 20', fuel:78 },
  { id:'VAN-07', driver:'Carlos Reyes',    status:'Issue',     mileage:103850,lastInsp:'May 18', fuel:45 },
  { id:'VAN-23', driver:'James Thompson',  status:'Active',    mileage:62100, lastInsp:'May 22', fuel:91 },
  { id:'VAN-31', driver:'Antoine Dubois',  status:'Active',    mileage:44780, lastInsp:'May 21', fuel:65 },
  { id:'VAN-09', driver:'Lena Muller',     status:'Active',    mileage:118200,lastInsp:'May 15', fuel:82 },
  { id:'VAN-16', driver:'—',              status:'In Service', mileage:95440, lastInsp:'May 10', fuel:100 },
];

// ─── Helpers ──────────────────────────────────────────────────
function scoreColor(s) {
  if (s >= 90) return { bg: 'rgba(139,92,246,0.1)',  text: '#7c3aed', border: 'rgba(139,92,246,0.25)' }; // Platinum
  if (s >= 80) return { bg: 'rgba(234,179,8,0.12)',  text: '#b45309', border: 'rgba(234,179,8,0.3)'   }; // Gold
  if (s >= 70) return { bg: 'rgba(148,163,184,0.15)',text: '#475569', border: 'rgba(148,163,184,0.3)' }; // Silver
  return           { bg: 'rgba(180,83,9,0.12)',   text: '#9a3412', border: 'rgba(180,83,9,0.3)'   }; // Bronze
}

function tierColor(t) {
  return ({ Platinum:'#7c3aed', Gold:'#b45309', Silver:'#475569', Bronze:'#9a3412',
            Fantastic:'#16a34a', Great:'#2563eb', Fair:'#d97706', 'At Risk':'#dc2626' })[t] || '#666';
}

function tierBg(t) {
  return ({ Platinum:'rgba(139,92,246,0.1)', Gold:'rgba(234,179,8,0.12)', Silver:'rgba(148,163,184,0.15)', Bronze:'rgba(180,83,9,0.12)' })[t] || 'rgba(26,26,46,0.06)';
}

function tierIcon(t) {
  return ({ Platinum:'🏆', Gold:'🥇', Silver:'🥈', Bronze:'🥉' })[t] || '—';
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

// ─── Notification Bell ────────────────────────────────────────
function NotificationBell({ role }) {
  const i = useT();
  const [open, setOpen] = usePS(false);
  const [read, setRead] = usePS({});
  const notifs = NOTIFICATIONS[role] || [];
  const unread = notifs.filter(n => !n.read && !read[n.id]).length;

  const markRead = (id) => setRead(r => ({ ...r, [id]: true }));
  const markAll = () => {
    const all = {};
    notifs.forEach(n => { all[n.id] = true; });
    setRead(all);
  };

  return (
    <div style={{ position:'relative' }}>
      <button onClick={() => setOpen(o => !o)} style={{ position:'relative', width:38, height:38, borderRadius:10, background: open ? 'rgba(26,26,46,0.07)' : 'transparent', border:'1px solid rgba(26,26,46,0.1)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:17, cursor:'pointer', transition:'background .15s' }}>
        🔔
        {unread > 0 && (
          <span style={{ position:'absolute', top:4, right:4, width:16, height:16, borderRadius:'50%', background:'#dc2626', color:'#fff', fontSize:9, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', lineHeight:1 }}>
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div style={{ position:'absolute', right:0, top:46, width: isMob() ? 300 : 360, background:'#fff', borderRadius:16, boxShadow:'0 8px 40px rgba(26,26,46,0.18)', border:'1px solid rgba(26,26,46,0.08)', zIndex:100, overflow:'hidden' }}>
          <div style={{ padding:'14px 18px', borderBottom:'1px solid rgba(26,26,46,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, color:'var(--brand-ink)' }}>{i('Notifications','Notificaciones')}</div>
            {unread > 0 && (
              <button onClick={markAll} style={{ fontSize:11, color:'var(--brand-accent)', fontWeight:600, cursor:'pointer' }}>{i('Mark all read','Marcar todo leído')}</button>
            )}
          </div>
          <div style={{ maxHeight:360, overflowY:'auto' }}>
            {notifs.length === 0 && (
              <div style={{ padding:24, textAlign:'center', color:'#aaa', fontSize:13 }}>{i('No notifications','Sin notificaciones')}</div>
            )}
            {notifs.map(n => {
              const isRead = n.read || read[n.id];
              return (
                <div key={n.id} onClick={() => markRead(n.id)} style={{ padding:'14px 18px', borderBottom:'1px solid rgba(26,26,46,0.05)', background: isRead ? '#fff' : 'rgba(255,107,53,0.04)', cursor:'pointer', display:'flex', gap:12, alignItems:'flex-start', transition:'background .1s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(26,26,46,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = isRead ? '#fff' : 'rgba(255,107,53,0.04)'}
                >
                  <div style={{ fontSize:20, flexShrink:0, marginTop:2 }}>{n.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                      <div style={{ fontSize:13, fontWeight: isRead ? 500 : 700, color:'var(--brand-ink)', lineHeight:1.3 }}>{n.title}</div>
                      {!isRead && <div style={{ width:7, height:7, borderRadius:'50%', background:'var(--brand-accent)', flexShrink:0, marginTop:4 }} />}
                    </div>
                    <div style={{ fontSize:12, color:'#777', marginTop:3, lineHeight:1.5 }}>{n.body}</div>
                    <div style={{ fontSize:11, color:'#bbb', marginTop:5 }}>{n.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
          {unread === 0 && notifs.length > 0 && (
            <div style={{ padding:'10px 18px', textAlign:'center', fontSize:12, color:'#bbb' }}>{i('All caught up ✓','Todo al día ✓')}</div>
          )}
        </div>
      )}
      {open && <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:99 }} />}
    </div>
  );
}

function PortalNav({ user, onLogout, active, setActive }) {
  const { lang, setLang } = useLang();
  const i = useT();
  const roleLinks = {
    'driver':               ['dashboard','scorecard','training','announcements','recognition'],
    'trainer':              ['overview','trainees','schedule','materials'],
    'dispatch':             ['routes','drivers','incidents','messages'],
    'supervisor-assistant': ['attendance','requests','checklist'],
    'supervisor':           ['overview','team','coaching','incidents'],
    'ops-manager':          ['overview','teams','fleet','reports'],
    'ceo':                  ['executive','financials','team','alerts'],
    'manager':              ['overview','my-team','announcements','scorecards'],
  };
  const labels = {
    dashboard:     i('Dashboard','Panel'),
    scorecard:     i('My Scorecard','Mi Desempeño'),
    training:      i('Training','Entrenamiento'),
    announcements: i('Announcements','Avisos'),
    recognition:   i('Recognition Wall','Reconocimientos'),
    overview:      i('Overview','Resumen'),
    'my-team':     i('My Team','Mi Equipo'),
    scorecards:    i('Scorecards','Puntuaciones'),
    trainees:      i('My Trainees','Mis Aprendices'),
    schedule:      i('Schedule','Horario'),
    materials:     i('Materials','Materiales'),
    routes:        i('Routes Today','Rutas Hoy'),
    drivers:       i('Drivers','Conductores'),
    incidents:     i('Incidents','Incidentes'),
    messages:      i('Messages','Mensajes'),
    attendance:    i('Attendance','Asistencia'),
    requests:      i('Requests','Solicitudes'),
    checklist:     i('Checklist','Lista de tareas'),
    team:          i('Team','Equipo'),
    coaching:      i('Coaching','Coaching'),
    teams:         i('All Teams','Todos los equipos'),
    fleet:         i('Fleet','Flota'),
    reports:       i('Reports','Reportes'),
    executive:     i('Executive','Ejecutivo'),
    financials:    i('Financials','Finanzas'),
    alerts:        i('Alerts','Alertas'),
  };
  const links = roleLinks[user.role] || roleLinks['driver'];

  return (
    <header style={{ position:'sticky', top:0, zIndex:40, background:'#fff', borderBottom:'1px solid rgba(26,26,46,0.08)', height:60, display:'flex', alignItems:'center', boxShadow:'0 1px 8px rgba(26,26,46,0.05)' }}>
      <div style={{ maxWidth:1160, margin:'0 auto', width:'100%', padding: isMob() ? '0 12px' : '0 28px', display:'flex', alignItems:'center', gap:8 }}>
        <FloRideLogo size={22} />
        <nav style={{ display:'flex', gap:2, marginLeft: isMob() ? 8 : 28, overflowX:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', flexShrink:1 }}>
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
          <NotificationBell role={user.role} />
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:13, fontWeight:600, color:'var(--brand-ink)', lineHeight:1.2 }}>{user.name}</div>
            <div style={{ fontSize:11, color:'#aaa' }}>{user.id}</div>
          </div>
          <Avatar name={user.name} size={36} />
          <div style={{ display:'flex', background:'rgba(26,26,46,0.05)', borderRadius:8, overflow:'hidden', border:'1px solid rgba(26,26,46,0.1)' }}>
            {['en','es'].map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ padding:'5px 10px', fontSize:11, fontWeight:700, background: lang===l ? 'var(--brand-accent)' : 'transparent', color: lang===l ? '#fff' : '#888', transition:'all .15s', textTransform:'uppercase', letterSpacing:'0.05em' }}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={onLogout} style={{ padding:'7px 13px', fontSize:12, fontWeight:600, border:'1px solid rgba(26,26,46,0.14)', borderRadius:8, color:'#666' }}>
            {i('Sign Out','Salir')}
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
        {active === 'recognition'   && <DriverRecognition user={user} />}
      </main>
    </div>
  );
}

function DriverHome({ user, setActive }) {
  const i = useT();
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:13, color:'#999', fontWeight:500 }}>Monday, May 26, 2026</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'var(--brand-ink)', margin:'4px 0 8px' }}>
          {i('Good morning','Buenos días')}, {user.name.split(' ')[0]}
        </h1>
        <div style={{ display:'flex', alignItems:'center', gap:10, fontSize:13 }}>
          <span style={{ background:'rgba(34,197,94,0.1)', color:'#16a34a', padding:'3px 10px', borderRadius:999, fontWeight:600, fontSize:12 }}>● Active</span>
          <span style={{ color:'#666' }}>{i('Route','Ruta')}: <strong>{user.route}</strong></span>
          <span style={{ color:'#ccc' }}>·</span>
          <span style={{ color:'#666' }}>{i('Shift at','Turno a las')}: <strong>{user.shiftTime}</strong></span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display:'grid', gridTemplateColumns: isMob() ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:i('Overall Score','Puntuación'),       value:'87',     unit:'/ 100',      col:'#2563eb' },
          { label:i('Tier This Week','Nivel semanal'),   value:'Gold 🥇', unit:i('keep it up','¡sigue así'), col:'#b45309' },
          { label:i('Routes This Month','Rutas del mes'), value:'22',     unit:i('completed','completadas'), col:'#16a34a' },
          { label:i('Announcements','Avisos'),            value:'1',      unit:i('new','nuevo'),             col:'#FF6B35' },
        ].map(k => (
          <div key={k.label} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)', boxShadow:'0 1px 4px rgba(26,26,46,0.04)' }}>
            <div style={{ fontSize:12, color:'#999', fontWeight:500, marginBottom:6 }}>{k.label}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:k.col, lineHeight:1 }}>{k.value}</div>
            <div style={{ fontSize:11, color:'#bbb', marginTop:4 }}>{k.unit}</div>
          </div>
        ))}
      </div>


      {/* Days Without Infractions */}
      {(() => {
        const s = INFRACTION_STREAKS[user.id] || { days: 0, milestone: 30, lastInc: '—' };
        const pct = Math.min(100, Math.round((s.days / s.milestone) * 100));
        const isNear = pct >= 80;
        const accent = isNear ? '#16a34a' : 'var(--brand-accent)';
        return (
          <div style={{ background: isNear ? 'linear-gradient(135deg,#f0fdf4,#dcfce7)' : 'linear-gradient(135deg,#fff8f5,#fff0ea)', borderRadius:16, padding:'20px 24px', border:`1.5px solid ${isNear ? '#86efac' : 'rgba(255,107,53,0.25)'}`, marginBottom:24, display:'flex', alignItems: isMob() ? 'flex-start' : 'center', flexDirection: isMob() ? 'column' : 'row', gap:20 }}>
            <div style={{ width:64, height:64, borderRadius:'50%', background:`conic-gradient(${accent} ${pct}%, rgba(26,26,46,0.07) 0)`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, position:'relative' }}>
              <div style={{ width:50, height:50, borderRadius:'50%', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:22 }}>{isNear ? '🔥' : '🛡️'}</span>
              </div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color: isNear ? '#15803d' : '#c2410c', marginBottom:4 }}>
                {isNear ? i('🎯 Almost at your milestone!','🎯 ¡Casi en tu meta!') : i('✅ Days Without Infractions','✅ Días sin infracciones')}
              </div>
              <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:8 }}>
                <span style={{ fontFamily:'var(--font-display)', fontSize:36, fontWeight:800, color: accent, lineHeight:1 }}>{s.days}</span>
                <span style={{ fontSize:14, color:'#888', fontWeight:500 }}>{i('days streak','días seguidos')}</span>
                <span style={{ fontSize:12, color:'#bbb' }}>· Last incident: {s.lastInc}</span>
              </div>
              <div style={{ background:'rgba(26,26,46,0.08)', borderRadius:999, height:8, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${pct}%`, background: isNear ? '#22c55e' : 'var(--brand-accent)', borderRadius:999, transition:'width 0.6s' }} />
              </div>
              <div style={{ fontSize:11, color:'#999', marginTop:5 }}>{i('Next milestone','Siguiente meta')}: <strong style={{ color: accent }}>{s.milestone} {i('days','días')}</strong> · {s.milestone - s.days} {i('to go','por completar')}</div>
            </div>
          </div>
        );
      })()}

      <div style={{ display:'grid', gridTemplateColumns: isMob() ? '1fr' : '1fr 1fr', gap:20, marginBottom:24 }}>
        {/* Scorecard preview */}
        <div style={{ background:'#fff', borderRadius:16, padding:24, border:'1px solid rgba(26,26,46,0.07)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:18 }}>
            <div>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>{i("This Week's Scorecard",'Desempeño esta semana')}</h3>
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
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', opacity:0.85, marginBottom:8 }}>🔔 {i('Urgent','Urgente')}</div>
            <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, marginBottom:6 }}>{ANNOUNCEMENTS[0].title}</div>
            <div style={{ fontSize:13, opacity:0.9, lineHeight:1.5 }}>{ANNOUNCEMENTS[0].body}</div>
            <div style={{ marginTop:10, fontSize:11, opacity:0.65 }}>{ANNOUNCEMENTS[0].from} · {ANNOUNCEMENTS[0].date}</div>
          </div>

          {/* AI Tip */}
          <div style={{ background:'#fff', borderRadius:16, padding:22, border:'1px solid rgba(255,107,53,0.2)', flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <div style={{ width:30,height:30,borderRadius:8,background:'rgba(26,26,46,0.05)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15 }}>✨</div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--brand-ink)' }}>{i('AI Coaching Tip','Consejo de Coaching')}</div>
                <div style={{ fontSize:11, color:'#aaa' }}>{i('Based on your scorecard','Basado en tu desempeño')}</div>
              </div>
            </div>
            <div style={{ fontSize:12, fontWeight:700, color:'var(--brand-accent)', marginBottom:8 }}>📷 Photo on Delivery · 79/100</div>
            <p style={{ fontSize:13, color:'#555', lineHeight:1.65, margin:0 }}>
              Take the photo BEFORE walking away — make sure the package is fully visible in the frame, not just the door.
            </p>
          </div>
        </div>
      </div>


      {/* Recognition preview */}
      <div style={{ marginTop:24, background:'linear-gradient(135deg,#1A1A2E 0%,#16213e 100%)', borderRadius:16, padding:24, color:'#fff', display:'flex', alignItems:'center', gap:20 }}>
        <div style={{ fontSize:42, flexShrink:0 }}>🏆</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em', color:'#f59e0b', marginBottom:6 }}>Employee of the Month · {RECOGNITION.month}</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, marginBottom:4 }}>{RECOGNITION.winner.name}</div>
          <div style={{ fontSize:13, opacity:0.75 }}>Score {RECOGNITION.winner.score}/100 · {RECOGNITION.winner.routes} routes · {RECOGNITION.winner.tier} tier</div>
        </div>
        <button onClick={() => setActive('recognition')} style={{ padding:'10px 18px', background:'rgba(255,255,255,0.12)', border:'1.5px solid rgba(255,255,255,0.2)', borderRadius:10, color:'#fff', fontSize:13, fontWeight:700, flexShrink:0, cursor:'pointer' }}>
          {i('See Wall of Fame →','Ver muro de honor →')}
        </button>
      </div>

      {/* Training library preview */}
      <div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>{i('Training Library','Biblioteca de Entrenamiento')}</h3>
          <button onClick={() => setActive('training')} style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>{i('See all →','Ver todo →')}</button>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMob() ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap:14 }}>
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
  const i = useT();
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 4px' }}>{i('My Scorecard','Mi Desempeño')}</h2>
      <div style={{ fontSize:13, color:'#999', marginBottom:28 }}>Week of {SCORECARD.week}</div>

      <div style={{ display:'grid', gridTemplateColumns: isMob() ? '1fr' : '320px 1fr', gap:20, marginBottom:24 }}>
        {/* Overall card */}
        <div style={{ background:'#fff', borderRadius:18, padding:28, border:'1px solid rgba(26,26,46,0.07)', textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:12 }}>
          <ScoreRing score={87} size={140} />
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:24, fontWeight:800, color:'#b45309' }}>🥇 Gold</div>
            <div style={{ fontSize:13, color:'#999' }}>{i('Your tier this week','Tu nivel esta semana')}</div>
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
  const i = useT();
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 4px' }}>{i('Training Library','Biblioteca de Entrenamiento')}</h2>
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

      <BronzeAlertBanner onViewDriver={() => setActive('my-team')} />

      <div style={{ display:'grid', gridTemplateColumns: isMob() ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap:16, marginBottom:24 }}>
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

      <div style={{ display:'grid', gridTemplateColumns: isMob() ? '1fr' : '1fr 300px', gap:20 }}>
        {/* Team table */}
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
          <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(26,26,46,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>Team Performance</h3>
            <button onClick={() => setActive('my-team')} style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>View all →</button>
          </div>
          <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', minWidth: isMob() ? 480 : 'auto' }}>
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
                    <td style={{ padding:'12px 20px' }}>
                      <span style={{ display:'inline-flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:tierColor(d.tier), background:tierBg(d.tier), padding:'3px 9px', borderRadius:999 }}>
                        {tierIcon(d.tier)} {d.tier}
                        {d.tierHistory && d.tierHistory.every(t=>t==='Bronze') && <span title="3 weeks Bronze">🚨</span>}
                      </span>
                    </td>
                    <td style={{ padding:'12px 20px', fontSize:13, color:'#666' }}>{d.routes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
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
  const i = useT();
  const { lang, setLang } = useLang();
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
              <label style={{ display:'block', fontSize:12, fontWeight:600, color:'var(--brand-ink)', marginBottom:6 }}>{i('Email address','Correo electrónico')}</label>
              <input type="email" placeholder="you@floridedelivery.com" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle}
                onFocus={e => e.target.style.borderColor='#FF6B35'}
                onBlur={e => e.target.style.borderColor='rgba(26,26,46,0.14)'} />
            </div>
            <div style={{ marginBottom:22 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <label style={{ fontSize:12, fontWeight:600, color:'var(--brand-ink)' }}>{i('Password','Contraseña')}</label>
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

// ─── TRAINER PORTAL ───────────────────────────────────────────
function TrainerPortal({ user, onLogout }) {
  const [active, setActive] = usePS('overview');
  return (
    <div style={{ minHeight:'100vh', background:'#f7f7fa' }}>
      <PortalNav user={user} onLogout={onLogout} active={active} setActive={setActive} />
      <main style={{ maxWidth:1160, margin:'0 auto', padding:'36px 28px' }}>
        {active === 'overview'  && <TrainerOverview user={user} setActive={setActive} />}
        {active === 'trainees'  && <TrainerTrainees />}
        {active === 'schedule'  && <TrainerSchedule />}
        {active === 'materials' && <DriverTraining />}
      </main>
    </div>
  );
}

function TrainerOverview({ user, setActive }) {
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:13, color:'#999' }}>Monday, May 26, 2026</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'var(--brand-ink)', margin:'4px 0 4px' }}>Good morning, {user.name.split(' ')[0]}</h1>
        <div style={{ fontSize:13, color:'#999' }}>{user.title} · {user.station}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns: isMob() ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Active Trainees',    value:'3',  sub:'in program',     col:'#2563eb' },
          { label:'Completed This Month',value:'1', sub:'graduated',      col:'#16a34a' },
          { label:'Sessions Today',      value:'2', sub:'scheduled',      col:'#FF6B35' },
          { label:'Avg Completion',      value:'71%',sub:'across trainees',col:'#a855f7' },
        ].map(k => (
          <div key={k.label} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)' }}>
            <div style={{ fontSize:12, color:'#999', fontWeight:500, marginBottom:6 }}>{k.label}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:k.col }}>{k.value}</div>
            <div style={{ fontSize:11, color:'#bbb', marginTop:4 }}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns: isMob() ? '1fr' : '1fr 1fr', gap:20 }}>
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
          <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(26,26,46,0.07)', display:'flex', justifyContent:'space-between' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>My Trainees</h3>
            <button onClick={() => setActive('trainees')} style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>View all →</button>
          </div>
          {TRAINEES.map(t => (
            <div key={t.id} style={{ padding:'14px 22px', borderBottom:'1px solid rgba(26,26,46,0.05)', display:'flex', alignItems:'center', gap:12 }}>
              <Avatar name={t.name} size={34} />
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--brand-ink)' }}>{t.name}</div>
                <div style={{ fontSize:11, color:'#aaa', marginTop:2 }}>Day {t.days} · {t.status}</div>
              </div>
              <div style={{ width:80 }}>
                <div style={{ background:'rgba(26,26,46,0.07)', borderRadius:999, height:6, overflow:'hidden' }}>
                  <div style={{ width:`${t.progress}%`, height:'100%', background: t.progress===100 ? '#16a34a' : 'var(--brand-accent)', borderRadius:999 }} />
                </div>
                <div style={{ fontSize:10, color:'#bbb', marginTop:3, textAlign:'right' }}>{t.progress}%</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
          <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(26,26,46,0.07)', display:'flex', justifyContent:'space-between' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>Today's Sessions</h3>
            <button onClick={() => setActive('schedule')} style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>Full schedule →</button>
          </div>
          {TRAINING_SCHEDULE.filter(s => s.day === 'Mon May 26').map((s,i) => (
            <div key={i} style={{ padding:'14px 22px', borderBottom:'1px solid rgba(26,26,46,0.05)' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:'var(--brand-accent)' }}>{s.time}</div>
                  <div style={{ fontSize:13, fontWeight:600, color:'var(--brand-ink)', margin:'3px 0' }}>{s.trainee}</div>
                  <div style={{ fontSize:12, color:'#888' }}>{s.topic}</div>
                </div>
                <span style={{ fontSize:11, background:'rgba(26,26,46,0.05)', color:'#666', padding:'3px 8px', borderRadius:6, whiteSpace:'nowrap' }}>{s.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrainerTrainees() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>My Trainees</h2>
      <div style={{ display:'grid', gap:16 }}>
        {TRAINEES.map(t => (
          <div key={t.id} style={{ background:'#fff', borderRadius:16, padding:'22px 24px', border:'1px solid rgba(26,26,46,0.07)', display:'flex', alignItems:'center', gap:18 }}>
            <Avatar name={t.name} size={48} />
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16 }}>{t.name}</div>
              <div style={{ fontSize:12, color:'#aaa', marginTop:2 }}>{t.id} · Day {t.days} of training</div>
              <div style={{ marginTop:10, width:'60%' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                  <span style={{ fontSize:11, color:'#888' }}>Training progress</span>
                  <span style={{ fontSize:11, fontWeight:700, color: t.progress===100 ? '#16a34a' : 'var(--brand-accent)' }}>{t.progress}%</span>
                </div>
                <div style={{ background:'rgba(26,26,46,0.06)', borderRadius:999, height:8, overflow:'hidden' }}>
                  <div style={{ width:`${t.progress}%`, height:'100%', background: t.progress===100 ? '#16a34a' : 'var(--brand-accent)', borderRadius:999, transition:'width .6s ease' }} />
                </div>
              </div>
            </div>
            <div style={{ textAlign:'right' }}>
              <span style={{ fontSize:12, fontWeight:700, padding:'4px 12px', borderRadius:999, background: t.status==='Completed' ? 'rgba(34,197,94,0.1)' : t.status==='Final Eval' ? 'rgba(59,158,255,0.1)' : 'rgba(255,107,53,0.1)', color: t.status==='Completed' ? '#16a34a' : t.status==='Final Eval' ? '#2563eb' : '#FF6B35' }}>{t.status}</span>
              {t.score && <div style={{ fontSize:20, fontWeight:800, fontFamily:'var(--font-display)', color:'#16a34a', marginTop:8 }}>{t.score}/100</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TrainerSchedule() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>Training Schedule</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {TRAINING_SCHEDULE.map((s,i) => (
          <div key={i} style={{ background:'#fff', borderRadius:14, padding:'18px 22px', border:'1px solid rgba(26,26,46,0.07)', display:'flex', gap:20, alignItems:'flex-start' }}>
            <div style={{ textAlign:'center', minWidth:80 }}>
              <div style={{ fontSize:11, fontWeight:700, color:'var(--brand-accent)', textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.day.split(' ')[0]}</div>
              <div style={{ fontSize:13, fontWeight:600, color:'var(--brand-ink)' }}>{s.day.split(' ').slice(1).join(' ')}</div>
              <div style={{ fontSize:16, fontWeight:800, fontFamily:'var(--font-display)', color:'var(--brand-ink)', marginTop:4 }}>{s.time}</div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14 }}>{s.trainee}</div>
              <div style={{ fontSize:13, color:'#666', marginTop:4 }}>{s.topic}</div>
              <div style={{ fontSize:11, color:'#aaa', marginTop:6 }}>📍 {s.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DISPATCH PORTAL ──────────────────────────────────────────
function DispatchPortal({ user, onLogout }) {
  const [active, setActive] = usePS('routes');
  return (
    <div style={{ minHeight:'100vh', background:'#f7f7fa' }}>
      <PortalNav user={user} onLogout={onLogout} active={active} setActive={setActive} />
      <main style={{ maxWidth:1160, margin:'0 auto', padding:'36px 28px' }}>
        {active === 'routes'    && <DispatchRoutes />}
        {active === 'drivers'   && <DispatchDrivers />}
        {active === 'incidents' && <DispatchIncidents />}
        {active === 'messages'  && <DispatchMessages />}
      </main>
    </div>
  );
}

function DispatchRoutes() {
  const statusColor = s => ({ Active:{bg:'rgba(34,197,94,0.1)',text:'#16a34a'}, Delayed:{bg:'rgba(239,68,68,0.1)',text:'#dc2626'}, Completed:{bg:'rgba(59,158,255,0.1)',text:'#2563eb'}, 'Not Started':{bg:'rgba(26,26,46,0.06)',text:'#888'} })[s] || {};
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 4px' }}>Routes Today</h2>
          <div style={{ fontSize:13, color:'#999' }}>Monday, May 26, 2026 · DFL4 Station</div>
        </div>
        <div style={{ display:'flex', gap:12 }}>
          {[['Active','#16a34a',6],['Delayed','#dc2626',1],['Completed','#2563eb',1]].map(([l,c,n]) => (
            <div key={l} style={{ textAlign:'center', padding:'10px 16px', background:'#fff', borderRadius:10, border:'1px solid rgba(26,26,46,0.07)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:c }}>{n}</div>
              <div style={{ fontSize:11, color:'#aaa' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'rgba(26,26,46,0.025)' }}>
              {['Route','Driver','Zone','Stops','Progress','Status'].map(h => (
                <th key={h} style={{ padding:'11px 20px', textAlign:'left', fontSize:11, fontWeight:600, color:'#aaa', textTransform:'uppercase', letterSpacing:'0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISPATCH_ROUTES.map(r => {
              const sc = statusColor(r.status);
              return (
                <tr key={r.id} style={{ borderTop:'1px solid rgba(26,26,46,0.05)' }}>
                  <td style={{ padding:'13px 20px', fontSize:12, fontFamily:'var(--font-mono)', color:'#888' }}>{r.id}</td>
                  <td style={{ padding:'13px 20px', fontSize:13, fontWeight:600, color:'var(--brand-ink)' }}>{r.driver}</td>
                  <td style={{ padding:'13px 20px', fontSize:13, color:'#555' }}>{r.zone}</td>
                  <td style={{ padding:'13px 20px', fontSize:13, color:'#555' }}>{r.stops}</td>
                  <td style={{ padding:'13px 20px', minWidth:120 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ flex:1, background:'rgba(26,26,46,0.07)', borderRadius:999, height:6, overflow:'hidden' }}>
                        <div style={{ width:`${r.pct}%`, height:'100%', background: r.pct===100 ? '#16a34a' : r.status==='Delayed' ? '#dc2626' : 'var(--brand-accent)', borderRadius:999 }} />
                      </div>
                      <span style={{ fontSize:11, color:'#aaa', width:28 }}>{r.pct}%</span>
                    </div>
                  </td>
                  <td style={{ padding:'13px 20px' }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background:sc.bg, color:sc.text }}>{r.status}</span>
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

function DispatchDrivers() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>Driver Status</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
        {DISPATCH_ROUTES.map(r => {
          const col = {Active:'#16a34a',Delayed:'#dc2626',Completed:'#2563eb','Not Started':'#aaa'}[r.status];
          return (
            <div key={r.id} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                <Avatar name={r.driver} size={36} />
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:'var(--brand-ink)' }}>{r.driver}</div>
                  <div style={{ fontSize:11, color:'#aaa' }}>{r.zone}</div>
                </div>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontSize:11, fontWeight:700, color:col, background:`${col}18`, padding:'3px 9px', borderRadius:999 }}>{r.status}</span>
                <span style={{ fontSize:12, color:'#888' }}>{r.pct}% · {r.stops} stops</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DispatchIncidents() {
  const priColor = p => ({high:'#dc2626',medium:'#d97706',low:'#16a34a'})[p];
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:0 }}>Incidents</h2>
        <button style={{ padding:'10px 18px', background:'var(--brand-accent)', color:'#fff', borderRadius:10, fontSize:13, fontWeight:700 }}>+ Report Incident</button>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {INCIDENTS.map(inc => (
          <div key={inc.id} style={{ background:'#fff', borderRadius:16, padding:'20px 24px', border:`1px solid ${inc.status==='Open' ? 'rgba(239,68,68,0.25)' : 'rgba(26,26,46,0.07)'}`, borderLeft:`4px solid ${priColor(inc.priority)}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ display:'flex', gap:8, marginBottom:8 }}>
                  <span style={{ fontSize:10, fontWeight:700, color:priColor(inc.priority), background:`${priColor(inc.priority)}18`, padding:'2px 8px', borderRadius:999, textTransform:'uppercase' }}>{inc.priority}</span>
                  <span style={{ fontSize:10, fontWeight:600, color:'#888', background:'rgba(26,26,46,0.05)', padding:'2px 8px', borderRadius:999 }}>{inc.type}</span>
                </div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14 }}>{inc.driver}</div>
                <p style={{ fontSize:13, color:'#555', lineHeight:1.6, margin:'6px 0 8px' }}>{inc.desc}</p>
                <div style={{ fontSize:11, color:'#bbb' }}>{inc.id} · {inc.date}</div>
              </div>
              <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:999, background: inc.status==='Open' ? 'rgba(239,68,68,0.1)' : inc.status==='In Review' ? 'rgba(251,191,36,0.1)' : 'rgba(34,197,94,0.1)', color: inc.status==='Open' ? '#dc2626' : inc.status==='In Review' ? '#d97706' : '#16a34a', flexShrink:0 }}>{inc.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DispatchMessages() {
  const [msg, setMsg] = usePS('');
  const [target, setTarget] = usePS('all');
  const [sent, setSent] = usePS(false);
  function send() { if(!msg.trim()) return; setSent(true); setMsg(''); setTimeout(()=>setSent(false),3000); }
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>Send Message</h2>
      {sent && <div style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.25)', borderRadius:12, padding:'12px 18px', marginBottom:18, color:'#16a34a', fontSize:13, fontWeight:600 }}>✓ Message sent successfully.</div>}
      <div style={{ background:'#fff', borderRadius:16, padding:28, border:'1px solid rgba(26,26,46,0.07)', maxWidth:560 }}>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:12, fontWeight:600, color:'var(--brand-ink)', display:'block', marginBottom:6 }}>Send to</label>
          <select value={target} onChange={e=>setTarget(e.target.value)} style={{ width:'100%', padding:'11px 14px', borderRadius:9, border:'1.5px solid rgba(26,26,46,0.14)', fontSize:13, outline:'none' }}>
            <option value="all">All Drivers (60)</option>
            {DISPATCH_ROUTES.map(r => <option key={r.id} value={r.driver}>{r.driver}</option>)}
          </select>
        </div>
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:12, fontWeight:600, color:'var(--brand-ink)', display:'block', marginBottom:6 }}>Message</label>
          <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={4} placeholder="Type your message..." style={{ width:'100%', padding:'11px 14px', borderRadius:9, border:'1.5px solid rgba(26,26,46,0.14)', fontSize:13, resize:'vertical', boxSizing:'border-box', outline:'none' }} />
        </div>
        <button onClick={send} style={{ padding:'11px 22px', background:'var(--brand-accent)', color:'#fff', borderRadius:9, fontSize:13, fontWeight:700 }}>Send Message</button>
      </div>
    </div>
  );
}

// ─── SUPERVISOR ASSISTANT PORTAL ──────────────────────────────
function SupervisorAssistantPortal({ user, onLogout }) {
  const [active, setActive] = usePS('attendance');
  return (
    <div style={{ minHeight:'100vh', background:'#f7f7fa' }}>
      <PortalNav user={user} onLogout={onLogout} active={active} setActive={setActive} />
      <main style={{ maxWidth:1160, margin:'0 auto', padding:'36px 28px' }}>
        {active === 'attendance' && <SAAttendance />}
        {active === 'requests'   && <SARequests />}
        {active === 'checklist'  && <SAChecklist />}
      </main>
    </div>
  );
}

function SAAttendance() {
  const stCol = s => ({  'On Time':{bg:'rgba(34,197,94,0.1)',text:'#16a34a'}, Late:{bg:'rgba(251,191,36,0.1)',text:'#d97706'}, Absent:{bg:'rgba(239,68,68,0.1)',text:'#dc2626'} })[s];
  const counts = { onTime: ATTENDANCE.filter(a=>a.status==='On Time').length, late: ATTENDANCE.filter(a=>a.status==='Late').length, absent: ATTENDANCE.filter(a=>a.status==='Absent').length };
  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 4px' }}>Attendance Today</h2>
        <div style={{ fontSize:13, color:'#999' }}>Monday, May 26, 2026</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns: isMob() ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {[['On Time',counts.onTime,'#16a34a'],['Late',counts.late,'#d97706'],['Absent',counts.absent,'#dc2626']].map(([l,v,c])=>(
          <div key={l} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)' }}>
            <div style={{ fontSize:12, color:'#999', marginBottom:6 }}>{l}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:800, color:c }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
        <div style={{ overflowX:'auto', WebkitOverflowScrolling:'touch' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', minWidth: isMob() ? 520 : 'auto' }}>
          <thead>
            <tr style={{ background:'rgba(26,26,46,0.025)' }}>
              {['Driver','ID','Check-in','Route','Status'].map(h=>(
                <th key={h} style={{ padding:'11px 20px', textAlign:'left', fontSize:11, fontWeight:600, color:'#aaa', textTransform:'uppercase', letterSpacing:'0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ATTENDANCE.map(a => {
              const c = stCol(a.status);
              return (
                <tr key={a.id} style={{ borderTop:'1px solid rgba(26,26,46,0.05)' }}>
                  <td style={{ padding:'13px 20px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <Avatar name={a.name} size={32} />
                      <span style={{ fontSize:13, fontWeight:600 }}>{a.name}</span>
                    </div>
                  </td>
                  <td style={{ padding:'13px 20px', fontSize:12, color:'#aaa', fontFamily:'var(--font-mono)' }}>{a.id}</td>
                  <td style={{ padding:'13px 20px', fontSize:13, color:'#555' }}>{a.time}</td>
                  <td style={{ padding:'13px 20px', fontSize:13, color:'#555' }}>{a.route}</td>
                  <td style={{ padding:'13px 20px' }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:999, background:c.bg, color:c.text }}>{a.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

function SARequests() {
  const [resolved, setResolved] = usePS({});
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>Driver Requests</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {REQUESTS.map(r => (
          <div key={r.id} style={{ background:'#fff', borderRadius:16, padding:'20px 24px', border:`1px solid ${r.urgent ? 'rgba(255,107,53,0.25)' : 'rgba(26,26,46,0.07)'}`, borderLeft:`4px solid ${r.urgent ? '#FF6B35' : 'rgba(26,26,46,0.1)'}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', gap:8, marginBottom:8 }}>
                  {r.urgent && <span style={{ fontSize:10, fontWeight:700, background:'rgba(255,107,53,0.1)', color:'#FF6B35', padding:'2px 8px', borderRadius:999, textTransform:'uppercase' }}>Urgent</span>}
                  <span style={{ fontSize:10, fontWeight:600, color:'#888', background:'rgba(26,26,46,0.05)', padding:'2px 8px', borderRadius:999 }}>{r.type}</span>
                </div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14 }}>{r.driver}</div>
                <p style={{ fontSize:13, color:'#555', lineHeight:1.6, margin:'6px 0 8px' }}>{r.msg}</p>
                <div style={{ fontSize:11, color:'#bbb' }}>{r.id} · {r.time}</div>
              </div>
              {!resolved[r.id] ? (
                <button onClick={()=>setResolved(rv=>({...rv,[r.id]:true}))} style={{ marginLeft:16, padding:'8px 14px', fontSize:12, fontWeight:600, background:'rgba(26,26,46,0.05)', border:'1px solid rgba(26,26,46,0.1)', borderRadius:8, color:'#555', flexShrink:0 }}>Mark Resolved</button>
              ) : (
                <span style={{ marginLeft:16, fontSize:12, color:'#16a34a', fontWeight:600 }}>✓ Resolved</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SAChecklist() {
  const [items, setItems] = usePS(CHECKLIST);
  function toggle(id) { setItems(prev => prev.map(i => i.id===id ? {...i, done:!i.done} : i)); }
  const done = items.filter(i=>i.done).length;
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:0 }}>Daily Checklist</h2>
        <span style={{ fontSize:13, fontWeight:600, color: done===items.length ? '#16a34a' : '#888' }}>{done}/{items.length} completed</span>
      </div>
      <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
        {items.map((item,i) => (
          <div key={item.id} onClick={()=>toggle(item.id)} style={{ display:'flex', alignItems:'center', gap:14, padding:'18px 24px', borderBottom: i<items.length-1 ? '1px solid rgba(26,26,46,0.05)' : 'none', cursor:'pointer', transition:'background .12s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(26,26,46,0.015)'}
            onMouseLeave={e=>e.currentTarget.style.background=''}
          >
            <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${item.done ? '#16a34a' : 'rgba(26,26,46,0.2)'}`, background: item.done ? '#16a34a' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .15s' }}>
              {item.done && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>}
            </div>
            <span style={{ fontSize:14, color: item.done ? '#aaa' : 'var(--brand-ink)', textDecoration: item.done ? 'line-through' : 'none', transition:'all .15s' }}>{item.task}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SUPERVISOR PORTAL ────────────────────────────────────────
function SupervisorPortal({ user, onLogout }) {
  const [active, setActive] = usePS('overview');
  return (
    <div style={{ minHeight:'100vh', background:'#f7f7fa' }}>
      <PortalNav user={user} onLogout={onLogout} active={active} setActive={setActive} />
      <main style={{ maxWidth:1160, margin:'0 auto', padding:'36px 28px' }}>
        {active === 'overview'  && <ManagerOverview user={user} setActive={setActive} />}
        {active === 'team'      && <ManagerTeam />}
        {active === 'coaching'  && <SupervisorCoaching />}
        {active === 'incidents' && <DispatchIncidents />}
      </main>
    </div>
  );
}

function SupervisorCoaching() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 8px' }}>Coaching Queue</h2>
      <p style={{ fontSize:13, color:'#999', marginBottom:24 }}>Drivers who need a 1-on-1 session based on this week's scorecard.</p>
      <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
        {COACHING_QUEUE.map(d => {
          const pri = {urgent:'#dc2626',soon:'#d97706',watch:'#2563eb'}[d.priority];
          return (
            <div key={d.id} style={{ background:'#fff', borderRadius:16, padding:'22px 24px', border:'1px solid rgba(26,26,46,0.07)', borderLeft:`4px solid ${pri}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <div style={{ display:'flex', gap:14, alignItems:'center' }}>
                  <Avatar name={d.name} size={46} />
                  <div>
                    <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16 }}>{d.name}</div>
                    <div style={{ fontSize:12, color:'#aaa', marginTop:2 }}>{d.id} · {d.sessions} session{d.sessions!==1?'s':''} this month</div>
                    <div style={{ display:'flex', gap:8, marginTop:8, flexWrap:'wrap' }}>
                      {d.issues.map(iss => (
                        <span key={iss} style={{ fontSize:11, fontWeight:600, background:'rgba(239,68,68,0.08)', color:'#dc2626', padding:'2px 8px', borderRadius:999 }}>⚠ {iss}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color: d.score>=80 ? '#2563eb' : d.score>=70 ? '#d97706' : '#dc2626' }}>{d.score}</div>
                  <div style={{ fontSize:11, color:'#aaa' }}>overall</div>
                  <span style={{ marginTop:8, display:'inline-block', fontSize:11, fontWeight:700, color:pri, background:`${pri}18`, padding:'3px 10px', borderRadius:999, textTransform:'uppercase' }}>{d.priority}</span>
                </div>
              </div>
              <div style={{ marginTop:14, paddingTop:14, borderTop:'1px solid rgba(26,26,46,0.06)', display:'flex', gap:10 }}>
                <button style={{ padding:'8px 16px', background:'var(--brand-accent)', color:'#fff', borderRadius:8, fontSize:12, fontWeight:700 }}>Schedule Session</button>
                <button style={{ padding:'8px 16px', border:'1px solid rgba(26,26,46,0.14)', borderRadius:8, fontSize:12, fontWeight:600, color:'#555' }}>Add Note</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── OPS MANAGER PORTAL ───────────────────────────────────────
function OpsManagerPortal({ user, onLogout }) {
  const [active, setActive] = usePS('overview');
  return (
    <div style={{ minHeight:'100vh', background:'#f7f7fa' }}>
      <PortalNav user={user} onLogout={onLogout} active={active} setActive={setActive} />
      <main style={{ maxWidth:1160, margin:'0 auto', padding:'36px 28px' }}>
        {active === 'overview' && <OpsOverview user={user} setActive={setActive} />}
        {active === 'teams'    && <OpsTeams />}
        {active === 'fleet'    && <OpsFleet />}
        {active === 'reports'  && <OpsReports />}
      </main>
    </div>
  );
}

function OpsOverview({ user, setActive }) {
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:13, color:'#999' }}>Monday, May 26, 2026</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'var(--brand-ink)', margin:'4px 0 4px' }}>Good morning, {user.name.split(' ')[0]}</h1>
        <div style={{ fontSize:13, color:'#999' }}>{user.title} · {user.station}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Routes Today',      value:'60',   sub:'all active',     col:'#2563eb' },
          { label:'Fleet Status',      value:'59/60',sub:'1 in service',   col:'#16a34a' },
          { label:'Incidents Open',    value:'2',    sub:'need attention', col:'#dc2626' },
          { label:'Weekly Score Avg',  value:'83.2', sub:'vs 81.4 last wk',col:'#FF6B35' },
        ].map(k=>(
          <div key={k.label} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)' }}>
            <div style={{ fontSize:12, color:'#999', fontWeight:500, marginBottom:6 }}>{k.label}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:k.col }}>{k.value}</div>
            <div style={{ fontSize:11, color:'#bbb', marginTop:4 }}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
          <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(26,26,46,0.07)', display:'flex', justifyContent:'space-between' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>Open Incidents</h3>
            <button onClick={()=>setActive('teams')} style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>View all →</button>
          </div>
          {INCIDENTS.filter(i=>i.status!=='Closed').map(inc=>(
            <div key={inc.id} style={{ padding:'14px 22px', borderBottom:'1px solid rgba(26,26,46,0.05)' }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{inc.driver} — {inc.type}</div>
                  <div style={{ fontSize:12, color:'#888', marginTop:2 }}>{inc.date}</div>
                </div>
                <span style={{ fontSize:11, fontWeight:700, color: inc.status==='Open' ? '#dc2626' : '#d97706', background: inc.status==='Open' ? 'rgba(239,68,68,0.08)' : 'rgba(251,191,36,0.08)', padding:'3px 9px', borderRadius:999 }}>{inc.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
          <div style={{ padding:'16px 22px', borderBottom:'1px solid rgba(26,26,46,0.07)', display:'flex', justifyContent:'space-between' }}>
            <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:0 }}>Drivers At Risk</h3>
            <button onClick={()=>setActive('teams')} style={{ fontSize:12, color:'var(--brand-accent)', fontWeight:600 }}>View all →</button>
          </div>
          {DRIVER_LIST.filter(d=>d.score<75).map(d=>(
            <div key={d.id} style={{ padding:'14px 22px', borderBottom:'1px solid rgba(26,26,46,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <Avatar name={d.name} size={32} />
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{d.name}</div>
                  <div style={{ fontSize:11, color:'#aaa' }}>{d.tier}</div>
                </div>
              </div>
              <span style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:'#dc2626' }}>{d.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OpsTeams() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>All Teams</h2>
      <ManagerTeam />
    </div>
  );
}

function OpsFleet() {
  const stCol = s => ({Active:{bg:'rgba(34,197,94,0.1)',text:'#16a34a'},Issue:{bg:'rgba(239,68,68,0.1)',text:'#dc2626'},'In Service':{bg:'rgba(251,191,36,0.1)',text:'#d97706'}})[s] || {};
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:0 }}>Fleet Status</h2>
        <div style={{ display:'flex', gap:12 }}>
          {[['Active','#16a34a',4],['Issue','#dc2626',1],['In Service','#d97706',1]].map(([l,c,n])=>(
            <div key={l} style={{ textAlign:'center', padding:'10px 16px', background:'#fff', borderRadius:10, border:'1px solid rgba(26,26,46,0.07)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:c }}>{n}</div>
              <div style={{ fontSize:11, color:'#aaa' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:'#fff', borderRadius:16, border:'1px solid rgba(26,26,46,0.07)', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'rgba(26,26,46,0.025)' }}>
              {['Van','Driver','Status','Mileage','Last Inspection','Fuel'].map(h=>(
                <th key={h} style={{ padding:'11px 20px', textAlign:'left', fontSize:11, fontWeight:600, color:'#aaa', textTransform:'uppercase', letterSpacing:'0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FLEET.map(v=>{
              const c = stCol(v.status);
              return (
                <tr key={v.id} style={{ borderTop:'1px solid rgba(26,26,46,0.05)' }}>
                  <td style={{ padding:'13px 20px', fontSize:13, fontFamily:'var(--font-mono)', fontWeight:600, color:'var(--brand-ink)' }}>{v.id}</td>
                  <td style={{ padding:'13px 20px', fontSize:13, color:'#555' }}>{v.driver}</td>
                  <td style={{ padding:'13px 20px' }}><span style={{ fontSize:11, fontWeight:700, padding:'3px 9px', borderRadius:999, background:c.bg, color:c.text }}>{v.status}</span></td>
                  <td style={{ padding:'13px 20px', fontSize:13, color:'#555' }}>{v.mileage.toLocaleString()} mi</td>
                  <td style={{ padding:'13px 20px', fontSize:13, color:'#555' }}>{v.lastInsp}</td>
                  <td style={{ padding:'13px 20px', minWidth:120 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <div style={{ flex:1, background:'rgba(26,26,46,0.07)', borderRadius:999, height:6, overflow:'hidden' }}>
                        <div style={{ width:`${v.fuel}%`, height:'100%', background: v.fuel>60 ? '#16a34a' : v.fuel>30 ? '#d97706' : '#dc2626', borderRadius:999 }} />
                      </div>
                      <span style={{ fontSize:11, color:'#aaa' }}>{v.fuel}%</span>
                    </div>
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

function OpsReports() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>Reports</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
        {[
          { title:'Weekly Performance Report', desc:'Driver scores, tiers, and improvements for May 19–25', date:'May 25, 2026', type:'PDF' },
          { title:'Monthly Operations Summary', desc:'Route completion, incidents, fleet status for May 2026', date:'May 31, 2026', type:'PDF' },
          { title:'Attendance & Punctuality', desc:'Check-in records and patterns for current month', date:'May 26, 2026', type:'XLSX' },
          { title:'Incident Log', desc:'All incidents from the past 30 days with resolutions', date:'May 26, 2026', type:'PDF' },
          { title:'Coaching Sessions Log', desc:'1-on-1 sessions completed and driver improvement tracking', date:'May 24, 2026', type:'PDF' },
          { title:'Fleet Maintenance Log', desc:'Van mileage, inspections, and service history', date:'May 22, 2026', type:'XLSX' },
        ].map((r,i)=>(
          <div key={i} style={{ background:'#fff', borderRadius:14, padding:'20px 22px', border:'1px solid rgba(26,26,46,0.07)' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}>
              <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, flex:1 }}>{r.title}</div>
              <span style={{ fontSize:10, fontWeight:700, color:'#FF6B35', background:'rgba(255,107,53,0.1)', padding:'2px 7px', borderRadius:4, marginLeft:8 }}>{r.type}</span>
            </div>
            <p style={{ fontSize:12, color:'#888', lineHeight:1.5, margin:'0 0 12px' }}>{r.desc}</p>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:11, color:'#bbb' }}>{r.date}</span>
              <button style={{ fontSize:12, fontWeight:700, color:'var(--brand-accent)' }}>Download →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CEO PORTAL ───────────────────────────────────────────────
function CEOPortal({ user, onLogout }) {
  const [active, setActive] = usePS('executive');
  return (
    <div style={{ minHeight:'100vh', background:'#f7f7fa' }}>
      <PortalNav user={user} onLogout={onLogout} active={active} setActive={setActive} />
      <main style={{ maxWidth:1160, margin:'0 auto', padding:'36px 28px' }}>
        {active === 'executive'  && <CEOExecutive user={user} setActive={setActive} />}
        {active === 'financials' && <CEOFinancials />}
        {active === 'team'       && <ManagerTeam />}
        {active === 'alerts'     && <CEOAlerts />}
      </main>
    </div>
  );
}

function CEOExecutive({ user, setActive }) {
  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontSize:13, color:'#999' }}>Monday, May 26, 2026</div>
        <h1 style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'var(--brand-ink)', margin:'4px 0 4px' }}>Good morning, {user.name.split(' ')[0]}</h1>
        <div style={{ fontSize:13, color:'#999' }}>{user.title} · {user.station}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Revenue This Month',   value:'$412K', sub:'+8% vs last month',  col:'#16a34a' },
          { label:'Routes Completed',     value:'1,240', sub:'this month',          col:'#2563eb' },
          { label:'Team Score Avg',       value:'83.2',  sub:'company-wide',        col:'#FF6B35' },
          { label:'Driver Retention',     value:'94%',   sub:'30-day rolling',      col:'#a855f7' },
        ].map(k=>(
          <div key={k.label} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)' }}>
            <div style={{ fontSize:12, color:'#999', fontWeight:500, marginBottom:6 }}>{k.label}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:k.col }}>{k.value}</div>
            <div style={{ fontSize:11, color:'#bbb', marginTop:4 }}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns: isMob() ? '1fr' : '1fr 340px', gap:20 }}>
        <div style={{ background:'#fff', borderRadius:16, padding:24, border:'1px solid rgba(26,26,46,0.07)' }}>
          <h3 style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:15, margin:'0 0 20px' }}>Monthly Revenue Trend</h3>
          <div style={{ display:'flex', gap:8, alignItems:'flex-end', height:120 }}>
            {[{m:'Dec',v:61},{m:'Jan',v:68},{m:'Feb',v:64},{m:'Mar',v:73},{m:'Apr',v:78},{m:'May',v:82}].map((d,i)=>(
              <div key={d.m} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
                <div style={{ fontSize:10, color:'#aaa' }}>${d.v}K</div>
                <div style={{ width:'100%', background: i===5 ? 'var(--brand-accent)' : 'rgba(26,26,46,0.1)', borderRadius:'4px 4px 0 0', height:`${(d.v/82)*100}px`, transition:'height .4s' }} />
                <div style={{ fontSize:10, color:'#bbb' }}>{d.m}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div style={{ background:'linear-gradient(135deg,#1A1A2E,#2d2d52)', borderRadius:16, padding:22, color:'#fff' }}>
            <div style={{ fontSize:11, fontWeight:700, opacity:0.6, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>Amazon Bonus Status</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:'#16a34a' }}>Fantastic+</div>
            <div style={{ fontSize:13, opacity:0.75, marginTop:4 }}>Top 12% of DSPs nationally</div>
            <div style={{ marginTop:14, fontSize:12, opacity:0.6 }}>Est. monthly bonus: <strong style={{ color:'#4ade80', opacity:1 }}>$38,000</strong></div>
          </div>
          <button onClick={()=>setActive('alerts')} style={{ background:'rgba(239,68,68,0.07)', border:'1px solid rgba(239,68,68,0.2)', borderRadius:14, padding:18, textAlign:'left' }}>
            <div style={{ fontSize:12, fontWeight:700, color:'#dc2626', marginBottom:4 }}>⚠ 2 items need your attention</div>
            <div style={{ fontSize:12, color:'#888' }}>1 open vehicle incident · 1 at-risk driver</div>
          </button>
        </div>
      </div>
    </div>
  );
}

function CEOFinancials() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>Financials</h2>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:24 }}>
        {[
          { label:'Revenue MTD',        value:'$412,800', sub:'May 1–26',           col:'#16a34a' },
          { label:'Driver Payroll MTD', value:'$198,400', sub:'60 drivers',          col:'#dc2626' },
          { label:'Operating Margin',   value:'51.9%',    sub:'excl. Amazon bonuses',col:'#2563eb' },
          { label:'Amazon Bonus (Est)', value:'$38,000',  sub:'this month',          col:'#a855f7' },
          { label:'Routes YTD',         value:'7,240',    sub:'Jan–May 2026',         col:'#FF6B35' },
          { label:'Revenue YTD',        value:'$2.1M',    sub:'on track for $5M',    col:'#16a34a' },
        ].map(k=>(
          <div key={k.label} style={{ background:'#fff', borderRadius:14, padding:'18px 20px', border:'1px solid rgba(26,26,46,0.07)' }}>
            <div style={{ fontSize:12, color:'#999', marginBottom:6 }}>{k.label}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:26, fontWeight:800, color:k.col }}>{k.value}</div>
            <div style={{ fontSize:11, color:'#bbb', marginTop:4 }}>{k.sub}</div>
          </div>
        ))}
      </div>
      <OpsReports />
    </div>
  );
}

function CEOAlerts() {
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 24px' }}>Alerts & Action Items</h2>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {[
          { level:'critical', icon:'🚨', title:'VAN-07 — Overheating Issue (Active Route)', body:'Carlos Reyes pulled over on US-17 with overheating warning. Dispatch has been notified. Alternative van needed.', action:'Contact Dispatch' },
          { level:'warning',  icon:'⚠️', title:'Lena Muller — At-Risk Score: 62/100', body:'Second consecutive week below 65. Coaching session must be scheduled within 48 hours per Amazon policy.', action:'Schedule Coaching' },
          { level:'info',     icon:'📋', title:'Monthly Report Due Friday May 30', body:'Submit the monthly operations summary to Amazon regional manager by end of day Friday.', action:'View Report' },
          { level:'info',     icon:'👥', title:'3 Open Driver Positions', body:'Headcount approved for 63 drivers. 3 positions still open — referrals from existing team recommended.', action:'View Hiring' },
        ].map((a,i)=>{
          const col = {critical:'#dc2626',warning:'#d97706',info:'#2563eb'}[a.level];
          return (
            <div key={i} style={{ background:'#fff', borderRadius:14, padding:'20px 24px', border:'1px solid rgba(26,26,46,0.07)', borderLeft:`4px solid ${col}`, display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16 }}>
              <div>
                <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
                  <span style={{ fontSize:16 }}>{a.icon}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:col, background:`${col}18`, padding:'2px 8px', borderRadius:999, textTransform:'uppercase' }}>{a.level}</span>
                </div>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:14, marginBottom:6 }}>{a.title}</div>
                <p style={{ fontSize:13, color:'#555', lineHeight:1.6, margin:0 }}>{a.body}</p>
              </div>
              <button style={{ padding:'8px 16px', background: a.level==='critical' ? '#dc2626' : 'var(--brand-accent)', color:'#fff', borderRadius:8, fontSize:12, fontWeight:700, flexShrink:0, whiteSpace:'nowrap' }}>{a.action}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// ─── Infraction Streak (standalone page) ─────────────────────
function InfractionStreakPage({ user }) {
  const i = useT();
  const all = Object.entries(INFRACTION_STREAKS).map(([id, s]) => {
    const driver = DRIVER_LIST.find(d => d.id === id) || { name: id };
    return { id, name: driver.name, ...s };
  }).sort((a, b) => b.days - a.days);

  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 4px' }}>{i('Safety Streaks','Rachas de seguridad')}</h2>
      <div style={{ fontSize:13, color:'#999', marginBottom:28 }}>{i('Days without incidents across the team','Días sin incidentes en todo el equipo')}</div>
      <div style={{ display:'grid', gap:14 }}>
        {all.map((s, i) => {
          const pct = Math.min(100, Math.round((s.days / s.milestone) * 100));
          const isYou = s.id === user.id;
          const col = s.days >= s.milestone ? '#16a34a' : s.days >= s.milestone * 0.6 ? 'var(--brand-accent)' : '#f59e0b';
          return (
            <div key={s.id} style={{ background:'#fff', borderRadius:14, padding:'18px 22px', border:`1.5px solid ${isYou ? 'var(--brand-accent)' : 'rgba(26,26,46,0.07)'}`, display:'flex', alignItems:'center', gap:16 }}>
              <div style={{ fontSize:22, fontWeight:800, color:'#ddd', width:32, textAlign:'center' }}>{i+1}</div>
              <Avatar name={s.name} size={42} />
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:'var(--brand-ink)', marginBottom:6 }}>{s.name}{isYou ? ` (${i('you','tú')})` : ''}</div>
                <div style={{ background:'rgba(26,26,46,0.07)', borderRadius:999, height:8, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:col, borderRadius:999 }} />
                </div>
                <div style={{ fontSize:11, color:'#999', marginTop:4 }}>{i('Next milestone','Próxima meta')}: {s.milestone} {i('days','días')} · {i('Last incident','Último incidente')}: {s.lastInc}</div>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color:col, lineHeight:1 }}>{s.days}</div>
                <div style={{ fontSize:11, color:'#aaa' }}>days</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Recognition Wall ──────────────────────────────────────────
function DriverRecognition({ user }) {
  const i = useT();
  const w = RECOGNITION.winner;
  return (
    <div>
      <h2 style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:800, margin:'0 0 4px' }}>{i('Recognition Wall','Muro de Honor')}</h2>
      <div style={{ fontSize:13, color:'#999', marginBottom:28 }}>{i('Celebrating the drivers who set the standard','Reconociendo a los conductores que marcan el ejemplo')} · {RECOGNITION.month}</div>

      {/* Employee of the Month */}
      <div style={{ background:'linear-gradient(135deg,#1A1A2E 0%,#16213e 100%)', borderRadius:20, padding:36, color:'#fff', marginBottom:28, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-30, right:-30, fontSize:140, opacity:0.06, lineHeight:1 }}>🏆</div>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#f59e0b', marginBottom:16 }}>
          ⭐ Employee of the Month · {RECOGNITION.month}
        </div>
        <div style={{ display:'flex', alignItems:'flex-start', flexDirection: isMob() ? 'column' : 'row', gap:24, marginBottom:24 }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#f59e0b,#FF6B35)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:30, fontWeight:800, color:'#fff', flexShrink:0 }}>
            {w.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:30, fontWeight:800, marginBottom:4 }}>{w.name}</div>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
              <span style={{ background:'rgba(245,158,11,0.2)', color:'#f59e0b', padding:'3px 10px', borderRadius:999, fontSize:12, fontWeight:700 }}>Score {w.score}/100</span>
              <span style={{ background:'rgba(255,255,255,0.1)', color:'#fff', padding:'3px 10px', borderRadius:999, fontSize:12, fontWeight:600 }}>{w.tier}</span>
              <span style={{ background:'rgba(34,197,94,0.15)', color:'#4ade80', padding:'3px 10px', borderRadius:999, fontSize:12, fontWeight:600 }}>{w.routes} routes</span>
            </div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns: isMob() ? '1fr' : 'repeat(3,1fr)', gap:12, marginBottom:24 }}>
          {w.highlights.map(h => (
            <div key={h.label} style={{ background:'rgba(255,255,255,0.07)', borderRadius:12, padding:'14px 16px' }}>
              <div style={{ fontSize:11, color:'rgba(255,255,255,0.55)', marginBottom:4 }}>{h.label}</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:20, fontWeight:800, color:'#f59e0b' }}>{h.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background:'rgba(255,255,255,0.05)', borderRadius:12, padding:'18px 20px', borderLeft:'3px solid #f59e0b' }}>
          <p style={{ fontSize:13, lineHeight:1.7, color:'rgba(255,255,255,0.85)', margin:0 }}>"{w.quote}"</p>
          <div style={{ fontSize:12, color:'rgba(255,255,255,0.45)', marginTop:10 }}>— {w.from}</div>
        </div>
      </div>

      {/* Top performers this week */}
      <h3 style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700, margin:'0 0 16px' }}>⭐ {i('Top Performers This Week','Mejores de la semana')}</h3>
      <div style={{ display:'grid', gap:14, marginBottom:28 }}>
        {RECOGNITION.topWeek.map((d, i) => {
          const medals = ['🥇','🥈','🥉'];
          const isYou = d.id === user.id;
          return (
            <div key={d.id} style={{ background:'#fff', borderRadius:16, padding:'20px 24px', border:`1.5px solid ${isYou ? 'var(--brand-accent)' : 'rgba(26,26,46,0.07)'}`, display:'flex', alignItems:'center', gap:16, boxShadow:'0 2px 8px rgba(26,26,46,0.04)' }}>
              <div style={{ fontSize:32 }}>{medals[i]}</div>
              <Avatar name={d.name} size={48} />
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:'var(--font-display)', fontWeight:700, fontSize:16, color:'var(--brand-ink)', marginBottom:4 }}>
                  {d.name}{isYou ? <span style={{ fontSize:12, color:'var(--brand-accent)', marginLeft:8, fontFamily:'var(--font-body)' }}>← that's you!</span> : ''}
                </div>
                <div style={{ fontSize:13, color:'#666' }}>{d.highlight}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:800, color: i===0 ? '#f59e0b' : i===1 ? '#94a3b8' : '#a16207' }}>{d.score}</div>
                <div style={{ fontSize:11, color:'#aaa' }}>score</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Streak leaderboard */}
      <h3 style={{ fontFamily:'var(--font-display)', fontSize:17, fontWeight:700, margin:'0 0 16px' }}>🛡️ {i('Infraction-Free Streaks','Rachas sin infracciones')}</h3>
      <InfractionStreakPage user={user} />
    </div>
  );
}


// ─── Bronze Alert Banner ───────────────────────────────────────
function BronzeAlertBanner({ onViewDriver }) {
  const i = useT();
  if (!BRONZE_ALERTS.length) return null;
  return (
    <div style={{ background:'linear-gradient(135deg,#7f1d1d,#991b1b)', borderRadius:14, padding:'18px 22px', marginBottom:20, border:'1.5px solid #dc2626', display:'flex', alignItems:'center', gap:16 }}>
      <div style={{ fontSize:28, flexShrink:0 }}>🚨</div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', color:'#fca5a5', marginBottom:6 }}>
          Bronze Alert — Immediate Coaching Required
        </div>
        <div style={{ fontSize:13, color:'#fff', lineHeight:1.6 }}>
          {BRONZE_ALERTS.map(d => (
            <span key={d.id} style={{ marginRight:16, display:'inline-flex', alignItems:'center', gap:6 }}>
              <span style={{ fontWeight:700 }}>{d.name}</span>
              <span style={{ fontSize:11, background:'rgba(255,255,255,0.15)', padding:'2px 8px', borderRadius:999, color:'#fecaca' }}>
                3 weeks Bronze · Score {d.score}
              </span>
            </span>
          ))}
        </div>
        <div style={{ fontSize:12, color:'rgba(255,255,255,0.6)', marginTop:6 }}>
          This driver has been in Bronze tier for 3 consecutive weeks. A formal coaching session must be scheduled this week.
        </div>
      </div>
      <button onClick={onViewDriver} style={{ padding:'10px 16px', background:'#dc2626', border:'none', borderRadius:10, color:'#fff', fontSize:12, fontWeight:700, flexShrink:0, cursor:'pointer', whiteSpace:'nowrap' }}>
        Schedule Coaching →
      </button>
    </div>
  );
}

// ─── Portal root ──────────────────────────────────────────────
function PortalPage({ user, setUser }) {
  const logout = () => setUser(null);
  if (!user) return <LoginPage onLogin={setUser} />;
  switch(user.role) {
    case 'driver':               return <DriverPortal              user={user} onLogout={logout} />;
    case 'trainer':              return <TrainerPortal             user={user} onLogout={logout} />;
    case 'dispatch':             return <DispatchPortal            user={user} onLogout={logout} />;
    case 'supervisor-assistant': return <SupervisorAssistantPortal user={user} onLogout={logout} />;
    case 'supervisor':           return <SupervisorPortal          user={user} onLogout={logout} />;
    case 'ops-manager':          return <OpsManagerPortal          user={user} onLogout={logout} />;
    case 'ceo':                  return <CEOPortal                 user={user} onLogout={logout} />;
    case 'manager':              return <ManagerPortal             user={user} onLogout={logout} />;
    default:                     return <DriverPortal              user={user} onLogout={logout} />;
  }
}

Object.assign(window, { PortalPage });
