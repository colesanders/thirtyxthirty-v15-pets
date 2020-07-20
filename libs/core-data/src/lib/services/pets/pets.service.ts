import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/pets';


@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private http: HttpClient) { }

  all(): Observable<[Pet]>{
    return this.http.get<[Pet]>(BASE_URL);
  }

  byId(id): Observable<Pet>{
    return this.http.get<Pet>(this.getUrl(id));
  }

  create(pet: Pet): Observable<Pet>{
    return this.http.post<Pet>(BASE_URL, pet);
  }

  update(pet: Pet): Observable<Pet>{
    return this.http.put<Pet>(this.getUrl(pet.id), pet);
  }

  delete(id): Observable<Pet>{
    return this.http.delete<Pet>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
