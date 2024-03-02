import { IsNotEmpty } from 'class-validator';
import { novaScoreMap, nutriScoreMap } from '../contants/classificationMap';

export class FilterProductsDTO {
  @IsNotEmpty({ message: 'Nutri score not sended' })
  nutrition: keyof typeof nutriScoreMap;
  @IsNotEmpty({ message: 'Nova score not sended' })
  nova: keyof typeof novaScoreMap;
}
