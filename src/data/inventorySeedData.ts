import { InventoryItem, InventoryCategory, InventoryUnit } from '../types';

export const INVENTORY_CATEGORIES: { id: InventoryCategory; label: string; description: string; color: string }[] = [
  { id: 'suplementos', label: 'Suplementos Nutricionais', description: 'Proteínas, aminoácidos, minerais e vitaminas', color: 'from-fuchsia-600 to-purple-600' },
  { id: 'medicamentos_injetaveis', label: 'Medicamentos & Injetáveis', description: 'Ampolas, manipulados e injetáveis estéreis', color: 'from-rose-600 to-red-600' },
  { id: 'fitoterapicos', label: 'Fitoterápicos & Extratos', description: 'Extratos padronizados, tinturas e adaptógenos', color: 'from-emerald-600 to-teal-600' },
  { id: 'antropometria', label: 'Antropometria & Avaliação', description: 'Fitas métricas, adipômetros e instrumentos', color: 'from-blue-600 to-indigo-600' },
  { id: 'consumiveis_clinicos', label: 'Consumíveis & Bioimpedância', description: 'Gel condutor, eletrodos adesivos e tiras de glicemia', color: 'from-amber-600 to-orange-600' },
  { id: 'amostras_gratis', label: 'Amostras Grátis & Degustação', description: 'Sachês e amostras para entrega aos pacientes', color: 'from-cyan-600 to-blue-600' },
  { id: 'papelaria_geral', label: 'Papelaria & Consultório', description: 'Blocos de receituário, rolos de maca e descartáveis', color: 'from-purple-600 to-indigo-600' },
  { id: 'outros', label: 'Outros Insumos', description: 'Materiais diversos do consultório', color: 'from-gray-600 to-slate-600' }
];

export const INVENTORY_UNITS: { id: InventoryUnit; label: string; plural: string }[] = [
  { id: 'unidades', label: 'Unidade', plural: 'Unidades' },
  { id: 'caixas', label: 'Caixa', plural: 'Caixas' },
  { id: 'ampolas', label: 'Ampola', plural: 'Ampolas' },
  { id: 'frascos', label: 'Frasco', plural: 'Frascos' },
  { id: 'potes', label: 'Pote', plural: 'Potes' },
  { id: 'saches', label: 'Sachê', plural: 'Sachês' },
  { id: 'comprimidos', label: 'Comprimido', plural: 'Comprimidos' },
  { id: 'capsulas', label: 'Cápsula', plural: 'Cápsulas' },
  { id: 'rolos', label: 'Rolo', plural: 'Rolos' },
  { id: 'pacotes', label: 'Pacote', plural: 'Pacotes' },
  { id: 'pares', label: 'Par', plural: 'Pares' }
];

export interface PresetSupplyTemplate {
  name: string;
  category: InventoryCategory;
  subcategory: string;
  unit: InventoryUnit;
  unitLabel: string;
  defaultLocation?: string;
  notes?: string;
}

export const PRESET_SUPPLY_TEMPLATES: PresetSupplyTemplate[] = [
  // Suplementos
  { name: 'Creatina Monohidratada 100% Pura (Creapure) 300g', category: 'suplementos', subcategory: 'Aminoácidos & Ergogênicos', unit: 'potes', unitLabel: 'Potes', defaultLocation: 'Armário de Suplementos' },
  { name: 'Whey Protein Isolado 900g', category: 'suplementos', subcategory: 'Proteínas & Blend', unit: 'potes', unitLabel: 'Potes', defaultLocation: 'Armário de Suplementos' },
  { name: 'Whey Protein Concentrado 900g', category: 'suplementos', subcategory: 'Proteínas & Blend', unit: 'potes', unitLabel: 'Potes', defaultLocation: 'Armário de Suplementos' },
  { name: 'Ômega 3 TG Ultra Concentrado (EPA/DHA 1000mg)', category: 'suplementos', subcategory: 'Lipídios Funcionais', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Suplementos' },
  { name: 'Coenzima Q10 (Ubiquinona 100mg) 60 caps', category: 'suplementos', subcategory: 'Antioxidantes & Mitocôndria', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Suplementos' },
  { name: 'Magnésio Bisglicinato / Treonato Quelato 60 caps', category: 'suplementos', subcategory: 'Minerais Quelatados', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Suplementos' },
  { name: 'Vitamina D3 2.000 UI + K2 MK-7 em Gotas 30ml', category: 'suplementos', subcategory: 'Vitaminas Lipossolúveis', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Suplementos' },
  { name: 'Colágeno Hidrolisado Verisol com Ácido Hialurônico 300g', category: 'suplementos', subcategory: 'Peptídeos Bioativos', unit: 'potes', unitLabel: 'Potes', defaultLocation: 'Armário de Suplementos' },
  { name: 'Glutamina Micronizada 100% Pura 300g', category: 'suplementos', subcategory: 'Saúde Intestinal', unit: 'potes', unitLabel: 'Potes', defaultLocation: 'Armário de Suplementos' },

  // Medicamentos & Injetáveis
  { name: 'Vitamina B12 (Metilcobalamina 1000mcg/ml) Ampolas', category: 'medicamentos_injetaveis', subcategory: 'Injetáveis & Manipulados', unit: 'ampolas', unitLabel: 'Ampolas', defaultLocation: 'Geladeira / Armário de Injetáveis' },
  { name: 'Vitamina D3 50.000 UI Injetável Ampolas', category: 'medicamentos_injetaveis', subcategory: 'Injetáveis & Manipulados', unit: 'ampolas', unitLabel: 'Ampolas', defaultLocation: 'Geladeira / Armário de Injetáveis' },
  { name: 'Complexo B Injetável Ampolas 2ml', category: 'medicamentos_injetaveis', subcategory: 'Injetáveis & Manipulados', unit: 'ampolas', unitLabel: 'Ampolas', defaultLocation: 'Geladeira / Armário de Injetáveis' },
  { name: 'N-Acetilcisteína (NAC 600mg) 60 caps', category: 'medicamentos_injetaveis', subcategory: 'Manipulados & Antioxidantes', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Medicamentos' },

  // Fitoterápicos & Extratos
  { name: 'Berberina HCl 500mg com Picolinato de Cromo 60 caps', category: 'fitoterapicos', subcategory: 'Metabolismo & Glicemia', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Fitoterápicos' },
  { name: 'Curcumina Padronizada 95% + Piperina 60 caps', category: 'fitoterapicos', subcategory: 'Anti-inflamatórios Naturais', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Fitoterápicos' },
  { name: 'Extrato Seco de Ashwagandha (KSM-66 500mg) 60 caps', category: 'fitoterapicos', subcategory: 'Adaptógenos & Eixo HPA', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Fitoterápicos' },
  { name: 'Silimarina (Cardo Mariano 200mg) 60 caps', category: 'fitoterapicos', subcategory: 'Hepatoprotetores', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Armário de Fitoterápicos' },

  // Antropometria & Avaliação
  { name: 'Fita Métrica Antropométrica Retrátil com Trava', category: 'antropometria', subcategory: 'Instrumentos de Medição', unit: 'unidades', unitLabel: 'Unidades', defaultLocation: 'Sala de Avaliação' },
  { name: 'Adipômetro Clínico / Científico (Lange / Harpenden)', category: 'antropometria', subcategory: 'Dobra Cutânea', unit: 'unidades', unitLabel: 'Unidades', defaultLocation: 'Sala de Avaliação' },
  { name: 'Paquímetro Ósseo Pequeno (0-150mm)', category: 'antropometria', subcategory: 'Diâmetros Ósseos', unit: 'unidades', unitLabel: 'Unidades', defaultLocation: 'Sala de Avaliação' },
  { name: 'Estadiômetro Portátil Compacto', category: 'antropometria', subcategory: 'Estatura & Altura', unit: 'unidades', unitLabel: 'Unidades', defaultLocation: 'Sala de Avaliação' },

  // Consumíveis & Bioimpedância
  { name: 'Gel Condutor Eletrodo para Bioimpedância (Frasco 1kg)', category: 'consumiveis_clinicos', subcategory: 'Consumíveis & Bioimpedância', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Mesa de Bioimpedância' },
  { name: 'Eletrodos Adesivos Descartáveis para Bioimpedância (Pacote c/ 100)', category: 'consumiveis_clinicos', subcategory: 'Consumíveis & Bioimpedância', unit: 'pacotes', unitLabel: 'Pacotes', defaultLocation: 'Mesa de Bioimpedância' },
  { name: 'Tiras Reagentes de Glicemia Capilar (Caixa c/ 50)', category: 'consumiveis_clinicos', subcategory: 'Glicemia & Testes Rápidos', unit: 'caixas', unitLabel: 'Caixas', defaultLocation: 'Armário de Procedimentos' },
  { name: 'Lancetas Descartáveis Estéreis (Caixa c/ 100)', category: 'consumiveis_clinicos', subcategory: 'Glicemia & Testes Rápidos', unit: 'caixas', unitLabel: 'Caixas', defaultLocation: 'Armário de Procedimentos' },
  { name: 'Luvas de Procedimento Nitrílicas Sem Pó (Caixa c/ 100)', category: 'consumiveis_clinicos', subcategory: 'EPIs & Descartáveis', unit: 'caixas', unitLabel: 'Caixas', defaultLocation: 'Armário de Procedimentos' },
  { name: 'Álcool 70% Spray Antisséptico 500ml', category: 'consumiveis_clinicos', subcategory: 'Higiene & Assepsia', unit: 'frascos', unitLabel: 'Frascos', defaultLocation: 'Bancada do Consultório' },

  // Amostras Grátis & Degustação
  { name: 'Sachês de Degustação de Whey Protein Hidrolisado 30g', category: 'amostras_gratis', subcategory: 'Amostras & Degustação', unit: 'saches', unitLabel: 'Sachês', defaultLocation: 'Balcão de Amostras' },
  { name: 'Sachês Amostra de Creatina Creapure 5g', category: 'amostras_gratis', subcategory: 'Amostras & Degustação', unit: 'saches', unitLabel: 'Sachês', defaultLocation: 'Balcão de Amostras' },
  { name: 'Sachês Amostra de Pré-Treino / Eletrólitos', category: 'amostras_gratis', subcategory: 'Amostras & Degustação', unit: 'saches', unitLabel: 'Sachês', defaultLocation: 'Balcão de Amostras' },
  { name: 'Barras de Proteína Amostra Degustação', category: 'amostras_gratis', subcategory: 'Amostras & Degustação', unit: 'unidades', unitLabel: 'Unidades', defaultLocation: 'Balcão de Amostras' },

  // Papelaria & Consultório
  { name: 'Bloco de Receituário Personalizado NutrinK (100 folhas)', category: 'papelaria_geral', subcategory: 'Papelaria & Documentos', unit: 'unidades', unitLabel: 'Unidades', defaultLocation: 'Gaveta da Mesa' },
  { name: 'Lençol Descartável Hospitalar em Rolo para Maca (50m x 70cm)', category: 'papelaria_geral', subcategory: 'Maca & Descartáveis', unit: 'rolos', unitLabel: 'Rolos', defaultLocation: 'Suporte da Maca' }
];

// Itens de demonstração para sistema de degustação e teste livre do consultório
export const INITIAL_INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: 'inv-sample-1',
    name: 'Creatina Monohidratada 100% Pura (Creapure) 300g',
    category: 'suplementos',
    subcategory: 'Aminoácidos & Ergogênicos',
    currentStock: 12,
    minStock: 3,
    unit: 'potes',
    unitLabel: 'Potes',
    lotNumber: 'LOTE-2026-CR01',
    expirationDate: '2027-10-30',
    location: 'Armário de Suplementos',
    notes: 'Suplemento padrão-ouro para atletas e força muscular.',
    createdAt: '2026-03-01',
    history: [
      { id: 'mov-1', date: '2026-03-01', type: 'entrada', quantity: 12, reason: 'Estoque inicial do consultório' }
    ]
  },
  {
    id: 'inv-sample-2',
    name: 'Ômega 3 TG Ultra Concentrado (EPA/DHA 1000mg)',
    category: 'suplementos',
    subcategory: 'Lipídios Funcionais',
    currentStock: 8,
    minStock: 2,
    unit: 'frascos',
    unitLabel: 'Frascos',
    lotNumber: 'LOTE-2026-OM02',
    expirationDate: '2027-08-15',
    location: 'Armário de Suplementos',
    notes: 'Ação anti-inflamatória e cardioprotetora.',
    createdAt: '2026-03-01',
    history: [
      { id: 'mov-2', date: '2026-03-01', type: 'entrada', quantity: 8, reason: 'Estoque inicial do consultório' }
    ]
  },
  {
    id: 'inv-sample-3',
    name: 'Vitamina D3 2.000 UI + K2 MK-7 em Gotas 30ml',
    category: 'suplementos',
    subcategory: 'Vitaminas Lipossolúveis',
    currentStock: 10,
    minStock: 3,
    unit: 'frascos',
    unitLabel: 'Frascos',
    lotNumber: 'LOTE-2026-VD03',
    expirationDate: '2028-01-20',
    location: 'Armário de Suplementos',
    notes: 'Saúde óssea e modulação imunológica.',
    createdAt: '2026-03-01',
    history: [
      { id: 'mov-3', date: '2026-03-01', type: 'entrada', quantity: 10, reason: 'Estoque inicial do consultório' }
    ]
  },
  {
    id: 'inv-sample-4',
    name: 'Fita Métrica Antropométrica Retrátil com Trava',
    category: 'antropometria',
    subcategory: 'Instrumentos de Medição',
    currentStock: 3,
    minStock: 1,
    unit: 'unidades',
    unitLabel: 'Unidades',
    lotNumber: 'PAT-ANT-01',
    expirationDate: '2030-12-31',
    location: 'Sala de Avaliação',
    notes: 'Aferição de circunferências corporais segundo ISAK.',
    createdAt: '2026-03-01',
    history: [
      { id: 'mov-4', date: '2026-03-01', type: 'entrada', quantity: 3, reason: 'Material permanente' }
    ]
  },
  {
    id: 'inv-sample-5',
    name: 'Sachês de Degustação de Whey Protein Hidrolisado 30g',
    category: 'amostras_gratis',
    subcategory: 'Amostras & Degustação',
    currentStock: 25,
    minStock: 5,
    unit: 'saches',
    unitLabel: 'Sachês',
    lotNumber: 'LOTE-2026-AMO01',
    expirationDate: '2027-06-30',
    location: 'Balcão de Amostras',
    notes: 'Amostra grátis para entrega e degustação dos pacientes.',
    createdAt: '2026-03-01',
    history: [
      { id: 'mov-5', date: '2026-03-01', type: 'entrada', quantity: 25, reason: 'Recebimento de parceiros' }
    ]
  }
];
