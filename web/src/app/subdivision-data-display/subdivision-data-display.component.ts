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

  constructor(private httpService: HttpServiceService) { }

  public allSubdivisions: SubDivisionInfo[] = [];

  ngOnInit(): void {
    this.getData();
  }

  public getData () {
    this.httpService.getAllSubdivisions().subscribe((subdivisions: any) => {
      this.allSubdivisions = subdivisions.subdivisions;
    });
  }
}
