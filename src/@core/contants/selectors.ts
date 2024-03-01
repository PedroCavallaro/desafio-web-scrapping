export const HTMLSelectors = {
  name: "#field_generic_name > .field_value > [itemprop='description']",
  attributes: '.attr_text > span',
  nova: '#panel_nova > li > a > h4',
  nutrition: '#panel_nutriscore > li > a > h4',
  nutritionValues:
    '#panel_nutrient_levels_content > .panel_group > ul > li > a',
  ingredients: '.panel_text',
  quantity: '#field_quantity > .field_value',
  servingSize: 'thead > tr > th:nth-child(3)',
  havePalmOil:
    '#panel_ingredients_analysis_en-may-contain-palm-oil > li  > a > h4 ',
  isVegan: '#panel_ingredients_analysis_en-non-vegan > li  > a > h4 ',
  isVegetarian:
    '#panel_ingredients_analysis_en-maybe-vegetarian > li  > a > h4 ',
  data: "[aria-label='Dados nutricionais'] > tbody > tr",
};
