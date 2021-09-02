import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-jourFerie',
  templateUrl: './save-jourFerie.component.html',
  styleUrls: ['./save-jourFerie.component.css']
})
export class SavejourFerieComponent implements OnInit {

  jourFerieForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SavejourFerieComponent>,
    private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.jourFerieForm = this.formBuilder.group({
      'date': ["", [Validators.required]],
      'name': ["", [Validators.required]],

    })
  }
  getErrorName() {
    return this.jourFerieForm.controls.name.hasError('required') ? 'Champs est vide' : '';
  }
  getErrorDate() {
    return this.jourFerieForm.controls.date.hasError('required') ? 'Champs est vide' : '';
  }





  onSubmit() {
    console.log(this.jourFerieForm.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
