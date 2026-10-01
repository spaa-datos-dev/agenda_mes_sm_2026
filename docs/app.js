const $ = (id) => document.getElementById(id);
const controls = ["query","day","locality","category","modality"];
const formatter = new Intl.DateTimeFormat("es-AR",{timeZone:"UTC",weekday:"long",day:"numeric",month:"long"});
const dayName = new Intl.DateTimeFormat("es-AR",{timeZone:"UTC",weekday:"short"});
const monthName = new Intl.DateTimeFormat("es-AR",{timeZone:"UTC",month:"short"});
const plain = value => (value||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
const make = (tag,className,text) => {const el=document.createElement(tag);if(className)el.className=className;if(text!=null)el.textContent=text;return el};
let events=[];
let currentPage=1;
const pageSize=8;
function dateOf(value){return new Date(value+"T12:00:00Z")}
function fill(id,values){const select=$(id);values.filter(Boolean).sort((a,b)=>a.localeCompare(b,"es")).forEach(value=>{const option=new Option(value,value);select.add(option)})}
function card(event){
  const article=make("article","event");
  const top=make("div","event-top"),date=make("div","date"),when=dateOf(event.date);
  date.append(make("strong","",String(when.getUTCDate())));
  date.append(make("span","",dayName.format(when)+"\n"+monthName.format(when)));
  const time=make("span","time",event.time?event.time+" h":"Horario a confirmar");
  top.append(date,time);article.append(top,make("h3","",event.title));
  const place=[event.venue,event.locality].filter(Boolean).join(" · ");
  article.append(make("p","place",place||"Lugar a confirmar"));
  const tags=make("div","tags");
  tags.append(make("span","tag",event.category),make("span","tag secondary",event.modality));
  article.append(tags);
  const details=make("details"),summary=make("summary","","Más información");
  details.append(summary,make("p","description",event.description));
  if(event.organizer)details.append(make("p","organizer","Organiza: "+event.organizer));
  article.append(details);return article
}
function render(resetPage=false){
  if(resetPage)currentPage=1;
  const filters=Object.fromEntries(controls.map(id=>[id,$(id).value]));
  const found=events.filter(e=>
    (!filters.day||e.date===filters.day)&&(!filters.locality||e.locality===filters.locality)&&
    (!filters.category||e.category===filters.category)&&(!filters.modality||e.modality===filters.modality)&&
    (!filters.query||plain([e.title,e.description,e.venue,e.locality,e.organizer].join(" ")).includes(plain(filters.query)))
  );
  const pages=Math.max(1,Math.ceil(found.length/pageSize));
  currentPage=Math.min(currentPage,pages);
  $("count").textContent=found.length+" "+(found.length===1?"actividad encontrada":"actividades encontradas");
  $("reset").hidden=!Object.values(filters).some(Boolean);
  $("empty").hidden=found.length!==0;
  $("results").replaceChildren(...found.slice((currentPage-1)*pageSize,currentPage*pageSize).map(card));
  $("pagination").hidden=pages<=1;
  $("page-status").textContent="Página "+currentPage+" de "+pages;
  $("previous").disabled=currentPage===1;
  $("next").disabled=currentPage===pages;
}
async function start(){
  try{
    const response=await fetch("./eventos.json",{cache:"no-cache"});
    if(!response.ok)throw new Error("No se pudieron cargar las actividades");
    const data=await response.json();
    if(data.schemaVersion!==1||!Array.isArray(data.events))throw new Error("Formato de actividades no reconocido");
    events=data.events.slice().sort((a,b)=>a.date.localeCompare(b.date)||(a.time||"99:99").localeCompare(b.time||"99:99"));
    [...new Set(events.map(e=>e.date))].forEach(date=>{const option=new Option(formatter.format(dateOf(date)),date);$("day").add(option)});
    fill("locality",[...new Set(events.map(e=>e.locality))]);
    fill("category",[...new Set(events.map(e=>e.category))]);
    fill("modality",[...new Set(events.map(e=>e.modality))]);
    controls.forEach(id=>$(id).addEventListener(id==="query"?"input":"change",()=>render(true)));
    $("reset").addEventListener("click",()=>{controls.forEach(id=>$(id).value="");render(true);$("query").focus()});
    $("previous").addEventListener("click",()=>{currentPage--;render();$("count").scrollIntoView({block:"start",behavior:"smooth"})});
    $("next").addEventListener("click",()=>{currentPage++;render();$("count").scrollIntoView({block:"start",behavior:"smooth"})});
    render();
  }catch(error){$("count").textContent="No pudimos cargar la agenda. Intentá nuevamente más tarde."}
}
start();
