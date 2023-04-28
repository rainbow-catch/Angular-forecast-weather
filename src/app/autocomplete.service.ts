import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AutocompleteService {
  getAutocompleteRes(value: string) {
    const apiKey = `http://api.weatherapi.com/v1/search.json?key=61dab060f224404b838130524230903&q=${value}`;
    const res = axios.get(apiKey).then((res) => {
      return res.data;
    });
    return res;
  }

  constructor() {}
}
