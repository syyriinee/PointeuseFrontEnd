import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Holiday } from 'src/app/pointeuse-app/models/holiday.model';
import { HolidayService } from 'src/app/pointeuse-app/services/holiday.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SaveholidayComponent } from '../save-holiday/save-holiday.component';

@Component({
  selector: 'app-liste-holiday',
  templateUrl: './liste-holiday.component.html',
  styleUrls: ['./liste-holiday.component.css']
})
export class ListeHolidayComponent implements OnInit {
  displayedColumns: string[] = ['idJFerie', 'name', 'date', 'actions'];
  dataSource!: MatTableDataSource<Holiday>;

  holiday!: Holiday;
  holidays!: Holiday[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private _holidayService: HolidayService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadholiday();
  }

  loadholiday() {
    this._holidayService.listHolidays().subscribe(
      (dataSuccess: any) => {
        console.log("load list holidays=", dataSuccess)
        this.holidays = dataSuccess;
        this.dataSource = new MatTableDataSource(this.holidays);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list holidays error=", error)
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

  onSave(item?: Holiday) {
    console.log("item=", item)
    if (!item)
      item = new Holiday(0, "", new Date());

    const dialogRef = this.dialog.open(SaveholidayComponent, {
      width: '800px',
      data: item
    });


  }

  onDelete(item: Holiday) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        "title": "Supprimer le jour férié",
        "message": "Voulez vous vraiment supprimer ce jour férié ? "
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        //supprimer
        this._holidayService.deleteHoliday(item.id).subscribe(
          success => {
            console.log(success)
            this.loadholiday();
          },
          error => {
            console.log(error)
          }
        );
      }
    });
  }

}
