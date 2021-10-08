import { Employee } from "./employee.model";

export class CheckInOut {
    constructor(_idCheckInOut: number, _checkTime: Date, _checkType: String, _employe: Employee) {
        this.idCheckInOut = _idCheckInOut;
        this.checkTime = _checkTime;
        this.checkType = _checkType;
        this.employe = _employe;
    }
    public idCheckInOut!: number;
    public checkTime!: Date;
    public checkType!: String;
    public employe!: Employee;
    
}
