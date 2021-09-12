import { Employee } from "./employee.model";

export class Mission {
    constructor(_id: number, _debutMission: Date, _finMission: Date) {
        this.idMission = _id;
        this.debutMission = _debutMission;
        this.finMission = _finMission;
    }
    public idMission!: number;
    public debutMission!: Date;
    public finMission!: Date;
    public idEmp!: number;
    public employee?: Employee ;
}