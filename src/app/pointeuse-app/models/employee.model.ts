export class Employee {
    constructor( _nameEmp: string, _fonction: string,_email: string, _birth: Date) {
       
        this.nameEmp = _nameEmp;
        this.fonction = _fonction;
        this.email = _email;
        this.birth = _birth;
        this.password = "test";
    }
    public idEmp!: number;
    public nameEmp!: string;
    public password!: string;
    public fonction!: string;
    public email!:string;
    public birth!: Date;
    public superviseurId!: number;
    public planning!: number;
    public pointages!: any[];
    public dayOffList!: any[];
    public missions!: any[];
}
