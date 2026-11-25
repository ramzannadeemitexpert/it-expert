const $=s=>document.querySelector(s);
/* placeholder preview images, generated as SVG so nothing external loads */
function ph(type,h){
  const a=`hsl(${h} 90% 55%)`,b=`hsl(${h+25} 95% 60%)`,n="#0a1a3a";let s="";
  if(type==="table"||type==="card"){for(let r=0;r<6;r++){s+=`<rect x="30" y="${70+r*34}" width="340" height="26" rx="5" fill="${r?'#eef4ff':n}"/>`;for(let c=0;c<4;c++)s+=`<rect x="${42+c*84}" y="${79+r*34}" width="${r?50:60}" height="8" rx="4" fill="${r?'#b8c9ea':'#8fb0ff'}"/>`}}
  else if(type==="line"){s=`<path d="M30 220 L110 170 L180 190 L250 110 L320 130 L370 70" fill="none" stroke="${a}" stroke-width="6" stroke-linecap="round"/><path d="M30 220 L110 170 L180 190 L250 110 L320 130 L370 70 V250 H30Z" fill="${a}" opacity=".15"/>`}
  else if(type==="pie"){s=`<circle cx="150" cy="150" r="80" fill="${a}"/><path d="M150 150V70A80 80 0 0 1 225 178Z" fill="${n}"/><path d="M150 150L225 178A80 80 0 0 1 100 215Z" fill="#8fb0ff"/><rect x="270" y="100" width="100" height="12" rx="6" fill="#b8c9ea"/><rect x="270" y="130" width="76" height="12" rx="6" fill="#b8c9ea"/><rect x="270" y="160" width="90" height="12" rx="6" fill="#b8c9ea"/>`}
  else{for(let i=0;i<3;i++)s+=`<rect x="${30+i*122}" y="62" width="106" height="44" rx="8" fill="#eef4ff"/><rect x="${42+i*122}" y="74" width="50" height="8" rx="4" fill="#b8c9ea"/><rect x="${42+i*122}" y="90" width="36" height="10" rx="5" fill="${n}"/>`;
    [60,95,75,130,110,150,125].forEach((v,i)=>s+=`<rect x="${40+i*48}" y="${250-v}" width="30" height="${v}" rx="5" fill="${i%2?a:b}"/>`)}
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="hsl(${h} 60% 93%)"/></linearGradient></defs><rect width="400" height="250" fill="url(#g)"/><rect width="400" height="40" fill="#107c41"/><circle cx="20" cy="20" r="5" fill="#fff" opacity=".7"/><circle cx="38" cy="20" r="5" fill="#fff" opacity=".7"/>${s}</svg>`;
  return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);
}
const fiv=CONFIG.fiverr;
document.querySelectorAll(".fiv-link").forEach(a=>{a.href=fiv;if(a.classList.contains("url"))a.textContent=fiv});
$("#yr").textContent=new Date().getFullYear();

$("#svc").innerHTML=SERVICES.map(([t,d,p])=>`<article class="card rv"><div class="ic"><svg viewBox="0 0 24 24"><path d="${p}"/></svg></div><h3>${t}</h3><p>${d}</p></article>`).join("");
$("#sk").innerHTML=SKILLS.map(([n,v])=>`<div class="sk"><div><span>${n}</span><em>${v}%</em></div><div class="track"><i data-w="${v}"></i></div></div>`).join("");

const cats=["All",...new Set(PROJECTS.map(p=>p.cat))];
let cur="All";
function draw(){
  $("#chips").innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c===cur}" data-c="${c}">${c}</button>`).join("");
  $("#pg").innerHTML=PROJECTS.filter(p=>cur==="All"||p.cat===cur).map(p=>`<article class="card proj"><div class="im"><img loading="lazy" alt="${p.title} preview" src="${p.img||ph(p.type,p.hue)}"></div><div class="tx"><span class="tag">${p.cat}</span><h3>${p.title}</h3><p>${p.desc}</p><a class="btn out" href="${p.link||fiv}" target="_blank" rel="noopener">View Project</a></div></article>`).join("");
}
$("#chips").addEventListener("click",e=>{const b=e.target.closest(".chip");if(b){cur=b.dataset.c;draw()}});
draw();

/* nav */
const hd=$("#top"),nav=$("#nav"),bg=$("#bg");
const sc=()=>hd.classList.toggle("solid",scrollY>30);sc();addEventListener("scroll",sc,{passive:true});
bg.onclick=()=>{const o=nav.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
nav.addEventListener("click",e=>{if(e.target.tagName==="A")nav.classList.remove("open")});

/* reveal + skill bars */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("on");e.target.querySelectorAll("[data-w]").forEach(i=>i.style.width=i.dataset.w+"%");io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll(".rv,.skills").forEach(el=>io.observe(el));

/* contact form: opens the visitor's email app addressed to CONFIG.email */
$("#cf").addEventListener("submit",e=>{
  e.preventDefault();const f=e.target,m=$("#msg"),v=n=>f[n].value.trim();
  if(!v("name")||!v("subject")||!v("message")||!/^\S+@\S+\.\S+$/.test(v("email"))){m.style.color="#e5484d";m.textContent="Please fill in every field with a valid email address.";return}
  const body=`Name: ${v("name")}\nEmail: ${v("email")}\n\n${v("message")}`;
  location.href=`mailto:${CONFIG.email}?subject=${encodeURIComponent(v("subject"))}&body=${encodeURIComponent(body)}`;
  m.style.color="#1d9b5a";m.textContent="Your email app should open with the message ready to send.";
});
