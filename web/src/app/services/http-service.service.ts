import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubDivisionInfo } from '../interface/sub-division-info';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  private getAllSubdivisionsUrl = "/v1/subdivisions";

  constructor(private http: HttpClient) { }

  getAllSubdivisions () {
    return this.http.get<SubDivisionInfo>(this.getAllSubdivisionsUrl);
  }
}
