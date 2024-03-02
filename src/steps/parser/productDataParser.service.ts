import {
  NovaClassification,
  NovaText,
  NutritionClassification,
  NutritionText,
  novaScoreMap,
  novaScoreMapByText,
  nutriScoreMap,
  nutriScoreMapByText,
} from 'src/helpers/contants/classificationMap';
import cheerio from 'cheerio';
import { ingredientsAnalysisMap } from 'src/helpers/contants/ingredientsAnalysisMap';
import {
  nutritionLevelMap,
  NutritionLevel,
} from 'src/helpers/contants/nutritionLevelMap';
import { ProductDataParser } from './ProductDataParser';
import { Nutrition } from '../scrapper/model/Nutrition';

export class ProductDataParserService implements ProductDataParser {
  formatIngredients(ingredients: string) {
    if (this.hasValue(ingredients)) {
      const ingredientsArray = String(ingredients)
        .replace(/<\s*[:;,]\s*/g, ',')
        .split('\n');

      return ingredientsArray
        .filter((e) => e.trim() !== '')
        .map((e) => e.trim());
    }
    return 'Dado não encontrado';
  }
  mapProductCardArray($: cheerio.Root, e: cheerio.Element) {
    const route = $(e).attr('href').split('/');
    const id = route[4];
    const name = $(e).find('.list_product_name').text();
    const nutri = $(e)
      .find('.list_product_sc > .list_product_icons:nth-child(1)')
      .attr('title');
    const nova = $(e)
      .find('.list_product_sc > .list_product_icons:nth-child(2)')
      .attr('title');

    const nutriTitle = this.mapAttributes(
      nutriScoreMap,
      nutri[12].toUpperCase() as NutritionClassification,
    );

    const novaTitle = this.mapAttributes(
      novaScoreMap,
      nova[5] as NovaClassification,
    );

    const novaScore = this.getKeyByValue(novaScoreMap, novaTitle);
    const nutriScore = this.getKeyByValue(nutriScoreMap, nutriTitle);

    return {
      id,
      name,
      nutrition: {
        score: nutriScore,
        title: nutriTitle,
      },
      nova: {
        score: novaScore,
        title: novaTitle,
      },
    };
  }
  getKeyByValue<T>(object: T, value: string) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  formatServingSize(dirtyString: string) {
    const servingSize = dirtyString
      .trim()
      .replace(/Como vendidopor porção \(/g, '')
      .replace(/\)/g, '');

    if (servingSize[servingSize.length - 1] !== 'g') {
      return this.hasValue(null);
    }

    return servingSize;
  }
  formatIngredientsAnalysis(
    analisys: cheerio.Element[],
    ingredients: string,
    $: cheerio.CheerioAPI,
  ) {
    return {
      hasPalmOil: ingredientsAnalysisMap[$(analisys[0]).attr('class')],
      isVegan: !ingredientsAnalysisMap[$(analisys[1]).attr('class')],
      isVegetarian: !ingredientsAnalysisMap[$(analisys[2]).attr('class')],
      list: this.formatIngredients(ingredients),
    };
  }

  formatClassificationScore(
    type: 'nova' | 'nutri',
    title?: string,
    values?: cheerio.Element[],
    $?: cheerio.CheerioAPI,
  ) {
    let score = '';

    if (type === 'nova') {
      score = this.mapAttributes(novaScoreMapByText, title as NovaText);
      return {
        score,
        title,
      };
    }

    score = this.mapAttributes(nutriScoreMapByText, title as NutritionText);

    return {
      score,
      values: this.parseNutritionValues(values, $),
    };
  }

  parseNutritionValues(values: cheerio.Element[], $: cheerio.CheerioAPI) {
    return values.map((e) => {
      const imgSrc = $(e).children('img').attr('src');

      return [
        this.mapAttributes(nutritionLevelMap, imgSrc as NutritionLevel),
        $(e).children('h4').text().trim(),
      ];
    });
  }

  formatNutritionTableData(values: cheerio.Element[], $: cheerio.CheerioAPI) {
    const mappedData = new Map<string, Nutrition>();

    values.forEach((e) => {
      const item = $(e).children('td:nth-child(1)').text().trim();
      const per100g = $(e).children('td:nth-child(2)').text().trim();
      const perServing = $(e).children('td:nth-child(3)').text().trim();

      mappedData.set(item, {
        per100g: per100g as string,
        perServing: perServing as string,
      });
    });

    return mappedData;
  }

  mapAttributes<T>(map: T, attribute: keyof T) {
    return map[attribute];
  }

  hasValue(value: string | Array<string>) {
    if (!value || value.length === 0) {
      return '?';
    }
    return value;
  }
}
