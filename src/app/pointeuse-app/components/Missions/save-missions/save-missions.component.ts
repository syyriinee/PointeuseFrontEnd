import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-missions',
  templateUrl: './save-missions.component.html',
  styleUrls: ['./save-missions.component.css']
})
export class SaveMissionsComponent implements OnInit {

  missionForm!: FormGroup;
  @ViewChild('picker') picker: any;

  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  constructor(
    public dialogRef: MatDialogRef<SaveMissionsComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.missionForm = this.formBuilder.group({
      'debutMission': ["", [Validators.required]],
      'finMission': ["", [Validators.required]],
      'employeeId': ["", [Validators.required]],
    })
  }

  getErrorDebutMission() {
    return this.missionForm.controls.debutMission.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorFinMission() {
    return this.missionForm.controls.finMission.hasError('required') ? 'Champs est vide' : '';
  }


  getErrorEmployeeId() {
    return this.missionForm.controls.employeeId.hasError('required') ? 'Champs est vide' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
