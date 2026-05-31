"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".rev").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const C = {
  navy:"#182338",navyDk:"#101828",navyLt:"#1F3A6A",
  gold:"#C4A248",goldLt:"#DFC05A",steel:"#2B5BA8",
  stone:"#F5F0E8",stoneDk:"#E8DDD0",cream:"#FDFCF9",
  white:"#FFFFFF",ink:"#1A1A18",muted:"#6B7280",
};



// ── Reviews data ──────────────────────────────────
type Review = {
  name: string; initials: string; role: string; location: string;
  service: string; rating: number; date: string; text: string; featured?: boolean;
};

const REVIEWS: Review[] = [
  {
    name:"Nompumelelo Mthembu", initials:"NM", role:"Homeowner", location:"Tongaat",
    service:"Residential Construction", rating:5, date:"March 2025", featured:true,
    text:"TtFRECH built our family home from the ground up. From the very first meeting, Thabo and his team were professional, transparent about costs, and communicative throughout. They finished two weeks ahead of schedule and the quality of the finish absolutely exceeded our expectations. I wouldn't hesitate to recommend them to anyone.",
  },
  {
    name:"Ruan Steyn", initials:"RS", role:"Business Owner", location:"Ballito",
    service:"Commercial Builds", rating:5, date:"January 2025", featured:true,
    text:"We contracted TtFRECH for a full office fit-out across two floors. Professional from the very first quote to final handover. Transparent pricing, excellent communication, and top-notch craftsmanship throughout. Our team loves the new space. We've already referred three other businesses to TtFRECH.",
  },
  {
    name:"Liezel Botha", initials:"LB", role:"Homeowner", location:"Westbrook",
    service:"Renovations & Upgrades", rating:5, date:"November 2024", featured:true,
    text:"After very bad experiences with other builders, TtFRECH truly restored our faith. They renovated our entire property — kitchen, bathrooms, and an extension. They kept us updated daily with photos and the result is absolutely stunning. Well worth every rand.",
  },
  {
    name:"Sipho Ndlovu", initials:"SN", role:"Property Developer", location:"Stanger",
    service:"Project Management", rating:5, date:"October 2024",
    text:"I've used TtFRECH on three separate commercial developments now. Their project management is second to none — always on budget, always on time. Zanele's team is incredibly organised and the reporting is thorough. They are my first call for every new project.",
  },
  {
    name:"Amanda van der Berg", initials:"AV", role:"Homeowner", location:"Palm Lakes",
    service:"Roofing & Waterproofing", rating:5, date:"September 2024",
    text:"Had a major roof leak that two other companies couldn't fix permanently. TtFRECH identified the root cause within an hour of arriving, gave me a detailed quote, and had it fully resolved within two days. No more leaks three months on. Excellent service.",
  },
  {
    name:"Kagiso Sithole", initials:"KS", role:"Facilities Manager", location:"Ballito",
    service:"Site Inspections", rating:5, date:"August 2024",
    text:"TtFRECH completed a full structural inspection of our commercial premises. The report was detailed, clearly written, and delivered on time. Their inspector was knowledgeable and flagged issues our own team hadn't spotted. Invaluable for our compliance records.",
  },
  {
    name:"Mariana Cronje", initials:"MC", role:"Homeowner", location:"Umhlanga",
    service:"Residential Construction", rating:5, date:"July 2024",
    text:"Building a new home is stressful — TtFRECH made it as smooth as possible. They assigned us a dedicated project manager who was always reachable. Every milestone was met and the build quality is exceptional. Our neighbours keep asking who built our house!",
  },
  {
    name:"David Patel", initials:"DP", role:"Restaurant Owner", location:"Durban",
    service:"Commercial Builds", rating:5, date:"May 2024",
    text:"TtFRECH fitted out our new restaurant from scratch. They understood the brief immediately, worked around our tight timeline, and the result is a beautiful, functional space. They also managed all the compliance inspections. Highly recommended for any hospitality project.",
  },
  {
    name:"Thandi Mokoena", initials:"TM", role:"Homeowner", location:"Soweto",
    service:"Renovations & Upgrades", rating:5, date:"April 2024",
    text:"I had my entire kitchen and two bathrooms renovated. The team was punctual, respectful of my home, and cleaned up every day before leaving. The quality of the tiling and finishing is beautiful. TtFRECH delivered exactly what was promised at the agreed price.",
  },
];

const SERVICES_FILTER = ["All","Residential Construction","Commercial Builds","Renovations & Upgrades","Roofing & Waterproofing","Project Management","Site Inspections"];

const STATS = [
  {n:"320+", l:"Happy Clients"},
  {n:"98%",  l:"Satisfaction Rate"},
  {n:"5★",   l:"Average Rating"},
  {n:"15+",  l:"Years Trusted"},
];

// ── Shared UI ─────────────────────────────────────
const Label=({text}:{text:string})=>(
  <div style={{display:"inline-flex",alignItems:"center",gap:"10px",color:C.gold,
    fontSize:"11px",fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:"16px"}}>
    <span style={{display:"block",width:"28px",height:"1.5px",background:C.gold}}/>
    {text}
  </div>
);

const Btn=({href,children,v="gold"}:{href:string;children:React.ReactNode;v?:"gold"|"outline"|"ol-dark"})=>{
  const vs={
    gold:{background:C.gold,color:C.navy,border:`1.5px solid ${C.gold}`},
    outline:{background:"transparent",color:C.stone,border:"1.5px solid rgba(245,240,232,0.25)"},
    "ol-dark":{background:"transparent",color:C.navy,border:`1.5px solid rgba(24,35,56,0.28)`},
  }[v];
  return(
    <Link href={href} style={{display:"inline-block",textDecoration:"none",fontSize:"11px",
      fontWeight:600,letterSpacing:"1.5px",textTransform:"uppercase",padding:"13px 32px",...vs}}>
      {children}
    </Link>
  );
};

const Stars=({n}:{n:number})=>(
  <div style={{display:"flex",gap:"2px"}}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width="14" height="14" viewBox="0 0 24 24"
        fill={i<=n?C.gold:"rgba(196,162,72,0.2)"}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const LM=({size=38}:{size?:number})=>(
  <div style={{width:size,height:size,background:`linear-gradient(135deg,${C.navyLt},${C.navy})`,
    border:"1.5px solid rgba(196,162,72,0.45)",display:"flex",alignItems:"center",justifyContent:"center"}}>
    <svg width={size*.52} height={size*.52} viewBox="0 0 24 24" fill="none">
      <path d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5Z"
        stroke={C.gold} strokeWidth="1.6" strokeLinejoin="round"/>
      <rect x="10" y="15" width="4" height="6" rx=".4" fill={C.gold} opacity=".55"/>
    </svg>
  </div>
);
const LT=({size=19}:{size?:number})=>(
  <div>
    <div style={{fontFamily:"var(--fd)",fontSize:size,fontWeight:700,color:C.stone,letterSpacing:".5px",lineHeight:1}}>
      Tt<span style={{color:C.gold}}>FRECH</span>
    </div>
    <div style={{fontSize:"7px",fontWeight:500,letterSpacing:"1.8px",textTransform:"uppercase",
      color:"rgba(196,162,72,.5)",marginTop:"1px"}}>Renovators & Investments</div>
  </div>
);





// ══ TESTIMONIALS PAGE ═════════════════════════════
export default function TestimonialsPage(){
  useReveal();
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState<string|null>(null);

  const filtered = filter==="All" ? REVIEWS : REVIEWS.filter(r=>r.service===filter);
  const featured = REVIEWS.filter(r=>r.featured);

  return(
    <>
      

     
      <main>

        {/* ── HERO ── */}
        <section style={{minHeight:"52vh",background:C.navyDk,position:"relative",
          display:"flex",alignItems:"center",overflow:"hidden",paddingTop:"72px"}}>
          <div style={{position:"absolute",inset:0,
            background:"linear-gradient(135deg,rgba(16,24,40,.96) 0%,rgba(24,35,56,.7) 55%,rgba(16,24,40,.93) 100%)"}}/>
          <div style={{position:"absolute",inset:0,
            backgroundImage:"linear-gradient(rgba(196,162,72,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.04) 1px,transparent 1px)",
            backgroundSize:"72px 72px"}}/>
          <div style={{position:"absolute",top:0,right:0,width:"260px",height:"260px",
            background:"rgba(196,162,72,.05)",clipPath:"polygon(100% 0,100% 100%,0 0)"}}/>
          <div style={{position:"absolute",bottom:0,left:0,width:"200px",height:"200px",
            background:"rgba(43,91,168,.05)",clipPath:"polygon(0 0,0 100%,100% 100%)"}}/>

          <div style={{position:"relative",zIndex:2,width:"90%",maxWidth:"1200px",margin:"0 auto",padding:"60px 0"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"28px"}}>
              <Link href="/" style={{textDecoration:"none",fontSize:"12px",color:"rgba(196,162,72,.5)"}}>Home</Link>
              <span style={{color:"rgba(196,162,72,.3)",fontSize:"12px"}}>›</span>
              <span style={{fontSize:"12px",color:"rgba(196,162,72,.7)"}}>Reviews</span>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px",alignItems:"center"}} className="hero-cols">
              <div>
                <div style={{display:"inline-flex",alignItems:"center",gap:"8px",
                  background:"rgba(196,162,72,.07)",border:"1px solid rgba(196,162,72,.22)",
                  color:C.gold,fontSize:"10px",fontWeight:600,letterSpacing:"2px",
                  textTransform:"uppercase",padding:"7px 16px",marginBottom:"24px"}}>
                  <span style={{width:"6px",height:"6px",borderRadius:"50%",background:C.gold,flexShrink:0}}/>
                  {REVIEWS.length} Verified Reviews
                </div>
                <h1 style={{fontFamily:"var(--fd)",fontSize:"clamp(38px,5.5vw,66px)",
                  fontWeight:700,lineHeight:1.05,color:C.stone,marginBottom:"20px"}}>
                  Real Words From<br/>
                  <em style={{fontStyle:"italic",color:C.gold,fontWeight:400}}>Real Clients.</em>
                </h1>
                <p style={{fontSize:"16px",fontWeight:300,lineHeight:1.8,
                  color:"rgba(245,240,232,.55)",maxWidth:"440px",marginBottom:"36px"}}>
                  Don&apos;t take our word for it. Read what our clients across South Africa say
                  about their experience building and renovating with TtFRECH.
                </p>
                <div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
                  <Btn href="/contact" v="gold">Start Your Project</Btn>
                  <Btn href="/services" v="outline">Our Services</Btn>
                </div>
              </div>

              {/* Overall rating panel */}
              <div style={{background:"rgba(255,255,255,.03)",border:"1px solid rgba(196,162,72,.12)",padding:"36px 32px"}}>
                <div style={{textAlign:"center",marginBottom:"28px",paddingBottom:"28px",borderBottom:"1px solid rgba(196,162,72,.1)"}}>
                  <div style={{fontFamily:"var(--fd)",fontSize:"80px",fontWeight:700,
                    color:C.stone,lineHeight:1,marginBottom:"8px"}}>5.0</div>
                  <div style={{display:"flex",justifyContent:"center",gap:"4px",marginBottom:"8px"}}>
                    {[1,2,3,4,5].map(i=>(
                      <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill={C.gold}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <div style={{fontSize:"13px",color:"rgba(196,162,72,.55)"}}>Average across {REVIEWS.length} reviews</div>
                </div>
                {/* Rating breakdown */}
                {[5,4,3,2,1].map(star=>{
                  const count=REVIEWS.filter(r=>r.rating===star).length;
                  const pct=Math.round((count/REVIEWS.length)*100);
                  return(
                    <div key={star} style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"10px"}}>
                      <span style={{fontSize:"12px",color:"rgba(245,240,232,.5)",width:"8px"}}>{star}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill={C.gold}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      <div style={{flex:1,height:"4px",background:"rgba(196,162,72,.12)",borderRadius:"2px"}}>
                        <div style={{width:`${pct}%`,height:"100%",background:C.gold,borderRadius:"2px",transition:"width .6s ease"}}/>
                      </div>
                      <span style={{fontSize:"12px",color:"rgba(196,162,72,.55)",width:"28px",textAlign:"right"}}>{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div style={{background:C.navy,borderBottom:`1px solid rgba(196,162,72,.1)`}}>
          <div style={{maxWidth:"1200px",margin:"0 auto",padding:"0 5%",
            display:"grid",gridTemplateColumns:"repeat(4,1fr)"}} className="stats-bar">
            {STATS.map((s,i)=>(
              <div key={s.n} style={{padding:"28px 24px",textAlign:"center",
                borderRight:i<3?`1px solid rgba(196,162,72,.08)`:"none"}}>
                <div style={{fontFamily:"var(--fd)",fontSize:"42px",fontWeight:700,
                  color:C.stone,lineHeight:1,marginBottom:"4px"}}>{s.n}</div>
                <div style={{fontSize:"12px",color:"rgba(196,162,72,.5)",letterSpacing:"0.5px"}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURED REVIEWS ── */}
        <section style={{background:C.white,padding:"100px 5%"}}>
          <div style={{maxWidth:"1200px",margin:"0 auto"}}>
            <div style={{marginBottom:"52px"}}>
              <div className="rev"><Label text="Featured Reviews"/></div>
              <h2 className="rev d1" style={{fontFamily:"var(--fd)",
                fontSize:"clamp(30px,4vw,48px)",fontWeight:700,lineHeight:1.1,color:C.navy}}>
                Client Stories That{" "}
                <em style={{fontStyle:"italic",color:C.steel,fontWeight:400}}>Speak for Themselves</em>
              </h2>
            </div>

            <div className="featured-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"24px"}}>
              {featured.map((r,i)=>(
                <div key={r.name} className={`rev d${i+1}`}
                  style={{background:C.cream,border:`1px solid ${C.stoneDk}`,
                    borderTop:`3px solid ${C.gold}`,padding:"36px 30px",position:"relative"}}>
                  {/* Featured badge */}
                  <div style={{position:"absolute",top:"-1px",right:"24px",
                    background:C.gold,padding:"4px 12px",
                    fontSize:"9px",fontWeight:600,letterSpacing:"1.5px",
                    textTransform:"uppercase",color:C.navy}}>Featured</div>
                  <div style={{fontFamily:"var(--fd)",fontSize:"56px",lineHeight:.6,
                    color:C.gold,marginBottom:"16px"}}>&ldquo;</div>
                  <p style={{fontSize:"15px",fontWeight:300,lineHeight:1.85,
                    color:"#374151",fontStyle:"italic",marginBottom:"28px"}}>{r.text}</p>
                  <div style={{display:"flex",alignItems:"center",gap:"14px",
                    paddingTop:"20px",borderTop:`1px solid ${C.stoneDk}`}}>
                    <div style={{width:"46px",height:"46px",borderRadius:"50%",
                      background:C.navy,border:`2px solid rgba(196,162,72,.4)`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontFamily:"var(--fd)",fontSize:"17px",fontWeight:700,
                      color:C.stone,flexShrink:0}}>{r.initials}</div>
                    <div style={{flex:1}}>
                      <Stars n={r.rating}/>
                      <div style={{fontSize:"14px",fontWeight:600,color:C.navy,marginTop:"3px"}}>{r.name}</div>
                      <div style={{fontSize:"12px",color:C.muted}}>{r.role} · {r.location}</div>
                    </div>
                    <div style={{fontSize:"10px",fontWeight:500,color:C.gold,
                      background:"rgba(196,162,72,.08)",border:"1px solid rgba(196,162,72,.2)",
                      padding:"4px 10px",letterSpacing:"0.5px",textAlign:"right",
                      maxWidth:"100px",lineHeight:1.4}}>{r.service}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ALL REVIEWS WITH FILTER ── */}
        <section style={{background:C.stone,padding:"100px 5%"}}>
          <div style={{maxWidth:"1200px",margin:"0 auto"}}>
            <div style={{display:"flex",justifyContent:"space-between",
              alignItems:"flex-end",marginBottom:"40px",flexWrap:"wrap",gap:"20px"}}>
              <div>
                <div className="rev"><Label text="All Reviews"/></div>
                <h2 className="rev d1" style={{fontFamily:"var(--fd)",
                  fontSize:"clamp(28px,3.5vw,44px)",fontWeight:700,lineHeight:1.1,color:C.navy}}>
                  Browse by{" "}
                  <em style={{fontStyle:"italic",color:C.steel,fontWeight:400}}>Service</em>
                </h2>
              </div>
              <div style={{fontSize:"13px",color:C.muted}}>
                Showing <strong style={{color:C.navy}}>{filtered.length}</strong> of {REVIEWS.length} reviews
              </div>
            </div>

            {/* Filter bar */}
            <div className="filter-bar" style={{display:"flex",gap:"8px",marginBottom:"40px",flexWrap:"wrap"}}>
              {SERVICES_FILTER.map(f=>(
                <button key={f} className="filter-btn"
                  onClick={()=>setFilter(f)}
                  style={{background:filter===f?C.navy:"transparent",
                    color:filter===f?C.stone:C.muted,
                    border:filter===f?`1.5px solid ${C.navy}`:`1.5px solid ${C.stoneDk}`,
                    padding:"8px 18px",fontSize:"12px",fontWeight:filter===f?500:400,
                    letterSpacing:"0.5px",cursor:"pointer",transition:"all .2s",
                    whiteSpace:"nowrap"}}>
                  {f}
                  {f==="All"&&<span style={{marginLeft:"6px",fontSize:"11px",
                    color:filter===f?"rgba(245,240,232,.6)":C.gold}}>({REVIEWS.length})</span>}
                </button>
              ))}
            </div>

            {/* Reviews grid */}
            <div className="reviews-grid" style={{display:"grid",
              gridTemplateColumns:"repeat(3,1fr)",gap:"20px"}}>
              {filtered.map((r,i)=>(
                <div key={r.name} className={`rev-card rev d${(i%3)+1}`}
                  style={{background:C.white,border:`1px solid ${C.stoneDk}`,
                    padding:"28px 24px",transition:"border-color .3s,transform .3s",cursor:"default"}}>
                  <div style={{display:"flex",justifyContent:"space-between",
                    alignItems:"flex-start",marginBottom:"16px"}}>
                    <Stars n={r.rating}/>
                    <span style={{fontSize:"10px",color:C.muted}}>{r.date}</span>
                  </div>
                  <div style={{fontFamily:"var(--fd)",fontSize:"40px",lineHeight:.6,
                    color:"rgba(196,162,72,.3)",marginBottom:"10px"}}>&ldquo;</div>

                  {/* Truncated text with expand */}
                  <p style={{fontSize:"14px",fontWeight:300,lineHeight:1.8,
                    color:"#4B5563",marginBottom:"16px",
                    display:"-webkit-box",WebkitLineClamp:expanded===r.name?undefined:4,
                    WebkitBoxOrient:"vertical",overflow:expanded===r.name?"visible":"hidden"}}>
                    {r.text}
                  </p>
                  {r.text.length>220&&(
                    <button onClick={()=>setExpanded(expanded===r.name?null:r.name)}
                      style={{background:"none",border:"none",cursor:"pointer",
                        fontSize:"12px",color:C.gold,fontWeight:500,padding:0,
                        marginBottom:"16px",letterSpacing:"0.5px"}}>
                      {expanded===r.name?"Show less ↑":"Read more ↓"}
                    </button>
                  )}

                  <div style={{paddingTop:"16px",borderTop:`1px solid ${C.stoneDk}`,
                    display:"flex",alignItems:"center",gap:"12px"}}>
                    <div style={{width:"40px",height:"40px",borderRadius:"50%",
                      background:C.navy,border:`2px solid rgba(196,162,72,.3)`,
                      display:"flex",alignItems:"center",justifyContent:"center",
                      fontFamily:"var(--fd)",fontSize:"15px",fontWeight:700,
                      color:C.stone,flexShrink:0}}>{r.initials}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:"13px",fontWeight:600,color:C.navy,
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.name}</div>
                      <div style={{fontSize:"11px",color:C.muted}}>{r.role} · {r.location}</div>
                    </div>
                  </div>
                  <div style={{marginTop:"12px",fontSize:"10px",fontWeight:500,
                    color:C.gold,letterSpacing:"0.5px",
                    background:"rgba(196,162,72,.06)",border:"1px solid rgba(196,162,72,.15)",
                    padding:"4px 10px",display:"inline-block"}}>{r.service}</div>
                </div>
              ))}
            </div>

            {filtered.length===0&&(
              <div style={{textAlign:"center",padding:"60px 20px",color:C.muted}}>
                <div style={{fontFamily:"var(--fd)",fontSize:"24px",color:C.navy,marginBottom:"8px"}}>
                  No reviews found
                </div>
                <p style={{fontSize:"14px"}}>Try selecting a different service filter above.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── LEAVE A REVIEW CTA ── */}
        <section style={{background:C.navy,padding:"80px 5%"}}>
          <div style={{maxWidth:"1200px",margin:"0 auto",
            display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px",alignItems:"center"}}
            className="hero-cols">
            <div className="rev">
              <Label text="Share Your Experience"/>
              <h2 style={{fontFamily:"var(--fd)",fontSize:"clamp(28px,3.5vw,44px)",
                fontWeight:700,lineHeight:1.1,color:C.stone,marginBottom:"16px"}}>
                Had a Great Experience<br/>
                <em style={{fontStyle:"italic",color:C.gold,fontWeight:400}}>With TtFRECH?</em>
              </h2>
              <p style={{fontSize:"15px",fontWeight:300,lineHeight:1.8,
                color:"rgba(245,240,232,.5)",marginBottom:"28px"}}>
                We&apos;d love to hear from you. Your feedback helps other South Africans
                make confident decisions about their building projects.
              </p>
              <div style={{display:"flex",gap:"14px",flexWrap:"wrap"}}>
                <a href="mailto:contact@ttfrech.co.za?subject=Review for TtFRECH"
                  style={{display:"inline-block",textDecoration:"none",background:C.gold,
                    color:C.navy,padding:"13px 32px",fontSize:"11px",fontWeight:600,
                    letterSpacing:"1.5px",textTransform:"uppercase"}}>
                  Submit a Review
                </a>
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer"
                  style={{display:"inline-block",textDecoration:"none",background:"transparent",
                    color:C.stone,padding:"13px 32px",fontSize:"11px",fontWeight:500,
                    letterSpacing:"1.5px",textTransform:"uppercase",
                    border:"1.5px solid rgba(245,240,232,.22)"}}>
                  Google Review
                </a>
              </div>
            </div>
            {/* Trust indicators */}
            <div className="rev d1" style={{display:"flex",flexDirection:"column",gap:"16px"}}>
              {[
                {sym:"★", t:"98% Satisfaction Rate", d:"Based on all completed projects across residential and commercial builds."},
                {sym:"◈", t:"Workmanship Guarantee", d:"Every project comes with a written workmanship guarantee — your peace of mind matters."},
                {sym:"✓", t:"CIDB Registered",       d:"Fully registered and compliant with South African construction industry standards."},
              ].map(item=>(
                <div key={item.t} style={{display:"flex",gap:"16px",padding:"20px",
                  background:"rgba(255,255,255,.04)",border:"1px solid rgba(196,162,72,.1)"}}>
                  <div style={{fontFamily:"var(--fd)",fontSize:"28px",color:C.gold,
                    flexShrink:0,lineHeight:1,marginTop:"2px"}}>{item.sym}</div>
                  <div>
                    <div style={{fontSize:"14px",fontWeight:500,color:C.stone,marginBottom:"4px"}}>{item.t}</div>
                    <div style={{fontSize:"13px",fontWeight:300,lineHeight:1.6,
                      color:"rgba(245,240,232,.45)"}}>{item.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{background:C.navyDk,padding:"100px 5%",textAlign:"center",
          position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,
            background:"radial-gradient(ellipse at 50% 50%,rgba(196,162,72,.06) 0%,transparent 65%)"}}/>
          <div style={{position:"absolute",top:0,right:0,width:"200px",height:"200px",
            background:"rgba(196,162,72,.04)",clipPath:"polygon(100% 0,100% 100%,0 0)"}}/>
          <div style={{position:"relative",zIndex:1,maxWidth:"620px",margin:"0 auto"}}>
            <div className="rev" style={{display:"flex",alignItems:"center",justifyContent:"center",
              gap:"10px",color:C.gold,fontSize:"11px",fontWeight:600,
              letterSpacing:"2.5px",textTransform:"uppercase",marginBottom:"16px"}}>
              <span style={{display:"block",width:"20px",height:"1.5px",background:C.gold}}/>
              Join 320+ Happy Clients
              <span style={{display:"block",width:"20px",height:"1.5px",background:C.gold}}/>
            </div>
            <h2 className="rev d1" style={{fontFamily:"var(--fd)",
              fontSize:"clamp(32px,5vw,58px)",fontWeight:700,lineHeight:1.1,
              color:C.stone,marginBottom:"18px"}}>
              Ready to Become Our<br/>
              <em style={{fontStyle:"italic",color:C.gold,fontWeight:400}}>Next Success Story?</em>
            </h2>
            <p className="rev d2" style={{fontSize:"16px",fontWeight:300,lineHeight:1.8,
              color:"rgba(245,240,232,.5)",marginBottom:"40px"}}>
              Get in touch today for your free consultation and quotation.
              Let&apos;s build something you&apos;ll be proud of.
            </p>
            <div className="rev d3" style={{display:"flex",gap:"14px",justifyContent:"center",flexWrap:"wrap"}}>
              <Btn href="/contact" v="gold">Get a Free Quote</Btn>
              <a href="tel:+270736101014"
                style={{display:"inline-block",textDecoration:"none",
                  background:"transparent",color:C.stone,padding:"13px 32px",
                  fontSize:"11px",fontWeight:500,letterSpacing:"1.5px",textTransform:"uppercase",
                  border:"1.5px solid rgba(245,240,232,.22)"}}>
                Call 073 610 1014
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}