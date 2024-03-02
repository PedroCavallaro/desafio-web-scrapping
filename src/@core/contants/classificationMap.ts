export const nutriScoreMapByText = {
  'Qualidade nutricional muito boa': 'A',
  'Qualidade nutricional boa': 'B',
  'Qualidade nutricional média': 'C',
  'Qualidade nutricional baixa': 'D',
  'Má qualidade nutricional': 'E',
  'Faltam dados para calcular o Nutri-Score': 'Dado não encontrado',
};
export type NutritionClassfication = keyof typeof nutriScoreMapByText;

export const nutriScoreMap = {
  A: 'Qualidade nutricional muito boa',
  B: 'Qualidade nutricional boa',
  C: 'Qualidade nutricional média',
  D: 'Qualidade nutricional baixa',
  E: 'Má qualidade nutricional',
};

export const novaScoreMapByText = {
  'Alimentos não processados ​​ou minimamente processados': '1',
  'Ingredientes culinários processados': '2',
  'Alimentos processados': '3',
  'Alimentos ultra-processados': '4',
  'Nível desconhecido de processamento do alimento': 'Dado não encontrado',
};

export const novaScoreMap = {
  '1': 'Alimentos não processados ​​ou minimamente processados',
  '2': 'Ingredientes culinários processados',
  '3': 'Ingredientes culinários processados',
  '4': 'Alimentos ultra-processados',
};
