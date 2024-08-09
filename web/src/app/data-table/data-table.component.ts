import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { SubDivisionInfo } from '../interface/sub-division-info';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit {

  @Input() allSubs: SubDivisionInfo[] | undefined;

  @ViewChild (MatPaginator) paginator!: MatPaginator;
  @ViewChild (MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<SubDivisionInfo> = new MatTableDataSource();
  statusFilter = 'none';
  dateSort = 'none';

  unsortedData: SubDivisionInfo[] | undefined;
  displayedColumns: String[] = ["id", "name", "status", "map"];

  constructor() {
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<SubDivisionInfo>(this.allSubs);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // filter data based on status 
  filterData(event: any) {
    let newData: any[] = [];
    
    if (event.value === 'none') {
      this.dataSource = new MatTableDataSource(this.allSubs);
      this.unsortedData = this.allSubs;
    } else {
      // Can also use Array filter and filter predicate 
      this.allSubs?.forEach(x => {
        if (x.subdivisionStatusCode === event.value) {
          newData.push(x);
        } else if (event.value === 'other' && (x.subdivisionStatusCode !== 'Active' && x.subdivisionStatusCode !== 'Builtout' && x.subdivisionStatusCode !== 'Future')) {
          newData.push(x);
        }
      });
      this.dataSource = new MatTableDataSource(newData);
      this.unsortedData = newData;
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Sort Data available in the table by date time
  sortByDateTime(event: any) {
    let array = this.dataSource.filteredData;
    let sortedArray = [];
    if (event.value === 'asc') {
      sortedArray = [...array].sort((a,b) => Date.parse(a.nearMapImageDate) - Date.parse(b.nearMapImageDate));
      this.dataSource = new MatTableDataSource(sortedArray);
    } else if (event.value === 'dsc') {
      sortedArray = [...array].sort((a,b) => Date.parse(b.nearMapImageDate) - Date.parse(a.nearMapImageDate));
      this.dataSource = new MatTableDataSource(sortedArray);
    } else {
      this.dataSource = new MatTableDataSource(this.unsortedData);
    }
  }
}
