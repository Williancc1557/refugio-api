export class Scheduling {
    public readonly userName: string;

    public readonly userContact: number;

    public readonly userPeaplesNumber: number;

    public readonly userCost: number;

    public readonly userDate: string;

    public constructor(params: Scheduling) {
        Object.assign(this, params);
    }
}
