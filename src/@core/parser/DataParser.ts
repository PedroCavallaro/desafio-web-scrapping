import { novaScoreMap, nutriScoreMap } from '../contants/classificationMap';
import { nutritionLevelMap } from '../contants/nutritionLevelMap';

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

      return ingredientsArray.filter((e) => e.trim() !== '');
    }
    return 'Dado não encontrado';
  };

  formatClassificationScore(
    type: 'nova' | 'nutri',
    title?: string,
    values?: cheerio.Element[],
    $?: cheerio.Root,
  ) {
    let score = '';
    if (type === 'nova') {
      score = this.mapAttributes<typeof novaScoreMap>(
        novaScoreMap,
        title as keyof typeof novaScoreMap,
      );
      return {
        score,
        title,
      };
    }

    score = this.mapAttributes<typeof nutriScoreMap>(
      nutriScoreMap,
      title as keyof typeof nutriScoreMap,
    );

    return {
      score,
      values: this.parseNutritionValues(values, $),
    };
  }

  parseNutritionValues(values: cheerio.Element[], $: cheerio.Root) {
    return [...values].map((e) => {
      const imgSrc = $(e).children('img').attr('src');

      return [
        this.mapAttributes<typeof nutritionLevelMap>(
          nutritionLevelMap,
          imgSrc as keyof typeof nutritionLevelMap,
        ),
        $(e).children('h4').text().trim(),
      ];
    });
  }

  formatNutritionTableData(values: cheerio.Element[], $: cheerio.Root) {
    const mappedData = new Map();
    values.forEach((e) => {
      mappedData.set($(e).children('td:nth-child(1)').text().trim(), {
        per100g: $(e).children('td:nth-child(2)').text().trim(),
        perServing: $(e).children('td:nth-child(3)').text().trim(),
      });
    });

    return mappedData;
  }

  mapAttributes<T>(map: T, attribute: keyof T) {
    return map[attribute];
  }

  hasValue(value: string | Array<string>) {
    if (!value || value.length === 0) {
      return 'unkown';
    }
    return value;
  }

  removeSpaces(string: string) {
    return string.trim();
  }
}
