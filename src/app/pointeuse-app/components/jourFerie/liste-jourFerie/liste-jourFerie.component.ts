import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JourFerie } from 'src/app/pointeuse-app/models/jourFerie.model';
import { JourFerieService } from 'src/app/pointeuse-app/services/jourFerie.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SavejourFerieComponent } from '../save-jourFerie/save-jourFerie.component';

@Component({
  selector: 'app-liste-jourFerie',
  templateUrl: './liste-jourFerie.component.html',
  styleUrls: ['./liste-jourFerie.component.css']
})
export class ListeJourFerieComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['idJFerie', 'name', 'date', 'actions'];
  dataSource!: MatTableDataSource<JourFerie>;

  jourFeries!: JourFerie[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _jourFerieService: JourFerieService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadjourFerie();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadjourFerie() {
    this.jourFeries = this._jourFerieService.listJourFeries();
    console.log(this.jourFeries)
    this.dataSource = new MatTableDataSource(this.jourFeries);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSave(item?: JourFerie) {
    console.log("item=", item)
    if (!item)
      item = new JourFerie(0, "", new Date());

    const dialogRef = this.dialog.open(SavejourFerieComponent, {
      width: '800px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.jourFeries = result;
    });

  

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    });
  }

onDelete(item: JourFerie) {
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
      let index = this.dataSource.data.findIndex(x => x.idJFerie == item.idJFerie)
      this.dataSource.data.splice(index, 1)
      this.loadjourFerie();
    }
  });
}

}
