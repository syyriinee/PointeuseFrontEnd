import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DayOff } from 'src/app/pointeuse-app/models/dayOff.model';

@Component({
  selector: 'app-save-dayOffs',
  templateUrl: './save-dayOffs.component.html',
  styleUrls: ['./save-dayOffs.component.css']
})
export class SaveDayOffsComponent implements OnInit {

  dayOffForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<SaveDayOffsComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.dayOffForm = this.formBuilder.group({
      'debutDayOff': ["", [Validators.required]],
      'finDayOff': ["", [Validators.required]],
      'employeeId': ["", [Validators.required]],
    })
  }

  getErrorDebutDayOff() {
    return this.dayOffForm.controls.debutDayOff.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorFinDayOff() {
    return this.dayOffForm.controls.finDayOff.hasError('required') ? 'Champs est vide' : '';
  }


  getErrorEmployeeId() {
    return this.dayOffForm.controls.employeeId.hasError('required') ? 'Champs est vide' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
