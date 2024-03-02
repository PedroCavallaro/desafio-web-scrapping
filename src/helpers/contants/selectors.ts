export const productAttributes = {
  title: '.title-1',
  attributes: '.attr_text > span',
  nova: '#panel_nova > li > a > h4',
  nutrition: '#panel_nutriscore > li > a > h4',
  nutritionValues:
    '#panel_nutrient_levels_content > .panel_group > ul > li > a',
  ingredients: '#panel_ingredients_content > div > div >div',
  quantity: '#field_quantity > .field_value',
  servingSize:
    "[aria-label='Dados nutricionais'] > thead > tr > th:nth-child(3)",
  analisys: '#panel_ingredients_analysis_content > ul > li > a >img',
  havePalmOil:
    '#panel_ingredients_analysis_content:nth-child(1) > ul > li  > a > img ',
  isVegan:
    '#panel_ingredients_analysis_content:nth-child(2) >  ul > li  > a > img ',
  isVegetarian:
    '#panel_ingredients_analysis_content:nth-child(8) > ul > li  > a > img ',
  data: "[aria-label='Dados nutricionais'] > tbody > tr",
  card: '.list_product_a',
  error: '.if-empty-dnone ~ p',
};
