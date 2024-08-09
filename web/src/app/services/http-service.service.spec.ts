import { TestBed } from '@angular/core/testing';

import { HttpServiceService } from './http-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


fdescribe('HttpServiceService', () => {
  let service: HttpServiceService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(HttpServiceService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('#getAllSubdivisions should return expected data', (done) => {
    const expectedData: any = {
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
    service.getAllSubdivisions().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });
    const testRequest = httpTestingController.expectOne('/v1/subdivisions');
    testRequest.flush(expectedData);

    // Expect Test Request to use GET
    expect(testRequest.request.method).toBe('GET');
  });

});

