import { Employee } from "./employee.model";

export class DayOff {
    constructor(_idDayOff: number, _debutDayOff: Date, _finDayOff: Date) {
        this.idDayOff = _idDayOff;
        this.debutDayOff = _debutDayOff;
        this.finDayOff = _finDayOff;
        //this.employee = _employee;
    }
    public idDayOff!: number;
    public debutDayOff!: Date;
    public finDayOff!: Date;
    public idEmp!: number;
    public employee?: Employee ;
}