import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';
import { EmployeeService } from 'src/app/pointeuse-app/services/employee.service';

@Component({
  selector: 'app-save-missions',
  templateUrl: './save-missions.component.html',
  styleUrls: ['./save-missions.component.css']
})
export class SaveMissionsComponent implements OnInit {

  missionForm!: FormGroup;
  @ViewChild('picker') picker: any;
  
  employes!: Employee[];
  currentUser!: Employee;
  // public showSpinners = true;
  // public showSeconds = false;
  // public touchUi = false;
  // public enableMeridian = false;
  // public stepHour = 1;
  // public stepMinute = 1;
  // public stepSecond = 1;
  // public color: ThemePalette = 'primary';

  constructor(
    public dialogRef: MatDialogRef<SaveMissionsComponent>,
    private _employeeService: EmployeeService,
    private cdref: ChangeDetectorRef,
    private formBuilder: FormBuilder) {   this.createForm(); }
 

  ngOnInit(): void {
    this.loadEmployees()
  }
  
  createForm() {
    this.missionForm = this.formBuilder.group({
      'debutMission': ["", [Validators.required]],
      'finMission': ["", [Validators.required]],
      'employee': ["", [Validators.required]],
    })
  }
  loadEmployees() {
    this._employeeService.listEmployees().subscribe(
      (dataSuccess: any) => {
        //console.log("load emp list totale=", dataSuccess)
        this.employes = dataSuccess;
      },
      error => {
        console.log("load emp error=", error)
      }
    );
  }
  getErrorDebutMission() {
    return this.missionForm.controls.debutMission.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorFinMission() {
    return this.missionForm.controls.finMission.hasError('required') ? 'Champs est vide' : '';
  }


  getErrorEmployee() {
    return this.missionForm.controls.employee.hasError('required') ? 'Champs est vide' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
