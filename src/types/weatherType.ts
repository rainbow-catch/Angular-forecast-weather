import { currentType } from './currentType';
import { forecastType } from './forecastType';
import { locationType } from './locationType';

export interface weatherType {
  current: currentType;
  location: locationType;
  forecast?: forecastType
}
