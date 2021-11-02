import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Horaire, Planning } from 'src/app/pointeuse-app/models/planning.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanningService } from 'src/app/pointeuse-app/services/planning.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-planning',
  templateUrl: './save-planning.component.html',
  styleUrls: ['./save-planning.component.css']
})
export class SavePlanningComponent implements OnInit {
  horaireForm!: FormGroup;
  horaire!: Horaire;
  horaires!: Horaire;
  planningForm!: FormGroup;
  planningItem = new Planning("");
  constructor(private formBuilder: FormBuilder,   public dialogRef: MatDialogRef<SavePlanningComponent>, @Inject(MAT_DIALOG_DATA) public data: Planning, private _planningService: PlanningService,private _location: Location) { }

  ngOnInit(): void {
    this.loadHoraire();
    this.planningItem=this.data;
    this.createForm()
  }
  createForm() {
    this._planningService.listHorairesByPlan(this.planningItem.idPlanning).subscribe(
      (dataSuccess: any) => {
        console.log("load foctions=", dataSuccess)
        this.horaires = dataSuccess;
       
      },
      error => {
        console.log("load emp fonction error=", error)
      }
    );
    
    if(this.planningItem!=null){
      this.planningForm = this.formBuilder.group({
    
        'horaire': [this.planningItem.horaire, [Validators.required]]
      })
    }else{

      this.planningForm = this.formBuilder.group({
   
        'horaire': [, [Validators.required]]
      })
    }
   
  }
  loadHoraire() {
    if (this.horaire != null) {
      this.horaireForm = this.formBuilder.group({
        'horaire': [this.horaire, [Validators.required]],

      })
    } else { this.addHoraire() }
  }
  onSubmit() {
    console.log(this.planningItem)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //this._location.back();
  }

  changehoraire(item: Horaire, index: number) {
    this.planningItem.horaire[index] = item;
  }

  addHoraire() {
    let horaire = new Horaire();
    this.planningItem.horaire.push(horaire);
  }

  removeHoraire(item: Horaire) {
    let index = this.planningItem.horaire.indexOf(item, 0);
    if (index > -1) {
      this.planningItem.horaire.splice(index, 1);
    }
  }


  onSave() {
    
  }

}
