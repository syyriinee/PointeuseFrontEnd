export class Holiday {
    constructor(_idJFerie: number, _name: String) {
        this.id = _idJFerie;
        this.name = _name;
    }
    public id!: number;
    public name!: String;
    public date!: Date;
}