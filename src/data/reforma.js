// Todo o conteúdo e as regras ficam aqui. Quando a legislação mudar, edite só este arquivo.

export const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export const tributos = [
  { antigo: 'ICMS + ISS', novo: 'IBS', quem: 'Estados e municípios (Comitê Gestor)',
    detalhe: 'O IBS substitui o ICMS (estadual) e o ISS (municipal). É gerido pelo Comitê Gestor do IBS.' },
  { antigo: 'PIS + COFINS', novo: 'CBS', quem: 'União (Receita Federal)',
    detalhe: 'A CBS substitui o PIS e a COFINS. Segue a mesma base, o mesmo fato gerador e a mesma lógica de crédito do IBS.' },
  { antigo: '(não existia)', novo: 'IS', quem: 'União',
    detalhe: 'O Imposto Seletivo é um tributo à parte e não integra o IVA Dual. Integra a base de cálculo de IBS/CBS.' },
  { antigo: 'IPI', novo: 'IPI', quem: 'União',
    detalhe: 'Alíquotas zeradas, exceto para produtos da Zona Franca de Manaus.' },
]

export const reducoes = [
  { id: 30, art: 'Art. 127', titulo: 'Profissões intelectuais', exemplos: 'Advogados, contadores, engenheiros, médicos e outros conselhos.' },
  { id: 60, art: 'Art. 128', titulo: 'Saúde, educação e outros', exemplos: 'Saúde, educação, dispositivos médicos, medicamentos, produções artísticas e insumos agropecuários.' },
  { id: 100, art: 'Art. 143', titulo: 'Alíquota zero', exemplos: 'Hipóteses específicas, como a cesta básica nacional.' },
]

export const desoneracoes = [
  { nome: 'Imunidade', texto: 'Vedação constitucional ao poder de tributar.', ex: 'Templos, partidos, livros, jornais, entidades sem fins lucrativos, exportações.' },
  { nome: 'Isenção', texto: 'Dispensa legal: o tributo poderia incidir, mas a lei afasta a cobrança.', ex: 'Zona Franca de Manaus e Áreas de Livre Comércio.' },
  { nome: 'Não incidência', texto: 'A situação está fora do campo de incidência; o fato nem é gerador.', ex: 'Transferência entre estabelecimentos, fusão e incorporação, doação.' },
]

export const regimes = [
  ['Art. 172', 'Combustíveis', 'Monofásico: incide uma única vez, com alíquota ad rem. Sem crédito acumulado na cadeia.'],
  ['Art. 182', 'Serviços financeiros', 'Regime específico, apurado pela DeRE.'],
  ['Art. 234', 'Planos de saúde', 'Incide sobre a margem mensal, com alíquota reduzida em 60%. Quem contrata não toma crédito.'],
  ['Art. 244', 'Bets (prognósticos)', 'Regime específico, apurado pela DeRE.'],
  ['Art. 251', 'Bens imóveis', 'Regime específico.'],
  ['Art. 271', 'Cooperativas', 'Regime específico.'],
  ['Art. 273', 'Bares e restaurantes', 'Alíquota reduzida em 40%. Bebidas alcoólicas ficam fora. Veda crédito ao adquirente (art. 276).'],
  ['Art. 277', 'Hotelaria', 'Regime específico.'],
  ['Art. 284', 'Transporte coletivo', 'Regime específico.'],
  ['Art. 288', 'Agências de turismo', 'Regime específico.'],
  ['Art. 292', 'SAF (futebol)', 'Regime específico.'],
]

export const transicao = [
  { ano: '2026', ibs: 0.1, icms: 100, texto: 'Ano-teste: CBS 0,9% e IBS 0,1%, compensáveis. Sem recolhimento para quem cumpre as obrigações acessórias.' },
  { ano: '2027', ibs: 0.1, icms: 100, texto: 'CBS em alíquota cheia, PIS/COFINS extintos. Começa o Imposto Seletivo. IBS segue em 0,1%.' },
  { ano: '2028', ibs: 0.1, icms: 100, texto: 'Consolidação da CBS. IBS mantém a alíquota de teste.' },
  { ano: '2029', ibs: 10, icms: 90, texto: 'IBS entra em 10%. ICMS e ISS caem na mesma proporção.' },
  { ano: '2030', ibs: 20, icms: 80, texto: 'IBS em 20%. Benefícios de ICMS "derretem".' },
  { ano: '2031', ibs: 30, icms: 70, texto: 'IBS em 30%.' },
  { ano: '2032', ibs: 40, icms: 60, texto: 'IBS em 40%.' },
  { ano: '2033', ibs: 100, icms: 0, texto: 'Sistema pleno: ICMS e ISS extintos. IVA Dual (IBS + CBS) integral.' },
]

// Exemplo 2027 da palestra (Simples Puro × Híbrido)
export const simples = {
  rotulos: ['Preço de venda', 'Tributo pago pela empresa', 'Custo para o comprador PJ'],
  puro: [17363.97, 1857.94, 16461.04],
  hibrido: [17730.22, 2224.19, 15680.67],
}

export const quiz = [
  { p: 'Uma empresa compra de um fornecedor que NÃO recolheu o tributo. Ela tem crédito?',
    o: ['Sim, o crédito nasce da compra', 'Não: sem recolhimento na etapa anterior, não há crédito'], c: 1 },
  { p: 'O IBS e a CBS são devidos no local de…',
    o: ['Produção (origem)', 'Consumo (destino)'], c: 1 },
  { p: 'O Imposto Seletivo faz parte do IVA Dual?',
    o: ['Sim', 'Não, é um tributo à parte'], c: 1 },
  { p: 'Uma redução de 30% significa pagar…',
    o: ['30% da alíquota de referência', '70% da alíquota de referência'], c: 1 },
]
