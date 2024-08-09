import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SubDivisionInfo } from '../interface/sub-division-info';
import { HttpServiceService } from '../services/http-service.service';

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css']
})
export class SubdivisionDataDisplayComponent implements OnInit {

  loading = 'Loading... :)';
  errorState = 'Something Has gone really wrong ;(';

  loadingStatus = true;
  httpError = false;

  constructor(private httpService: HttpServiceService) { }

  public allSubdivisions: SubDivisionInfo[] = [];

  ngOnInit(): void {
    this.getData();
  }

  public getData () {
    this.loadingStatus = true;
    this.httpError = false;
    this.httpService.getAllSubdivisions().subscribe((subdivisions: any) => {
      this.allSubdivisions = subdivisions.subdivisions;
    }, error => {
      console.log('Something has gone terribly wrong :(')
      this.loadingStatus = false;
      this.httpError = true;
    }, () => {
      this.loadingStatus = false;
    }
    );
  }
}
