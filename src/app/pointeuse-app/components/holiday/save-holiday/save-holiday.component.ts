import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Holiday } from 'src/app/pointeuse-app/models/holiday.model';
import { HolidayService } from 'src/app/pointeuse-app/services/holiday.service';

@Component({
  selector: 'app-save-holiday',
  templateUrl: './save-holiday.component.html',
  styleUrls: ['./save-holiday.component.css']
})
export class SaveholidayComponent implements OnInit {

  holidayForm!: FormGroup;
  holiday!: Holiday;

  constructor(
    public dialogRef: MatDialogRef<SaveholidayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Holiday,
    private formBuilder: FormBuilder, private _holidayService: HolidayService) { }

  ngOnInit(): void {
    console.log("user on modal =", this.data)
    this.holiday = this.data;
    this.createForm()
  }

  createForm() {

    if (this.holiday.id !== 0) {
      this.holidayForm = this.formBuilder.group({
        'name': [this.holiday.name, [Validators.required, Validators.minLength(5)]],
        'date': [this.holiday.date, [Validators.required]]
      })
    } else {

      this.holidayForm = this.formBuilder.group({
        'name': ["", [Validators.required, Validators.minLength(5)]],
        'date': [, [Validators.required]]
      })
    }



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
  onSubmit() {
    this.dialogRef.close();
    console.log("********dddd*******", this.holidayForm);
    console.log('The dialog was closed');

    // dialogRef.controls['name'].valueChanges.subscribe(value => {
    //
    //});
    const name = this.holidayForm.get('name')?.value;
    const date = this.holidayForm.get('date')?.value;

    this.holiday.name = name;
    this.holiday.date = date;
    console.log('this.holiday=', this.holiday);

    this._holidayService.saveHoliday(this.holiday).subscribe(
      success => {
        console.log("success--------------", success);
        
      },
      error => {
        console.log("errrrroooor-------------", error)
      },
    );


  }
}
