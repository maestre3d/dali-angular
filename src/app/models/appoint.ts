export class Appoint {
    constructor(
        public _id: string,
        public user: string,
        public costumer: string,
        public service: string[] = [],
        public time: number,
        public status: boolean
    ) {}
}
