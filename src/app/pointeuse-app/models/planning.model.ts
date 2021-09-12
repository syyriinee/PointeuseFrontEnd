import { Time } from "@angular/common";

export class Planning {
  constructor(_idPlanning: number, _namePlanning: string) {
    this.idPlanning = _idPlanning;
    this.namePlanning = _namePlanning;
    this.horaireNormal = [];
    this.horaireEte = [];
  }
  public idPlanning!: number;
  public namePlanning!: string;
  public horaireNormal!: Horaire[];
  public horaireEte!: Horaire[];
}

export class Horaire {
  public dateDebut!: Date;
  public dateFin!: Date;
  public heureDebut!: Time;
  public heureFin!: Time;
  public dureePause!: Time;
  public heureDebutSamedi!: Time;
  public heureFinSamedi!: Time;
}
