import { useState } from 'react'
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, Tooltip, Legend,
} from 'chart.js'
import { PorDentroPorFora, Reducao, Split } from './components/Calculadoras.jsx'
import { Tributos, Desoneracoes, Regimes, Transicao, SimplesComparativo, Quiz } from './components/Conteudo.jsx'

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend)
ChartJS.defaults.font.family = "'IBM Plex Sans', system-ui, sans-serif"

const abas = [
  { id: 'calc', nome: 'Calculadoras', tela: () => (<><PorDentroPorFora /><Reducao /><Split /></>) },
  { id: 'tributos', nome: 'O que muda', tela: () => (<><Tributos /><Desoneracoes /></>) },
  { id: 'regimes', nome: 'Regimes específicos', tela: () => <Regimes /> },
  { id: 'transicao', nome: 'Transição', tela: () => <Transicao /> },
  { id: 'simples', nome: 'Simples Nacional', tela: () => <SimplesComparativo /> },
  { id: 'quiz', nome: 'Quiz', tela: () => <Quiz /> },
]

export default function App() {
  const [aba, setAba] = useState('calc')
  const Tela = abas.find((a) => a.id === aba).tela
  return (
    <div className="app">
      <header>
        <h1>Reforma Tributária<br />sobre o Consumo</h1>
        <p>Entenda o IBS, a CBS e o Imposto Seletivo na prática, com contas que você mesmo faz.</p>
      </header>
      <nav aria-label="Seções">
        {abas.map((a) => (
          <button key={a.id} className={aba === a.id ? 'tab ativo' : 'tab'} onClick={() => setAba(a.id)}>{a.nome}</button>
        ))}
      </nav>
      <main><Tela /></main>
      <footer>Material de estudo baseado nas palestras da Thomson Reuters (ago/2026). Não substitui a legislação nem orientação profissional.</footer>
    </div>
  )
}
