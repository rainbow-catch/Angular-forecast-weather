import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getData(key: string) {
    const result = localStorage.getItem(key);
    if (result !== null && result !== undefined) {
      return result;
    } else {
      return '';
    }
  }
  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
