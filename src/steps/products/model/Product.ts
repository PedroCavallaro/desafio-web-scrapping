import { Ingredients } from './Ingredients';
import { Classification } from './Classification';
import { Nutrition } from './Nutrition';
import {
  NovaClassification,
  NutritionClassification,
} from 'src/helpers/contants/classificationMap';

export class Product {
  id?: string;
  name: string;
  nova: Classification<NovaClassification>;
  nutri: Classification<NutritionClassification>;
  ingredients?: Ingredients;
  servingSize?: string;
  data: {
    [key: string]: Nutrition;
  };

  constructor(
    id: string,
    name: string,
    nova: Classification<NovaClassification>,
    nutri: Classification<NutritionClassification>,
    servingSize: string,
    ingredients: Ingredients,
    data: { [key: string]: Nutrition },
  ) {
    this.id = id;
    this.name = name;
    this.nova = nova;
    this.nutri = nutri;
    this.servingSize = servingSize;
    this.ingredients = ingredients;
    this.data = data;
  }
}
