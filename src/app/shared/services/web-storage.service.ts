import {Injectable} from '@angular/core';

@Injectable()
export class WebStorageService {

  set(key, value) {
    localStorage.setItem(key, value);
  }

  get(key) {
    return localStorage.getItem(key);
  }

  setJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getJson(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
