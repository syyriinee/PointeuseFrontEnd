import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Planning } from 'src/app/pointeuse-app/models/planning.model';
import { PlanningService } from 'src/app/pointeuse-app/services/planning.service';
import { SavePlanningComponent } from './save-planning/save-planning.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  displayedColumns: string[] = ['idPlaning', 'namePlanning', 'actions'];
  dataSource!: MatTableDataSource<Planning>;

  plannings!: Planning[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _planningService: PlanningService, public dialog: MatDialog, public router: Router) {
  }

  ngOnInit(): void {
    this.loadPlanning();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPlanning() {
    this.plannings = this._planningService.listPlannings();
    console.log(this.plannings)
    this.dataSource = new MatTableDataSource(this.plannings);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSave(item?: Planning) {
    this.router.navigate(['planning/new']);
    //console.log("item=", item)
    //if (!item)
    //  item = new Planning(0, "");

    //const dialogRef = this.dialog.open(SavePlanningComponent, {
    //  width: '800px',
    //  data: item
    //});

    //dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
    //});



    //dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
    //});
  }

  onDelete(item: Planning) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        "title": "Supprimer planning",
        "message": "Voulez vous vraiment supprimer ce planning ? "
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        //supprimer
        let index = this.dataSource.data.findIndex(x => x.idPlanning == item.idPlanning)
        this.dataSource.data.splice(index, 1)
        this.loadPlanning();
      }
    });
  }

}
