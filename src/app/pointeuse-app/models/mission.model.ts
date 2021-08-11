import { Employee } from "./employee.model";

export class Mission {
    constructor(_id: number, _dateDebut: Date, _dateFin: Date,_employe:Employee|undefined) {
        this.idMission = _id;
        this.dateDebut = _dateDebut;
        this.dateFin = _dateFin;
        this.employe = _employe;
    }
    public idMission!: number;
    public dateDebut!: Date;
    public dateFin!: Date;
    public employeId!: number;
    public employe?: Employee ;
}