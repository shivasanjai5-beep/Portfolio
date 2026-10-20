var R=matchMedia("(prefers-reduced-motion:reduce)").matches;
// theme
document.getElementById("theme").onclick=function(){var d=document.documentElement,cur=d.dataset.theme||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");d.dataset.theme=cur==="dark"?"light":"dark"};
// typing
var words=["Software Developer","Python Full Stack Developer","AI project builder"],wi=0,ci=0,del=false,tp=document.getElementById("type");
function tick(){var w=words[wi];ci+=del?-1:1;tp.textContent=w.slice(0,ci);var t=del?35:75;
if(!del&&ci===w.length){del=true;t=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;t=300}setTimeout(tick,t)}
if(!R){tp.textContent="";setTimeout(tick,400)}
// network canvas
var cv=document.getElementById("net"),cx=cv.getContext("2d"),W,H,N=[],m={x:-999,y:-999};
function size(){var r=cv.getBoundingClientRect(),d=devicePixelRatio||1;W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);
var n=Math.round(Math.min(70,W*H/14000));N=[];for(var i=0;i<n;i++)N.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4})}
function draw(){cx.clearRect(0,0,W,H);var c=getComputedStyle(document.documentElement).getPropertyValue("--node").trim();
N.forEach(function(a){if(!R){a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1}
var dx=m.x-a.x,dy=m.y-a.y,dm=Math.hypot(dx,dy);if(dm<160&&!R){a.x+=dx*.012;a.y+=dy*.012}
cx.fillStyle="rgba("+c+",.9)";cx.beginPath();cx.arc(a.x,a.y,2.2,0,6.3);cx.fill()});
for(var i=0;i<N.length;i++)for(var j=i+1;j<N.length;j++){var d=Math.hypot(N[i].x-N[j].x,N[i].y-N[j].y);
if(d<130){cx.strokeStyle="rgba("+c+","+(.35*(1-d/130))+")";cx.beginPath();cx.moveTo(N[i].x,N[i].y);cx.lineTo(N[j].x,N[j].y);cx.stroke()}}
if(!R)requestAnimationFrame(draw)}
size();draw();addEventListener("resize",function(){size();if(R)draw()});
cv.parentNode.addEventListener("pointermove",function(e){var r=cv.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});
// match meter
var HAVE=["Python","C","JavaScript","React.js","HTML/CSS","Django","MySQL","MongoDB","Machine Learning","Deep Learning","Full Stack"],MISS=["Java","AWS","Docker","Node.js"],sel={};
var PRE={sd:["Python","C","JavaScript","React.js","MySQL","MongoDB"],fs:["Python","Django","JavaScript","React.js","HTML/CSS","MySQL","MongoDB"],clear:[]};
var sk=document.getElementById("sk");
HAVE.concat(MISS).forEach(function(s){var b=document.createElement("button");b.type="button";b.textContent=s;b.setAttribute("aria-pressed","false");
b.onclick=function(){sel[s]=!sel[s];upd()};sk.appendChild(b)});
document.querySelectorAll(".presets button").forEach(function(b){b.onclick=function(){sel={};PRE[b.dataset.p].forEach(function(s){sel[s]=1});upd()}});
function upd(){var ch=[],ms=[];[].forEach.call(sk.children,function(b){var on=!!sel[b.textContent];b.setAttribute("aria-pressed",on);if(on){(HAVE.indexOf(b.textContent)>-1?ch:ms).push(b.textContent)}});
var tot=ch.length+ms.length,p=tot?Math.round(ch.length/tot*100):0;
document.getElementById("ring").style.setProperty("--p",p);document.getElementById("pct").textContent=p+"%";
document.getElementById("verdict").textContent=!tot?"Pick skills to begin":p===100?"Full match. Let's talk!":p>=70?"Strong match":"Partial match";
document.getElementById("gap").textContent=!tot?"Skills not on my resume yet are flagged here.":ms.length?"Not on my resume yet: "+ms.join(", ")+". I learn fast and can ramp up.":"Every skill you picked is on my resume."}
// offer
var co=document.getElementById("co"),ro=document.getElementById("ro"),inv=document.getElementById("invite");
function link(){var c=co.value||"[company]",r=ro.value||"[role]";inv.href="mailto:shivasanjai5@gmail.com?subject="+encodeURIComponent("Interview invite: "+r+" at "+c)+"&body="+encodeURIComponent("Hi Shiva,\n\nWe reviewed your portfolio and would like to invite you to interview for the "+r+" role at "+c+".\n\nPreferred time: \n")}
co.oninput=ro.oninput=link;link();
document.getElementById("copy").onclick=function(){var b=this;try{navigator.clipboard.writeText("shivasanjai5@gmail.com").then(function(){b.textContent="Email copied"})}catch(e){b.textContent="shivasanjai5@gmail.com"}};
