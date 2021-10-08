import { Time } from "@angular/common";

export class Planning {
  constructor( _namePlanning: string) {
   
    this.namePlanning = _namePlanning;
    this.horaire = [];
  }
  public idPlanning!: number;
  public namePlanning!: string;
  public horaire!: Horaire[];
}

export class Horaire {
  // constructor(_dateDebut: Date, _dateFin: Date, _heureDebut: Time, _heureFin: Time, _heureDebutSamedi: Time, _heureFinSamedi: Time, _dureePause: number) {
  //   this.dateDebut = _dateDebut;
  //   this.dateFin = _dateFin;
  //   this.dureePause = _dureePause;
  //   this.heureDebut = _heureDebut;
  //   this.heureFin = _heureFin;
  //   this.heureDebutSamedi = _heureDebutSamedi;
  //   this.heureFinSamedi = _heureFinSamedi;

  // }
  constructor(){
    
  }
  public nameHoraire! : string;
  public debutHoraire!: Date;
  public finHoraire!: Date;
  public heureDebut!: Time;
  public heureFin!: Time;
  public dureePause!: number;
  public heureDebutSamedi!: Time;
  public heureFinSamedi!: Time;
}
