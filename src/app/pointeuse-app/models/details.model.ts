export class Details {
    constructor(_id: number, __workingMinutes: number, _ecart: number, _daysOff: number, _missions: number) {

        this.id = _id;
        this.workingMinutes = __workingMinutes;
        this.daysOff = _daysOff;
        this.missions = _missions;
        this.ecart = _ecart;
    }

    public id!: number;
    public workingMinutes!: number;
    public daysOff!: number;
    public missions!: number;
    public ecart!: number;
}
