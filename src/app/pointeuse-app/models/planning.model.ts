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
  public dateDeb!: Date;
  public dateFin!: Date;
  public seances!: Seance[];
}

export class Seance {
  public jour!: string;
  public heureDeb!: Time;
  public heureFin!: Time;
  public dureePause!: Time;
}
