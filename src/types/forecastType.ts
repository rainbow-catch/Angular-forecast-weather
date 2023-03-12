import { currentType } from './currentType';
import { locationType } from './locationType';

export interface forecastType {
  current: currentType;
  location: locationType;
}
