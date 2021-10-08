export class Holiday {
    constructor(_idJFerie: number, _name: String,_date: Date) {
        this.id = _idJFerie;
        this.name = _name;
        this.date=_date;
    }
    public id!: number;
    public name!: String;
    public date!: Date;
}