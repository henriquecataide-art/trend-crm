"use client";

import { useState } from "react";

const metrics = [["Clientes cadastrados", "8.429", "+12,4%", "↗"], ["Clientes recorrentes", "2.876", "34,1% da base", "↻"], ["Super clientes", "412", "4+ eventos", "✦"], ["Vendas registradas", "14.892", "+8,7%", "⌁"]];
const clients = [["1", "ML", "Marina Lima", "@marinalima", "8", "14", "R$ 4.280", "28 ago"], ["2", "JP", "João Pedro", "@joaopedro", "7", "11", "R$ 3.640", "26 ago"], ["3", "BC", "Bruna Costa", "@brunacosta", "7", "9", "R$ 3.120", "21 ago"], ["4", "LG", "Lucas Gomes", "@lucasgomes", "6", "12", "R$ 2.890", "18 ago"]];

function AltView({name}:{name:string}) {
  const copy:Record<string,[string,string]> = {
    Clientes:["8.429 pessoas na base","Combine eventos, faixa etária, recência e gasto para encontrar qualquer público."],
    Eventos:["7 universos, uma audiência","Compare público, faturamento e comportamento de compra por evento."],
    Mailings:["Importe. Cruze. Aprenda.","Envie CSV ou XLSX, confira as colunas e revise duplicidades antes de atualizar a base."],
    "Atualizar vendas":["O próximo sold out começa aqui","Compare o evento atual com o histórico e encontre quem ainda não comprou."],
    Inteligência:["Sinais escondidos nos dados","Insights calculados com base no comportamento real do público TREND."],
    Aniversariantes:["Celebre quem celebra com a gente","VIPs e clientes recorrentes com aniversário nos próximos 30 dias."],
  };
  const [title,desc]=copy[name];
  return <section className="altView"><div className="altHero"><span className="eyebrow">{name.toUpperCase()}</span><h2>{title}</h2><p>{desc}</p><button className="primary">{name==="Mailings"?"⇧ Escolher arquivo":name==="Atualizar vendas"?"＋ Atualizar evento":"＋ Criar segmento"}</button></div><div className="altGrid"><article><span className="eyebrow">VISÃO RÁPIDA</span><strong>{name==="Eventos"?"OBOÉ × GINGA":name==="Aniversariantes"?"62 VIPs":"34,1% recorrentes"}</strong><p>{name==="Eventos"?"45% de sobreposição de público":"Uma oportunidade pronta para ativar."}</p></article><article className="dark"><span className="eyebrow">DESTAQUE</span><strong>{name==="Atualizar vendas"?"182 quentes":"Quinta · 19h—22h"}</strong><p>Maior propensão histórica de compra.</p></article><article><span className="eyebrow">SEGMENTOS</span><div className="chips"><i>Trend Lovers</i><i>High Spenders</i><i>Early Buyers</i></div><p>Filtros combináveis e prontos para exportar.</p></article></div><div className="emptyList"><div><b>Busca inteligente</b><span>Ex.: clientes que foram em 3 eventos e ainda não compraram OBOÉ</span></div><button>⌕ Explorar base</button></div></section>
}

export default function Home() {
  const [active, setActive] = useState("Dashboard");
  const nav = ["Dashboard", "Clientes", "Eventos", "Mailings", "Atualizar vendas", "Inteligência", "Aniversariantes"];
  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brandMark">T</span><div><strong>TREND</strong><small>Audience Intelligence</small></div></div>
      <nav>{nav.map((item, i) => <button key={item} onClick={() => setActive(item)} className={active === item ? "active" : ""}><span>{["⌂","♙","◈","⇧","↻","✦","☆"][i]}</span>{item}</button>)}</nav>
      <div className="sideFoot"><div className="pulse"/><div><strong>Base sincronizada</strong><small>Hoje, 09:42</small></div></div>
    </aside>
    <section className="content">
      <header><div><span className="eyebrow">VISÃO GERAL</span><h1>{active === "Dashboard" ? <>Bom dia, <em>Trend.</em></> : active}</h1><p>Inteligência que transforma público em pista cheia.</p></div><div className="headerActions"><label className="search">⌕ <input placeholder="Buscar cliente, telefone, Instagram..."/></label><button className="iconBtn">♢<i>3</i></button><div className="avatar">TR</div></div></header>
      <div className="toolbar"><button className="eventSelect">Todos os eventos <span>⌄</span></button><button className="primary">＋ Importar mailing</button></div>
      {active !== "Dashboard" ? <AltView name={active}/> : <><section className="metrics">{metrics.map((m, i) => <article key={m[0]}><div className={`metricIcon m${i}`}>{m[3]}</div><span>{m[0]}</span><strong>{m[1]}</strong><small>{m[2]}</small></article>)}</section>
      <section className="grid"><article className="chartCard"><div className="cardHead"><div><span className="eyebrow">VENDAS</span><h2>Ritmo de vendas</h2></div><div className="toggle"><button className="selected">7 dias</button><button>30 dias</button></div></div><div className="chartValue"><strong>R$ 186.420</strong><span>↗ 18,2%</span></div><div className="chart"><svg viewBox="0 0 700 180" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d7ff48" stopOpacity=".28"/><stop offset="1" stopColor="#d7ff48" stopOpacity="0"/></linearGradient></defs><path className="area" d="M0 147 C60 143,75 100,130 112 S210 142,260 94 S340 120,390 70 S470 99,520 54 S610 72,700 20 L700 180 L0 180Z"/><path className="line" d="M0 147 C60 143,75 100,130 112 S210 142,260 94 S340 120,390 70 S470 99,520 54 S610 72,700 20"/></svg><div className="days"><span>SEG</span><span>TER</span><span>QUA</span><span>QUI</span><span>SEX</span><span>SÁB</span><span>DOM</span></div></div></article>
      <article className="opportunity"><span className="eyebrow">OPORTUNIDADE AGORA</span><div className="hot">🔥</div><h2>182 clientes quentes</h2><p>Recorrentes que ainda não compraram <strong>OBOÉ 3 ANOS</strong>.</p><div className="miniStats"><div><b>4,8</b><small>eventos em média</small></div><div><b>R$ 842</b><small>ticket histórico</small></div></div><button>Ver oportunidades <span>→</span></button></article></section>
      <section className="ranking"><div className="cardHead"><div><span className="eyebrow">TOP CLIENTES</span><h2>Quem faz a Trend acontecer</h2></div><button>Ver ranking completo →</button></div><div className="table"><div className="tr th"><span># CLIENTE</span><span>EVENTOS</span><span>INGRESSOS</span><span>VALOR GASTO</span><span>ÚLTIMA COMPRA</span></div>{clients.map(c => <div className="tr" key={c[0]}><span className="person"><b>{c[0]}</b><i>{c[1]}</i><label><strong>{c[2]}</strong><small>{c[3]}</small></label></span><span><b>{c[4]}</b><small> eventos</small></span><span>{c[5]}</span><span><strong>{c[6]}</strong></span><span>{c[7]} <button className="more">•••</button></span></div>)}</div></section></>}
    </section>
  </main>;
}
