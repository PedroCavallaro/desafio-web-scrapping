import {
  novaScoreMap,
  novaScoreMapByText,
  nutriScoreMap,
  nutriScoreMapByText,
} from '../contants/classificationMap';
import { ingredientsAnalysisMap } from '../contants/ingredientsAnalysisMap';
import {
  NutritionLevel,
  nutritionLevelMap,
} from '../contants/nutritionLevelMap';
import { AnyNode, CheerioAPI } from 'cheerio';
export class DataParser {
  formatIngredients = (ingredients: string) => {
    if (this.hasValue(ingredients)) {
      const ingredientsArray = String(ingredients)
        .trim()
        .replace(/[:;]/g, ',')
        .replace(/<span class="allergen">/g, '')
        .replace(/<\/span>/g, '')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
        .replace(
          /<!-- text is in a different language than the interface -->/g,
          '',
        )
        .split('\n')
        .join()
        .split(',');

      return ingredientsArray
        .filter((e) => e.trim() !== '')
        .map((e) => e.trim());
    }
    return 'Dado não encontrado';
  };
  mapProductCardArray($: CheerioAPI, e: AnyNode) {
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
      nutri[12].toUpperCase() as keyof typeof nutriScoreMap,
    );

    const novaTitle = this.mapAttributes(
      novaScoreMap,
      nova[5] as keyof typeof novaScoreMap,
    );

    const novaScore = this.getKeyByValue(novaScoreMap, novaTitle);
    const nutriScore = this.getKeyByValue(nutriScoreMap, nutriTitle);
    console.log(novaScore);
    console.log(nutriScore);
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
    analisys: AnyNode[],
    ingredients: string,
    $: CheerioAPI,
  ) {
    return {
      havePalmOil: ingredientsAnalysisMap[$(analisys[0]).attr('class')],
      isVegan: ingredientsAnalysisMap[$(analisys[1]).attr('class')],
      isVegetarian: ingredientsAnalysisMap[$(analisys[2]).attr('class')],
      list: this.formatIngredients(ingredients),
    };
  }

  formatClassificationScore(
    type: 'nova' | 'nutri',
    title?: string,
    values?: AnyNode[],
    $?: CheerioAPI,
  ) {
    let score = '';

    if (type === 'nova') {
      score = this.mapAttributes<typeof novaScoreMapByText>(
        novaScoreMapByText,
        title as keyof typeof novaScoreMapByText,
      );
      return {
        score,
        title,
      };
    }

    score = this.mapAttributes<typeof nutriScoreMapByText>(
      nutriScoreMapByText,
      title as keyof typeof nutriScoreMapByText,
    );

    return {
      score,
      values: this.parseNutritionValues(values, $),
    };
  }

  parseNutritionValues(values: AnyNode[], $: CheerioAPI) {
    return values.map((e) => {
      const imgSrc = $(e).children('img').attr('src');

      return [
        this.mapAttributes<typeof nutritionLevelMap>(
          nutritionLevelMap,
          imgSrc as NutritionLevel,
        ),
        $(e).children('h4').text().trim(),
      ];
    });
  }

  formatNutritionTableData(values: AnyNode[], $: CheerioAPI) {
    const mappedData = new Map();

    values.forEach((e) => {
      const item = $(e).children('td:nth-child(1)').text().trim();
      const per100g = $(e).children('td:nth-child(2)').text().trim();
      const perServing = $(e).children('td:nth-child(3)').text().trim();

      mappedData.set(item, {
        per100g: this.hasValue(per100g),
        perServing: this.hasValue(perServing),
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

  removeSpaces(string: string) {
    return string.trim();
  }
}
