import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  //private apiUrl = '/api/';
  private apiUrl = 'http://localhost:8080/api/';
  constructor(
    private http: HttpClient,
  ) { }
  getPlans()  {
    return this.http.get<any>(this.apiUrl + 'plan')
      .pipe(map(res => {
          return res.data;
      }));
  }
  createPlan(data) {
    return this.http.post<any>(this.apiUrl + 'create', data).pipe(map(plan => {
      if (plan) {
        return plan;
      }

    }))
  }
}
