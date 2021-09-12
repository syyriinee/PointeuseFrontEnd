import { Employee } from "./employee.model";

export class EmployeeVM {
    
    constructor(_idEmp: number, _nameEmp: string, _fonction: string, _supervisor: Employee | undefined, _birth: Date) {
        this.idEmp = _idEmp;
        this.nameEmp = _nameEmp;
        this.fonction = _fonction;
        this.supervisor = _supervisor;
        this.birth = _birth;
        this.password = "test";
    }

    public idEmp: number;
    public nameEmp: string;
    public password: string;
    public fonction: string;
    public supervisor?: Employee;
    public birth: Date;
}
