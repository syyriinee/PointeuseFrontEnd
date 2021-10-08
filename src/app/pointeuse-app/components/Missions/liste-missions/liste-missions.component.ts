import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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

  displayedColumns: string[] = ['idDayOff', 'debutMission', 'finMission', 'employee', 'actions'];
  dataSource!: MatTableDataSource<Mission>;

  missions!: Mission[];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private _missionService: MissionService, public dialog: MatDialog, private cdref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
 
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.loadMissions();

    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  loadMissions() {
    this._missionService.listMissions().subscribe(
      (dataSuccess: any) => {
        console.log("load missions=", dataSuccess)
        this.missions = dataSuccess;
        this.dataSource = new MatTableDataSource(this.missions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("load list missions error=", error)
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
    const dialogRef = this.dialog.open(SaveMissionsComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log('result=', result);
        this._missionService.saveMission(result).subscribe(
          success => { 
            console.log(success);
            this.loadMissions();
           },
          error => { 
            console.log(error) 
          },
        );
      }
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
        this._missionService.deleteMission(item.idMission).subscribe(
          success=>{
            console.log(success)
            this.loadMissions();
          },
          error=>{
            console.log(error)
          }
        );      
      }
    });
  }

}
