import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Horaire, Planning } from 'src/app/pointeuse-app/models/planning.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-save-planning',
  templateUrl: './save-planning.component.html',
  styleUrls: ['./save-planning.component.css']
})
export class SavePlanningComponent implements OnInit {
horaireForm! : FormGroup;
  horaire!: Horaire;
  planningItem = new Planning( "");
  constructor(private formBuilder: FormBuilder,private _location: Location) { }

  ngOnInit(): void {
    this.loadHoraire();
  }
loadHoraire(){
  if(this.horaire!=null){
    this.horaireForm = this.formBuilder.group({
      'horaire': [this.horaire, [Validators.required]],
     
    })
  }else{this.addHoraire()}
}
  onSubmit() {
    console.log(this.planningItem)
  }

  onNoClick(): void {
    //this.dialogRef.close();
    this._location.back();
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

  //isValidFrsTags(): boolean {
  //  let valid = true;

  //  if (this.frsToEdit.name == null) {
  //    this._alertService.errorsMsg("Nom fournisseur Obligatoire", null, MessageSeverity.error);
  //    valid = false;
  //  }

  //  if (this.frsToEdit.voucher_send_nbrDays == null) {
  //    this._alertService.errorsMsg("Nb Jour dissusion voucher Obligatoire", null, MessageSeverity.error);
  //    valid = false;
  //  }

  //  if (valid) {
  //    for (let frsTag of this.frsToEdit.ocrParams) {
  //      if (frsTag.couponType == null) {
  //        this._alertService.errorsMsg("Type Coupon Obligatoire", null, MessageSeverity.error);
  //        //this.snackBar.open(`Type Coupon Obligatoire`, 'Cv.Voucher', { duration: 5000 });
  //        valid = false;
  //        break;
  //      }
  //      if (!frsTag.jsonPath) {
  //        this._alertService.errorsMsg("Path json Obligatoire", null, MessageSeverity.error);
  //        valid = false;
  //        break;
  //      }
  //      if (!frsTag.tagNameStart) {
  //        this._alertService.errorsMsg("Début tag Obligatoire", null, MessageSeverity.error);
  //        //this.snackBar.open(`Début tag Obligatoire`, 'Cv.Voucher', { duration: 5000 });
  //        valid = false;
  //        break;
  //      }
  //    }
  //  }

  //  return valid;
  //}

  onSave() {
    //if (this.isValidFrsTags()) {
    //  this._frsService.saveFrs(this.frsToEdit).subscribe(
    //    (successData: Fournisseur) => {
    //      this.idFrs = successData.id;
    //      this._uiService.HideProgress();
    //      if (successData !== null) {
    //        this.loadFrsById(this.idFrs);
    //        this._alertService.successMsg("Success", `Fournisseur was saved successfully`, MessageSeverity.success);
    //      }
    //    },
    //    err => {
    //      this._uiService.HideProgress();
    //      this._alertService.errorsMsg("Save Fournisseur Params Error", err.message, MessageSeverity.error, err);
    //      console.log(" addFrsCouponPage error : ", err)
    //    });
    //}
  }

}
