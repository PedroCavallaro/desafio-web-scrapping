import cheerio from 'cheerio';
import { Classification } from '../scrapper/model/Classification';
import { Nutrition } from '../scrapper/model/Nutrition';
import { Ingredients } from '../scrapper/model/Ingredients';
export interface ProductDataParser {
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
