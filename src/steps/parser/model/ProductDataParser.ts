import cheerio from 'cheerio';
import { Classification } from '../../scrapper/model/Classification';
import { Nutrition } from '../../scrapper/model/Nutrition';
import { Ingredients } from '../../scrapper/model/Ingredients';
import { Product } from 'src/steps/scrapper/model/Product';
export interface ProductDataParser {
  formatIngredients(ingredients: string): string[] | 'Dado não encontrado';

  mapProductCardArray(
    $: cheerio.Root,
    e: cheerio.Element,
  ): Pick<Product, 'id' | 'title' | 'nova' | 'nutri'>;
  getKeyByValue<T>(object: T, value: string): string;

  formatServingSize(dirtyString: string): string | string[];

  formatIngredientsAnalysis(
    analisys: cheerio.Element[],
    ingredients: string,
    $: cheerio.CheerioAPI,
  ): Ingredients;

  formatClassificationScore(
    type: 'nova' | 'nutri',
    title?: string,
    values?: cheerio.Element[],
    $?: cheerio.CheerioAPI,
  ): Classification;

  parseNutritionValues(
    values: cheerio.Element[],
    $: cheerio.CheerioAPI,
  ): string[][];

  formatNutritionTableData(
    values: cheerio.Element[],
    $: cheerio.CheerioAPI,
  ): Map<string, Nutrition>;

  mapAttributes<T>(map: T, attribute: keyof T): T[keyof T];

  hasValue(value: string | Array<string>): string | string[];
}
