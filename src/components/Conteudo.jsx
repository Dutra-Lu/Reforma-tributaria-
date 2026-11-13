import { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { tributos, desoneracoes, regimes, transicao, simples, quiz, brl } from '../data/reforma.js'

export function Tributos() {
  const [aberto, setAberto] = useState(0)
  return (
    <section className="painel">
      <h2>De cinco tributos para dois (mais o IS)</h2>
      <p className="sub">Toque em um tributo atual para ver o que o substitui.</p>
      <div className="cards">
        {tributos.map((t, i) => (
          <button key={t.antigo} className={aberto === i ? 'card ativo' : 'card'} onClick={() => setAberto(i)}>
            <small>{t.antigo}</small>
            <strong>{t.novo}</strong>
            <span>{t.quem}</span>
          </button>
        ))}
      </div>
      <p className="detalhe">{tributos[aberto].detalhe}</p>
      <p className="memoria">IBS e CBS seguem a mesma base, o mesmo fato gerador e a mesma lógica de crédito. Mudam a competência e a arrecadação.</p>
    </section>
  )
}

export function Desoneracoes() {
  const [aberto, setAberto] = useState(0)
  return (
    <section className="painel">
      <h2>Imunidade, isenção e não incidência</h2>
      <p className="sub">Todas afastam a cobrança, mas por fundamentos jurídicos diferentes.</p>
      <div className="chips">
        {desoneracoes.map((d, i) => (
          <button key={d.nome} className={aberto === i ? 'chip ativo' : 'chip'} onClick={() => setAberto(i)}>{d.nome}</button>
        ))}
      </div>
      <p className="detalhe">{desoneracoes[aberto].texto}</p>
      <p className="memoria">Exemplos: {desoneracoes[aberto].ex}</p>
    </section>
  )
}

export function Regimes() {
  const [aberto, setAberto] = useState(null)
  return (
    <section className="painel">
      <h2>Regimes específicos</h2>
      <p className="sub">Setores com regras próprias de apuração (LC 214/2025).</p>
      <ul className="acordeao">
        {regimes.map(([art, setor, texto], i) => (
          <li key={art}>
            <button onClick={() => setAberto(aberto === i ? null : i)} aria-expanded={aberto === i}>
              <span>{setor}</span><small>{art}</small>
            </button>
            {aberto === i && <p>{texto}</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Transicao() {
  const [i, setI] = useState(0)
  const data = {
    labels: transicao.map((t) => t.ano),
    datasets: [
      { label: 'IBS (% da alíquota final)', data: transicao.map((t) => t.ibs), borderColor: '#0f4c5c', backgroundColor: '#0f4c5c', tension: 0.2 },
      { label: 'ICMS + ISS restante (%)', data: transicao.map((t) => t.icms), borderColor: '#e8a33d', backgroundColor: '#e8a33d', tension: 0.2 },
    ],
  }
  const options = {
    responsive: true, maintainAspectRatio: false,
    onClick: (_, els) => els.length && setI(els[0].index),
    scales: { y: { min: 0, max: 100, ticks: { callback: (v) => v + '%' } } },
  }
  return (
    <section className="painel">
      <h2>Transição de 2026 a 2033</h2>
      <p className="sub">Clique em um ano no gráfico ou nos botões.</p>
      <div className="grafico"><Line data={data} options={options} /></div>
      <div className="chips">
        {transicao.map((t, k) => (
          <button key={t.ano} className={i === k ? 'chip ativo' : 'chip'} onClick={() => setI(k)}>{t.ano}</button>
        ))}
      </div>
      <p className="detalhe"><strong>{transicao[i].ano}.</strong> {transicao[i].texto}</p>
    </section>
  )
}

export function SimplesComparativo() {
  const data = {
    labels: simples.rotulos,
    datasets: [
      { label: 'Simples puro', data: simples.puro, backgroundColor: '#0f4c5c' },
      { label: 'Simples híbrido', data: simples.hibrido, backgroundColor: '#e8a33d' },
    ],
  }
  return (
    <section className="painel">
      <h2>Simples Nacional: puro × híbrido (exemplo 2027)</h2>
      <div className="grafico">
        <Bar data={data} options={{ responsive: true, maintainAspectRatio: false,
          plugins: { tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${brl(c.parsed.y)}` } } } }} />
      </div>
      <p className="detalhe">O híbrido encarece a venda e aumenta o imposto da empresa, mas o cliente PJ aproveita mais crédito e paga menos no fim.</p>
      <p className="memoria">Opção em setembro/2026 e repescagem em novembro/2026 (Resolução CGSN nº 186/2026).</p>
    </section>
  )
}

export function Quiz() {
  const [n, setN] = useState(0)
  const [resp, setResp] = useState(null)
  const [acertos, setAcertos] = useState(0)
  const fim = n >= quiz.length
  const q = quiz[n]
  const responder = (k) => {
    if (resp !== null) return
    setResp(k)
    if (k === q.c) setAcertos((a) => a + 1)
  }
  const proxima = () => { setN(n + 1); setResp(null) }
  const reiniciar = () => { setN(0); setResp(null); setAcertos(0) }
  return (
    <section className="painel">
      <h2>Teste o que aprendeu</h2>
      {fim ? (
        <>
          <p className="destaque">Você acertou <strong>{acertos} de {quiz.length}</strong>.</p>
          <button className="botao" onClick={reiniciar}>Refazer o teste</button>
        </>
      ) : (
        <>
          <p className="sub">Pergunta {n + 1} de {quiz.length}</p>
          <p className="detalhe"><strong>{q.p}</strong></p>
          <div className="opcoes">
            {q.o.map((txt, k) => (
              <button key={k} onClick={() => responder(k)}
                className={'opcao' + (resp !== null && k === q.c ? ' certa' : '') + (resp === k && k !== q.c ? ' errada' : '')}>
                {txt}
              </button>
            ))}
          </div>
          {resp !== null && <button className="botao" onClick={proxima}>Próxima</button>}
        </>
      )}
    </section>
  )
}
