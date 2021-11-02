import { Employee } from "./employee.model";

export class DayOff {
    constructor( _debutDayOff: Date, _finDayOff: Date,_id: number) {
        this.idDayOff =_id;
        this.debutDayOff = _debutDayOff;
        this.finDayOff = _finDayOff;
        
    }
    public idDayOff!: number;
    public debutDayOff!: Date;
    public finDayOff!: Date;
    public employee!: Employee ;
}