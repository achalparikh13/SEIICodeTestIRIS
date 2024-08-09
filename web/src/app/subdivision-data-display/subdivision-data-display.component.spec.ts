import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpServiceService } from '../services/http-service.service';

import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;
  let h4: HTMLElement;

  let httpserviceMock: jasmine.SpyObj<HttpServiceService>;

  beforeEach(async () => {
    httpserviceMock = jasmine.createSpyObj('MyService', ['getAllSubdivisions']);
    h4 = fixture.nativeElement.querySelector('h4');

    await TestBed.configureTestingModule({
      declarations: [ SubdivisionDataDisplayComponent ],
      providers: [{ provide: HttpServiceService, useValue: httpserviceMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should contain "loading" on screen', () => {
    expect(h4.textContent).toContain(component.loading)
  })

  //Call Data from Http service and return mock 
  it('should call getData from httpservice', () => {
    let mockData: any = {
      "subdivisions": [
        {
            "id": 26951,
            "code": "001B3",
            "name": "Alexander Park",
            "longitude": -115.07067,
            "latitude": 36.233263,
            "fieldSurveyTerritoryId": 3782,
            "marketId": 16,
            "subdivisionStatusId": 2,
            "surveyMethodId": 2,
            "activeSections": 0,
            "futureSections": 1,
            "builtOutSections": 2,
            "totalLots": 237,
            "fieldSurveyTerritoryName": "EldorBI",
            "marketName": "Las Vegas",
            "marketAbbreviation": "LV",
            "subdivisionStatusCode": "Future",
            "surveyMethodCode": "DRIVE",
            "county": "Clark",
            "community": null,
            "zoom17Date": "2023-08-11T18:20:25.557Z",
            "zoom18Date": "2023-08-11T18:20:25.557Z",
            "subdivisionGeometryId": null,
            "subdivisionGeometryBoundingBoxId": null,
            "subdivisionGeometryBoundaryId": null,
            "subdivisionGeometryIntelligenceBoundaryId": 24714,
            "subdivisionGeometryIntelligenceBoundaryStatusId": 4,
            "subdivisionGeometryIntelligenceBoundaryStatusCode": "Finalized",
            "subdivisionGeometryIntelligenceBoundaryStatusChangeDate": "2022-07-14T04:41:38.403Z",
            "nearMapImageDate": "2023-06-17T18:02:42.000Z",
            "imageBoxId": 59809,
            "mostRecentIPointBatchDate": "2023-07-07T00:00:00.000Z",
            "iPoints": null,
            "validatediPoints": null,
            "subdivisionSpecificStatus": "Future"
      }]
    } 
    httpserviceMock.getAllSubdivisions.and.returnValue(of(mockData));

    component.ngOnInit();
    expect(component.allSubdivisions).toEqual(mockData);

  })

});
