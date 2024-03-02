import { novaScoreMap, nutriScoreMap } from '../contants/classificationMap';

export class FilterProductsDTO {
  nutrition: keyof typeof nutriScoreMap;
  nova: keyof typeof novaScoreMap;
}
