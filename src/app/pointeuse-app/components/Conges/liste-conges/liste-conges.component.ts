import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Conge } from 'src/app/pointeuse-app/models/conge.model';
import { CongeService } from 'src/app/pointeuse-app/services/conge.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SaveCongesComponent } from '../save-conges/save-conges.component';

@Component({
  selector: 'app-liste-conges',
  templateUrl: './liste-conges.component.html',
  styleUrls: ['./liste-conges.component.css']
})
export class ListeCongesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idCon', 'dateDebut', 'dateFin', 'employe', 'actions'];
  dataSource!: MatTableDataSource<Conge>;

  conges!: Conge[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _congeService: CongeService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadConges();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadConges() {
    this.conges = this._congeService.listConges();
    console.log(this.conges)
    this.dataSource = new MatTableDataSource(this.conges);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSave() {
    const dialogRef = this.dialog.open(SaveCongesComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onDelete(item: Conge) {
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
        let index = this.dataSource.data.findIndex(x => x.idCon == item.idCon)
        this.dataSource.data.splice(index, 1)
        this.loadConges();
      }
    });
  }

}
