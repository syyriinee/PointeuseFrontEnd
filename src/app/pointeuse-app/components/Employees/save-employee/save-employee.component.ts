import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';
import { EmployeeService } from 'src/app/pointeuse-app/services/employee.service';
@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})
export class SaveEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  user!:Employee;
  fonctions!: string[];
  plannings!: number[];
  constructor(
    public dialogRef: MatDialogRef<SaveEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private _employeeService: EmployeeService,
    private cdref: ChangeDetectorRef,
    private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    console.log("user on modal =", this.data)
    this.user=this.data;
    this.createForm()
  }
  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.createForm()

  //   });
  // }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }
  createForm() {
    this._employeeService.listFonctions().subscribe(
      (dataSuccess: any) => {
        console.log("load foctions=", dataSuccess)
        this.fonctions = dataSuccess;
       
      },
      error => {
        console.log("load emp fonction error=", error)
      }
    );
    this._employeeService.listPlannings().subscribe(
      (dataSuccess: any) => {
        console.log("load plannings=", dataSuccess)
        this.plannings = dataSuccess;
       
      },
      error => {
        console.log("load plans error=", error)
      }
    );
    if(this.user!=null){
      this.employeeForm = this.formBuilder.group({
        'nameEmp': [this.user.nameEmp, [Validators.required, Validators.minLength(5)]],
        'email': [this.user.email, [Validators.required, Validators.email]],
        'fonction': [this.user.fonction, [Validators.required]],
        'planning': [this.user.planning, [Validators.required]],
        //'supervisor': [this.user.superviseurId, [Validators.required]],
        'birth': [this.user.birth, [Validators.required]]
      })
    }else{

      this.employeeForm = this.formBuilder.group({
        'nameEmp': ["", [Validators.required, Validators.minLength(5)]],
        'email': ["", [Validators.required, Validators.email]],
        'fonction': ["", [Validators.required]],
        'planning': ["", [Validators.required]],
        //'supervisor': ["", [Validators.required]],
        'birth': [, [Validators.required]]
      })
    }
   
  }

  getErrorNameEmp() {
    return this.employeeForm.controls.nameEmp.hasError('required') ? 'Champs est vide' :
      this.employeeForm.controls.nameEmp.hasError('minlength') ? 'Longueur doit au minimum 5 caractéres' : '';
  }
  getErrorEmail() {
    return this.employeeForm.controls.email.hasError('required') ? 'Champs est vide' :
      this.employeeForm.controls.email.hasError('email') ?'inserer l e-mail' : '';
  }

  getErrorFonction() {
    return this.employeeForm.controls.fonction.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorSupervisor() {
    return this.employeeForm.controls.supervisor.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorBirth() {
    return this.employeeForm.controls.birth.hasError('required') ? 'Champs est vide' : '';
  }

  onSubmit() {
    console.log(this.employeeForm.value);
    let nameEmp = this.employeeForm.get('nameEmp')?.value;
    let email = this.employeeForm.get('email')?.value;
    let fonction = this.employeeForm.get('fonction')?.value;
    let supervisor = this.employeeForm.get('supervisor')?.value;
    let birth = this.employeeForm.get('birth')?.value;

    this.user.nameEmp = nameEmp;
    this.user.email = email;
    this.user.fonction = fonction; 
    //this.user.supervisor = supervisor;
   this.user.birth = birth;
    console.log('this.user=', this.user);

    this._employeeService.saveEmployee(this.user).subscribe(
      success => {
        console.log("success--------------", success);
        //this.loadholiday();
      },
      error => {
        console.log("errrrroooor-------------", error)
      },
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
