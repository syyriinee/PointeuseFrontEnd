import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conge } from 'src/app/pointeuse-app/models/conge.model';

@Component({
  selector: 'app-save-conges',
  templateUrl: './save-conges.component.html',
  styleUrls: ['./save-conges.component.css']
})
export class SaveCongesComponent implements OnInit {

  congeForm!: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<SaveCongesComponent>,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.congeForm = this.formBuilder.group({
      'dateDebut': ["", [Validators.required]],
      'dateFin': ["", [Validators.required]],
      'employeId': ["", [Validators.required]],
    })
  }

  getErrorDateDebut() {
    return this.congeForm.controls.dateDebut.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorDateFin() {
    return this.congeForm.controls.dateFin.hasError('required') ? 'Champs est vide' : '';
  }


  getErrorEmployeId() {
    return this.congeForm.controls.employeId.hasError('required') ? 'Champs est vide' : '';
  }

  onSubmit() {
    console.log(this.congeForm.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
