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
      'dateDebut': ["", [Validators.required]],
      'dateFin': ["", [Validators.required]],
      'employeId': ["", [Validators.required]],
    })
  }

  getErrorDateDebut() {
    return this.missionForm.controls.dateDebut.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorDateFin() {
    return this.missionForm.controls.dateFin.hasError('required') ? 'Champs est vide' : '';
  }


  getErrorEmployeId() {
    return this.missionForm.controls.employeId.hasError('required') ? 'Champs est vide' : '';
  }

  onSubmit() {
    console.log(this.missionForm.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
