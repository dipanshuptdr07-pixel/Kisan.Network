'use client';

import { useState } from 'react';
import { Activity, BarChart3, Building2, FileText, Leaf, Settings2, ShieldCheck, ShoppingBag, Users } from 'lucide-react';
import { useKisanData } from '../hooks/use-kisan-data';
import type { AdminSection, Role } from '../data/types';

const roleLabels: Record<Role, string> = {
  farmer: 'Farmer',
  buyer: 'Buyer / Trader',
  company: 'Agri Company',
  expert: 'Agriculture Expert',
};

const sectionCopy: Record<Exclude<AdminSection, 'overview'>, { eyebrow: string; description: string }> = {
  users: { eyebrow: 'ACCOUNT DIRECTORY', description: 'Local demo accounts across the four public roles.' },
  farmers: { eyebrow: 'FARMER NETWORK', description: 'Farm profiles and cultivation activity in the local demo data.' },
  buyers: { eyebrow: 'BUYER DIRECTORY', description: 'Buyer organizations active in the marketplace demo.' },
  companies: { eyebrow: 'COMPANY DIRECTORY', description: 'Agriculture businesses represented in this demo.' },
  experts: { eyebrow: 'EXPERT DIRECTORY', description: 'Agriculture specialists available to support farmers.' },
  marketplace: { eyebrow: 'MARKETPLACE MONITOR', description: 'Indicative local demo prices and order activity.' },
  reports: { eyebrow: 'REPORTS', description: 'Summary reports generated from the local demo dataset.' },
  analytics: { eyebrow: 'PLATFORM ANALYTICS', description: 'A snapshot of activity across the four public workspaces.' },
  settings: { eyebrow: 'ADMIN SETTINGS', description: 'Demo environment details and future integration notes.' },
};

function Card({ children }: { children: React.ReactNode }) {
  return <section className="card admin-card">{children}</section>;
}

function Metric({ label, value, note, icon: Icon }: { label: string; value: string; note: string; icon: typeof Users }) {
  return <Card><div className="admin-metric-head"><span>{label}</span><span className="admin-icon"><Icon size={18} /></span></div><strong className="metric admin-metric-value">{value}</strong><small>{note}</small></Card>;
}

function Row({ title, detail, badge }: { title: string; detail: string; badge?: string }) {
  return <div className="admin-row"><div><strong>{title}</strong><small>{detail}</small></div>{badge && <span className="pill">{badge}</span>}</div>;
}

export function AdminDashboard({ section, toast }: { section: AdminSection; toast: (message: string) => void }) {
  const [maintenance, setMaintenance] = useState(false);
  const { snapshot, status, error } = useKisanData();
  const { demoBuyers, demoCompanies, demoExperts, demoFarmer, demoUsers, marketPrices, orders } = snapshot;

  if (status === 'error') return <Card><div className="eyebrow">DATA SOURCE ERROR</div><p className="admin-copy">{error?.message || 'Unable to load the administration data.'}</p></Card>;

  if (section === 'overview') {
    return <div className="admin-content">
      <div className="admin-metrics">
        <Metric label="Demo users" value="4" note="Across all public roles" icon={Users} />
        <Metric label="Farmer profiles" value="1" note="Nashik, Maharashtra" icon={Leaf} />
        <Metric label="Market prices" value={String(marketPrices.length)} note="Indicative local demo data" icon={ShoppingBag} />
        <Metric label="Demo health" value="Ready" note="No external services connected" icon={Activity} />
      </div>
      <div className="admin-columns">
        <Card><div className="eyebrow">ROLE DISTRIBUTION</div><h2 className="font-display admin-card-title">Public workspaces</h2>{demoUsers.map((user) => <Row key={user.id} title={user.name} detail={user.location} badge={roleLabels[user.role!]} />)}</Card>
        <Card><div className="eyebrow">DEMO MODE</div><h2 className="font-display admin-card-title">Protected test area</h2><p className="admin-copy">This separate admin view uses a client-side demo gate. It is not production authorization and must be replaced by server-verified permissions before a live launch.</p><div className="admin-note"><ShieldCheck size={17} /> Local demo data only · no SMS · no external services</div></Card>
      </div>
    </div>;
  }

  if (section === 'users') return <Card><div className="eyebrow">{sectionCopy.users.eyebrow}</div><p className="admin-copy">{sectionCopy.users.description}</p>{demoUsers.map((user) => <Row key={user.id} title={user.name} detail={`${user.phone} · ${user.location}`} badge={roleLabels[user.role!]} />)}</Card>;
  if (section === 'farmers') return <Card><div className="eyebrow">{sectionCopy.farmers.eyebrow}</div><p className="admin-copy">{sectionCopy.farmers.description}</p><Row title={demoFarmer.name} detail={`${demoFarmer.location} · ${demoFarmer.acreage} acres · ${demoFarmer.crops.join(', ')}`} badge="Active" /></Card>;
  if (section === 'buyers') return <Card><div className="eyebrow">{sectionCopy.buyers.eyebrow}</div><p className="admin-copy">{sectionCopy.buyers.description}</p>{demoBuyers.map((buyer) => <Row key={buyer.id} title={buyer.name} detail={`${buyer.organization} · ${buyer.location}`} badge="Active" />)}</Card>;
  if (section === 'companies') return <Card><div className="eyebrow">{sectionCopy.companies.eyebrow}</div><p className="admin-copy">{sectionCopy.companies.description}</p>{demoCompanies.map((company) => <Row key={company.id} title={company.name} detail={`${company.organization} · ${company.location}`} badge="Active" />)}</Card>;
  if (section === 'experts') return <Card><div className="eyebrow">{sectionCopy.experts.eyebrow}</div><p className="admin-copy">{sectionCopy.experts.description}</p>{demoExperts.map((expert) => <Row key={expert.id} title={expert.name} detail={`${expert.specialty} · ${expert.location}`} badge="Available" />)}</Card>;
  if (section === 'marketplace') return <Card><div className="eyebrow">{sectionCopy.marketplace.eyebrow}</div><p className="admin-copy">{sectionCopy.marketplace.description}</p>{marketPrices.map((item) => <Row key={item.id} title={item.crop} detail={`${item.market} · ₹${item.price.toLocaleString('en-IN')} / ${item.unit}`} badge={`${item.change > 0 ? '+' : ''}${item.change}%`} />)}{orders.slice(0, 2).map((order) => <Row key={order.id} title={`${order.crop} · ${order.id}`} detail={`${order.buyer} · ${order.quantity}`} badge={order.status} />)}</Card>;
  if (section === 'reports') return <div className="admin-columns"><Card><div className="eyebrow">{sectionCopy.reports.eyebrow}</div><p className="admin-copy">{sectionCopy.reports.description}</p><Row title="User directory" detail="4 demo accounts · 4 public roles" badge="Ready" /><Row title="Marketplace snapshot" detail={`${marketPrices.length} indicative prices · ${orders.length} sample orders`} badge="Ready" /><button className="btn-secondary" onClick={() => toast('Demo report prepared from local sample data.')}><FileText size={15} /> Prepare summary</button></Card><Card><div className="admin-icon"><FileText size={19} /></div><h2 className="font-display admin-card-title">Local demo reports</h2><p className="admin-copy">Reports are previews based on seeded sample data. They do not represent live platform activity.</p></Card></div>;
  if (section === 'analytics') return <div className="admin-columns"><Card><div className="eyebrow">{sectionCopy.analytics.eyebrow}</div><p className="admin-copy">{sectionCopy.analytics.description}</p>{[['Farmers', 78], ['Buyers', 54], ['Companies', 43], ['Experts', 61]].map(([name, value]) => <div key={name} className="admin-bar-row"><div><span>{name}</span><strong>{value}%</strong></div><div className="admin-bar"><i style={{ width: `${value}%` }} /></div></div>)}</Card><Card><BarChart3 size={22} color="var(--green)" /><h2 className="font-display admin-card-title">Sample activity</h2><p className="admin-copy">All figures on this view are fixed demo values and are not sourced from a live service.</p></Card></div>;
  return <Card><div className="eyebrow">{sectionCopy.settings.eyebrow}</div><p className="admin-copy">{sectionCopy.settings.description}</p><Row title="Authentication" detail="Local demo phone and fixed verification code; no SMS is sent." badge="Demo" /><Row title="Data source" detail="Typed local sample data; no connected services." badge="Local" /><Row title="Production access control" detail="Replace the client-only demo gate with server-verified authorization." badge="Required" /><div className="admin-setting"><div><strong>Maintenance banner</strong><small>Demo-only visual setting for this browser session.</small></div><button className={`btn-secondary ${maintenance ? 'is-selected' : ''}`} onClick={() => { setMaintenance((value) => !value); toast(`Maintenance banner ${maintenance ? 'disabled' : 'enabled'} for this demo.`); }}>{maintenance ? 'Enabled' : 'Disabled'}</button></div></Card>;
}

const adminTabs: { id: AdminSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'users', label: 'Users' },
  { id: 'farmers', label: 'Farmers' },
  { id: 'buyers', label: 'Buyers' },
  { id: 'companies', label: 'Companies' },
  { id: 'experts', label: 'Experts' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'reports', label: 'Reports' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'settings', label: 'Settings' },
];

export function AdminTabs({ section }: { section: AdminSection }) {
  return <nav className="admin-tabs" aria-label="Admin sections">
    {adminTabs.map((tab) => <a key={tab.id} href={`#${tab.id}`} className={`admin-tab ${section === tab.id ? 'active' : ''}`} aria-current={section === tab.id ? 'page' : undefined}>{tab.label}</a>)}
  </nav>;
}
