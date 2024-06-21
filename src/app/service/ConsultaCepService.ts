import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  buscar(cep: String) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
  }
}