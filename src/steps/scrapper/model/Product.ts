import { Ingredients } from './Ingredients';
import { Classification } from './Classification';
import { Nutrition } from './Nutrition';

export class Product {
  id?: string;
  title: string;
  nova: Classification;
  nutri: Classification;
  quantity: string;
  ingredients?: Ingredients;
  servingSize?: string | string[];
  data?: {
    [key: string]: Nutrition;
  };

  constructor(
    id: string,
    title: string,
    nova: Classification,
    nutri: Classification,
    quantity?: string,
    servingSize?: string | string[],
    ingredients?: Ingredients,
    data?: { [key: string]: Nutrition },
  ) {
    this.id = id;
    this.title = title;
    this.nova = nova;
    this.nutri = nutri;
    this.quantity = quantity;
    this.servingSize = servingSize;
    this.ingredients = ingredients;
    this.data = data;
  }
}
