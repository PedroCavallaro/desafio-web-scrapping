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

  hasValue(value: string | Array<string>) {
    if (!value || value.length === 0) {
      return 'unkown';
    }
    return value;
  }

  mapAttribute<T>(map: T, attribute: keyof T) {
    return map[attribute];
  }

  removeSpaces(string: string) {
    return string.trim();
  }
}
