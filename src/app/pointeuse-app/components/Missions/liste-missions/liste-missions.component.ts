import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Mission } from 'src/app/pointeuse-app/models/mission.model';
import { MissionService } from 'src/app/pointeuse-app/services/mission.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { SaveMissionsComponent } from '../save-missions/save-missions.component';

@Component({
  selector: 'app-liste-missions',
  templateUrl: './liste-missions.component.html',
  styleUrls: ['./liste-missions.component.css']
})
export class ListeMissionsComponent implements OnInit {

  displayedColumns: string[] = ['idCon', 'dateDebut', 'dateFin', 'employe', 'actions'];
  dataSource!: MatTableDataSource<Mission>;

  missions!: Mission[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _missionService: MissionService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadMissions();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadMissions() {
    this.missions = this._missionService.listMissions();
    console.log(this.missions)
    this.dataSource = new MatTableDataSource(this.missions);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSave() {
    const dialogRef = this.dialog.open(SaveMissionsComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onDelete(item: Mission) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '800px',
      data: {
        "title": "Supprimer Mission",
        "message": "Voulez vous vraiment supprimer cette mission ? "
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        //supprimer
        let index = this.dataSource.data.findIndex(x => x.idMission == item.idMission)
        this.dataSource.data.splice(index, 1)
        this.loadMissions();
      }
    });
  }

}
