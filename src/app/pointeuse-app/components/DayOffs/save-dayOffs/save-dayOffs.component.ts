import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DayOff } from 'src/app/pointeuse-app/models/dayOff.model';
import { Employee } from 'src/app/pointeuse-app/models/employee.model';
import { DayOffService } from 'src/app/pointeuse-app/services/dayOff.service';
import { EmployeeService } from 'src/app/pointeuse-app/services/employee.service';

@Component({
  selector: 'app-save-dayOffs',
  templateUrl: './save-dayOffs.component.html',
  styleUrls: ['./save-dayOffs.component.css']
})
export class SaveDayOffsComponent implements OnInit {

  dayOffForm!: FormGroup;
  employes!: Employee[];
  currentUser!: Employee;
  dayOff!: DayOff;
  employee!: Employee;
  constructor(
    public dialogRef: MatDialogRef<SaveDayOffsComponent>,
    private _employeeService: EmployeeService,
    private _dayOffService: DayOffService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder) {
    this.createForm()
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
    this.loadEmployees()
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
    this.dayOffForm = this.formBuilder.group({
      'debutDayOff': ["", [Validators.required]],
      'finDayOff': ["", [Validators.required]],
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
  onNoClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.dialogRef.close();
    console.log("********dddd*******", this.dayOffForm);
    console.log('The dialog was closed');

    // dialogRef.controls['name'].valueChanges.subscribe(value => {
    //
    //});
    this.employee = this.dayOffForm.get('employee')?.value;
    let debutDayOff = this.dayOffForm.get('debutDayOff')?.value;
    let finDayOff = this.dayOffForm.get('finDayOff')?.value;
    console.log("emploooooyeeeee", this.employee)
    this.dayOff.employee = this.employee;
    console.log("emploooooyeeeeedayOfffffff", this.dayOff.employee)
    this.dayOff.debutDayOff = debutDayOff;
    this.dayOff.finDayOff = finDayOff;
    console.log('this.dayOff=', this.dayOff);
    this._dayOffService.saveDayOff(this.dayOff).subscribe(
      success => {
        console.log(success);

      },
      error => {
        console.log(error)
      },
    );
  }


  getErrorDebutDayOff() {
    return this.dayOffForm.controls.debutDayOff.hasError('required') ? 'Champs est vide' : '';
  }

  getErrorFinDayOff() {
    return this.dayOffForm.controls.finDayOff.hasError('required') ? 'Champs est vide' : '';
  }


  getErrorEmployee() {
    return this.dayOffForm.controls.employee.hasError('required') ? 'Champs est vide' : '';
  }



}
