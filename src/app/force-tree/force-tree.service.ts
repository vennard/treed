import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Force } from '../data/force.model';

//const target = '../assets/angular.json';
const target = '../assets/express.json';
//const target = '../assets/example.json';
@Injectable()
export class ForceTreeService {
  constructor(private http: HttpClient) {}

  getForceData(): Observable<Force> {
    return this.http.get<Force>(target);
  }
}
