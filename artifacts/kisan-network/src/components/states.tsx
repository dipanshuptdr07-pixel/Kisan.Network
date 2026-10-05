'use client';

import type { ReactNode } from 'react';
import { AlertCircle, LockKeyhole, Search, Sprout } from 'lucide-react';

function StateFrame({ icon, title, detail, action }: { icon: ReactNode; title: string; detail: string; action?: ReactNode }) {
  return <section className="card" style={{padding:32,textAlign:'center',minHeight:220,display:'grid',placeContent:'center',justifyItems:'center',gap:12}}>
    <div style={{width:44,height:44,borderRadius:14,display:'grid',placeItems:'center',background:'var(--green-pale)',color:'var(--green)'}}>{icon}</div>
    <h2 className="font-display" style={{margin:0,fontSize:19}}>{title}</h2>
    <p style={{margin:0,color:'var(--muted)',fontSize:13,maxWidth:390,lineHeight:1.6}}>{detail}</p>{action}
  </section>;
}
export function EmptyState({ title='Nothing here yet', detail='Your workspace will show updates when there is something to see.', action }: { title?:string; detail?:string; action?:ReactNode }) {
  return <StateFrame icon={<Sprout size={22}/>} title={title} detail={detail} action={action}/>;
}
export function ErrorState({ retry }: { retry:()=>void }) {
  return <StateFrame icon={<AlertCircle size={22}/>} title="That didn’t load" detail="Something interrupted this view. Try again when you’re ready." action={<button className="btn-primary" onClick={retry}>Try again</button>}/>;
}
export function UnauthorizedState() {
  return <StateFrame icon={<LockKeyhole size={22}/>} title="This workspace is private" detail="Sign in and choose the workspace that matches your role to continue."/>;
}
export function NotFoundState() {
  return <StateFrame icon={<Search size={22}/>} title="We couldn’t find that page" detail="The link may have moved. Head back to your workspace and keep going."/>;
}
