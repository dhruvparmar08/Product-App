import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  setToken(key, value) {
    // var data = this.encryptData(value);
    localStorage.setItem(key, this.encryptData(value));
    // localStorage.setItem(key,this.encryptData(value));
    // localStorage.setItem(key,value);
  }

  getToken(key) {
      // let data = localStorage.getItem(key);
      return this.decryptData(localStorage.getItem(key));
  }

  removeToken(key) {
      localStorage.removeItem(key);
  }

  encryptData(data) {
    try {
        return CryptoJS.AES.encrypt(JSON.stringify(data), environment.secret_key).toString();
    } catch (e) {
        // console.log(e);
    }
  }

  decryptData(data) {
    try {
        const bytes = CryptoJS.AES.decrypt(data, environment.secret_key);
        if (bytes.toString()) {
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        return data;
    } catch (e) {
        // console.log(e);
    }
  }

  login(data) {
    return this.http.post(environment.api+'login', data);
  }

  addproduct(data) {
    return this.http.post(environment.api+'add', data);
  }

  getProductlist() {
    return this.http.get(environment.api+'allproducts');
  }

  getproduct(id) {
    return this.http.get(environment.api+'product?id='+id);
  }

  updateproduct(data) {
    return this.http.post(environment.api+'update', data);
  }

  deleteproduct(id) {
    let params = new HttpParams();
    params.append('id', id)
    return this.http.delete(environment.api+'delete?id='+id);
  }
}
