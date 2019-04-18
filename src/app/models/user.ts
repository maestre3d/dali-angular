export class User {
    constructor(
        public _id: string,
        public username: string,
        public password: string,
        public name: string,
        public surname: string,
        public role: string,
        public image: string
    ) {}
}
