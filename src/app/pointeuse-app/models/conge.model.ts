import { Employee } from "./employee.model";

export class Conge {
    constructor(_idCon: number, _dateDebut: Date, _dateFin: Date,_employe:Employee|undefined) {
        this.idCon = _idCon;
        this.dateDebut = _dateDebut;
        this.dateFin = _dateFin;
        this.employe = _employe;
    }
    public idCon!: number;
    public dateDebut!: Date;
    public dateFin!: Date;
    public employeId!: number;
    public employe?: Employee ;
}