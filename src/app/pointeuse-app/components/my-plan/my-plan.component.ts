import { Time } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Timestamp } from 'rxjs-compat';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Horaire, Planning } from '../../models/planning.model';
import { EmployeeService } from '../../services/employee.service';
import { PlanningService } from '../../services/planning.service';

@Component({

  selector: 'app-my-plan',
  templateUrl: './my-plan.component.html',
  styleUrls: ['./my-plan.component.css']
})
export class MyPlanComponent implements OnInit {

  nameHoraire !: string;
  debutHoraire!: Date;
  finHoraire!: Date;
  heureDebut!: Time;
  heureFin!: Time;
  dureePause!: number;
  heureDebutSamedi!: Time;
  heureFinSamedi!: Time;
  // displayedColumns: string[] = ['dateDebut', 'dateFin', 'heureDebut', 'heureFin', 'heureDebutSamedi', 'heureFinSamedi'];
  //dataSource!: MatTableDataSource<Horaire>;

  currentUser!: any;

  constructor(private _planningService: PlanningService, private authService: AuthenticationService
    , @Inject('LOCALSTORAGE') private localStorage: Storage, private employeService: EmployeeService, private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.loadMyPlan();

  }
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  loadMyPlan() {
    console.log("-----loadMyPlan-------------");

    this.currentUser = this.localStorage.getItem("currentUser");

    this.employeService.getMyHoraire(this.currentUser).subscribe((dataSuccess: any) => {
      console.log("load getMyHoraire=", dataSuccess)
      if (dataSuccess != null) {
        this.nameHoraire = dataSuccess.nameHoraire;
        this.debutHoraire = dataSuccess.debutHoraire;
        this.finHoraire = dataSuccess.finHoraire;
        this.heureDebut = dataSuccess.heureDebut;
        this.heureFin = dataSuccess.heureFin;
        this.dureePause = dataSuccess.dureePause;
        this.heureDebutSamedi = dataSuccess.heureDebutSamedi;
        this.heureFinSamedi = dataSuccess.heureFinSamedi;
      }
    },
      error => {
        console.log("load getMyHoraire error=", error)
      }
    );

  }
}
