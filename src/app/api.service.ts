import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

    getCats(count: number): Observable<any> {
      return this.http.get<any>(`https://api.thecatapi.com/v1/images/search?limit=${count}`);
    }

    getVoteCount(): Observable<any> {
      return this.http.get<any>(`${environment.API_BASE}/vote-count`);
    }

    submitVote(vote: any): Observable<any> {
      return this.http.post<any>(`${environment.API_BASE}/vote`, vote);
    }
}