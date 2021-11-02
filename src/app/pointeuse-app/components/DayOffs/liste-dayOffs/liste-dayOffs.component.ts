import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DayOff } from 'src/app/pointeuse-app/models/dayOff.model';
import { DayOffService } from 'src/app/pointeuse-app/services/dayOff.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SaveDayOffsComponent } from '../save-dayOffs/save-dayOffs.component';


@Component({
  selector: 'app-liste-dayOffs',
  templateUrl: './liste-dayOffs.component.html',
  styleUrls: ['./liste-dayOffs.component.css']
})
export class ListeDayOffsComponent implements OnInit {
  displayedColumns: string[] = ['idDayOff', 'debutDayOff', 'finDayOff', 'employee', 'actions'];
  dataSource!: MatTableDataSource<DayOff>;

  dayOffs!: DayOff[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private _dayOffService: DayOffService, public dialog: MatDialog, private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadDayOffs();

    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  loadDayOffs() {
    this._dayOffService.listDayOffs().subscribe(
      (dataSuccess: any) => {
        console.log("load list days off=", dataSuccess)
        this.dayOffs = dataSuccess;
        this.dataSource = new MatTableDataSource(this.dayOffs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list days off error=", error)
      }
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSave() {
    const dialogRef = this.dialog.open(SaveDayOffsComponent, {
      width: '800px'
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('result=', result);
        this._dayOffService.saveDayOff(result).subscribe(
          success => { 
            console.log(success);
            this.loadDayOffs();
           },
          error => { 
            console.log(error) 
          },
        );
      }
    });
  
  }

  onDelete(item: DayOff) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        "title": "Supprimer Congé",
        "message": "Voulez vous vraiment supprimer ce congé ? "
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        //supprimer
      this._dayOffService.deleteDayOff(item.idDayOff).subscribe(
        success=>{
          console.log(success)
          this.loadDayOffs();
        },
        error=>{
          console.log(error)
        }
      );      
      }
    });
  }

}
