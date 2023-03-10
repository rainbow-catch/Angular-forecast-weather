import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor() {}

  getForecast(location: string) {
    const apiKey = `http://api.weatherapi.com/v1/current.json?key=61dab060f224404b838130524230903&q=${location}&aqi=no`;
    const res = axios
      .get(apiKey, { responseEncoding: 'utf8' })
      .then((res) => {
        return res.data.current;
      })
      .catch(() => {
        return 'error';
      });
    return res;
  }
}
