import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  apiUrl = 'http://localhost:4000/api';

  constructor(
    private http: HttpClient
  ) { }

  post( endpoint: string, data: any) {
    return this.http.post(this.apiUrl + endpoint, data);
  }

  get(endpoint: string) {
    return this.http.get(this.apiUrl + endpoint);
  }

  getById(endpoint: string, id: number) {
    return this.http.get(`${this.apiUrl}${endpoint}/${id}`);
}

  
}
