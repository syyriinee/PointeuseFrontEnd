export class Employee {
    constructor(_idEmp: number, _nameEmp: string, _fonction: string, _superviser: number, _birth: Date) {
        this.idEmp = _idEmp;
        this.nameEmp = _nameEmp;
        this.fonction = _fonction;
        this.superviser = _superviser;
        this.birth = _birth;
        this.password = "test";
    }
    
    public idEmp: number;
    public nameEmp: string;
    public password: string;
    public fonction: string;
    public superviser: number;
    public birth: Date;
}
