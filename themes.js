// Shared color themes for AV Design Sketch (home + app)
const THEMES = {
  midnight:{name:"Midnight",dark:1,bg:"#0f1419",panel:"#1a2129",card2:"#151b22",field:"#0c1116",btn:"#24303b",accbg:"#13202b",line:"#2c3742",text:"#e6edf3",mute:"#8b98a5",acc:"#4fb3ff",acc2:"#ffb454",ok:"#7bd88f",bad:"#ff6b6b",onacc:"#04121f",glass:"rgba(15,20,25,.9)"},
  blueprint:{name:"Blueprint",dark:1,bg:"#0b2545",panel:"#13315c",card2:"#102a4f",field:"#0a1f3a",btn:"#1b3d6e",accbg:"#0e2a52",line:"#2b5288",text:"#eaf2ff",mute:"#9db4d6",acc:"#7fd1ff",acc2:"#ffd166",ok:"#8ef0c0",bad:"#ff8a8a",onacc:"#06182e",glass:"rgba(11,37,69,.9)"},
  daylight:{name:"Daylight",dark:0,bg:"#f3f5f8",panel:"#ffffff",card2:"#f7f9fb",field:"#ffffff",btn:"#eef2f6",accbg:"#e8f2ff",line:"#d3dae2",text:"#111820",mute:"#5b6875",acc:"#0a6cff",acc2:"#c96a00",ok:"#15803d",bad:"#dc2626",onacc:"#ffffff",glass:"rgba(243,245,248,.9)"},
  studio:{name:"Studio",dark:1,bg:"#161311",panel:"#221d1a",card2:"#1d1916",field:"#120f0d",btn:"#2e2723",accbg:"#2a1f17",line:"#3a312b",text:"#f2ebe4",mute:"#a39689",acc:"#ff8a3d",acc2:"#ffd27a",ok:"#9bd77a",bad:"#ff6b6b",onacc:"#1a0d03",glass:"rgba(22,19,17,.9)"},
  terminal:{name:"Terminal",dark:1,bg:"#050805",panel:"#0c120c",card2:"#0a0f0a",field:"#030503",btn:"#132013",accbg:"#0d1f0d",line:"#1f3a1f",text:"#c8f7c5",mute:"#6fa86b",acc:"#39ff7a",acc2:"#ffe066",ok:"#39ff7a",bad:"#ff5f5f",onacc:"#021006",glass:"rgba(5,8,5,.9)"},
  contrast:{name:"High Contrast",dark:1,bg:"#000000",panel:"#0a0a0a",card2:"#000000",field:"#000000",btn:"#1a1a1a",accbg:"#001a33",line:"#ffffff",text:"#ffffff",mute:"#e0e0e0",acc:"#00d1ff",acc2:"#ffd400",ok:"#00ff88",bad:"#ff4d4d",onacc:"#000000",glass:"rgba(0,0,0,.92)"}
};
let THEME_KEY = (()=>{ try{ return localStorage.getItem("avsketch-theme")||"midnight"; }catch(e){ return "midnight"; } })();
if(!THEMES[THEME_KEY]) THEME_KEY="midnight";
function T(){ return THEMES[THEME_KEY]; }
function applyTheme(k){
  if(!THEMES[k]) return; THEME_KEY=k; const t=THEMES[k], r=document.documentElement.style;
  ["bg","panel","card2","field","btn","accbg","line","text","mute","acc","acc2","ok","bad","onacc","glass"].forEach(v=>r.setProperty("--"+v,t[v]));
  r.setProperty("--ring", t.acc+"33"); r.colorScheme = t.dark?"dark":"light";
  document.querySelectorAll('meta[name="theme-color"]').forEach(m=>m.content=t.bg);
  try{ localStorage.setItem("avsketch-theme",k); }catch(e){}
  if(typeof window.onThemeChange==="function") window.onThemeChange();
  const p=document.getElementById("themepop"); if(p) p.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.t===k));
}
function toggleThemes(ev){
  ev && ev.stopPropagation();
  let p=document.getElementById("themepop");
  if(p){ p.remove(); return; }
  p=document.createElement("div"); p.id="themepop";
  p.innerHTML=`<div class="tp-h">Theme</div>`+Object.entries(THEMES).map(([k,t])=>
    `<button data-t="${k}" class="${k===THEME_KEY?"on":""}" onclick="applyTheme('${k}')">
      <span class="sw" style="background:${t.bg};border-color:${t.line}"><i style="background:${t.acc}"></i><i style="background:${t.acc2}"></i><i style="background:${t.panel}"></i></span>${t.name}</button>`).join("");
  document.body.appendChild(p);
  setTimeout(()=>document.addEventListener("click",function close(e){ if(!p.contains(e.target)){ p.remove(); document.removeEventListener("click",close);} }),0);
}
// Picker styles
(function(){
  const css=`#themepop{position:fixed;z-index:50;top:calc(64px + env(safe-area-inset-top));right:max(12px,env(safe-area-inset-right));background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:.5rem;box-shadow:0 12px 40px rgba(0,0,0,.35);width:220px;animation:tpin .16s ease}
  @keyframes tpin{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}
  #themepop .tp-h{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--mute);padding:.3rem .5rem .4rem}
  #themepop button{display:flex;align-items:center;gap:.7rem;width:100%;background:transparent;border:1px solid transparent;color:var(--text);padding:.45rem .5rem;border-radius:10px;font:inherit;font-size:.92rem;min-height:44px;cursor:pointer;text-align:left}
  #themepop button:hover{background:var(--btn)}
  #themepop button.on{border-color:var(--acc)}
  #themepop .sw{display:flex;gap:3px;padding:4px;border-radius:8px;border:1px solid}
  #themepop .sw i{width:10px;height:18px;border-radius:3px;display:block}
  .themebtn{font-size:1rem}
  @media print{#themepop{display:none}}`;
  const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);
})();
applyTheme(THEME_KEY);
