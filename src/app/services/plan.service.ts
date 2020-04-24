import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  private apiUrl = '/api/';
  //private apiUrl = 'http://localhost:8080/api/';

  areas = [
    {value: 0, name: 'Africa'},
    {value: 1, name: 'Asia'},
    {value: 2, name: 'South America'},
    {value: 3, name: 'North America'},
    {value: 4, name: 'Europe'},
    {value: 5, name: 'Australia and Oceania'},
    {value: 6, name: 'Antarctica'},
  ];
  difficulties = [
    {value: "Low", name: 'Low'},
    {value: "Medium", name: 'Medium'},
    {value: "High", name: 'High'}
  ];
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
  updatePlan(data, id) {
    return this.http.post<any>(this.apiUrl + 'update', {data: data, id: id}).pipe(map(plan => {
      if (plan) {
        return plan;
      }

    }))
  }
  deletePlan(id) {
    return this.http.post<any>(this.apiUrl + 'delete', {id: id}).pipe(map(plan => {
      if (plan) {
        return plan;
      }

    }))
  }
}
