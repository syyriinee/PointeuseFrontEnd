import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeVM } from 'src/app/pointeuse-app/models/employeeVM.model';
@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SaveEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public user: EmployeeVM,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log("user on modal =", this.user)
    this.createForm()
  }

  createForm() {
    // this.formGroup = new FormGroup({
    //   'email':new FormControl(null,[Validators.required,Validators.email])
    // });
    this.employeeForm = this.formBuilder.group({
      'nameEmp': ["", [Validators.required, Validators.minLength(5)]],
      'fonction': ["", [Validators.required]],
      'planning': ["", [Validators.required]],
      'superviser': ["", [Validators.required]],
      'birth': [, [Validators.required]]
    })
  }

  getErrorNameEmp() {
    return this.employeeForm.controls.nameEmp.hasError('required') ? 'Champs est vide' :
      this.employeeForm.controls.nameEmp.hasError('minlength') ? 'Longueur doit au minimum 5 caractéres' : '';
  }

  getErrorFonction() {
    return this.employeeForm.controls.fonction.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorSupervisor() {
    return this.employeeForm.controls.superviser.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorBirth() {
    return this.employeeForm.controls.birth.hasError('required') ? 'Champs est vide' : '';
  }

  onSubmit() {
    console.log(this.employeeForm.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
