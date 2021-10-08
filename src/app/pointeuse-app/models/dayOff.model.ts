import { Employee } from "./employee.model";

export class DayOff {
    constructor( _debutDayOff: Date, _finDayOff: Date,_employee: Employee) {
        this.debutDayOff = _debutDayOff;
        this.finDayOff = _finDayOff;
        this.employee = _employee;
    }
    public idDayOff!: number;
    public debutDayOff!: Date;
    public finDayOff!: Date;
    public employee!: Employee ;
}