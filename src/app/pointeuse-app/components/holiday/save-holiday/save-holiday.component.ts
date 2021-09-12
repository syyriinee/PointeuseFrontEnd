import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Holiday } from 'src/app/pointeuse-app/models/holiday.model';

@Component({
  selector: 'app-save-holiday',
  templateUrl: './save-holiday.component.html',
  styleUrls: ['./save-holiday.component.css']
})
export class SaveholidayComponent implements OnInit {

  holidayForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SaveholidayComponent>,
    @Inject(MAT_DIALOG_DATA) public holiday: Holiday,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.holiday)
    this.createForm()
  }

  createForm() {
    this.holidayForm = this.formBuilder.group({
      'date': [this.holiday.date, [Validators.required]],
      'name': [this.holiday.name, [Validators.required]],

    })
  }
  getErrorName() {
    return this.holidayForm.controls.name.hasError('required') ? 'Champs est vide' : '';
  }
  getErrorDate() {
    return this.holidayForm.controls.date.hasError('required') ? 'Champs est vide' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
