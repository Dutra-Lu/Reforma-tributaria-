import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { brl, reducoes } from '../data/reforma.js'

const num = (v) => (Number.isFinite(parseFloat(v)) ? parseFloat(v) : 0)

function Campo({ rotulo, valor, onChange, sufixo }) {
  return (
    <label className="campo">
      <span>{rotulo}</span>
      <div className="campo-input">
        <input type="number" inputMode="decimal" value={valor} onChange={(e) => onChange(e.target.value)} />
        {sufixo && <em>{sufixo}</em>}
      </div>
    </label>
  )
}

export function PorDentroPorFora() {
  const [base, setBase] = useState('10000')
  const [aliq, setAliq] = useState('28')
  const b = num(base), a = Math.min(num(aliq), 99) / 100
  const dentro = b / (1 - a)
  const fora = b * (1 + a)

  const data = {
    labels: ['Por dentro (sistema atual)', 'Por fora (reforma)'],
    datasets: [
      { label: 'Valor líquido', data: [b, b], backgroundColor: '#0f4c5c' },
      { label: 'Tributo', data: [dentro - b, fora - b], backgroundColor: '#e8a33d' },
    ],
  }
  return (
    <section className="painel">
      <h2>Por dentro × por fora</h2>
      <p className="sub">Informe o custo + margem e a alíquota do IVA. Veja quanto muda no preço final.</p>
      <div className="grade-2">
        <div>
          <Campo rotulo="Custo + margem" valor={base} onChange={setBase} sufixo="R$" />
          <Campo rotulo="Alíquota do IVA" valor={aliq} onChange={setAliq} sufixo="%" />
          <table className="tabela">
            <thead><tr><th></th><th>Por dentro</th><th>Por fora</th></tr></thead>
            <tbody>
              <tr><td>Preço de venda</td><td>{brl(dentro)}</td><td>{brl(fora)}</td></tr>
              <tr><td>Valor do IVA</td><td>{brl(dentro - b)}</td><td>{brl(fora - b)}</td></tr>
            </tbody>
          </table>
          <p className="destaque">Diferença entre os métodos: <strong>{brl(dentro - fora)}</strong></p>
          <p className="memoria">Por dentro: {brl(b)} ÷ (1 − {aliq}%). Por fora: {brl(b)} × (1 + {aliq}%).</p>
        </div>
        <div className="grafico">
          <Bar data={data} options={{ responsive: true, maintainAspectRatio: false,
            scales: { x: { stacked: true }, y: { stacked: true } } }} />
        </div>
      </div>
    </section>
  )
}

export function Reducao() {
  const [aliq, setAliq] = useState('28')
  const [red, setRed] = useState(30)
  const a = num(aliq)
  const efetiva = a * (1 - red / 100)
  return (
    <section className="painel">
      <h2>Redução de alíquota</h2>
      <p className="sub">A redução incide sobre a alíquota padrão. "30%" significa pagar 70% da alíquota de referência.</p>
      <Campo rotulo="Alíquota de referência" valor={aliq} onChange={setAliq} sufixo="%" />
      <div className="chips">
        {reducoes.map((r) => (
          <button key={r.id} className={red === r.id ? 'chip ativo' : 'chip'} onClick={() => setRed(r.id)}>
            {r.id}% · {r.art}
          </button>
        ))}
      </div>
      {reducoes.filter((r) => r.id === red).map((r) => (
        <p key={r.id}><strong>{r.titulo}.</strong> {r.exemplos}</p>
      ))}
      <p className="destaque">Alíquota efetiva: <strong>{efetiva.toFixed(2).replace('.', ',')}%</strong></p>
    </section>
  )
}

export function Split() {
  const [compra, setCompra] = useState('1000')
  const [venda, setVenda] = useState('1500')
  const [iva, setIva] = useState('30')
  const [pres, setPres] = useState('5')
  const i = num(iva) / 100
  const credito = num(compra) * i
  const debito = num(venda) * i
  const notaVenda = num(venda) + debito
  const inteligente = Math.max(debito - credito, 0)
  const simplificado = notaVenda * (num(pres) / 100)
  return (
    <section className="painel">
      <h2>Split payment</h2>
      <p className="sub">Na liquidação (ex.: Pix), o tributo é separado e vai direto ao fisco.</p>
      <div className="grade-2">
        <div>
          <Campo rotulo="Compra (sem IVA)" valor={compra} onChange={setCompra} sufixo="R$" />
          <Campo rotulo="Venda (sem IVA)" valor={venda} onChange={setVenda} sufixo="R$" />
          <Campo rotulo="IVA" valor={iva} onChange={setIva} sufixo="%" />
          <Campo rotulo="Presunção (split simplificado)" valor={pres} onChange={setPres} sufixo="%" />
        </div>
        <table className="tabela">
          <thead><tr><th>Modelo</th><th>Segregado</th><th>Líquido p/ empresa</th></tr></thead>
          <tbody>
            <tr><td>Inteligente<br /><small>débito − crédito</small></td><td>{brl(inteligente)}</td><td>{brl(notaVenda - inteligente)}</td></tr>
            <tr><td>Inteligente, crédito não reconhecido<br /><small>segrega o débito todo</small></td><td>{brl(debito)}</td><td>{brl(notaVenda - debito)}</td></tr>
            <tr><td>Simplificado<br /><small>{pres}% × nota de {brl(notaVenda)}</small></td><td>{brl(simplificado)}</td><td>{brl(notaVenda - simplificado)}</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
