import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor() {}

  getForecast(location: string) {
    const removePolishLetters = (input:string) => {
      let result = input;
      result = result.split("ó").join("o");
      result = result.split("ź").join("z");
      result = result.split("ł").join("l");
      result = result.split("ą").join("a");
      result = result.split("ę").join("e");
      result = result.split("ć").join("c");
      result = result.split("ń").join("n");
      result = result.split("ś").join("s");
      result = result.split("ż").join("z");
      return result;
    }
    location = removePolishLetters(location);    
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
