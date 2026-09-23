import React from 'react';
import {
  CalendarDays,
  CheckSquare,
  Compass,
  FileText,
  Files,
  FolderKanban,
  Gauge,
  Hash,
  HeartHandshake,
  Home,
  LayoutDashboard,
  ListChecks,
  Megaphone,
  MessageSquare,
  MoreHorizontal,
  Plug,
  Search,
  Target,
  Users,
} from 'lucide-react';
import { BrowserFrame, PhoneFrame, Scaled } from './Frames';

// Fictional people and organizations only.
const P = {
  maya: { name: 'Maya Chen', initials: 'MC', hue: 214 },
  theo: { name: 'Theo Grant', initials: 'TG', hue: 160 },
  priya: { name: 'Priya Nair', initials: 'PN', hue: 32 },
  sam: { name: 'Sam Ortiz', initials: 'SO', hue: 280 },
  jordan: { name: 'Jordan Blake', initials: 'JB', hue: 350 },
  lena: { name: 'Lena Park', initials: 'LP', hue: 190 },
};

export const Avatar = ({ p, size = 26 }) => (
  <span className="ui-avatar" style={{ width: size, height: size, fontSize: size * 0.38, background: `hsl(${p.hue} 45% 88%)`, color: `hsl(${p.hue} 45% 28%)` }}>
    {p.initials}
  </span>
);

const ICON = { size: 15, strokeWidth: 1.8 };

const NAV_AFTER = [
  ['Home', Home],
  ['Messages', MessageSquare],
  ['My work', ListChecks],
  ['Calendar', CalendarDays],
  ['Projects', FolderKanban],
  ['Documents', FileText],
  ['People', Users],
  ['Goals', Target],
];
const NAV_BEFORE = [
  ['Dashboard', LayoutDashboard],
  ['Announcements', Megaphone],
  ['Channels', Hash],
  ['Direct messages', MessageSquare],
  ['Tasks', CheckSquare],
  ['My tasks', ListChecks],
  ['Projects', FolderKanban],
  ['Calendar', CalendarDays],
  ['Documents', FileText],
  ['Files', Files],
  ['Directory', Users],
  ['Goals', Target],
  ['Vision', Compass],
  ['Scorecard', Gauge],
  ['Kudos', HeartHandshake],
  ['Portals', Plug],
];

function Sidebar({ items, active = 0, dense = false }) {
  return (
    <aside className={`ui-side${dense ? ' ui-side--dense' : ''}`}>
      <div className="ui-side__brand">
        <span className="ui-side__mark" /> Hub
      </div>
      <nav className="ui-side__nav">
        {items.map(([label, Icon], i) => (
          <div key={label} className={`ui-side__item${i === active ? ' is-active' : ''}`}>
            <Icon {...ICON} className="ui-side__icon" />
            {label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

function HomeScreen() {
  return (
    <div className="ui-app">
      <Sidebar items={NAV_AFTER} />
      <main className="ui-main">
        <div className="ui-main__top">
          <div>
            <p className="ui-kicker">Tuesday</p>
            <h4 className="ui-h1">Good morning, Maya</h4>
          </div>
          <div className="ui-search">
            <Search size={14} strokeWidth={2} />
            <span>Search or jump to</span>
            <kbd>⌘K</kbd>
          </div>
        </div>
        <section className="ui-panel ui-anim-rise" style={{ '--d': '80ms' }}>
          <p className="ui-panel__title">Today</p>
          {[
            ['9:30', 'Stand-up', 'Everyone', 'blue'],
            ['11:00', 'Northwind Security deal review', 'Theo, Priya', 'ink'],
            ['2:00', 'Pilot feedback triage', 'Sam, Lena', 'ink'],
          ].map(([t, title, who, c]) => (
            <div key={t} className="ui-row">
              <span className={`ui-time ui-time--${c}`}>{t}</span>
              <span className="ui-row__title">{title}</span>
              <span className="ui-row__meta">{who}</span>
            </div>
          ))}
        </section>
        <div className="ui-grid2">
          <section className="ui-panel ui-anim-rise" style={{ '--d': '180ms' }}>
            <p className="ui-panel__title">Your tasks</p>
            {[
              ['Send pilot install guide', 'Today', true],
              ['Review Brightline MSP deal', 'Tomorrow', false],
              ['Draft partner FAQ', 'Fri', false],
            ].map(([t, due, hot]) => (
              <div key={t} className="ui-row">
                <span className="ui-check" />
                <span className="ui-row__title">{t}</span>
                <span className={`ui-chip${hot ? ' ui-chip--hot' : ''}`}>{due}</span>
              </div>
            ))}
          </section>
          <section className="ui-panel ui-anim-rise" style={{ '--d': '280ms' }}>
            <p className="ui-panel__title">Messages</p>
            {[
              [P.theo, '#partners', 'Northwind registered a new deal'],
              [P.priya, 'Direct', 'Slides are in the library'],
              [P.sam, '#pilot', 'Two new tickets from Halcyon IT'],
            ].map(([p, where, text]) => (
              <div key={text} className="ui-row">
                <Avatar p={p} size={22} />
                <span className="ui-row__title">
                  <b>{where}</b> {text}
                </span>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export const HubHome = () => (
  <Scaled width={1080} height={660} label="Recreation of the redesigned Hub home: eight navigation items, today's meetings first, then tasks, then messages, with a command palette shortcut. Fictional data.">
    <BrowserFrame title="Hub · Home">
      <HomeScreen />
    </BrowserFrame>
  </Scaled>
);

export const HubBefore = () => (
  <Scaled width={1080} height={660} label="Recreation of the first Hub version: sixteen sidebar items, duplicated statistics and empty widgets. Fictional data.">
    <BrowserFrame title="Hub · Dashboard (version one)">
      <div className="ui-app ui-app--before">
        <Sidebar items={NAV_BEFORE} dense />
        <main className="ui-main">
          <h4 className="ui-h1">Dashboard</h4>
          <div className="ui-stats">
            {[
              ['Open tasks', 14],
              ['Tasks open', 14],
              ['Projects', 5],
              ['Active projects', 5],
              ['Messages', 32],
              ['Unread', 32],
            ].map(([k, v]) => (
              <div key={k} className="ui-stat">
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <div className="ui-grid3">
            {['Recent files', 'Kudos', 'Upcoming', 'Goals', 'Vision', 'Portal activity'].map((w) => (
              <section key={w} className="ui-panel ui-panel--empty">
                <p className="ui-panel__title">{w}</p>
                <p className="ui-empty">Nothing here yet</p>
              </section>
            ))}
          </div>
        </main>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const Discovery = () => (
  <Scaled width={1080} height={660} label="Three discovery questions and their answers: who uses the hub, what they need first each morning, and desk or phone.">
    <div className="ui-discovery">
      {[
        ['Who uses it?', 'Everyone at the company, every day.'],
        ['What do they need first each morning?', 'Today’s meetings. Then tasks. Then messages.'],
        ['At a desk or on a phone?', 'Both.'],
      ].map(([q, a], i) => (
        <div key={q} className="ui-note ui-anim-rise" style={{ '--r': `${[-1.6, 1.1, -0.6][i]}deg`, '--d': `${i * 120}ms` }}>
          <p className="ui-note__n">0{i + 1}</p>
          <p className="ui-note__q">{q}</p>
          <p className="ui-note__a">{a}</p>
        </div>
      ))}
    </div>
  </Scaled>
);

export const CommandPalette = () => (
  <Scaled width={1080} height={660} label="Recreation of the command palette: typing 'north' finds a partner deal, a task and a document at once. Fictional data.">
    <BrowserFrame title="Hub · Command palette">
      <div className="ui-app ui-app--dim">
        <Sidebar items={NAV_AFTER} />
        <main className="ui-main ui-main--ghost">
          <h4 className="ui-h1">Good morning, Maya</h4>
        </main>
        <div className="ui-palette ui-anim-drop">
          <div className="ui-palette__input">
            <Search size={18} strokeWidth={2} className="ui-palette__glass" />
            north<span className="ui-caret" />
          </div>
          {[
            ['Results', [['Northwind Security', 'Partner deal', true], ['Northwind onboarding checklist', 'Task'], ['Northwind proposal v3', 'Document']]],
            ['Go to', [['Projects', 'g p'], ['Calendar', 'g c']]],
            ['Actions', [['New task', 'c']]],
          ].map(([group, rows]) => (
            <div key={group}>
              <p className="ui-palette__group">{group}</p>
              {rows.map(([label, sub, on]) => (
                <div key={label} className={`ui-palette__row${on ? ' is-on' : ''}`}>
                  <span>{label}</span>
                  <span className="ui-palette__sub">{sub}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  </Scaled>
);

const TABS = [
  ['Home', Home],
  ['Messages', MessageSquare],
  ['My work', ListChecks],
  ['Calendar', CalendarDays],
  ['More', MoreHorizontal],
];

export const MobileTabBar = () => (
  <Scaled width={1080} height={660} label="Recreation of the Hub on a phone: today's meetings and tasks with a bottom tab bar for the primary sections. Fictional data.">
    <div className="ui-phone-stage">
      <PhoneFrame>
        <div className="ui-m">
          <p className="ui-kicker">Tuesday</p>
          <h4 className="ui-h1 ui-h1--m">Good morning, Maya</h4>
          <p className="ui-panel__title">Today</p>
          {[
            ['9:30', 'Stand-up'],
            ['11:00', 'Northwind deal review'],
            ['2:00', 'Pilot triage'],
          ].map(([t, x]) => (
            <div key={t} className="ui-row ui-row--m">
              <span className="ui-time ui-time--ink">{t}</span>
              <span className="ui-row__title">{x}</span>
            </div>
          ))}
          <p className="ui-panel__title" style={{ marginTop: 18 }}>
            Your tasks
          </p>
          {['Send pilot install guide', 'Review Brightline deal'].map((x) => (
            <div key={x} className="ui-row ui-row--m">
              <span className="ui-check" />
              <span className="ui-row__title">{x}</span>
            </div>
          ))}
        </div>
        <div className="ui-tabbar">
          {TABS.map(([t, Icon], i) => (
            <span key={t} className={i === 0 ? 'is-on' : ''}>
              <Icon size={19} strokeWidth={1.8} />
              {t}
            </span>
          ))}
        </div>
      </PhoneFrame>
    </div>
  </Scaled>
);

export const CheckIn = () => (
  <Scaled width={960} height={470} label="Recreation of an on-request check-in: the assignee answers On track, At risk or Blocked with a note, and each answer joins the task's status timeline. Fictional data.">
    <div className="ui-checkin">
      <div className="ui-card ui-anim-rise">
        <p className="ui-kicker">Update requested by Theo Grant</p>
        <h4 className="ui-h2">Send pilot install guide</h4>
        <div className="ui-seg">
          <span className="is-on is-ok">On track</span>
          <span>At risk</span>
          <span>Blocked</span>
        </div>
        <div className="ui-input ui-input--area">Draft is done. Review with Sam on Thursday.</div>
        <div className="ui-btn">Send update</div>
      </div>
      <div className="ui-timeline">
        <p className="ui-panel__title">Status timeline</p>
        {[
          ['ok', 'On track', 'Draft is done. Review with Sam on Thursday.', 'Today'],
          ['risk', 'At risk', 'Waiting on screenshots from the pilot team.', 'Mon'],
          ['ok', 'On track', 'Outline agreed.', 'Last week'],
        ].map(([k, s, note, when], i) => (
          <div key={when} className={`ui-timeline__item${i === 0 ? ' ui-anim-slide' : ''}`} style={{ '--d': '420ms' }}>
            <span className={`ui-pip ui-pip--${k}`} />
            <div>
              <p className="ui-timeline__head">
                <b>{s}</b> · {P.maya.name} · {when}
              </p>
              <p className="ui-timeline__note">{note}</p>
            </div>
            {i === 0 && <span className="ui-new">New</span>}
          </div>
        ))}
      </div>
    </div>
  </Scaled>
);

export const ChatChannel = () => (
  <Scaled width={1080} height={540} label="Recreation of a Hub channel: a pinned announcement, real-time messages and a kudos. Fictional data.">
    <BrowserFrame title="Hub · #launch">
      <div className="ui-app">
        <aside className="ui-side ui-side--channels">
          <div className="ui-side__brand">
            <span className="ui-side__mark" /> Messages
          </div>
          {['general', 'launch', 'partners', 'pilot'].map((c, i) => (
            <div key={c} className={`ui-side__item${i === 1 ? ' is-active' : ''}`}>
              <span>
                <Hash size={13} strokeWidth={2} className="ui-side__hash" />
                {c}
              </span>
              {i === 3 && <span className="ui-badge">2</span>}
            </div>
          ))}
          <p className="ui-side__label">Direct</p>
          {[P.priya, P.theo].map((p) => (
            <div key={p.name} className="ui-side__item">
              <span>
                <Avatar p={p} size={18} /> {p.name}
              </span>
            </div>
          ))}
        </aside>
        <main className="ui-main ui-chat">
          <div className="ui-announce">
            <Megaphone size={15} strokeWidth={2} />
            <span>
              <b>Announcement</b> Pilot kickoff moves to Thursday. Agenda is in Documents.
            </span>
          </div>
          {[
            [P.priya, '10:41', 'Final deck is in the library, v4.'],
            [P.theo, '10:44', 'Northwind wants a demo next week. Can we fit it in?'],
            [P.maya, '10:46', 'Yes. I’ll turn it into a task for Sam.'],
          ].map(([p, at, t], i) => (
            <div key={t} className="ui-msg ui-anim-rise" style={{ '--d': `${i * 140}ms` }}>
              <Avatar p={p} size={30} />
              <div>
                <p className="ui-msg__who">
                  {p.name} <span>{at}</span>
                </p>
                <p className="ui-msg__text">{t}</p>
              </div>
            </div>
          ))}
          <div className="ui-kudos ui-anim-rise" style={{ '--d': '480ms' }}>
            <HeartHandshake size={15} strokeWidth={2} /> <b>Kudos</b> to Lena for turning pilot feedback around in a day
          </div>
          <div className="ui-composer">
            <span>Message #launch</span>
            <span className="ui-typing">
              Sam is typing<i />
              <i />
              <i />
            </span>
          </div>
        </main>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const GoalsScorecard = () => (
  <Scaled width={1000} height={470} label="Recreation of goals and a scorecard: company and personal goals with progress beside weekly measures. Fictional data.">
    <BrowserFrame title="Hub · Goals">
      <div className="ui-goals">
        <div>
          <p className="ui-kicker">Vision</p>
          <p className="ui-vision">Make secure identity the easy part of every customer’s day.</p>
          <p className="ui-panel__title" style={{ marginTop: 26 }}>
            Company goals · this quarter
          </p>
          {[
            ['Launch the partner program', 0.7],
            ['Complete pilot onboarding', 0.45],
            ['Publish the implementation guide', 0.2],
          ].map(([g, v], i) => (
            <div key={g} className="ui-goal">
              <span>{g}</span>
              <span className="ui-bar">
                <i style={{ width: `${v * 100}%`, '--d': `${i * 120}ms` }} />
              </span>
              <span className="ui-goal__pct">{Math.round(v * 100)}%</span>
            </div>
          ))}
          <p className="ui-panel__title" style={{ marginTop: 22 }}>
            My goals
          </p>
          <div className="ui-goal">
            <span>Ship onboarding flow</span>
            <span className="ui-bar">
              <i style={{ width: '60%', '--d': '360ms' }} />
            </span>
            <span className="ui-goal__pct">60%</span>
          </div>
        </div>
        <div className="ui-score">
          <p className="ui-panel__title">Scorecard · this week</p>
          {[
            ['Partner deals registered', 'On pace'],
            ['Pilot tickets resolved', 'On pace'],
            ['Onboarding steps done', 'Behind'],
          ].map(([k, s]) => (
            <div key={k} className="ui-scorerow">
              <span>{k}</span>
              <span className={`ui-chip${s === 'Behind' ? ' ui-chip--hot' : ' ui-chip--ok'}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const Directory = () => (
  <Scaled width={1000} height={450} label="Recreation of the company directory with profiles synced from Microsoft Entra ID, beside the document library. Fictional data.">
    <BrowserFrame title="Hub · People">
      <div className="ui-dir">
        <div className="ui-dir__head">
          <h4 className="ui-h1">People</h4>
          <span className="ui-synced">
            <i /> Synced from Entra ID
          </span>
        </div>
        <div className="ui-dir__grid">
          {[
            [P.maya, 'Operations'],
            [P.theo, 'Partnerships'],
            [P.priya, 'Marketing'],
            [P.sam, 'Customer success'],
            [P.jordan, 'Finance'],
            [P.lena, 'Product'],
          ].map(([p, team], i) => (
            <div key={p.name} className="ui-person ui-anim-rise" style={{ '--d': `${i * 60}ms` }}>
              <Avatar p={p} size={40} />
              <div>
                <p className="ui-person__name">{p.name}</p>
                <p className="ui-person__team">{team}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="ui-panel__title" style={{ marginTop: 24 }}>
          Documents
        </p>
        <div className="ui-files">
          {[
            ['Partner program overview', 'PDF'],
            ['Pilot install guide', 'DOCX'],
            ['Brand guidelines', 'PDF'],
            ['Board update, Q3', 'PPTX'],
          ].map(([f, k]) => (
            <div key={f} className="ui-file">
              <FileText size={18} strokeWidth={1.6} className="ui-file__icon" />
              <span>
                <b>{f}</b>
                <i>{k}</i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  </Scaled>
);

export const AskHub = () => (
  <Scaled width={900} height={390} label="Recreation of the optional assistant answering a question with cited sources. Fictional data.">
    <div className="ui-ask">
      <div className="ui-ask__bar">
        <span className="ui-ask__spark">✦</span> Ask the hub
        <span className="ui-toggle">
          <i /> On · configured by an admin
        </span>
      </div>
      <div className="ui-ask__q">
        <Avatar p={P.maya} size={26} /> What did we decide about the pilot kickoff?
      </div>
      <div className="ui-ask__a ui-anim-rise" style={{ '--d': '200ms' }}>
        <p>
          The kickoff moved to Thursday, and the agenda is in Documents. <span className="ui-cite">1</span>
        </p>
        <p>
          Sam owns the install guide, due before the kickoff. <span className="ui-cite">2</span>
        </p>
        <div className="ui-sources">
          <span>
            <b>1</b> Announcement · Pilot kickoff moves to Thursday
          </span>
          <span>
            <b>2</b> Task · Send pilot install guide
          </span>
        </div>
      </div>
    </div>
  </Scaled>
);

export const ScatteredTools = () => (
  <Scaled width={1000} height={600} label="Illustration: chat, email, files and three separate portals, each holding part of the picture, surrounded by questions that have no single place to be answered.">
    <div className="ui-scatter">
      {[
        ['Teams chat', 'Where is the latest deck?', 60, 60, -4],
        ['Outlook', 'RE: pilot timeline (4)', 400, 24, 3],
        ['SharePoint', 'Proposal_v3_FINAL.docx', 720, 96, -2],
        ['Partner portal', 'Deal registered: Crestview', 80, 350, 2],
        ['Pilot portal', 'New ticket: setup step', 420, 400, -3],
        ['Investor portal', 'Q3 update posted', 730, 370, 4],
      ].map(([t, line, x, y, r], i) => (
        <div key={t} className="ui-tile ui-anim-float" style={{ left: x, top: y, '--r': `${r}deg`, '--d': `${i * -0.9}s` }}>
          <span className="ui-tile__bar">
            <i />
            <i />
            <i />
          </span>
          <b>{t}</b>
          <span className="ui-tile__line">{line}</span>
        </div>
      ))}
      <ul className="ui-questions">
        {[
          ['Who is working on what?', 320, 235],
          ['What is overdue?', 60, 225],
          ['Where is the current version?', 640, 265],
          ['What did we decide?', 360, 560],
        ].map(([q, x, y]) => (
          <li key={q} className="ui-question" style={{ left: x, top: y }}>
            {q}
          </li>
        ))}
      </ul>
    </div>
  </Scaled>
);

export const PilotTimeline = () => (
  <Scaled width={1000} height={440} label="Recreation of the Pilot Support Portal admin timeline: entries filterable by type with CSV export. Fictional data.">
    <BrowserFrame title="Pilot Support · Admin">
      <div className="ui-pilot">
        <div className="ui-pilot__head">
          <h4 className="ui-h1">All entries</h4>
          <div className="ui-pilot__tools">
            {['All', 'Bug', 'Error', 'Feedback'].map((f, i) => (
              <span key={f} className={`ui-filter${i === 0 ? ' is-on' : ''}`}>
                {f}
              </span>
            ))}
            <span className="ui-btn ui-btn--ghost">Export CSV</span>
          </div>
        </div>
        {[
          ['Bug', 'Setup step stalls on a second device', 'Halcyon IT', 'Today'],
          ['Feedback', 'Guide was clear; a video walkthrough would help', 'Northwind Security', 'Today'],
          ['Error', 'Error message after the latest update', 'Halcyon IT', 'Yesterday'],
          ['Feedback', 'Would like a summary view for our team', 'Brightline MSP', 'Mon'],
        ].map(([k, t, org, when], i) => (
          <div key={t} className="ui-entry ui-anim-rise" style={{ '--d': `${i * 90}ms` }}>
            <span className={`ui-kind ui-kind--${k.toLowerCase()}`}>{k}</span>
            <span className="ui-entry__title">{t}</span>
            <span className="ui-entry__org">{org}</span>
            <span className="ui-entry__when">{when}</span>
          </div>
        ))}
        <p className="ui-footnote">Pilot users see only their own entries.</p>
      </div>
    </BrowserFrame>
  </Scaled>
);
