import cheerio from 'cheerio';
export interface IProductDataParser {
  formatIngredients(ingredients: string): string[] | 'Dado não encontrado';
  mapProductCardArray(
    $: cheerio.Root,
    e: cheerio.Element,
  ): {
    id: string;
    name: string;
    nutrition: {
      score: string;
      title: string;
    };
    nova: {
      score: string;
      title: string;
    };
  };
  getKeyByValue<T>(object: T, value: string): string;
  formatServingSize(dirtyString: string): string | string[];
  formatIngredientsAnalysis(
    analisys: cheerio.Element[],
    ingredients: string,
    $: cheerio.CheerioAPI,
  ): {
    havePalmOil: any;
    isVegan: any;
    isVegetarian: any;
    list: string | string[];
  };
  formatClassificationScore(
    type: 'nova' | 'nutri',
    title?: string,
    values?: cheerio.Element[],
    $?: cheerio.CheerioAPI,
  ):
    | {
        score: string;
        title: string;
        values?: undefined;
      }
    | {
        score: string;
        values: string[][];
        title?: undefined;
      };
  parseNutritionValues(
    values: cheerio.Element[],
    $: cheerio.CheerioAPI,
  ): string[][];
  formatNutritionTableData(
    values: cheerio.Element[],
    $: cheerio.CheerioAPI,
  ): Map<any, any>;
  mapAttributes<T>(map: T, attribute: keyof T): T[keyof T];
  hasValue(value: string | Array<string>): string | string[];
}
