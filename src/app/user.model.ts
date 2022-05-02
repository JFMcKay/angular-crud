export class User {
    date: Date;
    id : string;
    feeling: string;
    entry: string;

    constructor(date: Date, id: string, feeling: string, entry: string)
    {
        this.date = new Date(),
        this.id = "",
        this.feeling = "",
        this.entry = ""
    }
}

