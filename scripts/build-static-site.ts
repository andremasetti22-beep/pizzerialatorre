/**
 * Genera static-site/index.html: versione statica (HTML+CSS puro) del sito,
 * pronta da caricare su GitHub Pages.
 * Uso: bun run scripts/build-static-site.ts
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  birreBottiglia,
  birreSpina,
  paesane,
  pizze,
  speciali,
  type Dish,
} from "../src/data/menu";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function section(
  id: string,
  title: string,
  items: Dish[],
  subtitle?: string,
  showPrice = true,
) {
  return `
    <section id="${id}" class="menu-section">
      <h2>${esc(title)}</h2>
      ${subtitle ? `<p class="subtitle">${esc(subtitle)}</p>` : ""}
      ${showPrice ? `<p class="price-header">Prezzo</p>` : ""}
      <ul>
        ${items
          .map(
            (i) => `<li>
          <div class="row">
            <h3>${esc(i.name)}</h3>
            <span class="leader" aria-hidden="true"></span>
            ${i.price ? `<span class="price">€ ${esc(i.price)}</span>` : ""}
          </div>
          ${i.desc ? `<p class="desc">${esc(i.desc)}</p>` : ""}
        </li>`,
          )
          .join("\n")}
      </ul>
    </section>`;
}

const html = `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Pizzeria La Torre — Menù, Sant'Annapelago</title>
<meta name="description" content="Il menù completo della Pizzeria La Torre: pizze classiche, paesane, speciali alle cascate e birre artigianali in bottiglia e alla spina." />
<meta property="og:title" content="Pizzeria La Torre — Menù" />
<meta property="og:description" content="Pizze classiche, paesane, speciali e birre artigianali a Sant'Annapelago." />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
<link rel="icon" href="./favicon.png" type="image/png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" />
<style>
  :root{
    --bg:#f0eeea; --fg:#141414; --muted:rgba(30,30,30,.85);
    --veil:.66;
  }
  *{box-sizing:border-box}
  html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
  body{margin:0;overflow-x:hidden;background:var(--bg);color:var(--fg);
    font-family:"EB Garamond",Georgia,serif;font-size:17px;line-height:1.45}
  h1,h2,h3,.display{font-family:"Cinzel",Georgia,serif;font-weight:600;margin:0}
  img{display:block;max-width:100%}
  .bg-wrap{position:fixed;inset:0;z-index:-10}
  .bg-wrap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
    opacity:0;transition:opacity .7s ease-out;transform:translateZ(0);backface-visibility:hidden}
  .bg-wrap img.active{opacity:1}
  .veil{position:absolute;inset:0;background:rgba(240,238,234,var(--veil))}
  @media (max-width:1024px){:root{--veil:.74}}
  header{position:fixed;top:0;left:0;right:0;z-index:30;background:#141414;
    border-bottom:1px solid rgba(255,255,255,.15)}
  .bar{max-width:72rem;margin:0 auto;display:flex;align-items:center;gap:1rem;
    padding:.65rem 1rem}
  .brand{font-family:"Cinzel",serif;color:#fff;font-size:1.05rem;display:none;white-space:nowrap}
  nav{display:flex;flex:1;justify-content:space-between;gap:.25rem;overflow-x:auto;
    scrollbar-width:none}
  nav::-webkit-scrollbar{display:none}
  nav a{font-family:"Cinzel",serif;color:rgba(255,255,255,.85);text-decoration:none;
    font-size:11px;padding:.35rem .6rem;border-radius:999px;white-space:nowrap;transition:.2s}
  nav a:hover{background:#fff;color:#141414}
  .long{display:none}
  @media(min-width:640px){.brand{display:inline}nav{flex:none;justify-content:flex-end}
    nav a{font-size:12px}.long{display:inline}.short{display:none}}
  .hero{position:relative;min-height:100svh;display:flex;align-items:center;justify-content:center;overflow:hidden}
  .hero .photo{position:absolute;inset:0}
  .hero .photo img{width:100%;height:100%;object-fit:cover}
  .hero .grad{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.6),rgba(0,0,0,.3),var(--bg))}
  .hero .inner{position:relative;z-index:10;text-align:center;padding:0 1.5rem}
  .hero .inner img{width:14rem;margin:0 auto;filter:drop-shadow(0 6px 12px rgba(0,0,0,.4))}
  @media(min-width:640px){.hero .inner img{width:18rem}}
  @media(min-width:768px){.hero .inner img{width:24rem}}
  .cta{display:inline-block;margin-top:2.5rem;background:#141414;color:#f5f3ef;
    font-family:"Cinzel",serif;font-size:.85rem;padding:.75rem 2rem;border-radius:999px;
    text-decoration:none;box-shadow:0 8px 20px rgba(0,0,0,.25)}
  .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}
  main{max-width:72rem;margin:0 auto;padding:0 1.25rem}
  .menu-section{scroll-margin-top:5rem;padding:3rem 0}
  .menu-section h2{font-size:2.25rem;line-height:.95}
  @media(min-width:640px){.menu-section h2{font-size:3rem}}
  @media(min-width:768px){.menu-section h2{font-size:3.75rem}}
  .subtitle{font-family:"Cinzel",serif;text-transform:uppercase;opacity:.7;margin:.5rem 0 0;font-size:1.05rem}
  .price-header{font-family:"Cinzel",serif;text-align:right;font-size:.85rem;margin:1.5rem 0 0}
  .menu-section ul{list-style:none;margin:.5rem 0 0;padding:0}
  .menu-section li{margin-bottom:1rem}
  .row{display:flex;align-items:flex-end}
  .row h3{font-size:1.25rem}
  @media(min-width:640px){.row h3{font-size:1.5rem}}
  .leader{flex:1;margin:0 .5rem .35rem;border-bottom:1px dotted rgba(20,20,20,.45)}
  .price{font-family:"Cinzel",serif;font-size:1.1rem;white-space:nowrap}
  .desc{margin:.25rem 0 0;max-width:42rem;color:var(--muted);font-size:.95rem;line-height:1.35}
  footer{margin-top:2rem;background:#141414;color:#f5f3ef;border-top:2px solid rgba(20,20,20,.25)}
  .foot{max-width:72rem;margin:0 auto;padding:3.5rem 1.25rem;display:grid;gap:1.5rem}
  @media(min-width:640px){.foot{grid-template-columns:1fr 1fr}.foot .right{text-align:right}}
  .foot .name{font-family:"Cinzel",serif;font-size:1.9rem}
  .foot p{margin:.4rem 0;font-size:.9rem;color:rgba(245,243,239,.8)}
  .foot .tiny{font-size:.75rem;color:rgba(245,243,239,.5);margin-top:1.5rem}
</style>
</head>
<body>
<div class="bg-wrap">
  <img id="bg-bosco" class="active" src="./images/bosco.jpg" alt="" aria-hidden="true" />
  <img id="bg-cuore" src="./images/cuore-santannapelago.jpg" alt="" aria-hidden="true" loading="lazy" />
  <img id="bg-cascata" src="./images/cascata-autunno.jpg" alt="" aria-hidden="true" loading="lazy" />
  <div class="veil"></div>
</div>

<header>
  <div class="bar">
    <span class="brand">La Torre</span>
    <nav>
      <a href="#pizze"><span class="short">Pizze</span><span class="long">Le nostre pizze</span></a>
      <a href="#paesane"><span class="short">Paesane</span><span class="long">Le paesane</span></a>
      <a href="#speciali"><span class="short">Speciali</span><span class="long">Le speciali</span></a>
      <a href="#birre"><span class="short">Birre</span><span class="long">Le birre</span></a>
    </nav>
  </div>
</header>

<section id="hero" class="hero">
  <div class="photo">
    <img src="./images/santannapelago-panorama.jpg" alt="Panorama di Sant'Annapelago con il campanile della Torre e l'Appennino modenese" />
    <div class="grad"></div>
  </div>
  <div class="inner">
    <img src="./images/la-torre-logo-bianco.png" alt="Logo Pizzeria La Torre — testa di cervo stilizzata" />
    <h1 class="sr-only">Pizzeria La Torre — Sant'Annapelago</h1>
    <a class="cta" href="#pizze">Scopri il menù</a>
  </div>
</section>

<main>
${section("pizze", "Le nostre pizze", pizze)}
${section("paesane", "Le paesane", paesane, "(basate su soprannomi reali)")}
${section("speciali", "Le speciali", speciali, "(ispirate ai nomi delle cascate)")}
${section("birre", "Le nostre birre", birreBottiglia, "Birre in bottiglia", false)}
${section("spina", "Birre alla spina", birreSpina, undefined, false)}
</main>

<footer id="contatti">
  <div class="foot">
    <div>
      <p class="name">La Torre</p>
      <p>Sant'Annapelago, Pievepelago (MO)</p>
    </div>
    <div class="right">
      <p>Aperto tutte le sere · Chiuso il martedì</p>
      <p>Prenotazioni al telefono</p>
      <p class="tiny">© ${new Date().getFullYear()} Pizzeria La Torre</p>
    </div>
  </div>
</footer>

<script>
  var map = { hero:'bosco', pizze:'bosco', paesane:'cuore', speciali:'cascata', birre:'cuore', spina:'cascata' };
  var layers = { bosco: document.getElementById('bg-bosco'), cuore: document.getElementById('bg-cuore'), cascata: document.getElementById('bg-cascata') };
  function setBg(key){ for (var k in layers){ layers[k].classList.toggle('active', k === key); } }
  var els = Object.keys(map).map(function(id){ return document.getElementById(id); }).filter(Boolean);
  var io = new IntersectionObserver(function(entries){
    var visible = entries.filter(function(e){ return e.isIntersecting; })
      .sort(function(a,b){ return b.intersectionRatio - a.intersectionRatio; })[0];
    if (visible) setBg(map[visible.target.id] || 'bosco');
  }, { rootMargin: '-45% 0px -45% 0px', threshold: [0,0.25,0.5,1] });
  els.forEach(function(el){ io.observe(el); });
</script>
</body>
</html>
`;

writeFileSync(resolve(import.meta.dirname, "../static-site/index.html"), html);
console.log("static-site/index.html generato");
