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
import { ifStmt } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  displayedColumns: string[] = ['idPlaning', 'namePlanning', 'actions'];
  dataSource!: MatTableDataSource<Planning>;

  plannings!: Planning[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private _planningService: PlanningService, public dialog: MatDialog, public router: Router) {
  }

  ngOnInit(): void {
    this.loadPlanning();
  }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  loadPlanning() {
    this._planningService.listPlannings().subscribe(
      (dataSuccess: any) => {
        console.log("load planning=", dataSuccess)
        this.plannings = dataSuccess;
        this.dataSource = new MatTableDataSource(this.plannings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list plannings error=", error)
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

  onSave(item?: Planning) {
    if (!item)
      this.router.navigate(['admin/planning/new']);
    else
      this.router.navigate(['admin/planning',item.idPlanning]);
  }

  onDelete(item: Planning) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        "title": "Supprimer planning",
        "message": "Voulez vous vraiment supprimer ce planning ? "
      }
    });


  }

}
